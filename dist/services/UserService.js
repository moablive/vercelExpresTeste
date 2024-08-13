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
const conexao_1 = __importDefault(require("../db/conexao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    // Criar um novo usuário
    criar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, role } = usuario;
            // Hash da senha
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // SQL para inserir o usuário no banco
            const sql = 'INSERT INTO usuarios (username, password, email, role) VALUES (?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [username, hashedPassword, email, role], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    // Retorna o usuário sem a senha
                    resolve({
                        id: results.insertId,
                        username,
                        email,
                        role,
                        created_at: new Date(),
                    });
                });
            });
        });
    }
    // Buscar um usuário por ID
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM usuarios WHERE id = ?';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [id], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    resolve(results[0]);
                });
            });
        });
    }
    // Buscar um usuário por username
    buscarPorUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM usuarios WHERE username = ?';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [username], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    resolve(results[0]);
                });
            });
        });
    }
    // Buscar um usuário por e-mail
    buscarPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM usuarios WHERE email = ?';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [email], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    resolve(results[0]);
                });
            });
        });
    }
    // Atualizar um usuário
    atualizar(id, dadosAtualizados) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dadosAtualizados.password) {
                dadosAtualizados.password = yield bcrypt_1.default.hash(dadosAtualizados.password, 10);
            }
            const sql = 'UPDATE usuarios SET ? WHERE id = ?';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [dadosAtualizados, id], (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    // Deletar um usuário
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM usuarios WHERE id = ?';
            return new Promise((resolve, reject) => {
                conexao_1.default.query(sql, [id], (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    // Verificar credenciais de login
    verificarCredenciais(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.buscarPorUsername(username);
            if (!usuario)
                return null;
            const isMatch = yield bcrypt_1.default.compare(password, usuario.password);
            if (!isMatch)
                return null;
            return usuario;
        });
    }
}
exports.default = new UserService();
