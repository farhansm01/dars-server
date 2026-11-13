import express from "express";
import cors from "cors";
import courseRoutes from "./routes/course.routes";
import lectureRoutes from "./routes/lecture.routes";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dars Server Running!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);

export default app;