const apiComentarios = "/api/comentarios";
const lista = document.getElementById("lista-comentarios");
const form = document.getElementById("form-comentario");

// Carregar comentários
async function carregarComentarios() {
  try {
    const res = await fetch(apiComentarios);
    const comentarios = await res.json();
    lista.innerHTML = "";
    comentarios.reverse().forEach(c => {
      const div = document.createElement("div");
      div.classList.add("comentario");
      div.innerHTML = `
        <h3>${c.nome}</h3>
        <p>${c.mensagem}</p>
        <button onclick="excluir(${c.id})">Excluir</button>
      `;
      lista.appendChild(div);
    });
  } catch (err) {
    console.error("Erro ao carregar comentários:", err);
  }
}

// Adicionar novo comentário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novoComentario = {
    nome: document.getElementById("nome").value,
    mensagem: document.getElementById("mensagem").value
  };

  await fetch(apiComentarios, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoComentario)
  });

  form.reset();
  carregarComentarios();
});

// Excluir comentário
async function excluir(id) {
  if (confirm("Deseja excluir este comentário?")) {
    await fetch(`${apiComentarios}/${id}`, { method: "DELETE" });
    carregarComentarios();
  }
}

// Inicialização
carregarComentarios();
