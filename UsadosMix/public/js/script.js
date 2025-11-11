const apiURL = "/api/produtos";
const lista = document.getElementById("lista-produtos");
const form = document.getElementById("form-produto");

async function carregarProdutos() {
  const res = await fetch(apiURL);
  const produtos = await res.json();
  lista.innerHTML = "";
  produtos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p><b>Preço:</b> R$ ${p.preco}</p>
      <p><b>Categoria:</b> ${p.categoria}</p>
      <p>${p.descricao}</p>
      <button onclick="deletar(${p.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novo = {
    nome: nome.value,
    preco: preco.value,
    categoria: categoria.value,
    descricao: descricao.value
  };
  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });
  form.reset();
  carregarProdutos();
});

async function deletar(id) {
  if (confirm("Deseja excluir este produto?")) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    carregarProdutos();
  }
}

carregarProdutos();
