'use server'

import { z } from 'zod'

const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().trim(),
  })
   
  export type FormState =
    | {
        errors?: {
          email?: string[]
          password?: string[]
        }
        message?: string
      }
    | undefined

export async function signup(formData: FormData) {}