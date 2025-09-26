import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import routerAPI from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.URI_DB || process.env.MONGO_URI;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

// Ruta (opcional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Montar rutas
routerAPI(app);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// error handler
app.use(errorHandler);

// Funcion start
const start = async () => {
  try {
    if (URI_DB) {
      mongoose.set("strictQuery", false);
      await mongoose.connect(URI_DB, { serverSelectionTimeoutMS: 10000 });
      console.log(" Conexión correcta con la DB (MongoDB)");
    } else {
      console.warn(" No hay URI_DB en .env — arrancando en modo prueba SIN DB");
    }
  } catch (err) {
    console.error(
      "Error conectando a MongoDB (se sigue adelante sin DB):",
      err.message || err
    );
  }

  const server = app.listen(PORT, () => {
    console.log(`API en el puerto ${PORT}`);
  });

  // handling
  const shutdown = async () => {
    console.log("Cerrando servidor...");
    server.close(async () => {
      try {
        if (mongoose.connection && mongoose.connection.readyState === 1) {
          await mongoose.disconnect();
          console.log("Desconectado de MongoDB");
        }
        process.exit(0);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

start();
