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

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.href = "home.html";
}
