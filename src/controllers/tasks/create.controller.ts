import { asyncHandler,Response } from "../../utils";
import { z as zod } from 'zod'
import { v4 as uuidv4 } from 'uuid';
import {tasks} from "../../db"

const createTaskSchema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(3),
})
const createTask = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.status(401).json(new Response(401, "Unauthorized", null))
    }
    const parsedData = createTaskSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json(new Response(400, "Validation failed", parsedData.error.errors))
    }
    const { title, description } = parsedData.data;
    const newTask = {
        id: uuidv4(),
        title,
        description,
        userId: req.user.id,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    tasks.push(newTask);
    return res.status(201).json(new Response(201, "Task created successfully", { task: newTask }))
})

export default createTask;
