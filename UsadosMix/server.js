// ============================
//  Usado Mix - Servidor Node
// ============================

import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const __dirname = path.resolve();

// ============================
// Caminhos dos bancos JSON
// ============================
const DB_PATH = {
  produtos: path.join(__dirname, "db", "produtos.json"),
  usuarios: path.join(__dirname, "db", "usuarios.json"),
  categorias: path.join(__dirname, "db", "categorias.json"),
  pedidos: path.join(__dirname, "db", "pedidos.json"),
  comentarios: path.join(__dirname, "db", "comentarios.json"),
  pontos: path.join(__dirname, "db", "pontos.json")
};

// ============================
// Funções auxiliares
// ============================
async function readDB(type) {
  try {
    const data = await fs.readFile(DB_PATH[type], "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error(`⚠️ Erro ao ler o banco ${type}:`, err.message);
    return [];
  }
}

async function writeDB(type, data) {
  try {
    await fs.writeFile(DB_PATH[type], JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`⚠️ Erro ao escrever no banco ${type}:`, err.message);
  }
}

// ============================
// Rotas: PRODUTOS
// ============================
app.get("/api/produtos", async (req, res) => {
  const produtos = await readDB("produtos");
  res.json(produtos);
});

app.post("/api/produtos", async (req, res) => {
  const produtos = await readDB("produtos");
  const novoProduto = { id: Date.now(), ...req.body };
  produtos.push(novoProduto);
  await writeDB("produtos", produtos);
  res.json(novoProduto);
});

app.put("/api/produtos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = await readDB("produtos");
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...req.body };
    await writeDB("produtos", produtos);
    res.json(produtos[index]);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.delete("/api/produtos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = await readDB("produtos");
  produtos = produtos.filter(p => p.id !== id);
  await writeDB("produtos", produtos);
  res.json({ message: "Produto excluído com sucesso" });
});

// ============================
// Rotas: USUÁRIOS (Login/Cadastro simples)
// ============================
app.get("/api/usuarios", async (req, res) => {
  const usuarios = await readDB("usuarios");
  res.json(usuarios);
});

app.post("/api/usuarios", async (req, res) => {
  const usuarios = await readDB("usuarios");
  const novoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(novoUsuario);
  await writeDB("usuarios", usuarios);
  res.json(novoUsuario);
});

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuarios = await readDB("usuarios");
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    res.json({ success: true, message: "Login realizado com sucesso!", usuario });
  } else {
    res.status(401).json({ success: false, message: "Usuário ou senha inválidos" });
  }
});

app.delete("/api/usuarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let usuarios = await readDB("usuarios");
  usuarios = usuarios.filter(u => u.id !== id);
  await writeDB("usuarios", usuarios);
  res.json({ message: "Usuário excluído com sucesso" });
});

// ============================
// Rotas: CATEGORIAS
// ============================
app.get("/api/categorias", async (req, res) => {
  const categorias = await readDB("categorias");
  res.json(categorias);
});

app.post("/api/categorias", async (req, res) => {
  const categorias = await readDB("categorias");
  const novaCategoria = { id: Date.now(), ...req.body };
  categorias.push(novaCategoria);
  await writeDB("categorias", categorias);
  res.json(novaCategoria);
});

app.put("/api/categorias/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let categorias = await readDB("categorias");
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    categorias[index] = { ...categorias[index], ...req.body };
    await writeDB("categorias", categorias);
    res.json(categorias[index]);
  } else {
    res.status(404).json({ message: "Categoria não encontrada" });
  }
});

app.delete("/api/categorias/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let categorias = await readDB("categorias");
  categorias = categorias.filter(c => c.id !== id);
  await writeDB("categorias", categorias);
  res.json({ message: "Categoria excluída com sucesso" });
});

// ============================
// Rotas: PEDIDOS
// ============================
app.get("/api/pedidos", async (req, res) => {
  const pedidos = await readDB("pedidos");
  res.json(pedidos);
});

app.post("/api/pedidos", async (req, res) => {
  const pedidos = await readDB("pedidos");
  const novoPedido = { id: Date.now(), ...req.body };
  pedidos.push(novoPedido);
  await writeDB("pedidos", pedidos);
  res.json(novoPedido);
});

app.put("/api/pedidos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let pedidos = await readDB("pedidos");
  const index = pedidos.findIndex(p => p.id === id);
  if (index !== -1) {
    pedidos[index] = { ...pedidos[index], ...req.body };
    await writeDB("pedidos", pedidos);
    res.json(pedidos[index]);
  } else {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
});

app.delete("/api/pedidos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let pedidos = await readDB("pedidos");
  pedidos = pedidos.filter(p => p.id !== id);
  await writeDB("pedidos", pedidos);
  res.json({ message: "Pedido excluído com sucesso" });
});

// ============================
// Rotas: COMENTÁRIOS
// ============================
app.get("/api/comentarios", async (req, res) => {
  const comentarios = await readDB("comentarios");
  res.json(comentarios);
});

app.post("/api/comentarios", async (req, res) => {
  const comentarios = await readDB("comentarios");
  const novoComentario = { id: Date.now(), ...req.body };
  comentarios.push(novoComentario);
  await writeDB("comentarios", comentarios);
  res.json(novoComentario);
});

app.delete("/api/comentarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let comentarios = await readDB("comentarios");
  comentarios = comentarios.filter(c => c.id !== id);
  await writeDB("comentarios", comentarios);
  res.json({ message: "Comentário excluído com sucesso" });
});

// ============================
// Rotas: PONTOS DE ENTREGA E TROCA
// ============================
app.get("/api/pontos", async (req, res) => {
  const pontos = await readDB("pontos");
  res.json(pontos);
});

app.post("/api/pontos", async (req, res) => {
  const pontos = await readDB("pontos");
  const novoPonto = { id: Date.now(), ...req.body };
  pontos.push(novoPonto);
  await writeDB("pontos", pontos);
  res.json(novoPonto);
});

app.delete("/api/pontos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let pontos = await readDB("pontos");
  pontos = pontos.filter(p => p.id !== id);
  await writeDB("pontos", pontos);
  res.json({ message: "Ponto excluído com sucesso" });
});

// ============================
// Rotas: DOAÇÕES
// ============================
app.get("/api/doacoes", async (req, res) => {
  const doacoes = await readDB("doacoes");
  res.json(doacoes);
});

app.post("/api/doacoes", async (req, res) => {
  const doacoes = await readDB("doacoes");
  const novaDoacao = { id: Date.now(), ...req.body };
  doacoes.push(novaDoacao);
  await writeDB("doacoes", doacoes);
  res.json(novaDoacao);
});

app.delete("/api/doacoes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let doacoes = await readDB("doacoes");
  doacoes = doacoes.filter(d => d.id !== id);
  await writeDB("doacoes", doacoes);
  res.json({ message: "Doação excluída com sucesso" });
});

// ============================
// Inicialização do servidor
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
