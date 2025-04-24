
import {z as zod} from 'zod'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {signUpUsers} from '../db'
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

    const { email: parsedEmail, password: parsedPassword } = parsedData.data
    const user = signUpUsers.find(user => user.email === parsedEmail)
    if (!user) {
        throw new Error('User not found')
    }
    const isPasswordValid = await bcrypt.compare(parsedPassword, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }
    const token = jwt.sign({ id: user.id,name:user.name,email:user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    })

    return token;
}