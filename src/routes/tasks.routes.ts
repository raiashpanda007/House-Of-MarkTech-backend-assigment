import { Router } from "express";
import verifyMiddleware from "../middlewares/verify.middleware";
import { Tasks } from "../controllers/tasks";

const router = Router();
router.post("/create", verifyMiddleware, Tasks.createTask);
router.delete("/delete/:id", verifyMiddleware, Tasks.deleteTask);
router.get("/", verifyMiddleware, Tasks.viewTask);

export default router;