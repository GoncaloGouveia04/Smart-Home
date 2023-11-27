"use strict";

const temperatureSlider = document.getElementById('temperature-slider');

const temperatureDisplay = document.getElementById('temperature-display');

const speedSlider = document.getElementById('speed-slider');

const speedDisplay = document.getElementById('speed-display');

const guardarBtn = document.getElementById("guardarBtn");

window.addEventListener("load", principal);

function principal() {
    defineEventHandlers();
    getOptions();
}

function defineEventHandlers() {
    temperatureSlider.addEventListener('input', updateTemperatureDisplay);
    speedSlider.addEventListener('input', updateSpeedDisplay);
    guardarBtn.addEventListener("click", saveOptions);
}

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

function saveID(clicked_id) {
    currentDivision = clicked_id;
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

    window.location.href = "acPage.html";
}

function getOptions(){
    var currentDivision = sessionStorage.getItem("currentDivision");
    if (currentDivision == "alterarSala1") {
        speedSlider.value = sessionStorage.getItem("Velocidade Sala1");
        temperatureSlider.value = sessionStorage.getItem("Temperatura Sala1");
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Sala1");
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Sala1");
    }
    else if (currentDivision == "alterarQuarto") {
        speedSlider.value = sessionStorage.getItem("Velocidade Quarto");
        temperatureSlider.value = sessionStorage.getItem("Temperatura Quarto");
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Quarto");
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Quarto"); 
    }
    else if (currentDivision == "alterarCozinha") {
        speedSlider.value = sessionStorage.getItem("Velocidade Cozinha");
        temperatureSlider.value = sessionStorage.getItem("Temperatura Cozinha");
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Cozinha");
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Cozinha");
    }
    else {
        speedSlider.value = sessionStorage.getItem("Velocidade Sala2");
        temperatureSlider.value = sessionStorage.getItem("Temperatura Sala2");
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Sala2");
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Sala2");
    }
}