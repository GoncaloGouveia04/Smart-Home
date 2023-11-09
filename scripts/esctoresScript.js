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

        
    }, 100)

    defineEventHandlers();
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
