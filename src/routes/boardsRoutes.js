import express from "express";
import Board from "../models/boardModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas protegidas
router.use(auth);

// Obtener todos los tableros del usuario
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tableros" });
  }
});

// Crear un tablero
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "El nombre es requerido" });

    const board = await Board.create({ name, user: req.user._id });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tablero" });
  }
});

// Eliminar un tablero (y opcionalmente sus notas)
router.delete("/:id", async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user._id });
    if (!board) return res.status(404).json({ message: "Tablero no encontrado" });

    await board.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tablero" });
  }
});

// Actualizar un tablero
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "El nombre es requerido" });

    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name },
      { new: true } // devuelve el tablero actualizado
    );

    if (!board) return res.status(404).json({ message: "Tablero no encontrado" });

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tablero" });
  }
});


export default router;
