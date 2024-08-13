import { Router, Request, Response } from 'express';
import { authenticateToken } from '../authMiddleware/authMiddleware';
import atendimentoService from '../services/AtendimentoService';
import { Atendimento } from '../interface/Atendimento';  // Certifique-se de ter uma interface para Atendimento

const router = Router();

// Protegendo a rota com middleware de autenticação
router.get('/atendimentos', authenticateToken, async (req: Request, res: Response) => {
    try {
        const atendimentos = await atendimentoService.buscar();
        res.status(200).json(atendimentos);
    } catch (error: any) {  // Tipagem explícita para o erro
        res.status(400).json({ error: error.message });
    }
});

router.get('/atendimento/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const atendimento = await atendimentoService.buscarPorId(Number(id));
        res.status(200).json(atendimento);
    } catch (error: any) {
        if (error.message.includes('não encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

router.post('/atendimento', authenticateToken, async (req: Request<{}, {}, Atendimento>, res: Response) => {
    try {
        const novoAtendimento = req.body;
        const resposta = await atendimentoService.criar(novoAtendimento);
        res.status(201).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/atendimento/:id', authenticateToken, async (req: Request<{ id: string }, {}, Atendimento>, res: Response) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const resposta = await atendimentoService.atualizar(Number(id), dadosAtualizados);
        res.status(200).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/atendimento/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resposta = await atendimentoService.deletar(Number(id));
        res.status(200).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
