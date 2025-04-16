'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createSession, getSessionToken } from '@/app/lib/session'

const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8, { message: 'Be at least 8 characters long' }).trim(),
  })
   
type FormState =
    | {
        errors? : {
            email? : string[],
            password? : string[],
        }
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
        if (!validatedFields.success) {
            return {
              errors: validatedFields.error.flatten().fieldErrors,
            }
        }
    }

    const response = await setCookies(validatedFields.data.email, validatedFields.data.password);
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

export async function getUser() {
    const token = await getSessionToken()
    const response = await fetch("https://api-dev.quicklyinc.com/auth/user", {
        headers: new Headers({
            'Authorization': token, 
        }), 
    });
    
    return await response.json();
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