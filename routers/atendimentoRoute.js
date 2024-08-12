const { Router } = require('express');
const router = Router();
const atendimentoControler = require('../controllers/atendimentoController');

router.get('/atendimentos', (req, res) => {
    atendimentoControler.buscar()
        .then(atendimentos => res.status(200).json(atendimentos))
        .catch(error => res.status(400).json({ error: error.message }));
});

router.post('/atendimentos', (req, res) => {
    const novoAtendimento = req.body;

    atendimentoControler.criar(novoAtendimento)
        .then(resposta => res.status(201).json(resposta))
        .catch(error => res.status(400).json({ error: error.message }));
});

router.put('/atendimento/:id', (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    atendimentoControler.atualizar(id, dadosAtualizados)
        .then(resposta => res.status(200).json(resposta))
        .catch(error => res.status(400).json({ error: error.message }));
});

router.delete('/atendimento/:id', (req, res) => {
    const { id } = req.params;

    atendimentoControler.deletar(id)
        .then(resposta => res.status(200).json(resposta))
        .catch(error => res.status(400).json({ error: error.message }));
});

module.exports = router;
