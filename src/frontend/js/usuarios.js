async function carregarUsuarios() {
  const tabela = document.querySelector("#tabelaUsuarios tbody");
  const msg = document.getElementById("msg");

  tabela.innerHTML = "";
  msg.innerText = "Carregando...";

  try {
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const dados = await res.json();

    if (!res.ok) {
      msg.innerText = dados.msg || dados.erro;
      return;
    }

    if (dados.length === 0) {
      msg.innerText = "Nenhum usuário encontrado.";
      return;
    }

    dados.forEach((usuario) => {
      const linha = `
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.nome}</td>
          <td>${usuario.matricula}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefone}</td>
          <td>${usuario.perfil}</td>
        </tr>
      `;
      tabela.innerHTML += linha;
    });

    msg.innerText = "Usuários carregados com sucesso!";

  } catch (error) {
    msg.innerText = "Erro ao buscar usuários.";
    console.error(error);
  }
}

// 🚀 Executa automaticamente quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  carregarUsuarios();
});