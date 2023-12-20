"use strict";

const AC_BUTTON = "acbtn";

const ESTORES_BUTTON = "estoresbtn";

const DESPENSA_BUTTON = "despensabtn";

const DESPENSA_DIV = "despensaArea";

const OPTIONS_BUTTON = "optionsBtn";

const CLOSE_OPTIONS_WINDOW_BTN = "closeBtn";

const popupDiv = document.getElementById("definicoes-window");

const CARRINHO_BUTTON = "carrinho";

const CARRINHO_DIV = "cart";

const ecraDiv = document.getElementById("ecra");

const allProductsNameList = [
    "Barra de Chocolate",
    "Cereais",
    "Iogurte Natural",
    "Maçã",
    "Azeite",
    "Pacote de Bolacha",
    "Leite",
    "Leite Condensado",
    "Lata de Atum",
    "Posta de Salmão",
    "Cenoura",
    "Tomate",
    "Pacote de Arroz",
    "Pacote de Massa",
    "Batata",
    "Lombo de Porco",
    "Peito de Frango",
    "Picanha",
    "Garrafa de Água",
    "Pacote de açúcar",
    "Pacote de Sal",
    "Conserva de Feijão",
    "Conserva de Grão",
    "Saco de Café",
    "Doce de Morango",
];

const freezerProducts = [
    "Iogurte Natural",
    "Posta de Salmão",
    "Lombo de Porco",
    "Peito de Frango",
    "Picanha",
    "Cenoura",
    "Tomate",
    "Maçã",
    "Leite",
];

const despensaProducts = [
    "Barra de Chocolate",
    "Cereais",
    "Azeite",
    "Pacote de Bolacha",
    "Leite Condensado",
    "Lata de Atum",
    "Pacote de Arroz",
    "Pacote de Massa",
    "Batata",
    "Garrafa de Água",
    "Pacote de açúcar",
    "Pacote de Sal",
    "Conserva de Feijão",
    "Conserva de Grão",
    "Saco de Café",
    "Doce de Morango",
];

let carrinho = null;
let productsList = null;
let sessionProductsList = null;
let despensaProductsList = null;
let freezerProductsList = null;
let mostrarPor = null;

window.addEventListener("load", principal);

function Product(name) {
    this.name = name;
    this.quantity = Math.floor(Math.random() * 11);
    this.expireDate = dateGenerator(this.name);
    this.id = getProductID(name);
}

function carrinhoProduct(product, quantity) {
    this.product = product;
    this.quantity = quantity;
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
    let productConverter = product
        .toLowerCase()
        .replace("ã", "a")
        .replace("á", "a")
        .replace("é", "e")
        .replace("ú", "u")
        .replace("ç", "c");
    let prodList = productConverter.split(" ");
    let productID = "";
    for (let word of prodList) {
        productID = productID + word;
    }
    return productID;
}

function dateGenerator(product) {
    let todaysDate = new Date();
    let result = "";

    // Adiciona um número aleatório de dias para a expiração
    let expirationDays = getRandomInt(7, 365); // Altere o intervalo conforme necessário
    todaysDate.setDate(todaysDate.getDate() + expirationDays);

    result = result + todaysDate.getFullYear() + "/" + (todaysDate.getMonth() + 1) + "/" + todaysDate.getDate();
    if (freezerProducts.indexOf(product) >= 0) { }
    return result;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function principal() {
    getOrderBy();
    getAlarms();
    productsList = JSON.parse(sessionStorage.getItem("productsList")) || JSON.parse(localStorage.getItem("productsList")) || [];
    if (productsList.length == 0) {
        productsList = getProductsList(allProductsNameList);
        localStorage.setItem("productsList", JSON.stringify(productsList));
        sessionStorage.setItem("productsList", JSON.stringify(productsList));
    } else {
        despensaProductsList = makeProductsList(despensaProducts);
        freezerProductsList = makeProductsList(freezerProducts);
        localStorage.setItem("despensaProductsList", JSON.stringify(despensaProductsList));
        sessionStorage.setItem("despensaProductsList", JSON.stringify(despensaProductsList));
        localStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
        sessionStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
    }
    despensaProductsList = JSON.parse(sessionStorage.getItem("despensaProductsList")) || [];
    if (despensaProductsList.length == 0) {
        despensaProductsList = makeProductsList(despensaProducts);
        localStorage.setItem("despensaProductsList", JSON.stringify(despensaProductsList));
        sessionStorage.setItem("despensaProductsList", JSON.stringify(despensaProductsList));
    }
    freezerProductsList = JSON.parse(sessionStorage.getItem("freezerProductsList")) || [];
    if (freezerProductsList.length == 0) {
        freezerProductsList = makeProductsList(freezerProducts);
        localStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
        sessionStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
    } else {
        freezerProductsList = makeProductsList(freezerProducts);
        localStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
        sessionStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
    }
    carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    if (carrinho.length != 0) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    mostrarPor = localStorage.getItem("Mostrar por:") || sessionStorage.getItem("Mostrar por:") || "";
    if (mostrarPor.length == 0) {
        sessionStorage.setItem("Mostrar por:", "alimentos");
        localStorage.setItem("Mostrar por:", "alimentos");
    }
    let selectedOrder = "";
    if (mostrarPor == "despensa") {
        document.getElementById("alimentosTexto").innerHTML = "Alimentos: Despensa";
        selectedOrder = mostrarProdutosDespensa();
    } else if (mostrarPor == "frigorifico") {
        document.getElementById("alimentosTexto").innerHTML = "Alimentos: Frigorífico";
        selectedOrder = mostrarProdutosFrigorifico();
    } else {
        selectedOrder = displayDespensaHTML();
    }
    document.getElementById("tabelaDespensa").innerHTML = selectedOrder;
    defineEventHandlers();
}

function defineEventHandlers() {
    document.getElementById(OPTIONS_BUTTON).addEventListener("click", showWindow);
    document.getElementById(CLOSE_OPTIONS_WINDOW_BTN).addEventListener("click", closeWindow);
    document.getElementById("quantidade").addEventListener("click", function () {
        localStorage.setItem("Ordenar por:", "quantidade");
        if(mostrarPor == "despensa"){
            document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosDespensa();
        }else if(mostrarPor == "frigorifico"){
            document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosFrigorifico();
        }else{
            document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
        }
        defineEventHandlers();
    });
    document.getElementById("dataValidade").addEventListener("click", function () {
        localStorage.setItem("Ordenar por:", "dataValidade");
        if(mostrarPor == "despensa"){
            document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosDespensa();
        }else if(mostrarPor == "frigorifico"){
            document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosFrigorifico();
        }else{
            document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
        }
        defineEventHandlers();
    });
    document.getElementById("produtosDespensa").addEventListener("click", function () {
        sessionStorage.setItem("Mostrar por:", "despensa");
        localStorage.setItem("Mostrar por:", "despensa");
        mostrarPor = sessionStorage.getItem("Mostrar por:");
        document.getElementById("alimentosTexto").innerHTML = "Alimentos: Despensa";
        document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosDespensa();
        defineEventHandlers();
    });
    document.getElementById("produtosFrigorifico").addEventListener("click", function () {
        sessionStorage.setItem("Mostrar por:", "frigorifico");
        localStorage.setItem("Mostrar por:", "frigorifico");
        mostrarPor = sessionStorage.getItem("Mostrar por:");
        document.getElementById("alimentosTexto").innerHTML = "Alimentos: Frigorífico";
        document.getElementById("tabelaDespensa").innerHTML = mostrarProdutosFrigorifico();
        defineEventHandlers();
    });
    let selectedOrder = [];
    if (mostrarPor == "despensa") {
        selectedOrder = despensaProductsList;
    } else if (mostrarPor == "frigorifico") {
        selectedOrder = freezerProductsList;
    } else {
        selectedOrder = productsList;
    }
    for (let i = 0; i < selectedOrder.length; i++) {
        let product = selectedOrder[i];
        let productElement = document.getElementById("td_" + product.id);
        document.getElementById("td_" + product.id).addEventListener("mouseenter", function () {
            document.getElementById("td_" + product.id).style.background = "#FFFFC2";
        });
        document.getElementById("td_" + product.id).addEventListener("mouseleave", function () {
            document.getElementById("td_" + product.id).style.background = "transparent";
        });
        productElement.addEventListener("click", function () {
            let imagemProduto = document.getElementById(product.id).src;
            let produtoPopup = "comprarProdutoDiv";
            document.getElementById(produtoPopup).style.display = "block";
            let div = "<div id='productInformation'>";
            div += "<h3 style='text-align:center;'>" + product.name + "</h3>";
            div += "<center><img src='" + imagemProduto + "' width=100 height=100'></img></center>";
            div += "<center><p>Quantidade: " + product.quantity + "</p></center>";
            div += "<br>";
            div += "<center></p>Data de Validade: " + product.expireDate + "</p></center>";
            div += "<br>";
            div += "<center><button id='comprarProduto'>Comprar</button></center>";
            document.getElementById(produtoPopup).innerHTML = div + "</div>";
            document.getElementById("comprarProduto").addEventListener("click", function () {
                document.getElementById("productInformation").style.display = "none";
                let produtoPopup = "comprarProdutoDiv";
                let div = '<div id="buyProductDiv">';
                div +=
                    "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float: right;'>Fechar</button>";
                div += "<br>";
                div += "<h3>" + product.name + "</h3>";
                div += "<center><img src='" + imagemProduto + "' width=100 height=100'></img></center>";
                div += "<br>";
                div +=
                    "Quantidade:<input type=number min=1 max=30  value=1 id='buyInput' style='margin-top: 50px;'></input>";
                div += "<br>";
                div +=
                    '<button id="comprarBtn" style="margin-top: 50px;">Comprar</button>';
                document.getElementById(produtoPopup).innerHTML = div;
                document.getElementById("comprarBtn").addEventListener("click", function () {
                    window.alert(product.name + "(" + document.getElementById("buyInput").value + ")" + " adicionado ao carrinho!");
                    var produto = new carrinhoProduct(product, document.getElementById("buyInput").value);
                    let produtoExisteNoCarrinho = false;

                    for (let j = 0; j < carrinho.length; j++) {
                        if (carrinho[j].product.name === produto.product.name) {
                            carrinho[j].quantity = parseInt(carrinho[j].quantity) + parseInt(produto.quantity);
                            produtoExisteNoCarrinho = true;
                        }
                    }
                    if (!produtoExisteNoCarrinho) {
                        carrinho.push(produto);
                    }
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
                    document.getElementById("comprarProdutoDiv").style.display = "none";
                });
            });
        });
    }
    defineAlarms();
}

function displayDespensaHTML() {
    let html = '<table id="tabelaProdutosDespensa">';
    let i = 0;
    let selectedOrder = [];
    if (document.getElementById("quantidade").checked == true) {
        let orderedProductsQuantity = orderByQuantity(productsList);
        selectedOrder = orderedProductsQuantity;
    } else if (document.getElementById("dataValidade").checked == true) {
        let orderedProductsValidity = orderByValidity(productsList);
        selectedOrder = orderedProductsValidity;
    } else {
        selectedOrder = productsList;
    }
    for (let row = 0; row < 5; row++) {
        html += "<tr>";
        for (let column = 0; column < 5; column++) {
            let product = selectedOrder[i];
            if (i < selectedOrder.length) {
                html +=
                    "<td class='tdProduto' id='td_" +
                    product.id +
                    "'>\
                    <img class='produto' id='" +
                    product.id +
                    "' src=imagens/" +
                    product.id +
                    ".png><br>" +
                    product.name +
                    "<br>Quantidade: " +
                    product.quantity +
                    "<br> Validade: " +
                    product.expireDate +
                    "</td>";
            } else {
                html += "<td></td>";
            }
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
        window.alert("Alerta de data de validade: ON");
    });

    document.getElementById("validade").children[1].addEventListener("click", function () {
        document.getElementById("validade").children[1].disabled = true;
        document.getElementById("validade").children[0].disabled = false;
        localStorage.setItem("Alerta de data de validade", "OFF");
        window.alert("Alerta de data de validade: OFF");
    });

    document.getElementById("falta").children[0].addEventListener("click", function () {
        document.getElementById("falta").children[0].disabled = true;
        document.getElementById("falta").children[1].disabled = false;
        localStorage.setItem("Alerta de falta de produtos", "ON");
        window.alert("Alerta de falta de produtos: ON");
    });

    document.getElementById("falta").children[1].addEventListener("click", function () {
        document.getElementById("falta").children[1].disabled = true;
        document.getElementById("falta").children[0].disabled = false;
        localStorage.setItem("Alerta de falta de produtos", "OFF");
        window.alert("Alerta de falta de produtos: OFF");
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

function orderByQuantity(productsList) {
    let orderedProducts = [];
    let productsList_copy = productsList;

    for (let i = 0; i < productsList.length; i++) {
        let lowestQuantity = 9999999;
        let lowestProduct = null;

        for (let product of productsList_copy) {
            if (product.quantity < lowestQuantity) {
                lowestProduct = product;
                lowestQuantity = product.quantity;
            }
        }

        orderedProducts.push(lowestProduct);

        productsList_copy = productsList_copy.filter((x) => x !== lowestProduct);
    }

    return orderedProducts;
}

function orderByValidity(productsList) {
    let orderedProducts = [];
    let productsList_copy = productsList;

    while (productsList_copy.length > 0) {
        let lowestQuantity = Infinity;
        let lowestProduct = null;

        for (let product of productsList_copy) {
            let date = product.expireDate;
            let splitDate = date.split("/");
            let dateToDays = splitDate[0] * 365 + splitDate[1] * 30 + splitDate[2];

            if (dateToDays < lowestQuantity) {
                lowestProduct = product;
                lowestQuantity = dateToDays;
            }
        }

        if (lowestProduct !== null) {
            orderedProducts.push(lowestProduct);
            productsList_copy = productsList_copy.filter((x) => x !== lowestProduct);
        }
    }

    return orderedProducts;
}

function getOrderBy() {
    if (localStorage.getItem("Ordenar por:") == "quantidade") {
        document.getElementById("quantidade").checked = true;
    } else {
        document.getElementById("dataValidade").checked = true;
    }
}

function mostrarProdutosDespensa() {
    let html = '<table id="tabelaProdutosDespensa">';
    let i = 0;
    let selectedOrder = []
    if (document.getElementById("quantidade").checked == true) {
        let orderedProductsQuantity = orderByQuantity(despensaProductsList);
        selectedOrder = orderedProductsQuantity;
    } else if (document.getElementById("dataValidade").checked == true) {
        let orderedProductsValidity = orderByValidity(despensaProductsList);
        selectedOrder = orderedProductsValidity;
    } else {
        selectedOrder = despensaProductsList;
    }
    for (let row = 0; row < 5; row++) {
        html += "<tr>";
        for (let column = 0; column < 5; column++) {
            let product = selectedOrder[i];
            if (i < selectedOrder.length) {
                html +=
                    "<td class='tdProduto' id='td_" +
                    product.id +
                    "'>\
                    <img class='produto' id='" +
                    product.id +
                    "' src=imagens/" +
                    product.id +
                    ".png><br>" +
                    product.name +
                    "<br>Quantidade: " +
                    product.quantity +
                    "<br> Validade: " +
                    product.expireDate +
                    "</td>";
            } else {
                html += "<td></td>";
            }
            i++;
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

function mostrarProdutosFrigorifico() {
    let html = '<table id="tabelaProdutosDespensa">';
    let i = 0;
    let selectedOrder = []
    if (document.getElementById("quantidade").checked == true) {
        let orderedProductsQuantity = orderByQuantity(freezerProductsList);
        selectedOrder = orderedProductsQuantity;
    } else if (document.getElementById("dataValidade").checked == true) {
        let orderedProductsValidity = orderByValidity(freezerProductsList);
        selectedOrder = orderedProductsValidity;
    } else {
        selectedOrder = freezerProductsList;
    }
    for (let row = 0; row < 5; row++) {
        html += "<tr>";
        for (let column = 0; column < 5; column++) {
            let product = selectedOrder[i];
            if (i < selectedOrder.length) {
                html +=
                    "<td class='tdProduto' id='td_" +
                    product.id +
                    "'>\
                    <img class='produto' id='" +
                    product.id +
                    "' src=imagens/" +
                    product.id +
                    ".png><br>" +
                    product.name +
                    "<br>Quantidade: " +
                    product.quantity +
                    "<br> Validade: " +
                    product.expireDate +
                    "</td>";
            } else {
                html += "<td></td>";
            }
            i++;
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

function makeProductsList(list) {
    let newProductsList = []
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < productsList.length; j++) {
            if (list[i] == productsList[j].name) {
                newProductsList.push(productsList[j])
            }
        }
    }
    return newProductsList;
}

function updateProductList() {
    let newProductsList = []
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < productsList.length; j++) {
            if (list[i] == productsList[j].name) {
                newProductsList.push(productsList[j])
            }
        }
    }
    return newProductsList;
}