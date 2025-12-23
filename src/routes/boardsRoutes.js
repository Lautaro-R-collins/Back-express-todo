import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../controllers/boardsController.js";

const router = express.Router();

// Todas las rutas protegidas
router.use(auth);

// Obtener todos los tableros del usuario
router.get("/", getBoards);

// Crear un tablero
router.post("/", createBoard);

// Eliminar un tablero (y opcionalmente sus notas)
router.delete("/:id", deleteBoard);

// Actualizar un tablero
router.put("/:id", updateBoard);

export default router;
