"use strict";

const AC_BUTTON = "acbtn";

const ESTORES_BUTTON = "estoresbtn";

const DESPENSA_BUTTON = "despensabtn";

const DESPENSA_DIV = "despensaArea";

const OPTIONS_BUTTON = "optionsBtn";

const CLOSE_OPTIONS_WINDOW_BTN = "closeBtn";

const popupDiv = document.getElementById("definicoes-window");

const ecraDiv = document.getElementById("ecra");

const allProductsNameList = ["Barra de Chocolate", "Cereais", "Iogurte Natural", "Maçã", "Azeite",
    "Pacote de Bolacha", "Leite", "Leite Condensado", "Lata de Atum", "Posta de Salmão",
    "Cenoura", "Tomate", "Pacote de Arroz", "Pacote de Massa", "Batata",
    "Lombo de Porco", "Peito de Frango", "Picanha", "Garrafa de Água", "Pacote de açúcar",
    "Pacote de Sal", "Conserva de Feijão", "Conserva de Grão", "Saco de Café", "Doce de Morango"]

const freezerProducts = ["Iogurte Natural", "Posta de Salmão", "Lombo de Porco", "Peito de Frango", "Picanha",
    "Cenoura", "Tomate", "Maçã", "Leite"]

const despensaProducts = ["Barra de Chocolate", "Cereais", "Azeite", "Pacote de Bolacha", "Leite Condensado", "Lata de Atum",
    "Pacote de Arroz", "Pacote de Massa", "Batata", "Garrafa de Água", "Pacote de açúcar",
    "Pacote de Sal", "Conserva de Feijão", "Conserva de Grão", "Saco de Café", "Doce de Morango"]

window.addEventListener("load", principal);

function Product(name) {
    this.name = name;
    this.quantity = Math.floor(Math.random() * 11);
    this.expireDate = dateGenerator(this.name);
    this.id = getProductID(name);
}

function getProductsList(allProductsNameList) {
    let productsList = [];
    for (let p of allProductsNameList) {
        let product = new Product(p);
        productsList.push(product);
    }

    return productsList;
}

function getProductID(product) {
    let productConverter = product.toLowerCase().replace("ã", "a").replace("á", "a").replace("é", "e").replace("ú", "u").replace("ç", "c");
    let prodList = productConverter.split(" ");
    let productID = "";
    for (let word of prodList) {
        productID = productID + word;
    }

    return productID;
}

function dateGenerator(product) {
    let todaysDate = new Date();
    let result = ""
    result = result + todaysDate.getFullYear() + "/" + (todaysDate.getMonth() + 1) + "/" + todaysDate.getDate();
    if (freezerProducts.indexOf(product) >= 0) {

    }
    else {

    }
    return result;
}
function principal() {
    //addProducts();
    getAlarms();
    document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML(allProductsNameList);
    defineEventHandlers();

}

function defineEventHandlers() {
    document.getElementById(OPTIONS_BUTTON).addEventListener("click", showWindow);
    document.getElementById(CLOSE_OPTIONS_WINDOW_BTN).addEventListener("click", closeWindow);

    let productsList = getProductsList(allProductsNameList);
    for (let i = 0; i < productsList.length; i++) {
        let product = productsList[i];
        let productElement = document.getElementById("td_"+product.id);
        document.getElementById("td_"+product.id).addEventListener("mouseenter", function () {
            document.getElementById("td_"+product.id).style.backgroundColor = "#808080";
        })
        document.getElementById("td_"+product.id).addEventListener("mouseleave", function () {
            document.getElementById("td_"+product.id).style.backgroundColor = "transparent";
        })
        productElement.addEventListener("click", function () {
            let imagemProduto = document.getElementById(product.id).src;
            let produtoPopup = "comprarProdutoDiv";
            document.getElementById(produtoPopup).style.display = "block";
            let div = "<div>";
            div += "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float:right;'>Fechar</button>";
            div += "<br>"
            div += "<h3 style='text-align:center;'>" + product.name + "</h3>";
            div += "<center><img src='" + imagemProduto + "' width=100 height=100'></img></center>";
            div += "<center><p>&nbsp &nbsp &nbspQuantidade: " + product.quantity + " &nbsp &nbsp &nbsp Data de Validade: " + product.expireDate + "</p></center>";
            div += "<br>";
            div += "<center><button>Comprar</button></center>";
            document.getElementById(produtoPopup).innerHTML = div + "</div>";
        });
    }
    defineAlarms();
    defineOrderOfProducts();
    showProductsOption();

}

function displayDespensaHTML(productsNameList) {
    let html = '<table id="tabelaProdutosDespensa">';
    let i = 0;
    let productsList = getProductsList(productsNameList);

    for (let row = 0; row < 5; row++) {
        html += "<tr>";

        for (let column = 0; column < 5; column++) {
            let product = productsList[i];
            html += "<td class='tdProduto' id='td_" + product.id + "'>\
            <img class='produto' id='" + product.id + "' src=imagens/" + product.id + ".png><br>" + product.name + "<br>Quantidade: " + product.quantity + "<br> Validade: " + product.expireDate + "</td>";
            i++;
        }
        html += "</tr>";

    }
    html += "</table>";
    return html;
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

function defineOrderOfProducts() {

}

function showProductsOption() {

}