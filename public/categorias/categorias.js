const apiCategorias = "/api/categorias";
const lista = document.getElementById("listaCategorias");
const form = document.getElementById("categoriaForm");

async function carregarCategorias() {
  const res = await fetch(apiCategorias);
  const categorias = await res.json();

  lista.innerHTML = "";

  categorias.forEach((c) => {
    lista.innerHTML += `
      <div class="categoria-item">
        <span>${c.nome}</span>

        <div>
          <button class="btn-editar" onclick="editar(${c.id}, '${c.nome}')">Editar</button>
          <button class="btn-excluir" onclick="excluir(${c.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idEdicao = document.getElementById("editId").value;
  const nome = document.getElementById("nome").value;

  // MODO EDITAR
  if (idEdicao) {
    await fetch(`${apiCategorias}/${idEdicao}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });

    // Restaurar para modo criar
    document.getElementById("editId").value = "";
    document.getElementById("tituloForm").innerText = "Cadastrar Categoria";
  }

  // MODO CRIAR
  else {
    await fetch(apiCategorias, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
  }

  form.reset();
  carregarCategorias();
});

function editar(id, nome) {
  document.getElementById("editId").value = id;
  document.getElementById("nome").value = nome;

  document.getElementById("tituloForm").innerText = "Editar Categoria";
}

async function excluir(id) {
  if (confirm("Deseja excluir esta categoria?")) {
    await fetch(`${apiCategorias}/${id}`, { method: "DELETE" });
    carregarCategorias();
  }
}

carregarCategorias();
