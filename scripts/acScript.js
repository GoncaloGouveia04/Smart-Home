"use strict";

const temperatureSlider = document.getElementById('temperature-slider');

const temperatureDisplay = document.getElementById('temperature-display');

const speedSlider = document.getElementById('speed-slider');

const speedDisplay = document.getElementById('speed-display');

const guardarBtb = document.getElementById("guardarBtn");

window.addEventListener("load", principal);

function principal() {
    loadOptions();

}

function loadOptions(){
    document.getElementById("temperaturaSala1").innerHTML=sessionStorage.getItem("Temperatura Sala1");
    document.getElementById("velocidadeSala1").innerHTML=sessionStorage.getItem("Velocidade Sala1");
    document.getElementById("temperaturaQuarto").innerHTML=sessionStorage.getItem("Temperatura Quarto");
    document.getElementById("velocidadeQuarto").innerHTML=sessionStorage.getItem("Velocidade Quarto");
    document.getElementById("temperaturaCozinha").innerHTML=sessionStorage.getItem("Temperatura Cozinha");
    document.getElementById("velocidadeCozinha").innerHTML=sessionStorage.getItem("Velocidade Cozinha");
    document.getElementById("temperaturaSala2").innerHTML=sessionStorage.getItem("Temperatura Sala2");
    document.getElementById("velocidadeSala2").innerHTML=sessionStorage.getItem("Velocidade Sala2");
}

temperatureSlider.addEventListener('input', updateTemperatureDisplay);
speedSlider.addEventListener('input', updateSpeedDisplay);
guardarBtb.addEventListener("click", saveOptions);


function updateTemperatureDisplay() {
    const temperatureValue = temperatureSlider.value;
    temperatureDisplay.textContent = temperatureValue + '°C';
}

function updateSpeedDisplay() {
    const speedValue = speedSlider.value;
    speedDisplay.textContent = speedValue;
}

updateTemperatureDisplay();
updateSpeedDisplay();

function saveValues(clicked_id) {
    var currentDivision = clicked_id;
    sessionStorage.setItem("currentDivision", currentDivision);
    window.location.href="../IC/alterar.html";
}

function saveOptions(){
    var velocidade = speedSlider.value;
    var temperatura = temperatureSlider.value;
    var currentDivision = sessionStorage.getItem("currentDivision");
    if(currentDivision == "alterarSala1"){
        sessionStorage.setItem("Velocidade Sala1", velocidade);
        sessionStorage.setItem("Temperatura Sala1", temperatura + '°C');
    }
    else if(currentDivision == "alterarQuarto"){
        sessionStorage.setItem("Velocidade Quarto", velocidade);
        sessionStorage.setItem("Temperatura Quarto", temperatura + '°C');
    }
    else if(currentDivision == "alterarCozinha"){
        sessionStorage.setItem("Velocidade Cozinha", velocidade);
        sessionStorage.setItem("Temperatura Cozinha", temperatura + '°C');
    }
    else{
        sessionStorage.setItem("Velocidade Sala2", velocidade);
        sessionStorage.setItem("Temperatura Sala2", temperatura + '°C');
    }

    window.location.href="../IC/acPage.html";
}