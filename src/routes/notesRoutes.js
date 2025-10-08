import express from "express";
import Note from "../models/noteModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren auth
router.use(auth);

// Obtener todas las notas del usuario autenticado
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

// Obtener una nota por ID 
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || (note.user && note.user.toString() !== req.user._id.toString())) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error al obtener la nota:", error);
    res.status(500).json({ message: "Error al obtener la nota" });
  }
});

// Crear una nueva nota (asignada al user)
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user._id });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error al crear una nota:", error);
    res.status(500).json({ message: "Error al crear una nota" });
  }
});

// Eliminar (solo owner)
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || (note.user && note.user.toString() !== req.user._id.toString())) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
});

// Editar (solo owner)
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || (note.user && note.user.toString() !== req.user._id.toString())) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    const updated = await note.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
});

export default router;
