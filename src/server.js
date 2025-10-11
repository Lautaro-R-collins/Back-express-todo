import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import boardsRoutes from "./routes/boardsRoutes.js"; 
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://front-react-todo.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);      // registro & login
app.use("/api/notes", notesRoutes);    // notas protegidas
app.use("/api/boards", boardsRoutes);  // tableros protegidos

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
  });
