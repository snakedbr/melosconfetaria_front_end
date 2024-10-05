let carrinho = JSON.parse(localStorage.getItem("carrinhoMelosConfeitaria"));
let total = 0;

console.log("Carrinho:", carrinho);

const tabelaCarrinho = document.getElementById("tabelaCarrinho");

function criaTabela() {
  tabelaCarrinho.innerHTML = "";
  carrinho.map((item) => {
    tabelaCarrinho.innerHTML += `
  <tr class="cart-produto">
    <td>
      <div class="product">
        <img style="width:150px; heigth:150px;   " src=${item.imgUrl} />
        <div class="info">
          <div class="name">${item.nome}</div>
          <div class="category">A Unidade</div>
        </div>
      </div>
    </td>
    <td class="cart-product-preco">R$${item.preco}</td>
    <td>
      <div class="qty">
        <button onclick='alteraQuantidade(${item.idProduto}, "subtrair")' class="menos">
        <i class="bx bx-minus"></i>
        </button>
        <span id="contadorItem${item.idProduto}">${item.quantidade}</span>
        <button onclick='alteraQuantidade(${item.idProduto}, "somar")' class="mais">
        <i class="bx bx-plus"></i>
        </button>
      </div>
    </td>
    <td>
      <button onclick="removerProduto(${item.idProduto})" class="remove"><i class="bx bx-x"></i></button>
    </td>
  </tr>`;
  });

  calculaTotal();
}

criaTabela();

function alteraQuantidade(idProduto, operacao) {
  const contadorItem = document.getElementById(`contadorItem${idProduto}`);

  carrinho.map((item) => {
    if (item.idProduto == idProduto) {
      if (operacao == "subtrair" && item.quantidade > 1) {
        item.quantidade--;
        contadorItem.innerHTML = item.quantidade;
      }

      if (operacao == "somar") {
        item.quantidade++;
        contadorItem.innerHTML = item.quantidade;
      }
    }
  });

  localStorage.setItem(
    //Quarda os itens do novo carrinho no Cookie
    "carrinhoMelosConfeitaria",
    JSON.stringify(carrinho)
  );

  calculaTotal();
}

calculaTotal();

function calculaTotal() {
  total = 0;
  const elementoTotal = document.getElementById("total");

  carrinho.map((item) => {
    total = total + item.quantidade * item.preco;
  });

  elementoTotal.innerHTML = total.toFixed(2);
}

function removerProduto(id) {
  let novoCarrinho = carrinho.filter((item) => item.idProduto !== id);
  carrinho = novoCarrinho;

  localStorage.setItem(
    //Quarda os itens do novo carrinho no Cookie
    "carrinhoMelosConfeitaria",
    JSON.stringify(carrinho)
  );

  criaTabela();
}
