/*function averiguarParOrdenado() {
    const esPar = document.getElementById("flexSwitchCheckChecked");

    return esPar.checked
}*/

document.addEventListener("DOMContentLoaded", function () {
    let interruptor = document.getElementById("flexSwitchCheckChecked");
    interruptor.checked = false;
});


document.getElementById("flexSwitchCheckChecked").addEventListener("change", function () {
    if (this.checked) {
        averiguarParOrdenado();
    } else {
        let boton = document.getElementById("botonOrdenado");
        if (boton) {
            boton.parentNode.removeChild(boton);
        }

    }
});

document.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode;

    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
        const numero = keyCode >= 96 ? keyCode - 96 : keyCode - 48;
        formarConjuntos(numero.toString());
    }

    if (keyCode === 8 || keyCode === 46) {
        borrar();
    }
});


function esUltimoCaracterParentesis(cadena) {
    return cadena.charAt(cadena.length - 1) === ")";
}


function averiguarParOrdenado() {
    const agregarBoton = document.createElement("button");

    agregarBoton.textContent = "Agregar par";
    agregarBoton.id = "botonOrdenado";
    agregarBoton.className = "btn btn-primary";
    document.getElementById("botonParOrdenado").appendChild(agregarBoton);

    agregarBoton.onclick = function () {
        const numeroConjunto = document.getElementById("numeroConjunto");
        let parEnFormacion = document.getElementById("parFormado");
        console.log(parEnFormacion.textContent.charAt(parEnFormacion.textContent.length - 1));
        if (!esUltimoCaracterParentesis(parEnFormacion.textContent)) {
            if (parFormado.textContent.trim() === '') {
                parFormado.textContent = `(${numeroConjunto.textContent}, `;
            } else {
                parFormado.textContent += `${numeroConjunto.textContent})`;
            }
        } else {
            alert("El par ordenado ya fue formado");
        }
        limpiar();
    }
}



function formarConjuntos(botonID) {
    const boton = document.getElementById(botonID).textContent;
    const numeroConjunto = document.getElementById("numeroConjunto");

    numeroConjunto.textContent += boton;

}


function limpiar() {
    document.getElementById("numeroConjunto").textContent = "";
}

function borrar() {
    let num = document.getElementById("numeroConjunto").textContent;
    if (num.trim() !== '') {
        document.getElementById("numeroConjunto").textContent = num.slice(0, -1);
    }
}

function agregarAlConjunto(conjuntoID) {
    let chechSwitch = document.getElementById("flexSwitchCheckChecked").checked;
    let num = document.getElementById("numeroConjunto").textContent;
    let par = document.getElementById("parFormado").textContent;
    let conjunto = document.getElementById(conjuntoID);

    if (chechSwitch) {
        if (conjunto.value.trim() === '') {
            conjunto.value = par;
        } else {
            conjunto.value += `, ${par}`;
        }
        document.getElementById("parFormado").textContent = "";
    } else {
        if (conjunto.value.trim() === '') {
            conjunto.value = num;
        } else {
            conjunto.value += `, ${num}`;
        }
        document.getElementById("numeroConjunto").textContent = "";
    }
}


