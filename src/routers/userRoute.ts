import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

// Rota para registro de novos usuários
router.post('/register', registerUser);

// Rota para login de usuários
router.post('/login', loginUser);

export default router;
