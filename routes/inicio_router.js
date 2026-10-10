import express from 'express'
import {inicio, registro, verCrear, editar, actualizar, eliminar} from '../controllers/inicioController.js'

const router = express.Router();

router.get('/', inicio)
router.get('/crear', verCrear)
router.post('/Registrar', registro)
router.get('/:id/editar', editar)
router.put('/:id', actualizar)
router.delete('/:id', eliminar)

export default router