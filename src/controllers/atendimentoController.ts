import atendimentoService from '../services/AtendimentoService';
import { Atendimento } from '../interface/Atendimento';

class AtendimentoController {
    buscar() {
        return atendimentoService.buscar();
    }

    criar(novoAtendimento: Atendimento) {
        return atendimentoService.criar(novoAtendimento);
    }

    atualizar(id: number, dadosAtualizados: Partial<Atendimento>) {
        return atendimentoService.atualizar(id, dadosAtualizados);
    }

    deletar(id: number) {
        return atendimentoService.deletar(id);
    }
}

export default new AtendimentoController();
