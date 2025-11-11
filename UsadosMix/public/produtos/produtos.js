// Elementos do DOM
const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");
const inputNome = document.getElementById("nome");
const inputPreco = document.getElementById("preco");
const selectCategoria = document.getElementById("categoria");
const textareaDescricao = document.getElementById("descricao");
const filtroCategoria = document.getElementById("filtro-categoria");

// Mapeamento de categorias
const categoriasMap = {
  "1": "Eletrônico",
  "2": "Roupas",
  "3": "Móveis",
  "4": "Alimentos",
  "5": "Livros",
  "6": "Beleza e Cuidados Pessoais",
  "7": "Brinquedos",
  "8": "Ferramentas",
  "9": "Esportes e Lazer",
  "10": "Automotivo",
  "11": "Pet Shop",
  "12": "Papelaria",
  "13": "Informática",
  "14": "Casa e Jardim"
};

// Função para obter produtos do localStorage
function obterProdutos() {
  const produtos = localStorage.getItem("produtos");
  return produtos ? JSON.parse(produtos) : [];
}

// Função para salvar produtos no localStorage
function salvarProdutos(produtos) {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Função para exibir produtos na lista
function exibirProdutos(filtro = "") {
  const produtos = obterProdutos();
  lista.innerHTML = "";

  // Aplica filtro se necessário
  const produtosFiltrados = filtro 
    ? produtos.filter(p => p.categoria === filtro)
    : produtos;

  if (produtosFiltrados.length === 0) {
    lista.innerHTML = "<p style='text-align: center; color: #666; padding: 20px;'>Nenhum produto cadastrado.</p>";
    return;
  }

  produtosFiltrados.forEach(produto => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3 style="color: #00b894; margin-bottom: 10px;">${produto.nome}</h3>
      <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      ${produto.descricao ? `<p><strong>Descrição:</strong> ${produto.descricao}</p>` : ""}
      <button onclick="excluirProduto(${produto.id})" style="background: #ff5252; margin-top: 10px;">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

// Função para adicionar produto
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const categoriaId = selectCategoria.value;
  
  // Validação
  if (!categoriaId || categoriaId === "0") {
    alert("Por favor, selecione uma categoria válida!");
    return;
  }

  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const descricao = textareaDescricao.value.trim();

  if (!nome) {
    alert("Por favor, digite o nome do produto!");
    return;
  }

  if (isNaN(preco) || preco <= 0) {
    alert("Por favor, digite um preço válido!");
    return;
  }

  // Criar novo produto
  const novoProduto = {
    id: Date.now(),
    nome: nome,
    preco: preco,
    categoria: categoriasMap[categoriaId],
    descricao: descricao
  };

  // Adicionar à lista de produtos
  const produtos = obterProdutos();
  produtos.push(novoProduto);
  salvarProdutos(produtos);

  // Limpar formulário
  form.reset();

  // Atualizar lista
  exibirProdutos(filtroCategoria.value);

  alert("Produto cadastrado com sucesso!");
});

// Função para excluir produto
function excluirProduto(id) {
  if (!confirm("Deseja realmente excluir este produto?")) {
    return;
  }

  let produtos = obterProdutos();
  produtos = produtos.filter(p => p.id !== id);
  salvarProdutos(produtos);
  exibirProdutos(filtroCategoria.value);
  alert("Produto excluído com sucesso!");
}

// Tornar função global
window.excluirProduto = excluirProduto;

// Filtro de categoria
filtroCategoria.addEventListener("change", function() {
  const filtro = this.value;
  const categoriaNome = filtro ? categoriasMap[filtro] : "";
  exibirProdutos(categoriaNome);
});

// Carregar produtos ao iniciar
exibirProdutos();