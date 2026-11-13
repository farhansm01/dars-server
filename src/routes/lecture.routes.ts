import { Router } from "express";
import { getLecture } from "../controllers/lecture.controller";

const router = Router();

router.get("/:id", getLecture);

export default router;