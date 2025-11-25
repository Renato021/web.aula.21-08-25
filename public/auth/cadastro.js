    // Função de cadastro
    document.getElementById("form-cadastro")?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const res = await fetch("/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "/auth/login.html";
        } else {
          alert("Erro ao cadastrar usuário.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });