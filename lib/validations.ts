import { z } from 'zod'

export const signUpSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  universityId: z.coerce.number().positive({ message: 'Invalid university ID' }),
  universityCard: z.string().nonempty({ message: 'University card is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})
