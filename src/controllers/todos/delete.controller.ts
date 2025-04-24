import { asyncHandler,Response } from "../../utils";
import { z as zod } from 'zod'
import { v4 as uuidv4 } from 'uuid';
import {tasks} from "../../db"

const deleteTaskSchema = zod.object({
    id: zod.string().uuid(),
})
const deleteTask = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.status(401).json(new Response(401, "Unauthorized", null))
    }
    const parsedData = deleteTaskSchema.safeParse(req.params)
    if (!parsedData.success) {
        return res.status(400).json(new Response(400, "Validation failed", parsedData.error.errors))
    }
    const { id } = parsedData.data;
    const user = req.user;

    const taskIndex = tasks.findIndex(task => task.id === id && task.userId === user.id);
    if (taskIndex === -1) {
        return res.status(404).json(new Response(404, "Task not found", null))
    }
    tasks.splice(taskIndex, 1);
    return res.status(200).json(new Response(200, "Task deleted successfully", null))

})

export default deleteTask;