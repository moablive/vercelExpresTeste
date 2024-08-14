import { Router } from 'express';
import { registerUser, loginUser , getUserById, updateUser, deleteUser,getAllUsers} from '../controllers/userController';
import { authenticateToken } from '../authMiddleware/authMiddleware';

const router = Router();

// Rota para registro de novos usuários
router.post('/register', registerUser);

// Rota para login de usuários
router.post('/login', loginUser);

// Rota para obter todos os usuários (autenticada)
router.get('/', authenticateToken, getAllUsers);

// Rota para obter um usuário por ID
router.get('/:id', authenticateToken, getUserById);

// Rota para atualizar um usuário por ID (autenticada)
router.put('/:id', authenticateToken, updateUser);

// Rota para deletar um usuário por ID (autenticada)
router.delete('/:id', authenticateToken, deleteUser);

export default router;
