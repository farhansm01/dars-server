import { Router } from "express";
import { deleteLecture, getLecture, updateLecture } from "../controllers/lecture.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/:id", getLecture);
router.put("/:id", auth, updateLecture);
router.delete("/:id", auth, deleteLecture);

export default router;
