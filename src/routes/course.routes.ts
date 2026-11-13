import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller";
import { createLecture, getLecturesByCourse } from "../controllers/lecture.controller";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

router.get("/:courseId/lectures", getLecturesByCourse);
router.post("/:courseId/lectures", createLecture);

export default router;