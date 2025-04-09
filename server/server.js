import express from "express";
import { connectDB } from "./config/connection.js";
import routes from "./routes/index.js"

import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

await connectDB()

const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan("dev"))
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});



