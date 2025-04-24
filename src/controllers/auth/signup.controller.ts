import { asyncHandler,Response,loginFunction } from "../../utils";
import bcrypt from "bcrypt";
import { signUpUsers } from "../../db";
import {z as zod} from "zod";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";

dotenv.config();

const signUpSchema = zod.object({
    name: zod.string().min(3),
    email: zod.string().email(),
    phone: zod.string().min(10).max(10),
    password: zod.string().min(8),
})

const signup = asyncHandler(async (req, res) => {
    const parsedData = signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json(new Response(400, "Validation failed", parsedData.error.errors));
    }
    const { name, email, password,phone } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = signUpUsers.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json(new Response(400, "User already exists", null));
    }
    const newUser = {
        id: uuidv4(),
        name,
        email,
        phone,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    signUpUsers.push(newUser);
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
    };
    const token = await loginFunction({ email, password });
    return res.cookie('token', token, cookieOptions).status(201).json(new Response(201, "User created successfully", { user: newUser, token }));


})
export default signup;