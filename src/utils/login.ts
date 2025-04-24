
import {z as zod} from 'zod'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'


dotenv.config()
const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

interface Login {
    email: string
    password: string
}
export const loginFunction = async({ email,password } : Login) =>{
    
    const parsedData = loginSchema.safeParse({ email, password })
    if (!parsedData.success) {
        const errors = parsedData.error.errors.map(error => error.message)
        throw new Error(`Validation failed: ${errors.join(', ')}`)
    }
    
   
    
}