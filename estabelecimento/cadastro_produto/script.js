const produtos = document.getElementById("produto-form");
const Inome = document.getElementById("nome_produto");
const Ipreco = document.getElementById("preco_venda");
const Icategoria = document.getElementById("categoria");
const Idescricao = document.getElementById("descricao_produto");

function cadastroProduto() {
    const preco = parseFloat(Ipreco.value);
    if (isNaN(preco) || preco < 0) {
        alert("Por favor, insira um preço válido.");
        return;
    }

    const formData = new FormData(produtos);
    const produtoData = {
        nome_produto: Inome.value,
        preco_venda: preco.toFixed(2), // Garante 2 casas decimais
        id_categoria: Icategoria.value,
        descricao_produto: Idescricao.value
    };

    // lembrando que todos as variaveis acima devem corresponder igual as variáveis do modelo e do banco de dados!
    
    formData.append('produto', JSON.stringify(produtoData));

    fetch("http://localhost:8080/produtos", {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text) });
            }
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            alert("Produto cadastrado com sucesso!");
            limpar();
        })
        .catch(function (error) {
            console.error("Erro:", error);
            alert(error.message);
        });
}

function carregarCategorias() {
    fetch("http://localhost:8080/categorias")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar categorias');
            }
            return response.json();
        })
        .then(categorias => {
            const selectCategoria = document.getElementById("categoria");
            categorias.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.id;
                option.textContent = categoria.nome_categoria;
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            alert(error.message);
        });
}

function limpar() {
    produtos.reset();
}

document.addEventListener("DOMContentLoaded", carregarCategorias);

produtos.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastroProduto();
});