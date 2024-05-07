/*
1
1 2
2 3 5 
5 7 10 15 
*/

var sonParesOrdenados = false;

function mostrarMensajeError(mensaje) {
    let divError = document.createElement("div");
    divError.classList.add("error-message");
    divError.textContent = mensaje;
    document.body.appendChild(divError);
    setTimeout(() => {
        divError.remove();
    }, 3000);
};

function validarFormatoConjunto(conjunto) {
    let formatoCorrecto = /^\s*((\(-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?\))|-?\d+(\.\d+)?)(\s*,\s*((\(-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?\))|-?\d+(\.\d+)?))*\s*$/;
    return formatoCorrecto.test(conjunto);
};

function obtenerNumerosConjunto(conjunto) {
    if (!validarFormatoConjunto(conjunto)) {
        mostrarMensajeError("Los números del conjunto no fueron ingresados con el formato correspondiente");
        return null;
    }
    if (conjunto.includes('(') && conjunto.includes(')')) { //(1, 3)
        let pares = [];
        let regex = /\((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\)/g;
        let match;
        while ((match = regex.exec(conjunto)) !== null) {
            let num1 = parseFloat(match[1]);
            let num2 = parseFloat(match[3]);
            pares.push([num1, num2]);
        }
        sonParesOrdenados = true;
        return pares.length > 0 ? pares : null;
    } else {
        sonParesOrdenados = false;
        return conjunto.split(', ').map(Number);
    }
};


function limpiarResultado() {
    document.getElementById("subconjuntosC").style.display = "none";
    document.getElementById("conjuntosPotencia").style.display = "none";
    document.getElementById("unionConjuntos").style.display = "none";
    document.getElementById("interseccionConjuntos").style.display = "none";
    document.getElementById("diferenciaConjuntos").style.display = "none";
    document.getElementById("difSimetricaConjunto").style.display = "none";
    document.getElementById("paresOrdenadosConjunto").style.display = "none";
    document.getElementById("calculo").style.display = "none";
    document.getElementById("contenedorRelacionUsuario").style.display = "none";
    document.getElementById("contenedorRelacion").style.display = "none";
    document.getElementById("vennCanvas").style.display = "none";
    document.getElementById("matrizConjuntos").style.display = "none";

    let resultadoDiv = document.getElementById("resultado");

    let buttons = resultadoDiv.getElementsByTagName("button");
    for (let i = buttons.length - 1; i >= 0; i--) {
        buttons[i].parentNode.removeChild(buttons[i]);
    }


    let h5Elements = resultadoDiv.getElementsByTagName("h5");
    for (let i = h5Elements.length - 1; i >= 0; i--) {
        h5Elements[i].parentNode.removeChild(h5Elements[i]);
    }


    mostrarBotonFlotante();
}

function mostrarBotonFlotante() {
    const botonFlotante = document.getElementById('botonFlotante');
    botonFlotante.style.display = 'block';
    botonFlotante.addEventListener('click', function () {
        const resultado7 = document.getElementById('resultado');
        resultado7.scrollIntoView({ behavior: 'smooth' });
    });
}

function averiguarCantParticiones() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);

    if (sonParesOrdenados) {
        alert("No disponible con pares ordenados");
        return
    }

    let cantidad = numConjunto1.length;

    const particiones = new Array(cantidad + 1);

    for (let i = 0; i <= cantidad; i++) {
        particiones[i] = new Array(i + 1).fill(0);
    }

    particiones[0][0] = 1;

    if (cantidad > 0) {
        for (let i = 1; i <= cantidad; i++) {
            for (let j = 0; j < particiones[i].length; j++) {
                switch (j) {
                    case 0:
                        particiones[i][j] = particiones[i - 1][particiones[i - 1].length - 1];
                        break;
                    case 1:
                        particiones[i][j] = particiones[i - 1][j - 1] + particiones[i][j - 1];
                        break;
                    default:
                        particiones[i][j] = particiones[i - 1][j - 1] + particiones[i][j - 1];
                        break;
                }
            }
        }
    }

    let div = document.getElementById("calculo");
    div.style.display = "block";
    let texto = "";

    if (cantidad === 1) {
        texto += particiones[0][0] + "<br>";
        texto += particiones[1][0] + " " + particiones[1][1] + "<br>";
    } else {
        for (let i = 0; i <= cantidad; i++) {
            for (let j = 0; j <= i; j++) {
                texto += particiones[i][j] + " ";
            }
            texto += "<br>";
        }
    }


    let part = particiones[cantidad][0];
    let conjuntoParticiones = calcularParticiones(numConjunto1)

    div.innerHTML = texto;

    let h5 = document.createElement("h5");
    let h5Particion = document.createElement("h5");
    let h5Cantidad = document.createElement("h5");

    h5.textContent = `Triángulo de Pierce: para ${cantidad} elementos se pueden crear hasta ${part} particiones`;
    if (conjuntoParticiones.length == 1) {
        h5Cantidad.textContent = `Se creó ${conjuntoParticiones.length} partición`;
    } else {
        h5Cantidad.textContent = `Se crearon ${conjuntoParticiones.length} particiones`;
    }
    h5Particion.textContent = `Particiones del conjunto: { ${conjuntoParticiones.map(particion => `{ ${particion.join(", ")} }`).join(", ")} }`;

    div.appendChild(h5);
    div.appendChild(h5Cantidad);
    div.appendChild(h5Particion);
}

function calcularParticiones(numConjunto1) {
    const cantidad = Math.floor(Math.random() * numConjunto1.length) + 1;
    let conjuntoParticiones = [];
    const elementosDisponibles = [...numConjunto1];

    for (let i = 0; i < cantidad; i++) {
        const particion = [];
        const particionSize = Math.floor(Math.random() * elementosDisponibles.length) + 1;

        if (particionSize > 0) {
            for (let j = 0; j < particionSize; j++) {
                const indice = Math.floor(Math.random() * elementosDisponibles.length);
                const elemento = elementosDisponibles.splice(indice, 1)[0];
                if (elemento != undefined) {
                    particion.push(elemento);
                }
            }

            if (particion.length > 0) {
                conjuntoParticiones.push(particion);
            }
        }
    }

    if (elementosDisponibles.length > 0) {
        conjuntoParticiones.push(elementosDisponibles);
    }

    return conjuntoParticiones;
}



function subconjuntos() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let subA = true;
    let subB = true;

    for (let i = 0; i < numConjunto1.length; i++) {
        if (!numConjunto1.includes(numConjunto2[i])) {
            subA = false;
        }
    }

    for (let i = 0; i < numConjunto2.length; i++) {
        if (!numConjunto2.includes(numConjunto1[i])) {
            subB = false;
        }
    }

    let subconjuntosC = document.getElementById("subconjuntosC");
    subconjuntosC.style.display = "block";
    let h5A = document.createElement("h5");
    let h5B = document.createElement("h5");

    h5A.textContent = `¿A es subconjunto de B? ${subA}`;
    h5B.textContent = `¿B es subconjunto de A? ${subB}`;

    subconjuntosC.appendChild(h5A);
    subconjuntosC.appendChild(h5B);
}

function conjuntoPotencia() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    if (sonParesOrdenados) {
        alert("No disponible con pares ordenados");
        return
    }

    let potenciaCA = [[]];
    let potenciaCB = [[]];

    let potenciaA = 2 ** numConjunto1.length;
    let potenciaB = 2 ** numConjunto2.length;

    for (let elemento of numConjunto1) {
        let nuevosSubconjuntos = [];
        for (let subconjunto of potenciaCA) {
            nuevosSubconjuntos.push([...subconjunto, elemento]);
        }
        potenciaCA = potenciaCA.concat(nuevosSubconjuntos);
    }

    for (let elemento of numConjunto2) {
        let nuevosSubconjuntos = [];
        for (let subconjunto of potenciaCB) {
            nuevosSubconjuntos.push([...subconjunto, elemento]);
        }
        potenciaCB = potenciaCB.concat(nuevosSubconjuntos);
    }

    let conjuntosPotencia = document.getElementById("conjuntosPotencia");
    conjuntosPotencia.style.display = "block";

    let h5A = document.createElement("h5");
    let h5B = document.createElement("h5");
    let potenciaStringA = potenciaCA.map(subconjuntoA => `{${subconjuntoA.join(", ")}}`).join(", ");
    let potenciaStringB = potenciaCB.map(subconjuntoB => `{${subconjuntoB.join(", ")}}`).join(", ");
    h5A.textContent = `Conjunto potencia (${potenciaA} subconjuntos) para A: ${potenciaStringA}`;
    h5B.textContent = `Conjunto potencia (${potenciaB} subconjuntos) para B: ${potenciaStringB}`;

    conjuntosPotencia.appendChild(h5A);
    conjuntosPotencia.appendChild(h5B);
}

function union() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let unionC = [];

    if (sonParesOrdenados) {
        unionC = numConjunto1.map(elemento => {
            return `(${elemento[0]}, ${elemento[1]})`;
        });
        let unionC2 = numConjunto2.map(elemento => {
            return `(${elemento[0]}, ${elemento[1]})`;
        });
        for (let i = 0; i < unionC2.length; i++) {
            if (!unionC.includes(unionC2[i])) {
                unionC.push(unionC2[i]);
            }
        }
    } else {
        unionC = numConjunto1.slice();
        for (let i = 0; i < numConjunto2.length; i++) {
            if (!unionC.includes(numConjunto2[i])) {
                unionC.push(numConjunto2[i]);
            }
        }
    }

    let unionConjunto = document.getElementById("unionConjuntos");
    unionConjunto.style.display = "block";

    let h5 = document.createElement("h5");
    h5.textContent = `La unión de los conjuntos es: ${unionC.join(", ")}`;

    unionConjunto.appendChild(h5);
}



function interseccion() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let interseccionC = [];

    if (sonParesOrdenados) {
        for (let i = 0; i < numConjunto1.length; i++) {
            for (let j = 0; j < numConjunto2.length; j++) {
                if (numConjunto1[i][0] === numConjunto2[j][0] && numConjunto1[i][1] === numConjunto2[j][1]) {
                    interseccionC.push(`(${numConjunto1[i][0]}, ${numConjunto1[i][1]})`);
                }
            }
        }
    } else {
        for (let i = 0; i < numConjunto1.length; i++) {
            if (numConjunto2.includes(numConjunto1[i])) {
                interseccionC.push(numConjunto1[i]);
            }
        }
    }

    if (interseccionC.length === 0) {
        interseccionC.push("∅");
    }


    let interseccionConjunto = document.getElementById("interseccionConjuntos");
    interseccionConjunto.style.display = "block";

    let boton = document.createElement("button");
    boton.textContent = "Ver Diagrama de Venn";
    boton.className = "btn btn-warning";

    boton.onclick = function () {
        diagramaDeVenn(numConjunto1, numConjunto2, interseccionC);
    }

    let h5 = document.createElement("h5");
    h5.textContent = `La intersección de los conjuntos es: ${interseccionC.join(", ")}`;
    interseccionConjunto.appendChild(h5);
    interseccionConjunto.appendChild(boton)
}

function diferencia() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let difA = [];
    let difB = [];

    if (sonParesOrdenados) {
        let paresA = [];
        let paresB = []

        for (let i = 0; i < numConjunto1.length; i++) {
            paresA.push(`(${numConjunto1[i][0]}, ${numConjunto1[i][1]})`);
        }

        for (let j = 0; j < numConjunto2.length; j++) {
            paresB.push(`(${numConjunto2[j][0]}, ${numConjunto2[j][1]})`);
        }

        difA = difA.concat(paresA.filter(elemento => !paresB.includes(elemento)));

        difB = difB.concat(paresB.filter(elemento => !paresA.includes(elemento)));

    } else {
        difA = difA.concat(numConjunto1.filter(elemento => !numConjunto2.includes(elemento)));

        difB = difB.concat(numConjunto2.filter(elemento => !numConjunto1.includes(elemento)));
    }

    let diferenciaConjuntos = document.getElementById("diferenciaConjuntos");
    diferenciaConjuntos.style.display = "block";

    let h5A = document.createElement("h5");
    let h5B = document.createElement("h5");
    h5A.textContent = `La diferencia de A - B es: ${difA.join(", ")}`;
    h5B.textContent = `La diferencia de B - A es: ${difB.join(", ")}`;

    diferenciaConjuntos.appendChild(h5A);
    diferenciaConjuntos.appendChild(h5B);
}

function difSimetrica() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let difSim = [];

    if (sonParesOrdenados) {
        let paresA = [];
        let paresB = []

        for (let i = 0; i < numConjunto1.length; i++) {
            paresA.push(`(${numConjunto1[i][0]}, ${numConjunto1[i][1]})`);
        }

        for (let j = 0; j < numConjunto2.length; j++) {
            paresB.push(`(${numConjunto2[j][0]}, ${numConjunto2[j][1]})`);
        }

        difSim = difSim.concat(paresA.filter(elemento => !paresB.includes(elemento)));

        difSim = difSim.concat(paresB.filter(elemento => !paresA.includes(elemento)));

    } else {
        difSim = difSim.concat(numConjunto1.filter(elemento => !numConjunto2.includes(elemento)));

        difSim = difSim.concat(numConjunto2.filter(elemento => !numConjunto1.includes(elemento)));
    }

    let difSimetricaConjunto = document.getElementById("difSimetricaConjunto");
    difSimetricaConjunto.style.display = "block";

    let h5 = document.createElement("h5");
    h5.textContent = `La diferencia simétrica de los conjuntos es: ${difSim.join(", ")}`;

    difSimetricaConjunto.appendChild(h5);
};

function relacionUsuario() {
    limpiarResultado()
    let relacionTexto = document.getElementById("relacionUsuarioID").value;
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let relacionNumeros = obtenerNumerosConjunto(relacionTexto);

    let relacion = [];
    let dominio = [];
    let rango = [];

    for (let k = 0; k < relacionNumeros.length; k++) {
        relacion.push(`(${relacionNumeros[k][0]}, ${relacionNumeros[k][1]})`);
    }

    for (let i = 0; i < numConjunto1.length; i++) {
        for (let j = 0; j < numConjunto2.length; j++) {
            let x = numConjunto1[i];
            let y = numConjunto2[j];
            let elementoRelacion = `(${x}, ${y})`
            if (relacion.includes(elementoRelacion)) {
                if (!dominio.includes(x)) dominio.push(x);
                if (!rango.includes(y)) rango.push(y);
            }
        }
    }

    let boton = document.createElement("button");
    boton.textContent = "Ver matriz de relaciones";
    boton.className = "btn btn-warning";

    boton.onclick = function () {
        dibujarMatrizRelacion(numConjunto1, numConjunto2, relacion);
    }


    let div = document.getElementById("contenedorRelacionUsuario");
    div.style.display = "block";

    let conjuntoA = document.createElement("h5");
    let conjuntoB = document.createElement("h5");
    let h5Rel = document.createElement("h5");
    let h5Dom = document.createElement("h5");
    let h5Ran = document.createElement("h5");
    let h5Tipo = document.createElement("h5");

    conjuntoA.textContent = `Conjunto A = { ${conjunto1} }`;
    conjuntoB.textContent = `Conjunto B = { ${conjunto2} }`;
    h5Rel.textContent = `La relación es: ${relacion.join(", ")}`;
    h5Dom.textContent = `El dominio es: ${dominio.join(", ")}`;
    h5Ran.textContent = `El rango es: ${rango.join(", ")}`;
    h5Tipo.textContent =`Tipo de relación: ${tipoDeRelacion(relacion, numConjunto1, numConjunto2)}`;

    div.appendChild(conjuntoA);
    div.appendChild(conjuntoB);
    div.appendChild(h5Rel);
    div.appendChild(h5Dom);
    div.appendChild(h5Ran);
    div.appendChild(h5Tipo);
    div.appendChild(boton);
}


function relaciones() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let dominio = [];
    let rango = [];
    let relacion = [];

    for (let i = 0; i < numConjunto1.length; i++) {
        for (let j = 0; j < numConjunto2.length; j++) {
            let x = numConjunto1[i];
            let y = numConjunto2[j];
            if (condicionRelaciones(x, y)) {
                relacion.push(`(${x}, ${y})`);
                if (!dominio.includes(x)) dominio.push(x);
                if (!rango.includes(y)) rango.push(y);
            }
        }
    }

    let boton = document.createElement("button");
    boton.textContent = "Ver matriz de relaciones";
    boton.className = "btn btn-warning";

    boton.onclick = function () {
        dibujarMatrizRelacion(numConjunto1, numConjunto2, relacion);
    }

    let div = document.getElementById("contenedorRelacion");
    div.style.display = "block";

    let conjuntoA = document.createElement("h5");
    let conjuntoB = document.createElement("h5");
    let h5Condicion = document.createElement("h5");
    let h5Rel = document.createElement("h5");
    let h5Dom = document.createElement("h5");
    let h5Ran = document.createElement("h5");
    let h5Tipo = document.createElement("h5");

    conjuntoA.textContent = `Conjunto A = { ${conjunto1} }`;
    conjuntoB.textContent = `Conjunto B = { ${conjunto2} }`;
    h5Condicion.textContent = `Condición ingresada: ${document.getElementById("condicion").value}`
    h5Rel.textContent = `La relación es: ${relacion.join(", ")}`;
    h5Dom.textContent = `El dominio es: ${dominio.join(", ")}`;
    h5Ran.textContent = `El rango es: ${rango.join(", ")}`;
    h5Tipo.textContent = `Tipo de relación: ${tipoDeRelacion(relacion, numConjunto1, numConjunto2)}`;

    div.appendChild(conjuntoA);
    div.appendChild(conjuntoB);
    div.appendChild(h5Condicion);
    div.appendChild(h5Rel);
    div.appendChild(h5Dom);
    div.appendChild(h5Ran);
    div.appendChild(h5Tipo);
    div.appendChild(boton);
}


function condicionRelaciones(x, y) {
    let condicion = document.getElementById("condicion").value;
    try {
        condicion = condicion.replace(/x/g, '(' + x + ')');
        condicion = condicion.replace(/y/g, '(' + y + ')');
        return math.evaluate(condicion);
    } catch (error) {
        console.error('Error al evaluar la condición:', error);
        return false;
    }
};

function tipoDeRelacion(relacion, conjunto1, conjunto2) {
    let reflexiva = true;
    let simetrica = true;
    let transitiva = true; 

    // Reflexividad
    if(conjunto1.length === conjunto2.length){
        for(let i = 0; i < conjunto1.length; i++){
            let elemento =  `(${conjunto1[i]}, ${conjunto2[i]})`;
            if(!relacion.includes(elemento)){
                reflexiva = false; 
                break; 
            }
        }
    }else{
        reflexiva = false; 
    }

    // Simetría
    for (let i = 0; i < relacion.length; i++) {
        let [x, y] = relacion[i].substring(1, relacion[i].length - 1).split(',').map(e => e.trim());
        let inverso = `(${y}, ${x})`;
        if (!relacion.includes(inverso)) {
            simetrica = false;
            break;
        }
    }

    // transitividad
    transitiva = esTransitivaSegunReglas(relacion); 

    console.log(`Reflexiva: ${reflexiva}, transitiva: ${transitiva}, simetrica: ${simetrica}`);

    // tipo de relación
    if (reflexiva && simetrica && transitiva) {
        return "Es reflexiva, transitiva y simétrica (RELACIÓN DE EQUIVALENCIA)";
    } else if (reflexiva && !simetrica && transitiva) {
        return "Es reflexiva, transitiva y antisimétrica (RELACIÓN DE ÓRDEN PARCIAL)";
    } if (reflexiva && simetrica && !transitiva) {
        return "Es reflexiva, no transitiva y simétrica";
    } else if (reflexiva && !simetrica && !transitiva) {
        return "Es reflexiva, no transitiva y antisimétrica";
    } else if (!reflexiva && simetrica && transitiva) {
        return "Es simétrica, transitiva y no reflexiva";
    } else if (!reflexiva && simetrica && !transitiva) {
        return "Es simétrica, no transitiva y no reflexiva";
    } else if (!reflexiva && !simetrica && transitiva) {
        return "Es asimétrica, transitiva y no reflexiva";
    } else if (!reflexiva && !simetrica && !transitiva) {
        return "Es asimétrica, no transitiva y no reflexiva";
    }
}


function esTransitivaSegunReglas(relacion) {
    // Iteramos sobre cada par de elementos en la relación
    for (let i = 0; i < relacion.length; i++) {
        for (let j = 0; j < relacion.length; j++) {
            for (let k = 0; k < relacion.length; k++) {
                if (i !== j && i !== k && j !== k) {
                    let [a, b] = relacion[i].substring(1, relacion[i].length - 1).split(',').map(e => e.trim());
                    let [c, d] = relacion[j].substring(1, relacion[j].length - 1).split(',').map(e => e.trim());
                    let [e, f] = relacion[k].substring(1, relacion[k].length - 1).split(',').map(e => e.trim());

                    // Verificamos si se cumple alguna de las reglas de transitividad
                    if ((a === c && b === d && c === e && d === f && a !== f) ||
                        (a === c && b === d && c === f && d === e && a !== e) ||
                        (a === c && b === f && c === e && f === d && a !== d) ||
                        (a === c && b === f && c === d && f === e && a !== e) ||
                        (a === d && b === c && d === e && c === f && a !== f) ||
                        (a === d && b === c && d === f && c === e && a !== e) ||
                        (a === d && b === e && d === c && e === f && a !== f) ||
                        (a === d && b === e && d === f && e === c && a !== c)) {
                        return false; // Si alguna regla se cumple, la relación no es transitiva
                    }
                }
            }
        }
    }
    return true; // Si ninguna regla se cumple para ninguna combinación de pares, la relación es transitiva
}



function devolverParOrdenado(numConjunto1, numConjunto2){
    let pares = [];

    for (let i = 0; i < numConjunto1.length; i++) {
        for (let j = 0; j < numConjunto2.length; j++) {
            let x = numConjunto1[i];
            let y = numConjunto2[j];
            pares.push(`(${x}, ${y})`);
        }
    }; 

    return pares; 
}


function paresOrdenados() {
    limpiarResultado()
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let paresA = devolverParOrdenado(numConjunto1, numConjunto2)
    let paresB = devolverParOrdenado(numConjunto2, numConjunto1); 

    let div = document.getElementById("paresOrdenadosConjunto");
    div.style.display = "block";

    let h5A = document.createElement("h5");
    let h5B = document.createElement("h5");

    h5A.textContent = `Los pares ordenados de AxB son: ${paresA.join(", ")}`;
    h5B.textContent = `Los pares ordenados de BxA son: ${paresB.join(", ")}`;

    div.appendChild(h5A);
    div.appendChild(h5B);
}


function diagramaDeVenn(conjunto1, conjunto2, interseccion) {
    let canvas = document.getElementById("vennCanvas");
    canvas.style.display = "block";
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let colorConjuntoA = "blue";
    let colorConjuntoB = "red";
    let colorInterseccion = "purple";

    let grosorTrazo = 4;

    // conjunto A
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, 2 * Math.PI);
    ctx.strokeStyle = colorConjuntoA;
    ctx.lineWidth = grosorTrazo;
    ctx.stroke();

    // conjunto B
    ctx.beginPath();
    ctx.arc(300, 200, 80, 0, 2 * Math.PI);
    ctx.strokeStyle = colorConjuntoB;
    ctx.lineWidth = grosorTrazo;
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.textAlign = "center";


    if (interseccion.length > 0 && interseccion[0] !== "∅") {
        interseccion.forEach((valor, index) => {
            ctx.fillStyle = colorInterseccion;
            ctx.fillText(valor, 250, 200 + (index * 20));
        });
    } else {
        ctx.fillText("∅", 250, 200);
    }

    if (conjunto1.filter(elemento => !interseccion.includes(elemento)).length > 0) {
        conjunto1.forEach((valor, index) => {
            if (!interseccion.includes(valor)) {
                ctx.fillStyle = colorConjuntoA;
                ctx.fillText(valor, 200, 200 + (index * 20));
            }
        });
    } else {
        ctx.fillStyle = colorConjuntoA;
        ctx.fillText("∅", 200, 200);
    }

    if (conjunto2.filter(elemento => !interseccion.includes(elemento)).length > 0) {
        conjunto2.forEach((valor, index) => {
            if (!interseccion.includes(valor)) {
                ctx.fillStyle = colorConjuntoB;
                ctx.fillText(valor, 300, 200 + (index * 20));
            }
        });
    } else {
        ctx.fillStyle = colorConjuntoB;
        ctx.fillText("∅", 300, 200);
    }
};

function dibujarMatrizRelacion(conjuntoA, conjuntoB, relacionR) {
    let canvas = document.getElementById("matrizConjuntos");
    canvas.style.display = "block";
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    let filaHeight = canvas.height / (conjuntoA.length + 2);
    let columnaWidth = canvas.width / (conjuntoB.length + 2);
    let colorCoincidencia = "red";
    let colorSinCoincidencia = "black";

    // conjuntos A y B
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i < conjuntoA.length; i++) {
        let x = columnaWidth / 2;
        let y = filaHeight * (i + 2) + filaHeight / 2;
        ctx.fillText(conjuntoA[i], x, y);
    }
    for (let j = 0; j < conjuntoB.length; j++) {
        let x = columnaWidth * (j + 2) + columnaWidth / 2;
        let y = filaHeight / 2;
        ctx.fillText(conjuntoB[j], x, y);
    }

    // relaciones
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "black";
    for (let i = 0; i < conjuntoA.length; i++) {
        for (let j = 0; j < conjuntoB.length; j++) {
            let relacion = `(${conjuntoA[i]}, ${conjuntoB[j]})`;
            let x = columnaWidth * (j + 2) + columnaWidth / 2;
            let y = filaHeight * (i + 2) + filaHeight / 2;
            if (relacionR.includes(relacion)) {
                ctx.fillStyle = colorCoincidencia;
                ctx.fillText("1", x, y);
            } else {
                ctx.fillStyle = colorSinCoincidencia;
                ctx.fillText("0", x, y);
            }
        }
    }
}






