import sequelize from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const UsuarioModel = sequelize.define(
    'UsuarioModel',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O nome não pode estar vazio"
                },
                len: {
                    args: [1, 150],
                    msg: "O nome deve ter entre 1 e 150 caracteres"
                },
            },
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "A senha não pode estar vazia"
                },
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O email não pode estar vazio"
                },
                isEmail: {
                    msg: "Formato de email inválido"
                },
            },
        },
        perfil: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: true,
            validate: {
                isIn: {
                    args: [['admin', 'cliente']],
                    msg: "O perfil deve ser 'admin' ou 'cliente'"
                },
            },
        },
    },
    {
        tableName: "usuario",
        // timestamps 
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
        deletedAt: "excluido_em",
        paranoid: true,
    }
);
