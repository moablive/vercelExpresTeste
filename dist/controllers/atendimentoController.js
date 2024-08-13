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
const AtendimentoService_1 = __importDefault(require("../services/AtendimentoService"));
class AtendimentoController {
    buscar() {
        return __awaiter(this, void 0, void 0, function* () {
            return AtendimentoService_1.default.buscar();
        });
    }
    criar(novoAtendimento) {
        return __awaiter(this, void 0, void 0, function* () {
            return AtendimentoService_1.default.criar(novoAtendimento);
        });
    }
    atualizar(id, dadosAtualizados) {
        return __awaiter(this, void 0, void 0, function* () {
            return AtendimentoService_1.default.atualizar(id, dadosAtualizados);
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return AtendimentoService_1.default.deletar(id);
        });
    }
}
exports.default = new AtendimentoController();
