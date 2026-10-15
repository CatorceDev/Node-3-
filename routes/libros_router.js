
import express from "express";

import {
    inicioLibros,
    registroLibros,
    verCrearLibros,
    editarLibro,
    actualizarLibro,
    eliminarLibro
} from "../controllers/inicioController.js";

const router = express.Router();

// Rutas de libros
router.get("/", inicioLibros);
router.get("/crear", verCrearLibros);
router.post("/registrar", registroLibros);
router.get("/:id/editar", editarLibro);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
