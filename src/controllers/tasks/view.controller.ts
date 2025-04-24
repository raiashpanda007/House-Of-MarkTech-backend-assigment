import { asyncHandler,Response } from "../../utils";
import {tasks} from "../../db"

const viewTask = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.status(401).json(new Response(401, "Unauthorized", null))
    }

    const user = req.user;

    const allTasks = tasks.filter(task => task.userId === user.id);

    if (allTasks.length === 0) {
        return res.status(404).json(new Response(404, "No tasks found", null))
    }
    return res.status(200).json(new Response(200, "Tasks retrieved successfully", { tasks: allTasks }))
})

export default viewTask;