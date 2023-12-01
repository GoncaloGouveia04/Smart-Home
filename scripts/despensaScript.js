"use strict";

const AC_BUTTON = "acbtn";

const ESTORES_BUTTON = "estoresbtn";

const DESPENSA_BUTTON = "despensabtn";

const DESPENSA_DIV = "despensaArea";

const OPTIONS_BUTTON = "optionsBtn";

const CLOSE_OPTIONS_WINDOW_BTN = "closeBtn";

const popupDiv = document.getElementById("definicoes-window");

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

let productsList = null;
let despensaProductsList = null;
let freezerProductsList = null;

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
    result = result + todaysDate.getFullYear() + "/" + (todaysDate.getMonth() + 1) + "/" + todaysDate.getDate();
    if (freezerProducts.indexOf(product) >= 0) {
    }
    return result;
}

function principal() {


    getOrderBy();
    getAlarms();
    productsList = JSON.parse(localStorage.getItem("productsList")) || [];
    if (productsList.length == 0) {
        productsList = getProductsList(allProductsNameList);
        localStorage.setItem("productsList", JSON.stringify(productsList));
    }
    despensaProductsList = JSON.parse(localStorage.getItem("despensaProductsList")) || [];
    if (despensaProductsList.length == 0) {
        despensaProductsList = getProductsList(despensaProducts);
        localStorage.setItem("despensaProductsList", JSON.stringify(despensaProductsList));
    }
    freezerProductsList = JSON.parse(localStorage.getItem("freezerProductsList")) || [];
    if (freezerProductsList.length == 0) {
        freezerProductsList = getProductsList(freezerProducts);
        localStorage.setItem("freezerProductsList", JSON.stringify(freezerProductsList));
    }
    document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
    defineEventHandlers();

}

function defineEventHandlers() {
    document.getElementById(OPTIONS_BUTTON).addEventListener("click", showWindow);
    document.getElementById(CLOSE_OPTIONS_WINDOW_BTN).addEventListener("click", closeWindow);
    document.getElementById("produtosDespensa").addEventListener("change", function () {
        if (this.checked) {
            let html = '<table id="tabelaProdutosDespensa">';
            let i = 0;
            let selectedOrder = [];
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
            document.getElementById("tabelaDespensa").innerHTML = html;
            defineEventHandlers();
        } else {
            productsList = JSON.parse(localStorage.getItem("productsList"));
            document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
            defineEventHandlers();
        }
    });
    document.getElementById("produtosFrigorifico").addEventListener("change", function () {
        if (this.checked) {
            let html = '<table id="tabelaProdutosDespensa">';
            let i = 0;
            let selectedOrder = [];
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
            document.getElementById("tabelaDespensa").innerHTML = html;
            defineEventHandlers();
        } else {
            productsList = JSON.parse(localStorage.getItem("productsList"));
            document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
            defineEventHandlers();
        }

    });
    document.getElementById("quantidade").addEventListener("click", function () {
        localStorage.setItem("Ordenar por:", "quantidade");
        displayDespensaHTML();
        document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
        defineEventHandlers();
    });
    document.getElementById("dataValidade").addEventListener("click", function () {
        localStorage.setItem("Ordenar por:", "dataValidade");
        displayDespensaHTML();
        document.getElementById("tabelaDespensa").innerHTML = displayDespensaHTML();
        defineEventHandlers();
    });
    if (document.getElementById("produtosDespensa").checked == true) {
        for (let i = 0; i < despensaProductsList.length; i++) {
            let product = despensaProductsList[i];
            let productElement = document.getElementById("td_" + product.id);
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseenter", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "#FFFFC2";
                });
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseleave", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "transparent";
                });
            productElement.addEventListener("click", function () {
                let imagemProduto = document.getElementById(product.id).src;
                let produtoPopup = "comprarProdutoDiv";
                document.getElementById(produtoPopup).style.display = "block";
                let div = "<div id='productInformation'>";
                div +=
                    "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float:right;'>Fechar</button>";
                div += "<br>";
                div += "<h3 style='text-align:center;'>" + product.name + "</h3>";
                div +=
                    "<center><img src='" +
                    imagemProduto +
                    "' width=100 height=100'></img></center>";
                div +=
                    "<center><p>&nbsp &nbsp &nbspQuantidade: " +
                    product.quantity +
                    " &nbsp &nbsp &nbsp Data de Validade: " +
                    product.expireDate +
                    "</p></center>";
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
                    div +=
                        "<center><img src='" +
                        imagemProduto +
                        "' width=100 height=100'></img></center>";
                    div += "<br>";
                    div +=
                        "<input type=number min=1 max=30  value=1 id='buyInput'></input>";
                    div += "<br>";
                    div +=
                        '<button id="comprarBtn" style="margin-top: 10px;">Comprar</button>';
                    document.getElementById(produtoPopup).innerHTML = div;
                    document.getElementById("comprarBtn").addEventListener("click", function () {
                        product.quantity = parseInt(document.getElementById("buyInput").value) + parseInt(product.quantity);
                        product.quantity = parseInt(product.quantity);
                        document.getElementById("comprarProdutoDiv").style.display = "none";

                    });
                });
            });
        }
    } else if (document.getElementById("produtosFrigorifico").checked == true) {
        for (let i = 0; i < freezerProductsList.length; i++) {
            let product = freezerProductsList[i];
            let productElement = document.getElementById("td_" + product.id);
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseenter", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "#FFFFC2";
                });
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseleave", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "transparent";
                });
            productElement.addEventListener("click", function () {
                let imagemProduto = document.getElementById(product.id).src;
                let produtoPopup = "comprarProdutoDiv";
                document.getElementById(produtoPopup).style.display = "block";
                let div = "<div id='productInformation'>";
                div +=
                    "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float:right;'>Fechar</button>";
                div += "<br>";
                div += "<h3 style='text-align:center;'>" + product.name + "</h3>";
                div +=
                    "<center><img src='" +
                    imagemProduto +
                    "' width=100 height=100'></img></center>";
                div +=
                    "<center><p>&nbsp &nbsp &nbspQuantidade: " +
                    product.quantity +
                    " &nbsp &nbsp &nbsp Data de Validade: " +
                    product.expireDate +
                    "</p></center>";
                div += "<br>";
                div += "<center><button id='comprarProduto'>Comprar</button></center>";
                document.getElementById(produtoPopup).innerHTML = div + "</div>";
                document
                    .getElementById("comprarProduto")
                    .addEventListener("click", function () {
                        document.getElementById("productInformation").style.display = "none";
                        let produtoPopup = "comprarProdutoDiv";
                        let div = '<div id="buyProductDiv">';
                        div +=
                            "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float: right;'>Fechar</button>";
                        div += "<br>";
                        div += "<h3>" + product.name + "</h3>";
                        div +=
                            "<center><img src='" +
                            imagemProduto +
                            "' width=100 height=100'></img></center>";
                        div += "<br>";
                        div +=
                            "<input type=number min=1 max=30  value=1 id='buyInput'></input>";
                        div += "<br>";
                        div +=
                            '<button id="comprarBtn" style="margin-top: 10px;">Comprar</button>';
                        document.getElementById(produtoPopup).innerHTML = div;
                        document
                            .getElementById("comprarBtn")
                            .addEventListener("click", function () {
                                product.quantity = parseInt(document.getElementById("buyInput").value) + parseInt(product.quantity);
                                product.quantity = parseInt(product.quantity);
                                document.getElementById("comprarProdutoDiv").style.display = "none";

                            });
                    });
            });
        }
    }
    else {
        for (let i = 0; i < productsList.length; i++) {
            let product = productsList[i];
            let productElement = document.getElementById("td_" + product.id);
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseenter", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "#FFFFC2";
                });
            document
                .getElementById("td_" + product.id)
                .addEventListener("mouseleave", function () {
                    document.getElementById("td_" + product.id).style.background =
                        "transparent";
                });
            productElement.addEventListener("click", function () {
                let imagemProduto = document.getElementById(product.id).src;
                let produtoPopup = "comprarProdutoDiv";
                document.getElementById(produtoPopup).style.display = "block";
                let div = "<div id='productInformation'>";
                div +=
                    "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float:right;'>Fechar</button>";
                div += "<br>";
                div += "<h3 style='text-align:center;'>" + product.name + "</h3>";
                div +=
                    "<center><img src='" +
                    imagemProduto +
                    "' width=100 height=100'></img></center>";
                div +=
                    "<center><p>&nbsp &nbsp &nbspQuantidade: " +
                    product.quantity +
                    " &nbsp &nbsp &nbsp Data de Validade: " +
                    product.expireDate +
                    "</p></center>";
                div += "<br>";
                div += "<center><button id='comprarProduto'>Comprar</button></center>";
                document.getElementById(produtoPopup).innerHTML = div + "</div>";
                document
                    .getElementById("comprarProduto")
                    .addEventListener("click", function () {
                        document.getElementById("productInformation").style.display = "none";
                        let produtoPopup = "comprarProdutoDiv";
                        let div = '<div id="buyProductDiv">';
                        div +=
                            "<button onclick='document.getElementById(\"comprarProdutoDiv\").style.display = \"none\";' style='float: right;'>Fechar</button>";
                        div += "<br>";
                        div += "<h3>" + product.name + "</h3>";
                        div +=
                            "<center><img src='" +
                            imagemProduto +
                            "' width=100 height=100'></img></center>";
                        div += "<br>";
                        div +=
                            "<input type=number min=1 max=30  value=1 id='buyInput'></input>";
                        div += "<br>";
                        div +=
                            '<button id="comprarBtn" style="margin-top: 10px;">Comprar</button>';
                        document.getElementById(produtoPopup).innerHTML = div;
                        document
                            .getElementById("comprarBtn")
                            .addEventListener("click", function () {
                                product.quantity =
                                    parseInt(document.getElementById("buyInput").value) +
                                    parseInt(product.quantity);
                                product.quantity = parseInt(product.quantity);
                                document.getElementById("comprarProdutoDiv").style.display =
                                    "none";
                            });
                    });
            });
        }
    }
    defineAlarms();
    defineOrderOfProducts();
}

function displayDespensaHTML() {
    let html = '<table id="tabelaProdutosDespensa">';
    let i = 0;
    let selectedOrder = [];
    if (document.getElementById("produtosDespensa").checked == true) {
        if (document.getElementById("quantidade").checked == true) {
            let orderedProductsQuantity = orderByQuantity(despensaProductsList);
            selectedOrder = orderedProductsQuantity;
        } else if (document.getElementById("dataValidade").checked == true) {
            let orderedProductsValidity = orderByValidity(despensaProductsList);
            selectedOrder = orderedProductsValidity;
        } else {
            selectedOrder = despensaProductsList;
        }
    } else if (document.getElementById("produtosFrigorifico").checked == true) {
        if (document.getElementById("quantidade").checked == true) {
            let orderedProductsQuantity = orderByQuantity(freezerProductsList);
            selectedOrder = orderedProductsQuantity;
        } else if (document.getElementById("dataValidade").checked == true) {
            let orderedProductsValidity = orderByValidity(freezerProductsList);
            selectedOrder = orderedProductsValidity;
        } else {
            selectedOrder = freezerProductsList;
        }
    } else {
        if (document.getElementById("quantidade").checked == true) {
            let orderedProductsQuantity = orderByQuantity(productsList);
            selectedOrder = orderedProductsQuantity;
        } else if (document.getElementById("dataValidade").checked == true) {
            let orderedProductsValidity = orderByValidity(productsList);
            selectedOrder = orderedProductsValidity;
        } else {
            selectedOrder = productsList;
        }
    }

    if (document.getElementById("produtosDespensa").checked == true && document.getElementById("produtosFrigorifico").checked == true) {
        if (document.getElementById("quantidade").checked == true) {
            let orderedProductsQuantity = orderByQuantity(productsList);
            selectedOrder = orderedProductsQuantity;
        } else if (document.getElementById("dataValidade").checked == true) {
            let orderedProductsValidity = orderByValidity(productsList);
            selectedOrder = orderedProductsValidity;
        } else {
            selectedOrder = productsList;
        }
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
    document
        .getElementById("validade")
        .children[0].addEventListener("click", function () {
            document.getElementById("validade").children[0].disabled = true;
            document.getElementById("validade").children[1].disabled = false;
            localStorage.setItem("Alerta de data de validade", "ON");
        });

    document
        .getElementById("validade")
        .children[1].addEventListener("click", function () {
            document.getElementById("validade").children[1].disabled = true;
            document.getElementById("validade").children[0].disabled = false;
            localStorage.setItem("Alerta de data de validade", "OFF");
        });

    document
        .getElementById("falta")
        .children[0].addEventListener("click", function () {
            document.getElementById("falta").children[0].disabled = true;
            document.getElementById("falta").children[1].disabled = false;
            localStorage.setItem("Alerta de falta de produtos", "ON");
        });

    document
        .getElementById("falta")
        .children[1].addEventListener("click", function () {
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

function defineOrderOfProducts() { }

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