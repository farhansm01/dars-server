import "dotenv/config";
import app from "./app";
import "./config/db";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Dars server running on port ${port}`);
});