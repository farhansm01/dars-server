import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { lectureCollection } from "../models/lecture.model";
import { courseCollection } from "../models/course.model";

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

export const createLecture = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId as string;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await courseCollection.findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { title, description, videoUrl } = req.body;

    if (!title || !description || !videoUrl) {
      return res.status(400).json({ message: "Title, description and video URL are required" });
    }

    if (!videoUrl.startsWith("http")) {
      return res.status(400).json({ message: "Video URL must be a valid URL" });
    }

    const lecture = {
      course: courseId,
      title,
      description,
      videoUrl,
      createdAt: new Date(),
    };

    const result = await lectureCollection.insertOne(lecture);
    res.status(201).json({ ...lecture, _id: result.insertedId });
  } catch (err) {
    console.error("Error creating lecture:", err);
    res.status(500).json({ message: "Failed to create lecture" });
  }
};

export const updateLecture = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lecture id" });
    }

    const { title, description, videoUrl } = req.body;

    if (!title || !description || !videoUrl) {
      return res.status(400).json({ message: "Title, description and video URL are required" });
    }

    if (!videoUrl.startsWith("http")) {
      return res.status(400).json({ message: "Video URL must be a valid URL" });
    }

    const result = await lectureCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, description, videoUrl } },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating lecture:", err);
    res.status(500).json({ message: "Failed to update lecture" });
  }
};

export const deleteLecture = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lecture id" });
    }

    const result = await lectureCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json({ message: "Lecture deleted" });
  } catch (err) {
    console.error("Error deleting lecture:", err);
    res.status(500).json({ message: "Failed to delete lecture" });
  }
};