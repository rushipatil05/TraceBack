import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";
import Post from "./models/Item.js"
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

app.use("/api/items", itemRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
