"use strict";

const temperatureSlider = document.getElementById('temperature-slider');

const temperatureDisplay = document.getElementById('temperature-display');

const speedSlider = document.getElementById('speed-slider');

const speedDisplay = document.getElementById('speed-display');

const guardarBtn = document.getElementById("guardarBtn");

window.addEventListener("load", principal);

function principal() {
    defineEventHandlers();
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

    window.location.href = "../IC/acPage.html";
}