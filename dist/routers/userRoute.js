"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Rota para registro de novos usuários
router.post('/register', userController_1.registerUser);
// Rota para login de usuários
router.post('/login', userController_1.loginUser);
exports.default = router;
