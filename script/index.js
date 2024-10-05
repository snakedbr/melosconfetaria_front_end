const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");

const users =[];

//VALIDAÇÃO DO CADASTRE-SE JÁ:



function submitForm() {
    var form = document.getElementById("form2");
    var nome2 = form["name2"].value;
    var senha2 = form["senha2"].value;


    if (nome2 === "") {
        alert("Por favor, preecha seu nome");
        return;
    }

    if (senha2 === "") {
        alert("Por favor, preecha seu senha");
        return;
    }

    window.location.replace("vitrine/index.html");

    function submitForm2() {
        var form = document.getElementById("form2");
        var nome2 = form["name2"].value;
        var senha2 = form["senha2"].value;
    
        // Verifica se o usuário está registrado
        const user = users.find(user => user.nome === nome2 && user.senha === senha2);
        if (!user) {
            alert("Credenciais inválidas. Por favor, tente novamente.");
            return;
        }
    
        // Redireciona para a página de login bem-sucedido ou outra ação
        window.location.replace("vitrine/index.html");
    }
}

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());