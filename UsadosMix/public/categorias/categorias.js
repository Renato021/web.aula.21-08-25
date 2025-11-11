const apiCategorias = "/api/categorias";
const lista = document.getElementById("lista-categorias");
const form = document.getElementById("form-categoria");

async function carregarCategorias() {
  const res = await fetch(apiCategorias);
  const categorias = await res.json();
  lista.innerHTML = "";
  categorias.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <h3>${c.nome}</h3>
      <button onclick="excluir(${c.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nova = { nome: nome.value };
  await fetch(apiCategorias, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nova),
  });
  form.reset();
  carregarCategorias();
});

async function excluir(id) {
  if (confirm("Deseja excluir esta categoria?")) {
    await fetch(`${apiCategorias}/${id}`, { method: "DELETE" });
    carregarCategorias();
  }
}

carregarCategorias();
