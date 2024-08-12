const conexao = require("../db/conexao");

class AtendimentoModel {
    buscar() {
        const sql = `SELECT * FROM atendimentos`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, resposta) => {
                if (error) {
                    console.log("DEU ERRO NO buscar", error);
                    reject(error);
                    return;
                }
                console.log("SHOww");
                resolve(resposta);
            });
        });
    }

    criar(novoAtendimento) {
        if (!novoAtendimento || typeof novoAtendimento.data !== 'string' || 
            typeof novoAtendimento.servico !== 'string' || 
            typeof novoAtendimento.cliente !== 'string' || 
            typeof novoAtendimento.status !== 'string') {
            return Promise.reject(new Error('Dados incompletos ou inválidos para criar um novo atendimento'));
        }
    
        const sql = `INSERT INTO atendimentos (data, servico, cliente, status) VALUES (?, ?, ?, ?)`;
        const valores = [
            novoAtendimento.data,
            novoAtendimento.servico,
            novoAtendimento.cliente,
            novoAtendimento.status
        ];
    
        return new Promise((resolve, reject) => {
            conexao.query(sql, valores, (error, resposta) => {
                if (error) {
                    console.log("DEU ERRO NO criar", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }

    atualizar(id, dadosAtualizados) {
        // Verifica se a data precisa ser convertida
        if (dadosAtualizados.DATA) {
            const data = new Date(dadosAtualizados.DATA);
            dadosAtualizados.DATA = data.toISOString().split('T')[0]; // Converte para 'YYYY-MM-DD'
        }
    
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [dadosAtualizados, id], (error, resposta) => {
                if (error) {
                    console.log("DEU ERRO NO atualizar", error);
                    reject(error);
                    return;
                }
                console.log(`Atendimento número ${id} atualizado com sucesso!`);
                resolve(resposta);
            });
        });
    }

    deletar(id) {
        const sql = `DELETE FROM atendimentos WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resposta) => { // id passado como array
                if (error) {
                    console.log("DEU ERRO NO deletar", error);
                    reject(error);
                    return;
                }
                console.log(`Atendimento número ${id} deletado com sucesso!`);
                resolve(resposta);
            });
        });
    }
}

module.exports = new AtendimentoModel();
