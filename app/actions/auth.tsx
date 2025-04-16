'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createSession } from '@/app/lib/session'

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
          message: 'Your email address is improperly formatted',
        }
    }

    let response = await setCookies(validatedFields.data.email, validatedFields.data.password);
    if (!response.success) {
        return {
            data : {
                email: validatedFields.data.email,
            },
            message: response.message,
        }    
    }
    redirect('/profile')
}

async function setCookies(email: string, password: string) {
    const response = await fetch("https://api-dev.quicklyinc.com/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
        await createSession(jsonResponse.token)
    }
    return jsonResponse;
}