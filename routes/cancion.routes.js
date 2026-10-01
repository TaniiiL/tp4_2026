import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import CancionController from '../controllers/cancion.controller.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, CancionController.crearCancion);
router.put('/', verifyToken, verifyAdmin, CancionController.modificarCancion);
router.delete('/', verifyToken, verifyAdmin, CancionController.borrarCancion);

export default router;