import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String }, // store file path
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
