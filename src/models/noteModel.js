import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" }, // <--- ESTE CAMPO
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
