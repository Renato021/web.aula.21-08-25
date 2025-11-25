async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // ROTA CORRETA DO SEU SERVIDOR
    const req = await fetch("/api/usuarios");
    const usuarios = await req.json();

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        alert("E-mail ou senha incorretos.");
        return;
    }

    // Salvar o ID do usuário para filtrar produtos e pedidos
    localStorage.setItem("usuarioLogado", JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }));

    window.location.href = "/index.html";
}