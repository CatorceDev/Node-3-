
import express from "express";

import {
    inicioVentas,
    registroVentas,
    verCrearVentas,
    editarVenta,
    actualizarVenta,
    eliminarVenta
} from "../controllers/inicioController.js";

const router = express.Router();

// Rutas de libros
router.get("/", inicioVentas);
router.get("/crear", verCrearVentas);
router.post("/registrar", registroVentas);
router.get("/:id/editar", editarVenta);
router.put("/:id", actualizarVenta);
router.delete("/:id", eliminarVenta);

export default router;
