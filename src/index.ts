import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routers/router';
import conexao from './db/conexao';

const app = express();
const port = process.env.PORT;

// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir CORS apenas para o seu front-end
app.use(cors({
    origin: 'https://vercel-vue-teste.vercel.app/'
}));

// Verifica a conexão com o banco de dados
conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Finaliza o processo se a conexão falhar
    } 
});

// Configura as rotas da aplicação
router(app);  // As rotas de usuários e atendimentos são configuradas aqui

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`🚀 => ${port}`);
});
