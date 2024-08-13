import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import { Usuario } from '../interface/usuario';

// Registro de novos usuários
export const registerUser = async (req: Request, res: Response) => {
    try {
        const novoUsuario: Usuario = req.body;

        // Verifique se o username ou e-mail já está em uso
        const usuarioExistente = await UserService.buscarPorUsername(novoUsuario.username);
        const emailExistente = novoUsuario.email ? await UserService.buscarPorEmail(novoUsuario.email) : null;

        if (usuarioExistente) {
            return res.status(409).json({ message: 'Nome de usuário já está em uso' });
        }
        if (emailExistente) {
            return res.status(409).json({ message: 'E-mail já está em uso' });
        }

        // Criar o usuário
        const usuarioCriado = await UserService.criar(novoUsuario);
        res.status(201).json({
            id: usuarioCriado.id,
            username: usuarioCriado.username,
            email: usuarioCriado.email,
            role: usuarioCriado.role,
            created_at: usuarioCriado.created_at,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
};

// Login de usuário e geração de token JWT
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Verifique as credenciais do usuário
        const usuario = await UserService.verificarCredenciais(username, password);
        if (!usuario) {
            return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username, role: usuario.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        // Tratando 'error' como um objeto de erro
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro durante o login:', errorMessage);

        res.status(500).json({ message: 'Erro no login', error: errorMessage });
    }
};
