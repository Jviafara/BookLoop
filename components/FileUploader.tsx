'use client'

import { Image as IKImage, Video as IKVideo, upload } from '@imagekit/next'
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from '@imagekit/next'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import config from '@/lib/config'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config

interface Props {
  type: 'image' | 'video'
  accept: string
  placeholder: string
  folder: string
  variant: 'dark' | 'light'
  onFileChange?: (filePath: string) => void
  value?: string
}

interface UploadedFile {
  filePath: string | null
}

interface UploadAuth {
  token: string
  expire: number
  signature: string
  publicKey: string
}

const authenticator = async (): Promise<UploadAuth> => {
  const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(`Authentication failed (${response.status}): ${errorText}`)
  }

  const data = await response.json()

  return {
    token: data.token,
    expire: data.expire,
    signature: data.signature,
    publicKey,
  }
}

const FileUpload = ({ type, accept, placeholder, folder, variant, onFileChange, value }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<UploadedFile>({
    filePath: value ?? null,
  })

  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const setFileFunc = () => {
      setFile({ filePath: value ?? null })
    }
    setFileFunc()
  }, [value])

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }

  const onError = (error: unknown) => {
    console.error('ImageKit upload error:', error)

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: 'destructive',
    })
  }

  const onValidate = (selectedFile: File) => {
    const maxSize = type === 'image' ? 20 * 1024 * 1024 : 50 * 1024 * 1024

    if (selectedFile.size > maxSize) {
      toast({
        title: 'File size too large',
        description: `Please upload a ${type === 'image' ? 'file smaller than 20MB' : 'file smaller than 50MB'}.`,
        variant: 'destructive',
      })

      return false
    }

    return true
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return

    // Allow selecting the same file again after an upload.
    event.target.value = ''

    if (!onValidate(selectedFile)) return

    setProgress(0)
    setIsUploading(true)

    try {
      const auth = await authenticator()

      const response = await upload({
        ...auth,
        file: selectedFile,
        fileName: selectedFile.name,
        folder,
        useUniqueFileName: true,
        onProgress: ({ loaded, total }) => {
          if (total > 0) {
            setProgress(Math.round((loaded / total) * 100))
          }
        },
      })

      setFile({ filePath: response.filePath! })
      setProgress(100)

      onFileChange?.(response.filePath || '')

      toast({
        title: `${type} uploaded successfully`,
        description: `${response.filePath} uploaded successfully!`,
      })
    } catch (error: unknown) {
      if (error instanceof ImageKitAbortError) {
        console.error('Upload aborted:', error.reason)
      } else if (
        error instanceof ImageKitInvalidRequestError ||
        error instanceof ImageKitUploadNetworkError ||
        error instanceof ImageKitServerError
      ) {
        console.error('ImageKit error:', error.message)
      }

      onError(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='w-full space-y-3'>
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        onChange={handleUpload}
        className='hidden'
        disabled={isUploading}
      />

      <button
        type='button'
        disabled={isUploading}
        className={cn('upload-btn ', styles.button, isUploading && 'cursor-not-allowed opacity-60')}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src='/icons/upload.svg'
          alt='Upload icon'
          width={20}
          height={20}
          className='object-contain'
        />

        <p className={cn('text-base', styles.placeholder)}>{isUploading ? 'Uploading...' : placeholder}</p>

        {file.filePath && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
      </button>

      {isUploading && (
        <div
          className='w-full rounded-full bg-green-200'
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className='progress'
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === 'image' ? (
          <IKImage
            urlEndpoint={urlEndpoint}
            src={file.filePath}
            alt='Uploaded image preview'
            width={500}
            height={300}
          />
        ) : (
          <IKVideo
            urlEndpoint={urlEndpoint}
            src={file.filePath}
            controls
            className='h-96 w-full rounded-xl'
          />
        ))}
    </div>
  )
}

export default FileUpload
