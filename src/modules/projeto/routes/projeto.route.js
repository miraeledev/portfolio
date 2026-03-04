import express from "express";
import { ProjetoController } from "../controllers/projeto.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rotas protegidas
router.get("/", autenticarToken, autorization.cliente, ProjetoController.listar);
router.post("/", autenticarToken, autorization.admin, ProjetoController.criar);
router.put("/:id", autenticarToken, autorization.admin, ProjetoController.editar);
router.delete("/:id", autenticarToken, autorization.admin, ProjetoController.excluir);

export default router;
