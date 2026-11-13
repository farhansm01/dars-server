import { Request, Response } from "express";
import { courseCollection } from "../models/course.model";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
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