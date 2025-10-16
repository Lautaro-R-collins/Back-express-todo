import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    checklist: [
      {
        text: { type: String, required: true },
        done: { type: Boolean, default: false },
      },
    ],
    pinned: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
