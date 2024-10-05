const endpoint = 'http://localhost:8080/produtos';
const catalogo = document.getElementById("containerCatalogo");
const catalogo2 = document.getElementById("containerCatalogo2");

// Selecione o input de busca e o botão de busca
const searchTerm = document.querySelector('.searchTerm');
const searchButton = document.querySelector('.searchButton');

// Adicione um evento de clique ao botão de busca
searchButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do botão

    // Obtenha o termo de busca do input
    const termoBusca = searchTerm.value.trim();

    // Busque os produtos e renderize-os no catálogo
    buscarProdutos(termoBusca);
});

async function buscarProdutos(termoBusca = '') {
    try {
        const response = await fetch(endpoint);
        const produtos = await response.json();
        const produtosFiltrados = filtrarProdutos(produtos, termoBusca);
        renderizarProdutos(produtosFiltrados, catalogo);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function filtrarProdutos(produtos, termoBusca) {
    return produtos.filter((produto) => {
        return produto.nome_produto.toLowerCase().includes(termoBusca.toLowerCase());
    });
}

function criarElementoProduto(produto) {
    const elemento = document.createElement('div');
    elemento.classList.add('box');
    elemento.innerHTML = `
    <img class="img" src="/imgs/${produto.imagem_produto}" alt="${produto.nome_produto}" /> 
    <h3>${produto.nome_produto}</h3>
    <div class="price">R$ ${produto.preco_venda}</div>
    <button id="candy2" type="submit" class="btn">
     <a href="https://wa.me/556182611486?text=Olá,%20gostaria%20de%20fazer%20um%20pedido%20de%20${produto.nome_produto}%20no%20valor%20de%20R$%20${produto.preco_venda}%20%F0%9F%8D%B0%F0%9F%8E%82.%20Poderia%20me%20informar%20sobre%20a%20disponibilidade%20e%20o%20tempo%20de%20entrega?%20%F0%9F%95%92">
  <i class="fab fa-whatsapp"></i> Fazer Pedido
</a>
    </button>
  `;
    return elemento;
}

function renderizarProdutos(produtos, container) {
    container.innerHTML = ''; // Limpa o catálogo antes de renderizar
    produtos.forEach((produto) => {
        const elemento = criarElementoProduto(produto);
        container.appendChild(elemento);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buscarProdutos();
});