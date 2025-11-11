const apiUsuarios = "/api/usuarios";

// =============== CADASTRO ===============
const formCadastro = document.getElementById("form-cadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // Verifica se o e-mail já existe
    const res = await fetch(apiUsuarios);
    const usuarios = await res.json();
    if (usuarios.some((u) => u.email === email)) {
      alert("E-mail já cadastrado!");
      return;
    }

    // Cadastra o novo usuário
    const novoUsuario = { nome, email, senha };
    await fetch(apiUsuarios, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "/auth/login.html";
  });
}

// =============== LOGIN ===============
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const res = await fetch(apiUsuarios);
    const usuarios = await res.json();
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      alert(`Bem-vindo, ${usuario.nome}!`);
      window.location.href = "/index.html";
    } else {
      alert("E-mail ou senha incorretos!");
    }
  });
}

// =============== LOGOUT ===============
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "/auth/login.html";
}
