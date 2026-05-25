if(!localStorage.getItem("usuario")){
    window.location.href = "login.html";
}

document.getElementById("usuarioLogado").innerText =
`Olá, ${localStorage.getItem("usuario")}`;
const produtosDiv = document.getElementById("produtos");
const listaCarrinho = document.getElementById("listaCarrinho");

let carrinho = [];

fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(produtos => {

        produtosDiv.innerHTML = produtos.map(produto => `
            <div class="card">
                <img src="${produto.image}" alt="${produto.title}">
                <h2>${produto.title}</h2>
                <p>R$ ${produto.price}</p>
                <p>${produto.category}</p>
                <div class="botoes">

                    <button onclick="adicionarCarrinho('${produto.title}', ${produto.price})">
                        Adicionar ao Carrinho
                    </button>

                    <button onclick="comprarAgora('${produto.title}', ${produto.price})">
                        Comprar
                    </button>

                </div>
            </div>
        `).join("");
    });

function adicionarCarrinho(nome, preco){
    carrinho.push({
        nome,
        preco
    });
    atualizarCarrinho();
}

function atualizarCarrinho(){
    listaCarrinho.innerHTML = carrinho.map(item => `
        <div class="itemCarrinho">
            <p>${item.nome}</p>
            <strong>R$ ${item.preco}</strong>
        </div>
    `).join("");
}

function logout(){
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

function comprarAgora(nome, preco){
    const compra = [
        {
            nome,
            preco
        }
    ];

    localStorage.setItem("compra", JSON.stringify(compra));
    window.location.href = "compra.html";

}

function irParaCompra(){
    localStorage.setItem("compra", JSON.stringify(carrinho));
    window.location.href = "compra.html";
}