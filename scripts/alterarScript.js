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
    document.getElementById("backBtn").addEventListener("click", back);
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
    var currentDivision = sessionStorage.getItem("currentDivision") || localStorage.getItem("currentDivision");
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
        temperatureSlider.value = sessionStorage.getItem("Temperatura Sala1").slice(0,2) || 25;
        speedSlider.value = sessionStorage.getItem("Velocidade Sala1") || temperatureSlider;
        speedDisplay.innerHTML = parseInt(sessionStorage.getItem("Velocidade Sala1")) || 3;
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Sala1") || 25 + "°C";
    }
    else if (currentDivision == "alterarQuarto") {
        speedSlider.value = parseInt(sessionStorage.getItem("Velocidade Quarto")) || 3;
        temperatureSlider.value = sessionStorage.getItem("Temperatura Quarto").slice(0,2) || 25;
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Quarto") || 3;
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Quarto") || 25 + "°C"; 
    }
    else if (currentDivision == "alterarCozinha") {
        speedSlider.value = parseInt(sessionStorage.getItem("Velocidade Cozinha")) || 3;
        temperatureSlider.value = sessionStorage.getItem("Temperatura Cozinha").slice(0,2) || 25;
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Cozinha") || 3;
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Cozinha") || 25 + "°C";
    }
    else {
        speedSlider.value = parseSlider(sessionStorage.getItem("Velocidade Sala2")) || 3;
        temperatureSlider.value = sessionStorage.getItem("Temperatura Sala2").slice(0,2) || 25;
        speedDisplay.innerHTML = sessionStorage.getItem("Velocidade Sala2") || 3;
        temperatureDisplay.innerHTML = sessionStorage.getItem("Temperatura Sala2") || 25 + "°C";
    }
}

function back(){
    if(confirm("Tem a certeza que quer voltar sem guardar?")){
        window.location.href = "acPage.html";
    }
}