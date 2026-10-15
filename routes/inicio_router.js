import express from "express";
import { inicio, registro, verCrear, editarPersona, actualizar, eliminarLibro } from "../controllers/inicioController.js"
const router = express.Router();
//Routing
router.get('/', inicio);
router.get("/crear", verCrear)
router.post("/registrar", registro)
router.get("/:id/editar", editarPersona)
router.put("/:id", actualizar)
router.delete("/:id", eliminarLibro)
export default router