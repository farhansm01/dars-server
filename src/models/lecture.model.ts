import { database } from "../config/db";

export type Lecture = {
  course: string;
  title: string;
  description: string;
  videoUrl: string;
  createdAt: Date;
};

export const lectureCollection = database.collection<Lecture>("lectures");