import { Router } from "express";
import { createCourse, getCourses } from "../controllers/course.controller";

const router = Router();

router.get("/", getCourses);
router.post("/", createCourse);

export default router;