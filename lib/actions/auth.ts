'use server'

import { signIn } from '@/auth'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'

export const signUp = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return redirect('/too-many-requests')
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.insert(users).values({
      fullName: fullName!,
      email: email,
      password: hashedPassword,
      universityId: universityId!,
      universityCard: universityCard!,
    })

    await signIn('credentials', { email, password }) // Automatically sign in the user after successful registration

    return { success: true }
  } catch (error) {
    console.log('Error creating user:', error)
    return { success: false, error: 'Error creating user' }
  }
}

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
  const { email, password } = params
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return redirect('/too-many-requests')
  }
  try {
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result.error) {
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (error) {
    console.log('Error signing in:', error)
    return { success: false, error: 'Error signing in' }
  }
}
