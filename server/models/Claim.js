import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    claimantName: String,
    claimantEmail: String,
    answer: String,
    status: { type: String, default: "pending" }, // pending | approved | rejected
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);
