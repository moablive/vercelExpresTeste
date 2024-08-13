import { Atendimento } from '../interface/Atendimento';
import conexao from '../db/conexao';

class AtendimentoService {
    buscar(): Promise<Atendimento[]> {
        const sql = `SELECT * FROM atendimentos`;
        return new Promise<Atendimento[]>((resolve, reject) => {
            conexao.query(sql, (error, resposta: Atendimento[]) => {
                if (error) {
                    console.log("DEU ERRO NO buscar", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }

    criar(novoAtendimento: Atendimento): Promise<any> {
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

    atualizar(id: number, dadosAtualizados: Partial<Atendimento>): Promise<any> {
        if (dadosAtualizados.data) {
            const data = new Date(dadosAtualizados.data);
            dadosAtualizados.data = data.toISOString().split('T')[0]; // Converte para 'YYYY-MM-DD'
        }
    
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [dadosAtualizados, id], (error, resposta) => {
                if (error) {
                    console.log("DEU ERRO NO atualizar", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }

    deletar(id: number): Promise<any> {
        const sql = `DELETE FROM atendimentos WHERE id = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resposta) => {
                if (error) {
                    console.log("DEU ERRO NO deletar", error);
                    reject(error);
                    return;
                }
                resolve(resposta);
            });
        });
    }
}

export default new AtendimentoService();
