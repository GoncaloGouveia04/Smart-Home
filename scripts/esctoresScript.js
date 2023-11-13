"use strict";

const CHECK_SALA = "checkboxSala";

const CHECK_QUARTO = "checkboxQuarto";

const CHECK_COZINHA = "checkboxCozinha";

const CHECK_WC = "checkboxWC";

const DIV_HORAS_SALA = "horasSala";

const DIV_HORAS_QUARTO = "horasQuarto";

const DIV_HORAS_COZINHA = "horasCozinha";

const DIV_HORAS_WC = "horasWC";

window.addEventListener("load", principal);

function principal() {

    setInterval(function time() {
        checkHoras();
        setEstoresStatus();
        setHoras();
    }, 100)

    defineEventHandlers();

    getHorasStatus();
    getEstoresStatus();
    getHoras();
}

function defineEventHandlers() {
    document.getElementById("abrirBtnSala").addEventListener("click", function () {
        estores("abrirBtnSala");
    });
    document.getElementById("fecharBtnSala").addEventListener("click", function () {
        estores("fecharBtnSala");
    });

    document.getElementById("abrirBtnQuarto").addEventListener("click", function () {
        estores("abrirBtnQuarto");
    });
    document.getElementById("fecharBtnQuarto").addEventListener("click", function () {
        estores("fecharBtnQuarto");
    });

    document.getElementById("abrirBtnCozinha").addEventListener("click", function () {
        estores("abrirBtnCozinha");
    });
    document.getElementById("fecharBtnCozinha").addEventListener("click", function () {
        estores("fecharBtnCozinha");
    });

    document.getElementById("abrirBtnWC").addEventListener("click", function () {
        estores("abrirBtnWC");
    });
    document.getElementById("fecharBtnWC").addEventListener("click", function () {
        estores("fecharBtnWC");
    });
}

function checkHoras() {
    if (document.getElementById(CHECK_SALA).checked == true) {
        localStorage.setItem("checkboxSala", "checked");
    } else {
        localStorage.setItem("checkboxSala", "unchecked");
    }

    if (document.getElementById(CHECK_QUARTO).checked == true) {
        localStorage.setItem("checkboxQuarto", "checked");
    } else {
        localStorage.setItem("checkboxQuarto", "unchecked");
    }

    if (document.getElementById(CHECK_COZINHA).checked == true) {
        localStorage.setItem("checkboxCozinha", "checked");
    } else {
        localStorage.setItem("checkboxCozinha", "unchecked");
    }

    if (document.getElementById(CHECK_WC).checked == true) {
        localStorage.setItem("checkboxWC", "checked");
    } else {
        localStorage.setItem("checkboxWC", "unchecked");
    }

    if (localStorage.getItem("checkboxSala") == "checked") {
        document.getElementById(DIV_HORAS_SALA).style.visibility = 'visible';
    } else {
        document.getElementById(DIV_HORAS_SALA).style.visibility = 'hidden';
    }

    if (localStorage.getItem("checkboxQuarto") == "checked") {
        document.getElementById(DIV_HORAS_QUARTO).style.visibility = 'visible';
    } else {
        document.getElementById(DIV_HORAS_QUARTO).style.visibility = 'hidden';
    }

    if (localStorage.getItem("checkboxCozinha") == "checked") {
        document.getElementById(DIV_HORAS_COZINHA).style.visibility = 'visible';
    } else {
        document.getElementById(DIV_HORAS_COZINHA).style.visibility = 'hidden';
    }

    if (localStorage.getItem("checkboxWC") == "checked") {
        document.getElementById(DIV_HORAS_WC).style.visibility = 'visible';
    } else {
        document.getElementById(DIV_HORAS_WC).style.visibility = 'hidden';
    }
}

function getHorasStatus() {
    if (localStorage.getItem(CHECK_SALA) == "checked") {
        document.getElementById(CHECK_SALA).checked = true;
    } else {
        document.getElementById(CHECK_SALA).checked = false;
    }

    if (localStorage.getItem(CHECK_QUARTO) == "checked") {
        document.getElementById(CHECK_QUARTO).checked = true;
    } else {
        document.getElementById(CHECK_QUARTO).checked = false;
    }

    if (localStorage.getItem(CHECK_COZINHA) == "checked") {
        document.getElementById(CHECK_COZINHA).checked = true;
    } else {
        document.getElementById(CHECK_COZINHA).checked = false;
    }

    if (localStorage.getItem(CHECK_WC) == "checked") {
        document.getElementById(CHECK_WC).checked = true;
    } else {
        document.getElementById(CHECK_WC).checked = false;
    }
}

function estores(clicked_id) {
    if (clicked_id == "abrirBtnSala") {
        document.getElementById("statusEstoresSala").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnSala").disabled = true;
        document.getElementById("fecharBtnSala").disabled = false;
    } else if (clicked_id == "fecharBtnSala") {
        document.getElementById("statusEstoresSala").innerHTML = 'FECHADOS';
        document.getElementById("abrirBtnSala").disabled = false;
        document.getElementById("fecharBtnSala").disabled = true;
    }

    if (clicked_id == "abrirBtnQuarto") {
        document.getElementById("statusEstoresQuarto").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnQuarto").disabled = true;
        document.getElementById("fecharBtnQuarto").disabled = false;
    } else if (clicked_id == "fecharBtnQuarto") {
        document.getElementById("statusEstoresQuarto").innerHTML = 'FECHADOS';
        document.getElementById("abrirBtnQuarto").disabled = false;
        document.getElementById("fecharBtnQuarto").disabled = true;
    }
    if (clicked_id == "abrirBtnCozinha") {
        document.getElementById("statusEstoresCozinha").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnCozinha").disabled = true;
        document.getElementById("fecharBtnCozinha").disabled = false;
    } else if (clicked_id == "fecharBtnCozinha") {
        document.getElementById("statusEstoresCozinha").innerHTML = 'FECHADOS';
        document.getElementById("abrirBtnCozinha").disabled = false;
        document.getElementById("fecharBtnCozinha").disabled = true;
    }

    if (clicked_id == "abrirBtnWC") {
        document.getElementById("statusEstoresWC").innerHTML = 'ABERTOS';
        document.getElementById(clicked_id).disabled = true;
        document.getElementById("fecharBtnWC").disabled = false;
    } else if (clicked_id == "fecharBtnWC") {
        document.getElementById("statusEstoresWC").innerHTML = 'FECHADOS';
        document.getElementById(clicked_id).disabled = true;
        document.getElementById("abrirBtnWC").disabled = false;
    }

}

function setEstoresStatus() {
    if (document.getElementById("statusEstoresSala").innerHTML == 'ABERTOS') {
        localStorage.setItem("statusEstoresSala", 'ABERTOS');
    } else if (document.getElementById("statusEstoresSala").innerHTML == 'FECHADOS') {
        localStorage.setItem("statusEstoresSala", 'FECHADOS');
    }

    if (document.getElementById("statusEstoresQuarto").innerHTML == 'ABERTOS') {
        localStorage.setItem("statusEstoresQuarto", 'ABERTOS');
    } else if (document.getElementById("statusEstoresQuarto").innerHTML == 'FECHADOS') {
        localStorage.setItem("statusEstoresQuarto", 'FECHADOS');
    }

    if (document.getElementById("statusEstoresCozinha").innerHTML == 'ABERTOS') {
        localStorage.setItem("statusEstoresCozinha", 'ABERTOS');
    } else if (document.getElementById("statusEstoresCozinha").innerHTML == 'FECHADOS') {
        localStorage.setItem("statusEstoresCozinha", 'FECHADOS');
    }

    if (document.getElementById("statusEstoresWC").innerHTML == 'ABERTOS') {
        localStorage.setItem("statusEstoresWC", 'ABERTOS');
    } else if (document.getElementById("statusEstoresWC").innerHTML == 'FECHADOS') {
        localStorage.setItem("statusEstoresWC", 'FECHADOS');
    }
}

function getEstoresStatus() {
    if (localStorage.getItem("statusEstoresSala") == "ABERTOS") {
        document.getElementById("statusEstoresSala").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnSala").disabled = true;
    } else {
        document.getElementById("statusEstoresSala").innerHTML = 'FECHADOS';
        document.getElementById("fecharBtnSala").disabled = true;
    }

    if (localStorage.getItem("statusEstoresQuarto") == "ABERTOS") {
        document.getElementById("statusEstoresQuarto").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnQuarto").disabled = true;
    } else {
        document.getElementById("statusEstoresQuarto").innerHTML = 'FECHADOS';
        document.getElementById("fecharBtnQuarto").disabled = true;
    }

    if (localStorage.getItem("statusEstoresCozinha") == "ABERTOS") {
        document.getElementById("statusEstoresCozinha").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnCozinha").disabled = true;
    } else {
        document.getElementById("statusEstoresCozinha").innerHTML = 'FECHADOS';
        document.getElementById("fecharBtnCozinha").disabled = true;
    }

    if (localStorage.getItem("statusEstoresWC") == "ABERTOS") {
        document.getElementById("statusEstoresWC").innerHTML = 'ABERTOS';
        document.getElementById("abrirBtnWC").disabled = true;
    } else {
        document.getElementById("statusEstoresWC").innerHTML = 'FECHADOS';
        document.getElementById("fecharBtnWC").disabled = true;
    }
}

function setHoras(){
    localStorage.setItem("fecharHorasSala", document.getElementById("horasSala").children[0].value);
    localStorage.setItem("abrirHorasSala", document.getElementById("horasSala").children[2].value);
    localStorage.setItem("fecharHorasQuarto", document.getElementById("horasQuarto").children[0].value);
    localStorage.setItem("abrirHorasQuarto", document.getElementById("horasQuarto").children[2].value);
    localStorage.setItem("fecharHorasCozinha", document.getElementById("horasCozinha").children[0].value);
    localStorage.setItem("abrirHorasCozinha", document.getElementById("horasCozinha").children[2].value);
    localStorage.setItem("fecharHorasWC", document.getElementById("horasWC").children[0].value);
    localStorage.setItem("abrirHorasWC", document.getElementById("horasWC").children[2].value);
}

function getHoras(){
    document.getElementById("horasSala").children[0].value = localStorage.getItem("fecharHorasSala");
    document.getElementById("horasSala").children[2].value = localStorage.getItem("abrirHorasSala");
    document.getElementById("horasQuarto").children[0].value = localStorage.getItem("fecharHorasQuarto");
    document.getElementById("horasQuarto").children[2].value = localStorage.getItem("abrirHorasQuarto");
    document.getElementById("horasCozinha").children[0].value = localStorage.getItem("fecharHorasCozinha");
    document.getElementById("horasCozinha").children[2].value = localStorage.getItem("abrirHorasCozinha");
    document.getElementById("horasWC").children[0].value = localStorage.getItem("fecharHorasWC");
    document.getElementById("horasWC").children[2].value = localStorage.getItem("abrirHorasWC");
}