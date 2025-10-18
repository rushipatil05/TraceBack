import mongoose from "mongoose";

<<<<<<< HEAD
const itemSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    title: String,
    description: String,
    file: String,
  },
  { timestamps: true }
);
=======
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String }, 
}, { timestamps: true });
>>>>>>> fbfea3cef4b165d0857265ed01785e7fb6a6d97d

export default mongoose.model("Item", itemSchema);
