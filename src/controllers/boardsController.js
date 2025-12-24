import Board from "../models/boardModel.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tableros" });
  }
};

export const createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "El nombre es requerido" });

    const board = await Board.create({ name, user: req.user._id });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tablero" });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!board)
      return res.status(404).json({ message: "Tablero no encontrado" });

    await board.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tablero" });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "El nombre es requerido" });

    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name },
      { new: true } // devuelve el tablero actualizado
    );

    if (!board)
      return res.status(404).json({ message: "Tablero no encontrado" });

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tablero" });
  }
};
