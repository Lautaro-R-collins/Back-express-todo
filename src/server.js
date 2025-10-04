import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"

dotenv.config();
const app = express(); 

app.use(cors( {
  origin: "http://localhost:5173/"
}))

// middlewares
app.use(express.json()); 

// rutas
app.use("/api/notes", notesRoutes);

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
