const atendimentoModel = require('../models/atendimentoModel');

class AtendimentoController {
    buscar() {
        return atendimentoModel.buscar();
    }

    criar(novoAtendimento) {
        return atendimentoModel.criar(novoAtendimento);
    }

    atualizar(id, dadosAtualizados) {
        return atendimentoModel.atualizar(id, dadosAtualizados);
    }

    deletar(id) {
        return atendimentoModel.deletar(id);
    }
}

module.exports = new AtendimentoController();
