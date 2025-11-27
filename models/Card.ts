import mongoose, { Schema, models } from "mongoose";

const CardSchema = new Schema(
  {
    listId: { type: Schema.Types.ObjectId, ref: "List", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default models.Card || mongoose.model("Card", CardSchema);
