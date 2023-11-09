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

function principal(){

    setInterval(function time(){
        if(document.getElementById(CHECK_SALA).checked == true){
            sessionStorage.setItem("checkboxSala", "checked");
        }else{
            sessionStorage.setItem("checkboxSala", "unchecked");
        }
    
        if(document.getElementById(CHECK_QUARTO).checked == true){
            sessionStorage.setItem("checkboxQuarto", "checked");
        }else{
            sessionStorage.setItem("checkboxQuarto", "unchecked");
        }
        
        if(document.getElementById(CHECK_COZINHA).checked == true){
            sessionStorage.setItem("checkboxCozinha", "checked");
        }else{
            sessionStorage.setItem("checkboxCozinha", "unchecked");
        }
        
        if(document.getElementById(CHECK_WC).checked == true){
            sessionStorage.setItem("checkboxWC", "checked");
        }else{
            sessionStorage.setItem("checkboxWC", "unchecked");
        }
        
        if(sessionStorage.getItem("checkboxSala") == "checked"){
            document.getElementById(DIV_HORAS_SALA).style.visibility='visible';
        }else{
            document.getElementById(DIV_HORAS_SALA).style.visibility='hidden';    
        }

        if(sessionStorage.getItem("checkboxQuarto") == "checked"){
            document.getElementById(DIV_HORAS_QUARTO).style.visibility='visible';
        }else{
            document.getElementById(DIV_HORAS_QUARTO).style.visibility='hidden';
        }

        if(sessionStorage.getItem("checkboxCozinha") == "checked"){
            document.getElementById(DIV_HORAS_COZINHA).style.visibility='visible';
        }else{
            document.getElementById(DIV_HORAS_COZINHA).style.visibility='hidden';
        }

        if(sessionStorage.getItem("checkboxWC") == "checked"){
            document.getElementById(DIV_HORAS_WC).style.visibility='visible';
        }else{
            document.getElementById(DIV_HORAS_WC).style.visibility='hidden';
        }
    }, 100)
}