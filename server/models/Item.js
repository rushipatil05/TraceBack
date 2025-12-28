import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, select: false },
    email: { type: String, select: false },
    title: String,
    description: String,
    verify: String,
    file: String,
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
