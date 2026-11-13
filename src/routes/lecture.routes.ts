import { Router } from "express";
import { deleteLecture, getLecture, updateLecture } from "../controllers/lecture.controller";

const router = Router();

router.get("/:id", getLecture);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);

export default router;