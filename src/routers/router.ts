import { Express } from 'express';
import atendimentoRoute from './atendimentoRoute';

export default (app: Express) => {
    app.use('/api', atendimentoRoute);
};
