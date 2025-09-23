import express from "express";
import multer from "multer";
import Item from "../models/Item.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// POST route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, email, phone, title, description } = req.body;

    const newItem = new Item({
      name,
      email,
      phone,
      title,
      description,
      file: req.file ? req.file.path : null
    });

    await newItem.save();
    res.json({ success: true, message: "Item posted successfully", newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
