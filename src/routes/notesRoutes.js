import express from "express";
import Note from "../models/noteModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren auth
router.use(auth);

/* -------------------- SUBNOTAS (CHECKLIST) -------------------- */

// Agregar subnota
router.post("/:id/checklist", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    const { text } = req.body;
    note.checklist.push({ text, done: false });

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    console.error("Error al agregar subnota:", err);
    res.status(500).json({ message: "Error al agregar subnota" });
  }
});

// Toggle done de subnota
router.put("/:id/checklist/:taskId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    const task = note.checklist.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Subnota no encontrada" });

    task.done = req.body.done;
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    console.error("Error al actualizar subnota:", err);
    res.status(500).json({ message: "Error al actualizar subnota" });
  }
});

// Eliminar subnota
router.delete("/:id/checklist/:taskId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.checklist = note.checklist.filter(
      (task) => task._id.toString() !== req.params.taskId
    );
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    console.error("Error al eliminar subnota:", err);
    res.status(500).json({ message: "Error al eliminar subnota" });
  }
});

/* -------------------- NOTAS -------------------- */

// Obtener notas del usuario 
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

// Crear nota
router.post("/", async (req, res) => {
  try {
    const { title, content, board, checklist, priority } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user._id,
      board: board || null,
      checklist: checklist || [],
      priority: priority || "ninguna",
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ message: "Error al crear una nota" });
  }
});

// Editar nota
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    // Actualizamos todos los campos editables
    if (req.body.title !== undefined) note.title = req.body.title;
    if (req.body.content !== undefined) note.content = req.body.content;
    if (req.body.board !== undefined) note.board = req.body.board;
    if (req.body.priority !== undefined) note.priority = req.body.priority;
    if (req.body.pinned !== undefined) note.pinned = req.body.pinned;
    if (req.body.checklist !== undefined) note.checklist = req.body.checklist;

    const updated = await note.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
});

// Eliminar nota
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

// Fijar o desfijar una nota
router.put("/:id/pin", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Nota no encontrada" });

    note.pinned = !note.pinned;
    await note.save();

    res.json(note); 
  } catch (err) {
    console.error("Error al alternar pin:", err);
    res.status(500).json({ message: "Error al alternar pin" });
  }
});


export default router;
