import { Router, Request, Response } from 'express';
import atendimentoService from '../services/AtendimentoService';

const router = Router();

router.get('/atendimentos', async (req: Request, res: Response) => {
    try {
        const atendimentos = await atendimentoService.buscar();
        res.status(200).json(atendimentos);
    } catch (error: any) {  // Tipagem explícita para o erro
        res.status(400).json({ error: error.message });
    }
});

router.get('/atendimento/:id', async (req: Request, res: Response) => {
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

router.post('/atendimento', async (req: Request, res: Response) => {
    try {
        const novoAtendimento = req.body;
        const resposta = await atendimentoService.criar(novoAtendimento);
        res.status(201).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/atendimento/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const resposta = await atendimentoService.atualizar(Number(id), dadosAtualizados);
        res.status(200).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/atendimento/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resposta = await atendimentoService.deletar(Number(id));
        res.status(200).json(resposta);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
