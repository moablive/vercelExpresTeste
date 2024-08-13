"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("./authMiddleware/authMiddleware");
const router_1 = __importDefault(require("./routers/router"));
const conexao_1 = __importDefault(require("./db/conexao"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express_1.default.json());
// Middleware para permitir CORS apenas para o seu front-end
app.use((0, cors_1.default)({
    origin: 'https://vercel-vue-teste-iboiwtoee-teammoab.vercel.app/'
}));
// Verifica a conexão com o banco de dados
conexao_1.default.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Finaliza o processo se a conexão falhar
    }
});
// Middleware de autenticação aplicado a todas as rotas a partir deste ponto
app.use(authMiddleware_1.authenticateToken);
// Configura as rotas da aplicação
(0, router_1.default)(app);
// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`🚀 => ${port}`);
});
