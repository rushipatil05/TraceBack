  import express from "express";
  import Item from "../models/Item.js";

  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      console.log("REQ BODY:", req.body); // 🔍 debug
      const { name, email, phone, title, description, file } = req.body;

      if (!file) {
        console.log("❌ File URL missing in request body");
      }

      const newItem = new Item({
        name,
        email,
        phone,
        title,
        description,
        file, // should now contain the Cloudinary URL
      });

      await newItem.save();
      res.status(201).json({ success: true, item: newItem });
    } catch (err) {
      console.error("Error saving item:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  });

  export default router;
