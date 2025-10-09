import express from "express";
import Note from "../models/noteModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren auth
router.use(auth);

// Obtener notas del usuario (opcionalmente filtradas por tablero)
router.get("/", async (req, res) => {
  try {
    const { boardId } = req.query;
    const filter = { user: req.user._id };
    if (boardId) filter.board = boardId;

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

// Obtener nota por ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error al obtener la nota:", error);
    res.status(500).json({ message: "Error al obtener la nota" });
  }
});

// Crear nota (asignada a user y tablero opcional)
router.post("/", async (req, res) => {
  try {
    const { title, content, board } = req.body; // <--- usar "board" para que coincida con frontend
    const note = new Note({
      title,
      content,
      user: req.user._id,
      board: board || null
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ message: "Error al crear una nota" });
  }
});

// Editar nota (solo owner, permite mover de tablero)
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    if (req.body.board !== undefined) note.board = req.body.board; // <--- permitimos mover de tablero

    const updated = await note.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
});

// Eliminar nota (solo owner)
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    await note.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
});

export default router;
