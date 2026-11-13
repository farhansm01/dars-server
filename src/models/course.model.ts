import { ObjectId } from "mongodb";
import { database } from "../config/db";

export type Course = {
  _id?: ObjectId;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  createdAt: Date;
};

export const courseCollection = database.collection<Course>("courses");