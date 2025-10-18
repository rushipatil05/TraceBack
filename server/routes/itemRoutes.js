import express from "express";
import Item from "../models/Item.js";

  const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, title, description, file } = req.body;

    // Save directly to MongoDB
    const newItem = new Item({
      name,
      email,
      phone,
      title,
      description,
      file, // file URL sent from frontend
    });

    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
