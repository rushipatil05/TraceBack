import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// ✅ POST new item
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, title, description, file } = req.body;
    console.log("Received file value:", file);
    const newItem = new Item({ name, email, phone, title, description, file });
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
