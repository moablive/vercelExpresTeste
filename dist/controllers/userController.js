"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = __importDefault(require("../services/UserService"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoUsuario = req.body;
        // Verifique se o username ou e-mail já está em uso
        const usuarioExistente = yield UserService_1.default.buscarPorUsername(novoUsuario.username);
        const emailExistente = novoUsuario.email ? yield UserService_1.default.buscarPorEmail(novoUsuario.email) : null;
        if (usuarioExistente) {
            return res.status(409).json({ message: 'Nome de usuário já está em uso' });
        }
        if (emailExistente) {
            return res.status(409).json({ message: 'E-mail já está em uso' });
        }
        // Criar o usuário
        const usuarioCriado = yield UserService_1.default.criar(novoUsuario);
        res.status(201).json({
            id: usuarioCriado.id,
            username: usuarioCriado.username,
            email: usuarioCriado.email,
            role: usuarioCriado.role,
            created_at: usuarioCriado.created_at,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Verifique as credenciais do usuário
        const usuario = yield UserService_1.default.verificarCredenciais(username, password);
        if (!usuario) {
            return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
        }
        // Gerar o token JWT
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, username: usuario.username, role: usuario.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no login', error });
    }
});
exports.loginUser = loginUser;
