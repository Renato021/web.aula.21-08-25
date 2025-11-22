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
  pontos: path.join(__dirname, "db", "pontos.json"),
  doacoes: path.join(__dirname, "db", "doacoes.json")
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
  res.json(await readDB("produtos"));
});

app.post("/api/produtos", async (req, res) => {
  const produtos = await readDB("produtos");

  const novo = {
    id: Date.now(),
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    imagem: req.body.imagem
  };

  produtos.push(novo);
  await writeDB("produtos", produtos);

  res.json(novo);
});

app.put("/api/produtos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = await readDB("produtos");

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });

  produtos[index] = { ...produtos[index], ...req.body };

  await writeDB("produtos", produtos);
  res.json(produtos[index]);
});

app.delete("/api/produtos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = await readDB("produtos");

  produtos = produtos.filter(p => p.id !== id);
  await writeDB("produtos", produtos);

  res.json({ message: "Produto excluído com sucesso" });
});

// ============================
// Rotas: USUÁRIOS
// ============================
app.get("/api/usuarios", async (req, res) => {
  res.json(await readDB("usuarios"));
});

app.post("/api/usuarios", async (req, res) => {
  const usuarios = await readDB("usuarios");

  const novo = { id: Date.now(), ...req.body };
  usuarios.push(novo);

  await writeDB("usuarios", usuarios);
  res.json(novo);
});

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuarios = await readDB("usuarios");

  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) return res.status(401).json({ success: false, message: "Usuário ou senha inválidos" });

  res.json({ success: true, usuario: user });
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
  res.json(await readDB("categorias"));
});

app.post("/api/categorias", async (req, res) => {
  const categorias = await readDB("categorias");
  const nova = { id: Date.now(), ...req.body };

  categorias.push(nova);
  await writeDB("categorias", categorias);

  res.json(nova);
});

app.put("/api/categorias/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let categorias = await readDB("categorias");

  const index = categorias.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Categoria não encontrada" });

  categorias[index] = { ...categorias[index], ...req.body };
  await writeDB("categorias", categorias);

  res.json(categorias[index]);
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
  res.json(await readDB("pedidos"));
});

app.post("/api/pedidos", async (req, res) => {
  const pedidos = await readDB("pedidos");

  const novo = { id: Date.now(), ...req.body };
  pedidos.push(novo);

  await writeDB("pedidos", pedidos);
  res.json(novo);
});

app.put("/api/pedidos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let pedidos = await readDB("pedidos");

  const index = pedidos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Pedido não encontrado" });

  pedidos[index] = { ...pedidos[index], ...req.body };
  await writeDB("pedidos", pedidos);

  res.json(pedidos[index]);
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
  res.json(await readDB("comentarios"));
});

app.post("/api/comentarios", async (req, res) => {
  const comentarios = await readDB("comentarios");

  const novo = { id: Date.now(), ...req.body };
  comentarios.push(novo);

  await writeDB("comentarios", comentarios);
  res.json(novo);
});

app.put("/api/comentarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let comentarios = await readDB("comentarios");

  const index = comentarios.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Comentário não encontrado" });

  comentarios[index] = { ...comentarios[index], ...req.body };
  await writeDB("comentarios", comentarios);

  res.json(comentarios[index]);
});

app.delete("/api/comentarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let comentarios = await readDB("comentarios");

  comentarios = comentarios.filter(c => c.id !== id);
  await writeDB("comentarios", comentarios);

  res.json({ message: "Comentário excluído com sucesso" });
});

// ============================
// Rotas: PONTOS DE ENTREGA
// ============================
app.get("/api/pontos", async (req, res) => {
  res.json(await readDB("pontos"));
});

app.post("/api/pontos", async (req, res) => {
  const pontos = await readDB("pontos");

  const novo = { id: Date.now(), ...req.body };
  pontos.push(novo);

  await writeDB("pontos", pontos);
  res.json(novo);
});

app.put("/api/pontos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let pontos = await readDB("pontos");

  const index = pontos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Ponto não encontrado" });

  pontos[index] = { ...pontos[index], ...req.body };
  await writeDB("pontos", pontos);

  res.json(pontos[index]);
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
  res.json(await readDB("doacoes"));
});

app.post("/api/doacoes", async (req, res) => {
  const doacoes = await readDB("doacoes");

  const nova = {
    id: Date.now(),
    nome: req.body.nome,
    categoria: req.body.categoria,
    descricao: req.body.descricao,
    pontoEntrega: req.body.pontoEntrega,
    imagem: req.body.imagem
  };

  doacoes.push(nova);
  await writeDB("doacoes", doacoes);

  res.json(nova);
});

app.put("/api/doacoes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let doacoes = await readDB("doacoes");

  const index = doacoes.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ message: "Doação não encontrada" });

  doacoes[index] = { ...doacoes[index], ...req.body };
  await writeDB("doacoes", doacoes);

  res.json(doacoes[index]);
});

app.delete("/api/doacoes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let doacoes = await readDB("doacoes");

  doacoes = doacoes.filter(d => d.id !== id);
  await writeDB("doacoes", doacoes);

  res.json({ message: "Doação excluída com sucesso" });
});

// ============================
// SERVIDOR
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
