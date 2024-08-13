"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const conexao = mysql_1.default.createConnection({
    host: 'moab-server.ddns.me',
    port: 3306,
    user: 'moab',
    password: 'Guilherme@1998',
    database: 'controle_atendimento',
});
exports.default = conexao;
