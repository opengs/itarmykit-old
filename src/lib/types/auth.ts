import { z } from 'zod'
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
})

export const registerSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4).max(30),
        confirmPassword: z.string().min(4).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
    })
