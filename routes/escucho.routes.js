import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import EscuchoController from '../controllers/escucho.controller.js';

const router = Router();

router.get('/', verifyToken, EscuchoController.getEscuchas);
router.post('/', verifyToken, EscuchoController.registrarEscucha);

export default router;