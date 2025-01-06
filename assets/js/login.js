// Seleciona o formulário e os campos de input
const loginForm = document.querySelector("#loginForm");
const login = document.querySelector("#login");
const senha = document.querySelector("#senha");

// Função que faz a requisição de login usando GET
function handleLogin() {

    // Validação simples dos campos de login e senha
    if (!login.value.trim() || !senha.value.trim()) {
        console.log('Campos de login ou senha estão vazios.');
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Cria a URL com os parâmetros de consulta
    const url = `http://localhost:8080/usuarios/verificar?login=${encodeURIComponent(login.value)}&senha=${encodeURIComponent(senha.value)}`;

    console.log('URL gerada para requisição:', url);  // Verifica a URL gerada

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (res) {
            console.log('Resposta do servidor recebida:', res);

            if (!res.ok) {
                throw new Error('Erro ao fazer login: ' + res.statusText);
            }

            return res.json(); // Converte a resposta em JSON
        })
        .then(function (data) {
            console.log('Dados recebidos do servidor:', data);

            // Verifica se as credenciais estão corretas no retorno do backend
            if (data) {
                console.log('Usuário autenticado com sucesso.');

                // Criando a sessão no SessionStorage
                const userSession = {
                    username: login.value, // Nome de usuário
                    loginTime: new Date().toLocaleString() // Hora de login
                };

                // Armazena as informações do usuário no SessionStorage
                sessionStorage.setItem('userSession', JSON.stringify(userSession));

                // Exemplo de armazenamento de token ou redirecionamento
                window.location.href = "/projeto_web/index_manager.html";
            } else {
                console.log('Credenciais inválidas.');
                alert('Credenciais inválidas. Tente novamente.');
            }
        })
        .catch(function (error) {
            console.error('Erro capturado no catch:', error.message);
            alert('Falha no login. Verifique suas credenciais.');
        });


}

// Função para limpar os campos de input após o login
function limpar() {
    console.log('Limpando os campos de login e senha.');
    login.value = "";
    senha.value = "";
}

// Adiciona um listener ao formulário para evitar o envio padrão e chamar o login
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário
    console.log('Tentativa de login iniciada.');
    handleLogin(); // Chama a função de login
    limpar(); // Limpa os campos após a tentativa de login
});