import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
} from "../controllers/notesController.js";

const router = express.Router();

// Todas las rutas requieren auth
router.use(auth);

// Agregar subnota
router.post("/:id/checklist", addChecklistItem);

// Toggle done de subnota
router.put("/:id/checklist/:taskId", toggleChecklistItem);

// Eliminar subnota
router.delete("/:id/checklist/:taskId", deleteChecklistItem);

// Obtener notas del usuario
router.get("/", getNotes);

// Obtener nota por ID
router.get("/:id", getNoteById);

// Crear nota
router.post("/", createNote);

// Editar nota
router.put("/:id", updateNote);

// Eliminar nota
router.delete("/:id", deleteNote);

// Fijar o desfijar una nota
router.put("/:id/pin", togglePin);

export default router;
