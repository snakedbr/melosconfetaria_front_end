const login = document.querySelector("form");

const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");


function handleLogin() {
    fetch("http://localhost:8080/usuarios", {
        headers: {
            'Accept': 'application/json', // O servidor deve aceitar JSON
            'Content-Type': 'application/json' // Enviando dados em JSON
        },
        method: 'POST', // POST é o método correto para login
        body: JSON.stringify({
            login: Ilogin.value,
            senha: Isenha.value
        })
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Erro ao fazer login: ' + res.statusText);
            }
            return res.json(); // Converte a resposta em JSON
        })
        .then(function (data) {
            console.log('Usuário autenticado:', data);

            // Exemplo de armazenamento de token
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            // Redirecionar se o login for bem-sucedido
            // window.location.href = "/dashboard";
        })
        .catch(function (error) {
            console.error('Erro:', error.message);
            alert('Falha no login. Verifique suas credenciais.');
        });
}

function limpar() {
    Ilogin.value = "",
        Isenha.value = ""
}

login.addEventListener('submit', function (event) {

    event.preventDefault();
    handleLogin();
    limpar();
});


