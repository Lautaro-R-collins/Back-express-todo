import express from 'express';
import Note from '../models/noteModel.js';

const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener las notas:", error);
        res.status(500).json({ message: "Error al obtener las notas" });
    }
})

// Obtener una nota por ID
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error al obtener la nota:", error);
        res.status(500).json({ message: "Error al obtener la nota" });
    }
});

// Crear una nueva nota 
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error al crear una nota:", error);
        res.status(500).json({ message: "Error al crear una nota" });
    }
});

// Eliminar una nota 
router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        res.status(500).json({ message: "Error al eliminar la nota" });
    }
});

// Editar una nota
router.put("/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        res.status(500).json({ message: "Error al actualizar la nota" });
    }
});

export default router;


