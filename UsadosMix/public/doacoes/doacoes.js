const apiDoacoes = "/api/doacoes";
const lista = document.getElementById("lista-doacoes");
const form = document.getElementById("form-doacao");

// ================================
// Função: carregar lista de doações
// ================================
async function carregarDoacoes() {
  const res = await fetch(apiDoacoes);
  const doacoes = await res.json();
  lista.innerHTML = "";
  doacoes.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${d.nome}</h3>
      <p><strong>Descrição:</strong> ${d.descricao}</p>
      <p><strong>Condição:</strong> ${d.condicao}</p>
      <p><strong>Ponto de Entrega:</strong> ${d.ponto}</p>
      <p><strong>Status:</strong> ${d.status || "Disponível"}</p>
      <button onclick="excluir(${d.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

// ================================
// Função: cadastrar nova doação
// ================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novaDoacao = {
    id: Date.now(),
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    condicao: document.getElementById("condicao").value,
    ponto: document.getElementById("ponto").value,
    status: "Disponível",
    dataCadastro: new Date().toLocaleString("pt-BR")
  };

  await fetch(apiDoacoes, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaDoacao)
  });

  form.reset();
  carregarDoacoes();
});

// ================================
// Função: excluir doação
// ================================
async function excluir(id) {
  if (confirm("Deseja excluir esta doação?")) {
    await fetch(`${apiDoacoes}/${id}`, { method: "DELETE" });
    carregarDoacoes();
  }
}

carregarDoacoes();
