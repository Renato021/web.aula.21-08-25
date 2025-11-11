const apiPedidos = "/api/pedidos";
const apiProdutos = "/api/produtos";

const lista = document.getElementById("lista-pedidos");
const form = document.getElementById("form-pedido");
const selectProduto = document.getElementById("produto");

// Carrega produtos no select
async function carregarProdutos() {
  try {
    const res = await fetch(apiProdutos);
    const produtos = await res.json();
    selectProduto.innerHTML = '<option value="">Selecione o produto</option>';
    produtos.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.nome;
      opt.textContent = p.nome;
      selectProduto.appendChild(opt);
    });
  } catch (e) {
    console.error("Erro ao carregar produtos:", e);
  }
}

// Carrega pedidos
async function carregarPedidos() {
  try {
    const res = await fetch(apiPedidos);
    const pedidos = await res.json();
    lista.innerHTML = "";
    pedidos.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("pedido");
      div.innerHTML = `
        <h3>Cliente: ${p.cliente}</h3>
        <p><strong>Produto:</strong> ${p.produto}</p>
        <p><strong>Quantidade:</strong> ${p.quantidade}</p>
        <p><strong>Valor:</strong> R$ ${p.valor}</p>
        <button onclick="excluir(${p.id})">Excluir</button>
      `;
      lista.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao carregar pedidos:", e);
  }
}

// Cadastra novo pedido
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoPedido = {
    cliente: document.getElementById("cliente").value,
    produto: selectProduto.value,
    quantidade: parseInt(document.getElementById("quantidade").value),
    valor: parseFloat(document.getElementById("valor").value)
  };

  await fetch(apiPedidos, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoPedido)
  });

  form.reset();
  carregarPedidos();
});

// Excluir pedido
async function excluir(id) {
  if (confirm("Deseja excluir este pedido?")) {
    await fetch(`${apiPedidos}/${id}`, { method: "DELETE" });
    carregarPedidos();
  }
}

// Inicialização
carregarProdutos();
carregarPedidos();
