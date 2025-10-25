import express from "express";
import Claim from "../models/Claim.js";
import Item from "../models/Item.js";

const router = express.Router();

// Submit a claim
router.post("/", async (req, res) => {
  try {
    const { itemId, claimantName, claimantEmail, answer } = req.body;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const newClaim = await Claim.create({
      itemId,
      claimantName,
      claimantEmail,
      answer,
    });

    res.status(201).json({ success: true, claim: newClaim });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch claims for finder (to show notifications)
router.get("/notifications/:email", async (req, res) => {
  try {
    const finderEmail = req.params.email;

    // find all items posted by finder
    const finderItems = await Item.find({ email: finderEmail });
    const itemIds = finderItems.map((i) => i._id);

    // find all claims related to those items
    const claims = await Claim.find({ itemId: { $in: itemIds }, status: "pending" })
      .populate("itemId", "title");

    res.json(claims);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
