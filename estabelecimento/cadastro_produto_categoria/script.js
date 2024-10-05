// Variáveis para o formulário de produto
const produtos = document.getElementById("produto-form");
const Inome = document.getElementById("nome_produto");
const Ipreco = document.getElementById("preco_venda");
const IcategoriaProduto = document.getElementById("categoria");
const Idescricao = document.getElementById("descricao_produto");

// Variáveis para o formulário de categoria
const categoriaForm = document.getElementById("categoria-form");
const Icategoria = document.getElementById("nome_categoria");

// Função para cadastrar produto
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
        id_categoria: IcategoriaProduto.value,
        descricao_produto: Idescricao.value
    };

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
            limparProduto();
        })
        .catch(function (error) {
            console.error("Erro:", error);
            alert(error.message);
        });
}

// Função para carregar categorias
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

// Função para limpar formulário de produto
function limparProduto() {
    produtos.reset();
}

// Função para cadastrar categoria
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
            window.location.reload();
        } else {
            alert("Erro ao cadastrar categoria.");
        }
    })
    .catch(function (error) {
        console.log(error);
        alert("Erro ao cadastrar categoria.");
    });
}

// Função para limpar formulário de categoria
function limparCategoria() {
    Icategoria.value = "";
}

// Eventos
document.addEventListener("DOMContentLoaded", carregarCategorias);

produtos.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastroProduto();
});

categoriaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastroCategoria();
    limparCategoria();
});