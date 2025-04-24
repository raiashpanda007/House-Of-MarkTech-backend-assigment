import { asyncHandler, Response, loginFunction } from "../../utils";
import { z as zod } from 'zod'

import dotenv from 'dotenv';
dotenv.config();

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

const login = asyncHandler(async (req, res) => {
    const parsedData = loginSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json(new Response(400, "Validation failed", parsedData.error.errors))
    }
    const { email, password } = parsedData.data;
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
    };
    const token = await loginFunction({ email, password })
    return res.cookie('token',token,cookieOptions).status(200).json(new Response(200, "Login successful", { token }))
    
})
export default login;