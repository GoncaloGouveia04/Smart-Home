"use strict";

const temperatureSlider = document.getElementById('temperature-slider');

const temperatureDisplay = document.getElementById('temperature-display');

const speedSlider = document.getElementById('speed-slider');

const speedDisplay = document.getElementById('speed-display');

window.addEventListener("load", principal);

function principal() {
    defineEventHandlers();
}

function defineEventHandlers() {
    temperatureSlider.addEventListener('input', updateTemperatureDisplay);
    speedSlider.addEventListener('input', updateSpeedDisplay);
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