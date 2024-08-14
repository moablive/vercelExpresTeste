import { Express } from 'express';
import atendimentoRoute from './atendimentoRoute';
import userRoute from './userRoute';
import { authenticateToken } from '../authMiddleware/authMiddleware';

export default (app: Express) => {

    // Rota raiz para verificar se a API está funcionando corretamente
    app.get('/', (req, res) => {
        console.log('Rota raiz acessada'); // Adiciona um console.log para depuração
        res.send('API funcionando corretamente');
    });

    // Rotas de usuários (registro e login) sem autenticação
    app.use('/api/usuarios', userRoute);

    // Rotas de atendimentos protegidas por autenticação
    app.use('/api/atendimentos', authenticateToken, atendimentoRoute);
};
