"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
const AtendimentoService_1 = __importDefault(require("../services/AtendimentoService"));
const router = (0, express_1.Router)();
// Protegendo a rota com middleware de autenticação
router.get('/atendimentos', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const atendimentos = yield AtendimentoService_1.default.buscar();
        res.status(200).json(atendimentos);
    }
    catch (error) { // Tipagem explícita para o erro
        res.status(400).json({ error: error.message });
    }
}));
router.get('/atendimento/:id', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const atendimento = yield AtendimentoService_1.default.buscarPorId(Number(id));
        res.status(200).json(atendimento);
    }
    catch (error) {
        if (error.message.includes('não encontrado')) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: error.message });
        }
    }
}));
router.post('/atendimento', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoAtendimento = req.body;
        const resposta = yield AtendimentoService_1.default.criar(novoAtendimento);
        res.status(201).json(resposta);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.put('/atendimento/:id', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const resposta = yield AtendimentoService_1.default.atualizar(Number(id), dadosAtualizados);
        res.status(200).json(resposta);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.delete('/atendimento/:id', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resposta = yield AtendimentoService_1.default.deletar(Number(id));
        res.status(200).json(resposta);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
