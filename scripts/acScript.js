"use strict";

window.addEventListener("load", principal);

function principal() {
    loadOptions();
    setACStatus();
    getACStatus();
}

function loadOptions() {
    document.getElementById("temperaturaSala1").innerHTML = sessionStorage.getItem("Temperatura Sala1");
    document.getElementById("velocidadeSala1").innerHTML = sessionStorage.getItem("Velocidade Sala1");
    document.getElementById("temperaturaQuarto").innerHTML = sessionStorage.getItem("Temperatura Quarto");
    document.getElementById("velocidadeQuarto").innerHTML = sessionStorage.getItem("Velocidade Quarto");
    document.getElementById("temperaturaCozinha").innerHTML = sessionStorage.getItem("Temperatura Cozinha");
    document.getElementById("velocidadeCozinha").innerHTML = sessionStorage.getItem("Velocidade Cozinha");
    document.getElementById("temperaturaSala2").innerHTML = sessionStorage.getItem("Temperatura Sala2");
    document.getElementById("velocidadeSala2").innerHTML = sessionStorage.getItem("Velocidade Sala2");
    document.getElementById("velocidadeQuarto").innerHTML = sessionStorage.getItem("Velocidade Quarto");
    document.getElementById("temperaturaCozinha").innerHTML = sessionStorage.getItem("Temperatura Cozinha");
    document.getElementById("velocidadeCozinha").innerHTML = sessionStorage.getItem("Velocidade Cozinha");
    document.getElementById("temperaturaSala2").innerHTML = sessionStorage.getItem("Temperatura Sala2");
    document.getElementById("velocidadeSala2").innerHTML = sessionStorage.getItem("Velocidade Sala2");
}

function saveValues(clicked_id) {
    var currentDivision = clicked_id;
    sessionStorage.setItem("currentDivision", currentDivision);
    window.location.href = "alterar.html";
}

function saveOptions() {
    var velocidade = speedSlider.value;
    var temperatura = temperatureSlider.value;
    var currentDivision = sessionStorage.getItem("currentDivision");
    if (currentDivision == "alterarSala1") {
        sessionStorage.setItem("Velocidade Sala1", velocidade);
        sessionStorage.setItem("Temperatura Sala1", temperatura + '°C');
    }
    else if (currentDivision == "alterarQuarto") {
        sessionStorage.setItem("Velocidade Quarto", velocidade);
        sessionStorage.setItem("Temperatura Quarto", temperatura + '°C');
    }
    else if (currentDivision == "alterarCozinha") {
        sessionStorage.setItem("Velocidade Cozinha", velocidade);
        sessionStorage.setItem("Temperatura Cozinha", temperatura + '°C');
    }
    else {
        sessionStorage.setItem("Velocidade Sala2", velocidade);
        sessionStorage.setItem("Temperatura Sala2", temperatura + '°C');
    }

    window.location.href = "../IC/acPage.html";
}

function setACStatus() {
    document.getElementById("optionsSala1").children[0].addEventListener("click",  function (){
        document.getElementById("optionsSala1").children[0].disabled = true;
        document.getElementById("optionsSala1").children[1].disabled = false;
        localStorage.setItem("statusACSala1", "LIGADO");
    });
    document.getElementById("optionsSala1").children[1].addEventListener("click", function(){
        document.getElementById("optionsSala1").children[0].disabled = false;
        document.getElementById("optionsSala1").children[1].disabled = true;
        localStorage.setItem("statusACSala1", "DESLIGADO");
    });
    document.getElementById("optionsQuarto").children[0].addEventListener("click",  function (){
        document.getElementById("optionsQuarto").children[0].disabled = true;
        document.getElementById("optionsQuarto").children[1].disabled = false;
        localStorage.setItem("statusACQuarto", "LIGADO");
    });
    document.getElementById("optionsQuarto").children[1].addEventListener("click", function(){
        document.getElementById("optionsQuarto").children[0].disabled = false;
        document.getElementById("optionsQuarto").children[1].disabled = true;
        localStorage.setItem("statusACQuarto", "DESLIGADO");
    });
    document.getElementById("optionsCozinha").children[0].addEventListener("click",  function (){
        document.getElementById("optionsCozinha").children[0].disabled = true;
        document.getElementById("optionsCozinha").children[1].disabled = false;
        localStorage.setItem("statusACCozinha", "LIGADO");
    });
    document.getElementById("optionsCozinha").children[1].addEventListener("click", function(){
        document.getElementById("optionsCozinha").children[0].disabled = false;
        document.getElementById("optionsCozinha").children[1].disabled = true;
        localStorage.setItem("statusACCozinha", "DESLIGADO");
    });
    document.getElementById("optionsSala2").children[0].addEventListener("click",  function (){
        document.getElementById("optionsSala2").children[0].disabled = true;
        document.getElementById("optionsSala2").children[1].disabled = false;
        localStorage.setItem("statusACSala2", "LIGADO");
    });
    document.getElementById("optionsSala2").children[1].addEventListener("click", function(){
        document.getElementById("optionsSala2").children[0].disabled = false;
        document.getElementById("optionsSala2").children[1].disabled = true;
        localStorage.setItem("statusACSala2", "DESLIGADO");
    });
}

function getACStatus() {
    if(localStorage.getItem("statusACSala1") == "LIGADO"){
        document.getElementById("optionsSala1").children[0].disabled = true;
    }else{
        document.getElementById("optionsSala1").children[1].disabled = true;
    }

    if(localStorage.getItem("statusACQuarto") == "LIGADO"){
        document.getElementById("optionsQuarto").children[0].disabled = true;
    }else{
        document.getElementById("optionsQuarto").children[1].disabled = true;
    }

    if(localStorage.getItem("statusACCozinha") == "LIGADO"){
        document.getElementById("optionsCozinha").children[0].disabled = true;
    }else{
        document.getElementById("optionsCozinha").children[1].disabled = true;
    }

    if(localStorage.getItem("statusACSala2") == "LIGADO"){
        document.getElementById("optionsSala2").children[0].disabled = true;
    }else{
        document.getElementById("optionsSala2").children[1].disabled = true;
    }
}