"use strict";

const AC_BUTTON = "acbtn";

const ESTORES_BUTTON = "estoresbtn";

const DESPENSA_BUTTON = "despensabtn";

const DESPENSA_DIV = "despensaArea";

const HTML_PRINCIPAL = "main";

window.addEventListener("load", principal);

const produtos = ["imagens/apple.png", "imagens/leite.png", "imagens/chocapic.png"];

function principal(){

    addProducts();
}

function addProducts(){
    
    for(let x = 0;x < 25; x++){
        const novoProduto = document.createElement("div");
        const imagemProduto = document.createElement("img");
        const indexAleatorio = Math.floor(Math.random() * produtos.length);

        imagemProduto.width = "100";
        imagemProduto.height = "100";
        imagemProduto.src = produtos[indexAleatorio];
        novoProduto.classList.add("produto");
        novoProduto.addEventListener("click", comprarProduto);
        novoProduto.appendChild(imagemProduto);
        document.getElementById(DESPENSA_DIV).appendChild(novoProduto);


    }
}

function comprarProduto(){
    
}