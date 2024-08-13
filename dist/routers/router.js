"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atendimentoRoute_1 = __importDefault(require("./atendimentoRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
exports.default = (app) => {
    app.use('/api/atendimentos', atendimentoRoute_1.default);
    app.use('/api/usuarios', userRoute_1.default);
};
