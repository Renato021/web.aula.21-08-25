const apiPontos = "/api/pontos";
const lista = document.getElementById("lista-pontos");
const form = document.getElementById("form-ponto");

// ================================
// Função: carregar lista de pontos
// ================================
async function carregarPontos() {
  const res = await fetch(apiPontos);
  const pontos = await res.json();
  lista.innerHTML = "";
  pontos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p><strong>Endereço:</strong> ${p.endereco}, ${p.bairro}</p>
      <p><strong>Cidade:</strong> ${p.cidade} - ${p.estado}</p>
      <p><strong>Telefone:</strong> ${p.telefone || "-"}</p>
      <p><strong>Horário:</strong> ${p.horario || "-"}</p>
      <button onclick="excluir(${p.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

// =======================================
// Função: buscar endereço pelo CEP (ViaCEP)
// =======================================
async function buscarCEP(cep) {
  if (!cep || cep.length < 8) return;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (data.erro) {
      alert("CEP não encontrado!");
      return;
    }
    document.getElementById("endereco").value = data.logradouro || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("estado").value = data.uf || "";
  } catch (err) {
    console.error("Erro ao buscar CEP:", err);
    alert("Erro ao consultar o CEP.");
  }
}

// Detecta quando o usuário sai do campo CEP
document.getElementById("cep").addEventListener("blur", (e) => {
  const cep = e.target.value.replace(/\D/g, "");
  buscarCEP(cep);
});

// ================================
// Função: cadastrar novo ponto
// ================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novoPonto = {
    id: Date.now(),
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    telefone: document.getElementById("telefone").value,
    horario: document.getElementById("horario").value
  };

  await fetch(apiPontos, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoPonto)
  });

  form.reset();
  carregarPontos();
});

// ================================
// Função: excluir ponto
// ================================
async function excluir(id) {
  if (confirm("Deseja excluir este ponto?")) {
    await fetch(`${apiPontos}/${id}`, { method: "DELETE" });
    carregarPontos();
  }
}

// ================================
// Máscaras automáticas
// ================================
$(document).ready(() => {
  $("#cep").mask("00000-000");
  $("#telefone").mask("(00) 00000-0000");
});

carregarPontos();
