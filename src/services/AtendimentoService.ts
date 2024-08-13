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

    buscarPorId(id: number): Promise<Atendimento> {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM atendimentos WHERE id = ?';
            conexao.query(sql, [id], (error, results) => {
                if (error) {
                    console.log(`Erro ao buscar o atendimento com ID ${id}:`, error);
                    reject(new Error(`Erro ao buscar o atendimento com ID ${id}: ${error.message}`));
                } else if (results.length === 0) {
                    reject(new Error(`Atendimento com ID ${id} não encontrado`));
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    criar(novoAtendimento: Atendimento): Promise<any> {
        if (!novoAtendimento || typeof novoAtendimento.data !== 'string' || 
            typeof novoAtendimento.hora !== 'string' ||
            typeof novoAtendimento.servico !== 'string' || 
            typeof novoAtendimento.cliente !== 'string' || 
            typeof novoAtendimento.status !== 'string') {
            return Promise.reject(new Error('Dados incompletos ou inválidos para criar um novo atendimento'));
        }

        //formato YYYY-MM-DD e hora para HH:MM:SS
        const dataFormatada = new Date(novoAtendimento.data).toISOString().split('T')[0];
        //formato HH:MM:SS
        const horaFormatada = novoAtendimento.hora; 
    
        const sql = `INSERT INTO atendimentos (data, hora, servico, cliente, status) VALUES (?, ?, ?, ?, ?)`;
        const valores = [
            dataFormatada,
            horaFormatada,
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

            //formato YYYY-MM-DD e hora para HH:MM:SS
            const dataFormatada = new Date(dadosAtualizados.data).toISOString().split('T')[0];
            dadosAtualizados.data = dataFormatada;
        }
        if (dadosAtualizados.hora) {
            // Supondo que a hora já esteja no formato HH:MM:SS
            const horaFormatada = dadosAtualizados.hora;
            dadosAtualizados.hora = horaFormatada;
        }
    
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`;
        console.log("Dados atualizados enviados para o banco:", dadosAtualizados);
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
