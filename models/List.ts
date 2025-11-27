import mongoose, { Schema, models } from "mongoose";

const ListSchema = new Schema(
  {
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.List || mongoose.model("List", ListSchema);
