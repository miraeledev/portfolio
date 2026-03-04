import { UsuarioModel } from "../models/usuario.model.js";
import dotenv from "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UsuarioController {
    static async listar(req, res) {
        try {
            const usuario = await UsuarioModel.findAll(
                {
                    attributes: {
                        exclude: ["senha"]
                    }
                }
            )
            if (!usuario) {
                return res.status(406).json({ msg: "Nenhum usuario encontrado" })
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }
    static async perfil(req, res) {
        try {
            return res.json({
                mensagem: "Acesso autorizado!",
                usuario: req.usuario
            });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async criar(req, res) {
        try {
            const { nome, email, senha, perfil } = req.body;

            if (!nome || !matricula || !email || !senha || !perfil || !telefone) {
                return res.status(400).json({ msg: 'Preencha todos os campos!' });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            await UsuarioModel.create({
                nome,
                email,
                senha: senhaHash,
                perfil,

            });

            res.status(201).json({ msg: 'Usuário criado com sucesso!' });

        } catch (error) {
            res.status(500).json({
                msg: "Erro interno, tente novamente mais tarde.",
                erro: error.message
            });
        }
    }

    static async editar(req, res) {
        try {
            const { nome, email, senha, perfil } = req.body
            const id = req.params.id
            await UsuarioModel.update(
                {
                    nome: nome,
                    email: email,
                    senha: senha,
                    perfil: perfil,
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json({ msg: 'Usuario atualizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await UsuarioModel.destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json({ msg: "Usuário deletado com sucesso." })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async login(req, res) {
        try {
            console.log(req.body)
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.
                    status(400).json({ erro: "email e senha são obrigatórios" });
            }
            const usuario = await UsuarioModel.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )

            console.log("Usuário encontrado:", usuario);

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }
            // Compara senha digitada com o hash salvo no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "E-mail ou senha incorreta" });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    perfil: usuario.perfil
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            return res.json({ mensagem: "Login bem-sucedido!", token });
        } catch (error) {
            console.log("ERRO NO LOGIN:", error);
            res.status(500).json({
                msg: "Erro interno, tente novamente mais tarde.",
                erro: error.message
            });
        }
    }

    static async criarAdmin(req, res) {
        try {
            const { nome, email, senha, perfil } = req.body;

            const senhaHash = await bcrypt.hash(senha, 10);

            await UsuarioModel.create({
                nome,
                email,
                senha: senhaHash,
                perfil: 'admin'
            });

            res.status(201).json({ msg: 'Admin criado com sucesso!' });

        } catch (error) {
            res.status(500).json({
                msg: "Erro interno, tente novamente mais tarde.",
                erro: error.message
            });
        }
    }

}