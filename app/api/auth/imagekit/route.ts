import config from '@/lib/config'
import { getUploadAuthParams } from '@imagekit/next/server'
import { NextResponse } from 'next/server'

const {
  env: {
    imagekit: { publicKey, privateKey },
  },
} = config

export async function GET() {
  try {
    const { token, expire, signature } = getUploadAuthParams({
      publicKey,
      privateKey,
    })

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    })
  } catch (error) {
    console.error('ImageKit authentication error:', error)

    return NextResponse.json({ error: 'Failed to generate ImageKit authentication parameters' }, { status: 500 })
  }
}
