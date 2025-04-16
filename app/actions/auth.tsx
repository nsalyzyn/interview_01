'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().trim(),
  })
   
type FormState =
    | {
        data? : {
            email?: string,
        },
        message?: string,
    }
    | undefined

export async function login(state: FormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
    
    if (!validatedFields.success) {
        return {
          message: 'Your email address is invalid',
        }
    }
    
    let loginSuccess: boolean = await setCookies(validatedFields.data.email, validatedFields.data.password);
    if (!loginSuccess) {
        return {
            data : {
                email: validatedFields.data.email,
            },
            message: 'Please check your login credentials and try again.',
        }    
    }
    redirect('/profile')
}

async function setCookies(email: string, password: string) : Promise<boolean> {
    return false;
}