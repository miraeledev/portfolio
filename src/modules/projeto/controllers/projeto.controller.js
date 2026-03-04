
import projetoModel from "../models/projeto.model.js";

export class ProjetoController {
	static async listar(req, res) {
		try {
			const projetos = await projetoModel.findAll();
			if (!projetos) {
				return res.status(406).json({ msg: "Nenhum projeto encontrado" });
			}
			res.status(200).json(projetos);
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async criar(req, res) {
		try {
			console.log("Dados recebidos:", req.body);

			const novo = await projetoModel.create({
				nome: req.body.nome?.trim(),
				descricao: req.body.descricao?.trim(),
				foto: req.body.foto?.trim()
			});

			console.log("Criado com sucesso:", novo);

			res.status(201).json({ msg: "Projeto criado com sucesso" });

		} catch (error) {
			console.error("ERRO COMPLETO:", error);
			res.status(500).json({
				msg: "Erro interno",
				erro: error.message,
				tipo: error.name,
				detalhes: error.errors || null
			});
		}
	}

	static async editar(req, res) {
		try {
			const { nome, descricao, foto } = req.body;
			const id = req.params.id;
			await projetoModel.update(
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
			await projetoModel.destroy(
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
