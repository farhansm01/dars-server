import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { lectureCollection } from "../models/lecture.model";

export const getLecturesByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId as string;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const lectures = await lectureCollection
      .find({ course: courseId })
      .sort({ createdAt: 1 })
      .toArray();

    res.status(200).json(lectures);
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "Failed to fetch lectures" });
  }
};

export const getLecture = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lecture id" });
    }

    const lecture = await lectureCollection.findOne({ _id: new ObjectId(id) });

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json(lecture);
  } catch (err) {
    console.error("Error fetching lecture:", err);
    res.status(500).json({ message: "Failed to fetch lecture" });
  }
};