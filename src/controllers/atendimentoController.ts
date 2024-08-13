import atendimentoService from '../services/AtendimentoService';
import { Atendimento } from '../interface/Atendimento';

class AtendimentoController {
    async buscar(): Promise<Atendimento[]> {
        return atendimentoService.buscar();
    }

    async criar(novoAtendimento: Atendimento): Promise<Atendimento> {
        return atendimentoService.criar(novoAtendimento);
    }

    async atualizar(id: number, dadosAtualizados: Partial<Atendimento>): Promise<Atendimento> {
        return atendimentoService.atualizar(id, dadosAtualizados);
    }

    async deletar(id: number): Promise<void> {
        return atendimentoService.deletar(id);
    }
}

export default new AtendimentoController();
