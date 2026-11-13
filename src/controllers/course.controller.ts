import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { courseCollection } from "../models/course.model";
import { lectureCollection } from "../models/lecture.model";
import { connectError } from "../config/db";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: err instanceof Error ? err.message : String(err),
      connectError: connectError instanceof Error ? connectError.message : String(connectError),
    });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await courseCollection.findOne({ _id: new ObjectId(id) });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    if (!title || !description || !thumbnail) {
      return res.status(400).json({ message: "Title, description and thumbnail are required" });
    }

    if (!thumbnail.startsWith("http")) {
      return res.status(400).json({ message: "Thumbnail must be a valid URL" });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Price must be a number, 0 or more" });
    }

    const course = {
      title,
      description,
      price,
      thumbnail,
      createdAt: new Date(),
    };

    const result = await courseCollection.insertOne(course);
    res.status(201).json({ ...course, _id: result.insertedId });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const { title, description, price, thumbnail } = req.body;

    if (!title || !description || !thumbnail) {
      return res.status(400).json({ message: "Title, description and thumbnail are required" });
    }

    if (!thumbnail.startsWith("http")) {
      return res.status(400).json({ message: "Thumbnail must be a valid URL" });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Price must be a number, 0 or more" });
    }

    const result = await courseCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, description, price, thumbnail } },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const result = await courseCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    await lectureCollection.deleteMany({ course: id });

    res.status(200).json({ message: "Course and its lectures deleted" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};