import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config(); 

const app = express();

<<<<<<< HEAD
=======

>>>>>>> fbfea3cef4b165d0857265ed01785e7fb6a6d97d
app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);

<<<<<<< HEAD
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
=======
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> fbfea3cef4b165d0857265ed01785e7fb6a6d97d
