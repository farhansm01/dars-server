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
router.get("/:id", getCourse);
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

router.get("/:courseId/lectures", getLecturesByCourse);
router.post("/:courseId/lectures", auth, createLecture);

export default router;
