const listaCompra = document.getElementById("listaCompra");
const totalTexto = document.getElementById("total");
const produtos = JSON.parse(localStorage.getItem("compra")) || [];
let total = 0;
listaCompra.innerHTML = produtos.map(item => {
    total += item.preco;

    return `
        <div class="itemCompra">
            <p>${item.nome}</p>
            <strong>R$ ${item.preco}</strong>
        </div>

    `;

}).join("");

totalTexto.innerText = `Total: R$ ${total.toFixed(2)}`;

function finalizarCompra(){
    alert("Compra realizada com sucesso!");
    localStorage.removeItem("compra");
    window.location.href = "index.html";
}