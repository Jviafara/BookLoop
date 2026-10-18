'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, DefaultValues, FieldValues, Controller, Path } from 'react-hook-form'
import { ZodType } from 'zod'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import Link from 'next/link'
import { Button } from './ui/button'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import FileUploader from './FileUploader'

interface Props<T extends FieldValues> {
  type: 'SIGN_IN' | 'SIGN_UP'
  schema: ZodType<T, FieldValues>
  defaultValues: T
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }> | void
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
  const isSignedIn = type === 'SIGN_IN'

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async data => {
    // Do something with the form values.
    console.log(data)
  }

  return (
    <div className=' flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignedIn ? 'Welcome back to BookLoop!' : 'Create your library account'}
      </h1>
      <p className='text-light-100'>
        {isSignedIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all fields and upload a valid university ID to gain access to the library'}
      </p>
      <form
        id='auth-form'
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-6 w-full'
      >
        {Object.keys(defaultValues).map(field => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`auth-form-${field}`}
                  className='capitalize'
                >
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FieldLabel>
                {field.name === 'universityCard' ? (
                  <FileUploader
                    type='image'
                    accept='image/*'
                    placeholder='Upload your ID'
                    folder='ids'
                    variant='dark'
                    onFileChange={field.onChange}
                  />
                ) : (
                  <Input
                    {...field}
                    id={`auth-form-${field}`}
                    required
                    type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    {...field}
                    autoComplete='off'
                    className='form-input '
                  />
                )}

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
        <Button
          type='submit'
          className='form-btn'
        >
          {isSignedIn ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <p className='text-center text-base font-medium'>
        {isSignedIn ? 'New to BookLoop? ' : 'Already have an account? '}
        <Link
          href={isSignedIn ? '/sign-up' : '/sign-in'}
          className='font-bold text-primary hover:underline'
        >
          {isSignedIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
