"use strict";

const AC_BUTTON = "acbtn";

const ESTORES_BUTTON = "estoresbtn";

const DESPENSA_BUTTON = "despensabtn";

const DESPENSA_DIV = "despensaArea";

const OPTIONS_BUTTON = "optionsBtn";

const CLOSE_OPTIONS_WINDOW_BTN = "closeBtn";

const popupDiv = document.getElementById("definicoes-window");

const ecraDiv = document.getElementById("ecra");

const productsList = ["Barra de Chocolate", "Cereais", "Iogurte Natural", "Maçã", "Azeite",
    "Pacote de Bolacha", "Leite", "Leite Condensado", "Lata de Atum", "Posta de Salmão",
    "Cenoura", "Tomate", "Pacote de Arroz", "Pacote de Massa", "Batata",
    "Lombo de Porco", "Peito de Frango", "Picanha", "Garrafa de Água", "Pacote de açúcar",
    "Pacote de Sal", "Conserva de Feijão", "Conserva de Grão", "Sacos de Café", "Doce de Morango"]

window.addEventListener("load", principal);

function createProduct(name) {
    this.name = name;
    this.quantity = Math.floor(Math.random());
    this.expireDate = "a";
}
function principal() {
    defineEventHandlers();
    //addProducts();
    getAlarms();
}

function defineEventHandlers() {
    document.getElementById(OPTIONS_BUTTON).addEventListener("click", showWindow);
    document.getElementById(CLOSE_OPTIONS_WINDOW_BTN).addEventListener("click", closeWindow);
    defineAlarms();
    defineOrderOfProducts();
    showProdutsOption();
}



function displayBoardHTML() {
    let html = '<table class="produtosDespensa">';
    let i = 0
    for (let row = 0; row < 5; row++) {
        html += "<tr>";

        for (let column = 0; column < 5; column++) {
            let product = productsList[i]
            html += "<td class='game' id='td_" + getCellID(row, jewel) + "'>\
            <img class='tablepiece' id='" + getCellID(row, jewel) + "' src=../media/" + jewel_type + "_jewel.png></td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}


function comprarProduto() {

}

function showWindow() {
    popupDiv.style.display = "block";
}

function closeWindow() {
    popupDiv.style.display = "none";
}

function defineAlarms() {
    document.getElementById("validade").children[0].addEventListener("click", function () {
        document.getElementById("validade").children[0].disabled = true;
        document.getElementById("validade").children[1].disabled = false;
        localStorage.setItem("Alerta de data de validade", "ON");
    });

    document.getElementById("validade").children[1].addEventListener("click", function () {
        document.getElementById("validade").children[1].disabled = true;
        document.getElementById("validade").children[0].disabled = false;
        localStorage.setItem("Alerta de data de validade", "OFF");

    });

    document.getElementById("falta").children[0].addEventListener("click", function () {
        document.getElementById("falta").children[0].disabled = true;
        document.getElementById("falta").children[1].disabled = false;
        localStorage.setItem("Alerta de falta de produtos", "ON");
    });

    document.getElementById("falta").children[1].addEventListener("click", function () {
        document.getElementById("falta").children[1].disabled = true;
        document.getElementById("falta").children[0].disabled = false;
        localStorage.setItem("Alerta de falta de produtos", "OFF");
    });
}

function getAlarms() {
    if (localStorage.getItem("Alerta de data de validade") == "ON") {
        document.getElementById("validade").children[0].disabled = true;
        document.getElementById("validade").children[1].disabled = false;
    } else {
        document.getElementById("validade").children[0].disabled = false;
        document.getElementById("validade").children[1].disabled = true;
    }

    if (localStorage.getItem("Alerta de falta de produtos") == "ON") {
        document.getElementById("falta").children[0].disabled = true;
        document.getElementById("falta").children[1].disabled = false;
    } else {
        document.getElementById("falta").children[0].disabled = false;
        document.getElementById("falta").children[1].disabled = true;
    }
}

function defineOrderOfProducts(){
    console.log(document.getElementById("quantidade"));
    if(document.getElementById("quantidade").checked){
        localStorage.setItem("Ordenar produtos por: ", "Quantidade");
    }else{
        localStorage.setItem("Ordenar produtos por: ", "Validade");
    }
}

function showProdutsOption(){

}