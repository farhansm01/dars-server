import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;