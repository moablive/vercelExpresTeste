class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelasAtendimentos();
    }

    criarTabelasAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS atendimentos (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                data DATE,
                servico VARCHAR(255),
                cliente VARCHAR(255),
                status ENUM('ATIVO', 'REALIZADO', 'CANCELADO') DEFAULT 'ATIVO'
            );
        `;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log('Erro ao criar a tabela atendimentos:', erro);
                return;
            }
            console.log('Tabela atendimentos criada com sucesso!');
        });
    }
}

module.exports = new Tabelas();
