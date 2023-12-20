"use strict";

window.addEventListener("load", principal);

let carrinho = null;
let productsList = null;
const CARRINHO_DIV = "carrinho";
const BUY_BUTTON = "buyBtn";
const paymentPopup = document.getElementById('paymentPopup');
const closePopupBtn = document.getElementById('closePopupBtn');
const paypalFields = document.getElementById('paypalFields');
const creditCardFields = document.getElementById('creditCardFields');
const mbwayFields = document.getElementById('mbwayFields');

const priceRanges = {
    "Barra de Chocolate": 2.5,
    "Cereais": 3.0,
    "Iogurte Natural": 1.8,
    "Maçã": 0.5,
    "Azeite": 5.0,
    "Pacote de Bolacha": 2.2,
    "Leite": 1.0,
    "Leite Condensado": 2.8,
    "Lata de Atum": 1.5,
    "Posta de Salmão": 7.5,
    "Cenoura": 1.0,
    "Tomate": 0.8,
    "Pacote de Arroz": 3.5,
    "Pacote de Massa": 2.0,
    "Batata": 1.2,
    "Lombo de Porco": 6.0,
    "Peito de Frango": 4.0,
    "Picanha": 12.0,
    "Garrafa de Água": 0.7,
    "Pacote de açúcar": 1.5,
    "Pacote de Sal": 0.8,
    "Conserva de Feijão": 2.2,
    "Conserva de Grão": 1.8,
    "Saco de Café": 4.5,
    "Doce de Morango": 3.0,
};

function getProductPrice(name){
    return priceRanges[name];
}

function principal() {

    carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    productsList = JSON.parse(sessionStorage.getItem("productsList")) || [];
    localStorage.setItem("carrinho", JSON.stringify(carrinho)) || [];
    document.getElementById(CARRINHO_DIV).innerHTML = loadCart();
    defineEventHandlers();
    loadCart();
}

function defineEventHandlers() {
    document.getElementById(BUY_BUTTON).addEventListener("click", buyProducts);
    carrinho.forEach(element => {
        document.getElementById(element.product.id + "removeItem").addEventListener("click", function () {
            removeProducts(element);
        });
    });
    closePopupBtn.addEventListener('click', function () {
        paymentPopup.style.display = 'none';
    });

    document.getElementById('paypalBtn').addEventListener('click', function () {
        showPaymentFields('paypalFields');
    });

    document.getElementById('creditCardBtn').addEventListener('click', function () {
        showPaymentFields('creditCardFields');
    });

    document.getElementById('mbwayBtn').addEventListener('click', function () {
        showPaymentFields('mbwayFields');
    });
}

function loadCart() {
    let html = "";

    if (carrinho.length == 0) {
        html = "<h3>O carrinho está vazio!</h3>";
    } else {
        for (let i = 0; i < carrinho.length; i++) {
            var product = carrinho[i];
            html += "<div class='produto' id='" + product.product.id + "'>";
            html += "<img src='imagens/" + product.product.id + ".png' width='100' height='100' id='imgProduto'>";
            html += "<p>" + product.product.name + "</p>";
            html += "<div class='quantity'>";
            html += "<button class='btn minus1' onclick='decreaseQuantity(\"" + product.product.id + "\")'>-</button>"
            html += "<input min=1 value=" + product.quantity + " type='number' id='" + product.product.id + "buyInput' readonly>";
            html += "<button class='btn add1' onclick='increaseQuantity(\"" + product.product.id + "\")'>+</button>";
            html += "</div>"
            html += "<button id='" + product.product.id + "removeItem' class='removeItem'>Remover</button>";
            html += "</div>";
        }
    }
    return html;
}

function increaseQuantity(productId) {
    const inputElement = document.getElementById(productId + "buyInput");
    const currentQuantity = parseInt(inputElement.value);
    inputElement.value = currentQuantity + 1;
}

function decreaseQuantity(productId) {
    const inputElement = document.getElementById(productId + "buyInput");
    const currentQuantity = parseInt(inputElement.value);
    if (currentQuantity > 1) {
        inputElement.value = currentQuantity - 1;
    }
}

function buyProducts() {
    if (carrinho.length > 0) {
        if (confirm("Tem a certeza que quer continuar?")) {
            let total = 0;
            for(let i = 0; i < carrinho.length; i++){
                Object.keys(priceRanges).forEach(function(element) {
                    if (carrinho[i].product.name == element) {
                        total = total + getProductPrice(element);
                    }
                });
            }
            document.getElementById("paymentPopup").style.display = "block";
            document.getElementById("total").innerHTML = "Total: " + total + "€";
        }
    } else {
        window.alert("Não tem produtos no carrinho!");
    }
}

function removeProducts(id) {
    // Encontrar o índice do produto no array
    const index = carrinho.findIndex(element => element === id);

    if (index !== -1) {
        // Remover o elemento do array usando splice
        carrinho.splice(index, 1);

        const elementToRemove = document.getElementById(id.product.id);
        document.getElementById(CARRINHO_DIV).removeChild(elementToRemove);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

        window.location.href = "carrinho.html";
    }
}

function payProducts() {

    if (document.getElementById("paypalEmail").value == ""
        && creditCardFields.style.display == 'none'
        && mbwayFields.style.display == 'none'
        || document.getElementById("cardNumber").value == ""
        && paypalFields.style.display == 'none'
        && mbwayFields.style.display == 'none'
        || document.getElementById("expirationDate").value == ""
        && paypalFields.style.display == 'none'
        && mbwayFields.style.display == 'none'
        || document.getElementById("mbwayNumber").value == ""
        && paypalFields.style.display == 'none'
        && creditCardFields.style.display == 'none') {
        window.alert("Preencha todos os campos necessários!");
    } else {
        for (let i = 0; i < carrinho.length; i++) {
            let produto = carrinho[i];
            for (let j = 0; j < productsList.length; j++) {
                if (produto.product.id == productsList[j].id) {
                    productsList[j].quantity = parseInt(productsList[j].quantity) + parseInt(document.getElementById(produto.product.id + "buyInput").value);
                }
            }
        }
        window.alert("Produtos pagos com sucesso!");
        sessionStorage.setItem("productsList", JSON.stringify(productsList));
        localStorage.setItem("productsList", JSON.stringify(productsList));
        sessionStorage.removeItem("carrinho");
        localStorage.removeItem("carrinho");
        window.location.href = "despensaPage.html";
        sessionStorage.removeItem("carrinho");
        localStorage.removeItem("carrinho");
    }
}

function showPaymentFields(paymentType) {
    paypalFields.style.display = 'none';
    creditCardFields.style.display = 'none';
    mbwayFields.style.display = 'none';

    document.getElementById(paymentType).style.display = 'block';
}