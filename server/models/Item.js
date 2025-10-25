import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    title: String,
    description: String,
    verify:String,
    file: String,
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
