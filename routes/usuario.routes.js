import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller.js';

const router = Router();

router.post('/crearusuario', UsuarioController.crearUsuario);
router.post('/login', UsuarioController.login);

export default router;