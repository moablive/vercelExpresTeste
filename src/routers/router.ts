import { Express } from 'express';
import atendimentoRoute from './atendimentoRoute';
import userRoute from './userRoute';
import { authenticateToken } from '../authMiddleware/authMiddleware';

export default (app: Express) => {
    // Rotas de usuários (registro e login) sem autenticação
    app.use('/api/usuarios', userRoute);

    // Rotas de atendimentos protegidas por autenticação
    app.use('/api/atendimentos', authenticateToken, atendimentoRoute);
};
