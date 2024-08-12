const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/index');
const conexao = require('./db/conexao');
const tabelas = require('./db/tabelas');

// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express.json());

// Inicializa as tabelas no banco de dados
tabelas.init(conexao);

// Configura as rotas da aplicação
router(app);

// Inicia o servidor na porta especificada
app.listen(port, (error) => {
    if (error) {
        console.log("ERRO ao iniciar o servidor:", error);
        return;
    }
    console.log("Server rodando na porta", port);
});
