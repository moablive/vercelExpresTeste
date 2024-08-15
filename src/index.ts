import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routers/router';
import conexao from './db/conexao';

const app = express();
const port = process.env.PORT;

// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir CORS para múltiplas origens (URLs)
const allowedOrigins = [
    'https://vercel-vue-teste.vercel.app',
    'https://vercel-vue-teste-git-main-teammoab.vercel.app',
    'https://vercel-vue-teste-hf4974775-teammoab.vercel.app',
    // Adicione outras URLs aqui, se necessário
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
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
