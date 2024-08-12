const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require('./routers/index');
const conexao = require('./db/conexao');
const tabelas = require('./db/tabelas');

// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir CORS apenas para o seu front-end
app.use(cors({
    origin: 'https://vercel-vue-teste-ijlo31w4y-teammoab.vercel.app'
}));


// Middleware para garantir que CORS seja aplicado em todas as respostas
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://vercel-vue-teste-ijlo31w4y-teammoab.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

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
