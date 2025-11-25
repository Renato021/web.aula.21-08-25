// ======================================
// Carregar pedidos para o SELECT
// ======================================
async function carregarPedidos() {
    const res = await fetch("/api/pedidos");
    const pedidos = await res.json();

    const select = document.getElementById("selectPedido");
    select.innerHTML = `<option value="">Selecione...</option>`;

    pedidos.forEach(p => {
        select.innerHTML += `
            <option value="${p.id}">
                ${p.nome} - ${p.data}
            </option>`;
    });
}

// ======================================
// Carregar pontos
// ======================================
async function carregarPontos() {
    const res = await fetch("/api/pontos");
    const pontos = await res.json();

    const select = document.getElementById("selectPonto");
    select.innerHTML = `<option value="">Selecione...</option>`;

    pontos.forEach(p => {
        select.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
    });
}

// ======================================
// SISTEMA DE ESTRELAS
// ======================================
let avaliacao = 0;

function setStarRating(n) {
    avaliacao = n;
    const stars = document.querySelectorAll(".star");

    stars.forEach((s, i) => {
        s.style.color = i < n ? "#ffb400" : "#ccc";
    });
}

// ======================================
// SALVAR OU EDITAR COMENTÁRIO
// ======================================
let editandoID = null;

async function salvarComentario() {
    const pedido = document.getElementById("selectPedido").value;
    const ponto = document.getElementById("selectPonto").value;
    const texto = document.getElementById("comentario").value;

    if (!pedido || !ponto || avaliacao === 0 || texto.trim() === "") {
        return alert("Preencha tudo antes de enviar.");
    }

    const objeto = {
        pedidoId: pedido,
        ponto,
        avaliacao,
        texto,
        data: new Date().toLocaleDateString()
    };

    // EDITAR
    if (editandoID !== null) {
        await fetch(`/api/comentarios/${editandoID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        });

        alert("Comentário atualizado!");
        editandoID = null;
    }
    // NOVO
    else {
        objeto.id = Date.now();
        await fetch("/api/comentarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        });

        alert("Comentário enviado!");
    }

    document.getElementById("comentario").value = "";
    avaliacao = 0;
    setStarRating(0);

    carregarComentarios();
}

// ======================================
// EXCLUIR
// ======================================
async function excluirComentario(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    await fetch(`/api/comentarios/${id}`, { method: "DELETE" });
    carregarComentarios();
}

// ======================================
// EDITAR
// ======================================
async function editarComentario(id) {
    const res = await fetch("/api/comentarios");
    const comentarios = await res.json();
    const c = comentarios.find(x => x.id == id);

    editandoID = id;

    document.getElementById("selectPedido").value = c.pedidoId;
    document.getElementById("selectPonto").value = c.ponto;
    document.getElementById("comentario").value = c.texto;

    setStarRating(c.avaliacao);
}

// ======================================
// LISTAR COMENTÁRIOS
// ======================================
async function carregarComentarios() {
    const res = await fetch("/api/comentarios");
    const comentarios = await res.json();

    const lista = document.getElementById("listaComentarios");
    lista.innerHTML = "";

    comentarios.reverse().forEach(c => {
        lista.innerHTML += `
        <div class="card" style="padding:12px; margin-bottom:10px;">
            <p><strong>Pedido:</strong> ${c.pedidoId}</p>
            <p><strong>Ponto:</strong> ${c.ponto}</p>
            <p><strong>Avaliação:</strong> ${"★".repeat(c.avaliacao)}</p>
            <p>${c.texto}</p>
            <small>${c.data}</small>

            <div style="margin-top:10px;">
                <button class="btn-edit" onclick="editarComentario(${c.id})">Editar</button>
                <button class="btn-delete" onclick="excluirComentario(${c.id})">Excluir</button>
            </div>
        </div>`;
    });
}

// Inicialização
carregarPedidos();
carregarPontos();
carregarComentarios();

document.getElementById("btnEnviar").addEventListener("click", salvarComentario);
