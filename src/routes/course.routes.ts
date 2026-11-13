import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller";
import { createLecture, getLecturesByCourse } from "../controllers/lecture.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", getCourses);
router.get("/:courseId/lectures", getLecturesByCourse);
router.post("/:courseId/lectures", auth, createLecture);
router.get("/:id", getCourse);
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

export default router;
