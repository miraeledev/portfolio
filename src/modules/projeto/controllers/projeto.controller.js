
import ProjetoModel from "../models/projeto.model.js";

export class ProjetoController {
	static async listar(req, res) {
		try {
			const projetos = await ProjetoModel.findAll();
			if (!projetos) {
				return res.status(406).json({ msg: "Nenhum projeto encontrado" });
			}
			res.status(200).json(Projetos);
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async criar(req, res) {
		try {
			const { nome, descricao, foto } = req.body;
			await ProjetoModel.create(
				{
					nome: nome,
					descricao: descricao,
					foto: foto
				}
			);
			if (!nome || !descricao || !foto) {
				return res.status(406).json({ msg: "Preencha todos os campos obrigatórios!" });
			}
			res.status(201).json({ msg: "Projeto criada com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async editar(req, res) {
		try {
			const { nome, descricao, foto } = req.body;
			const id = req.params.id;
			await ProjetoModel.update(
				{
					nome: nome,
					descricao: descricao,
					foto: foto
				},
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Projeto atualizada com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async excluir(req, res) {
		try {
			const { id } = req.params;
			await ProjetoModel.destroy(
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Projeto deletada com sucesso." });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}
}
