import { Router } from "express";
import { Auth } from "../controllers/auth";

const router = Router();

router.post("/login", Auth.login);
router.post("/signup", Auth.signup);
router.post("/logout", Auth.logout);

export default router;
