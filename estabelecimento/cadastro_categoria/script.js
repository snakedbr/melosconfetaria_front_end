const categoriaForm = document.getElementById("categoria-form");
const Icategoria = document.getElementById("nome_categoria");

function cadastroCategoria() {
    fetch("http://localhost:8080/categorias", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            nome_categoria: Icategoria.value,
        })
    })
    .then(function (res) {
        console.log(res);
        if (res.ok) {
            alert("Categoria cadastrada com sucesso!");
        } else {
            alert("Erro ao cadastrar categoria.");
        }
    })
    .catch(function (error) {
        console.log(error);
        alert("Erro ao cadastrar categoria.");
    });
}

function limpar() {
    Icategoria.value = "";
}

categoriaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastroCategoria();
    limpar();
});

