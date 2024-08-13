"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexao_1 = __importDefault(require("../db/conexao"));
class AtendimentoService {
    buscar() {
        const sql = `SELECT * FROM atendimentos`;
        return new Promise((resolve, reject) => {
            conexao_1.default.query(sql, (error, resposta) => {
                if (error) {
                    console.error("Erro ao buscar atendimentos:", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }
    buscarPorId(id) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?';
        return new Promise((resolve, reject) => {
            conexao_1.default.query(sql, [id], (error, results) => {
                if (error) {
                    console.error(`Erro ao buscar o atendimento com ID ${id}:`, error);
                    reject(new Error(`Erro ao buscar o atendimento com ID ${id}: ${error.message}`));
                }
                else if (results.length === 0) {
                    reject(new Error(`Atendimento com ID ${id} não encontrado`));
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    criar(novoAtendimento) {
        if (!novoAtendimento || !novoAtendimento.data || !novoAtendimento.hora ||
            !novoAtendimento.servico || !novoAtendimento.cliente || !novoAtendimento.status) {
            return Promise.reject(new Error('Dados incompletos ou inválidos para criar um novo atendimento'));
        }
        const dataFormatada = new Date(novoAtendimento.data).toISOString().split('T')[0];
        const horaFormatada = novoAtendimento.hora; // Hora já deve estar no formato correto (HH:MM:SS)
        const sql = `INSERT INTO atendimentos (data, hora, servico, cliente, status) VALUES (?, ?, ?, ?, ?)`;
        const valores = [
            dataFormatada,
            horaFormatada,
            novoAtendimento.servico,
            novoAtendimento.cliente,
            novoAtendimento.status
        ];
        return new Promise((resolve, reject) => {
            conexao_1.default.query(sql, valores, (error, resposta) => {
                if (error) {
                    console.error("Erro ao criar atendimento:", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }
    atualizar(id, dadosAtualizados) {
        if (dadosAtualizados.data) {
            dadosAtualizados.data = new Date(dadosAtualizados.data).toISOString().split('T')[0];
        }
        if (dadosAtualizados.hora) {
            // Hora já deve estar no formato HH:MM:SS
            dadosAtualizados.hora = dadosAtualizados.hora;
        }
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;
        console.log("Dados atualizados enviados para o banco:", dadosAtualizados);
        return new Promise((resolve, reject) => {
            conexao_1.default.query(sql, [dadosAtualizados, id], (error, resposta) => {
                if (error) {
                    console.error("Erro ao atualizar atendimento:", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }
    deletar(id) {
        const sql = `DELETE FROM atendimentos WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao_1.default.query(sql, [id], (error, resposta) => {
                if (error) {
                    console.error("Erro ao deletar atendimento:", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }
}
exports.default = new AtendimentoService();
