// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import sequelize from "./src/config/database.js";
// import usuarioRoutes from "./src/modules/usuarios/routes/usuario.route.js";
// import porojetoRoutes from "./src/modules/projeto/routes/projeto.route.js";
// import { UsuarioController } from "./src/modules/usuarios/controllers/usuario.controller.js"

// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get("/", (req, res) => res.json({ status: "ok" }));
// app.post("/", UsuarioController.criarAdmin)
// // Registra as rotas
// app.use("/usuarios", usuarioRoutes);
// app.use("/projetos", porojetoRoutes);

// // Inicia o servidor. A porta vem do .env (process.env.PORT).
// app.listen(process.env.PORT, async () => {
//   console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/config/database.js";

import usuarioRoutes from "./src/modules/usuarios/routes/usuario.route.js";
import projetoRoutes from "./src/modules/projeto/routes/projeto.route.js";
import { UsuarioController } from "./src/modules/usuarios/controllers/usuario.controller.js";

dotenv.config();

const app = express();

/* =========================
   CONFIGURAÇÕES INICIAIS
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   ROTA TESTE
========================= */

app.get("/", (req, res) => {
  res.status(200).json({ status: "API rodando com sucesso 🚀" });
});

// Criar admin inicial
app.post("/", UsuarioController.criarAdmin);

/* =========================
   ROTAS
========================= */

app.use("/usuarios", usuarioRoutes);
app.use("/projetos", projetoRoutes);

/* =========================
   ROTA NÃO ENCONTRADA (404)
========================= */

app.use((req, res) => {
  res.status(404).json({ msg: "Rota não encontrada." });
});

/* =========================
   MIDDLEWARE GLOBAL DE ERRO
========================= */

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({
    msg: "Erro interno do servidor.",
    erro: err.message,
  });
});

/* =========================
   INICIALIZAÇÃO DO SERVIDOR
========================= */

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso ✅");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao conectar no banco de dados ❌", error);
    process.exit(1);
  }
};

startServer();