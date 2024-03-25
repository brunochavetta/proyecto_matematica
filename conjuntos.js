/*
1
1 2
2 3 5 
5 7 10 15 
*/

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formRelaciones").addEventListener("submit", function(e){
        e.preventDefault(); 
    }); 
}); 

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
    if (conjunto.includes('(') && conjunto.includes(')')) {
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

function averiguarCantParticiones() {
    let conjunto1 = document.getElementById("conjunto1").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);

    if(sonParesOrdenados){
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

    let h4 = document.createElement("h4"); 
    let h4Particion = document.createElement("h4"); 
    let h4Cantidad = document.createElement("h4"); 

    h4.textContent = `Triángulo de Pierce: para ${cantidad} elementos se pueden crear hasta ${part} particiones`; 
    if(conjuntoParticiones.length == 1){
        h4Cantidad.textContent = `Se creó ${conjuntoParticiones.length} partición`; 
    }else{
        h4Cantidad.textContent = `Se crearon ${conjuntoParticiones.length} particiones`; 
    }
    h4Particion.textContent = `Particiones del conjunto: { ${conjuntoParticiones.map(particion => `{ ${particion.join(", ")} }`).join(", ")} }`;

    div.appendChild(h4);
    div.appendChild(h4Cantidad); 
    div.appendChild(h4Particion); 
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
                if(elemento != undefined){
                    particion.push(elemento);
                }
            }

            if(particion.length > 0){
                conjuntoParticiones.push(particion);
            }
        }
    }

    if (elementosDisponibles.length > 0) {
        conjuntoParticiones.push(elementosDisponibles);
    }

    return conjuntoParticiones;
}



function subconjuntos(){
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let subA = true; 
    let subB = true; 

    for(let i = 0; i < numConjunto1.length; i++){
        if(!numConjunto1.includes(numConjunto2[i])){
            subA = false; 
        }
    }
    
    for(let i = 0; i < numConjunto2.length; i++){
        if(!numConjunto2.includes(numConjunto1[i])){
            subB = false; 
        }
    }

    let subconjuntosC = document.getElementById("subconjuntosC"); 
    let h4A = document.createElement("h4"); 
    let h4B = document.createElement("h4"); 

    h4A.textContent = `¿A es subconjunto de B? ${subA}`; 
    h4B.textContent = `¿B es subconjunto de A? ${subB}`; 

    subconjuntosC.appendChild(h4A); 
    subconjuntosC.appendChild(h4B);  
}

function conjuntoPotencia(){
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    if(sonParesOrdenados){
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
    let h4A = document.createElement("h4"); 
    let h4B = document.createElement("h4"); 
    let potenciaStringA = potenciaCA.map(subconjuntoA => `{${subconjuntoA.join(", ")}}`).join(", ");
    let potenciaStringB = potenciaCB.map(subconjuntoB => `{${subconjuntoB.join(", ")}}`).join(", ");
    h4A.textContent = `Conjunto potencia (${potenciaA} subconjuntos) para A: ${potenciaStringA}`;
    h4B.textContent = `Conjunto potencia (${potenciaB} subconjuntos) para B: ${potenciaStringB}`;

    conjuntosPotencia.appendChild(h4A);
    conjuntosPotencia.appendChild(h4B); 
}

function union(){
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let unionC = []; 

    if(sonParesOrdenados){
        unionC = numConjunto1.map(elemento => {
            return `(${elemento[0]}, ${elemento[1]})`;
        });
        let unionC2 = numConjunto2.map(elemento => {
            return `(${elemento[0]}, ${elemento[1]})`;
        });
        for(let i = 0; i < unionC2.length; i++){
            if (!unionC.includes(unionC2[i])) {
                unionC.push(unionC2[i]);
            }
        }
    }else{
        unionC = numConjunto1.slice(); 
        for(let i = 0; i < numConjunto2.length; i++){
            if (!unionC.includes(numConjunto2[i])) {
                unionC.push(numConjunto2[i]);
            }
        }
    }

    let unionConjunto = document.getElementById("unionConjuntos"); 
    let h4 = document.createElement("h4"); 
    h4.textContent = `La unión de los conjuntos es: ${unionC.join(", ")}`; 

    unionConjunto.appendChild(h4); 
}



function interseccion(){
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

    if(interseccionC.length === 0){
        interseccionC.push("∅"); 
    }


    let interseccionConjunto = document.getElementById("interseccionConjuntos"); 

    let boton = document.createElement("button");
    boton.textContent = "Ver Diagrama de Venn";

    boton.onclick = function(){
        diagramaDeVenn(numConjunto1, numConjunto2, interseccionC);
    }

    let h4 = document.createElement("h4"); 
    h4.textContent = `La intersección de los conjuntos es: ${interseccionC.join(", ")}`; 
    interseccionConjunto.appendChild(h4); 
    interseccionConjunto.appendChild(boton)
}

function diferencia(){
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;
    
    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let difA = [];
    let difB = []; 

    if(sonParesOrdenados){
        let paresA = []; 
        let paresB = []

        for(let i = 0; i < numConjunto1.length; i++){
            paresA.push(`(${numConjunto1[i][0]}, ${numConjunto1[i][1]})`); 
        }

        for(let j = 0; j < numConjunto2.length; j++){
            paresB.push(`(${numConjunto2[j][0]}, ${numConjunto2[j][1]})`); 
        }
        
        difA = difA.concat(paresA.filter(elemento => !paresB.includes(elemento)));

        difB = difB.concat(paresB.filter(elemento => !paresA.includes(elemento)));

    }else{
        difA = difA.concat(numConjunto1.filter(elemento => !numConjunto2.includes(elemento)));

        difB = difB.concat(numConjunto2.filter(elemento => !numConjunto1.includes(elemento)));
    }

    let diferenciaConjuntos = document.getElementById("diferenciaConjuntos"); 
    let h4A = document.createElement("h4"); 
    let h4B = document.createElement("h4"); 
    h4A.textContent = `La diferencia de A - B es: ${difA.join(", ")}`; 
    h4B.textContent = `La diferencia de B - A es: ${difB.join(", ")}`; 

    diferenciaConjuntos.appendChild(h4A); 
    diferenciaConjuntos.appendChild(h4B);  
} 

function difSimetrica() {
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let difSim = [];

    if(sonParesOrdenados){
        let paresA = []; 
        let paresB = []

        for(let i = 0; i < numConjunto1.length; i++){
            paresA.push(`(${numConjunto1[i][0]}, ${numConjunto1[i][1]})`); 
        }

        for(let j = 0; j < numConjunto2.length; j++){
            paresB.push(`(${numConjunto2[j][0]}, ${numConjunto2[j][1]})`); 
        }
        
        difSim = difSim.concat(paresA.filter(elemento => !paresB.includes(elemento)));

        difSim = difSim.concat(paresB.filter(elemento => !paresA.includes(elemento)));

    }else{
        difSim = difSim.concat(numConjunto1.filter(elemento => !numConjunto2.includes(elemento)));

        difSim = difSim.concat(numConjunto2.filter(elemento => !numConjunto1.includes(elemento)));
    }

    let difSimetricaConjunto = document.getElementById("difSimetricaConjunto"); 
    let h4 = document.createElement("h4"); 
    h4.textContent = `La diferencia simétrica de los conjuntos es: ${difSim.join(", ")}`; 

    difSimetricaConjunto.appendChild(h4); 
}; 

function relacionUsuario() {
    let relacionTexto = document.getElementById("relacionUsuarioID").value; 
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let relacionNumeros = obtenerNumerosConjunto(relacionTexto); 

    let relacion = []; 
    let dominio = []; 
    let rango = []; 

    for(let k = 0; k < relacionNumeros.length; k++){
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

    let div = document.getElementById("contenedorRelacionUsuario");

    let conjuntoA = document.createElement("h4");
    let conjuntoB = document.createElement("h4"); 
    let h4Rel = document.createElement("h4"); 
    let h4Dom = document.createElement("h4"); 
    let h4Ran = document.createElement("h4"); 
    let h4Tipo = document.createElement("h4"); 

    conjuntoA.textContent = `Conjunto A = { ${conjunto1} }`; 
    conjuntoB.textContent = `Conjunto B = { ${conjunto2} }`; 
    h4Rel.textContent = `La relación es: ${relacion.join(", ")}`; 
    h4Dom.textContent = `El dominio es: ${dominio.join(", ")}`; 
    h4Ran.textContent = `El rango es: ${rango.join(", ")}`; 
    h4Tipo.textContent = `Tipo de relación: ${tipoDeRelacion(relacion)}`; 

    div.appendChild(conjuntoA);
    div.appendChild(conjuntoB); 
    div.appendChild(h4Rel); 
    div.appendChild(h4Dom); 
    div.appendChild(h4Ran); 
    div.appendChild(h4Tipo); 
}


function relaciones() {
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

    dibujarMatrizRelacion(numConjunto1, numConjunto2, relacion); 

    let div = document.getElementById("contenedorRelacion");
    
    let conjuntoA = document.createElement("h4");
    let conjuntoB = document.createElement("h4"); 
    let h4Condicion = document.createElement("h4"); 
    let h4Rel = document.createElement("h4"); 
    let h4Dom = document.createElement("h4"); 
    let h4Ran = document.createElement("h4"); 
    let h4Tipo = document.createElement("h4"); 

    conjuntoA.textContent = `Conjunto A = { ${conjunto1} }`; 
    conjuntoB.textContent = `Conjunto B = { ${conjunto2} }`; 
    h4Condicion.textContent = `Condición ingresada: ${document.getElementById("condicion").value}`
    h4Rel.textContent = `La relación es: ${relacion.join(", ")}`; 
    h4Dom.textContent = `El dominio es: ${dominio.join(", ")}`; 
    h4Ran.textContent = `El rango es: ${rango.join(", ")}`; 
    h4Tipo.textContent = `Tipo de relación: ${tipoDeRelacion(relacion)}`; 

    div.appendChild(conjuntoA);
    div.appendChild(conjuntoB); 
    div.appendChild(h4Condicion); 
    div.appendChild(h4Rel); 
    div.appendChild(h4Dom); 
    div.appendChild(h4Ran); 
    div.appendChild(h4Tipo); 
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

function tipoDeRelacion(relacion) {
    let reflexiva = true;
    let simetrica = true;
    let transitiva = true;

    // Reflexividad
    for (let i = 0; i < relacion.length; i++) {
        let [x, y] = relacion[i].substring(1, relacion[i].length - 1).split(',').map(e => e.trim());
        if (x !== y) { // Solo verificamos reflexividad si x e y son distintos
            let elementoReflexivo = `(${x}, ${x})`;
            if (!relacion.includes(elementoReflexivo)) {
                reflexiva = false;
                break;
            }
        }
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

    // Transitividad
    for (let i = 0; i < relacion.length; i++) {
        let [x1, y1] = relacion[i].substring(1, relacion[i].length - 1).split(',').map(e => e.trim());
        for (let j = 0; j < relacion.length; j++) {
            let [x2, y2] = relacion[j].substring(1, relacion[j].length - 1).split(',').map(e => e.trim());
            if (y1 === x2) {
                let intermedio = `(${x1}, ${y2})`;
                if (!relacion.includes(intermedio)) {
                    transitiva = false;
                    break;
                }
            }
        }
    }

    // Determinar el tipo de relación
    if (reflexiva && simetrica && transitiva) {
        return "Es reflexiva, transitiva y simétrica (RELACIÓN DE EQUIVALENCIA)";
    } else if (reflexiva && !simetrica && transitiva) {
        return "Es reflexiva, transitiva y antisimétrica (RELACIÓN DE ÓRDEN PARCIAL)";
    } if (reflexiva && simetrica && !transitiva) {
        return "Es reflexiva, no transitiva y simétrica";
    } else if (reflexiva && !simetrica && transitiva) {
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




function paresOrdenados() {
    let conjunto1 = document.getElementById("conjunto1").value;
    let conjunto2 = document.getElementById("conjunto2").value;

    let numConjunto1 = obtenerNumerosConjunto(conjunto1);
    let numConjunto2 = obtenerNumerosConjunto(conjunto2);

    let paresA = []; 
    let paresB = []; 

    for(let i = 0; i < numConjunto1.length; i++){
        for(let j = 0; j < numConjunto2.length; j++){
            let x = numConjunto1[i];
            let y = numConjunto2[j];
            paresA.push(`(${x}, ${y})`);
        }
    }

    for(let i = 0; i < numConjunto2.length; i++){
        for(let j = 0; j < numConjunto1.length; j++){
            let x = numConjunto2[i];
            let y = numConjunto1[j];
            paresB.push(`(${x}, ${y})`);
        }
    }

    let div = document.getElementById("paresOrdenadosConjunto");
    
    let h4A = document.createElement("h4"); 
    let h4B = document.createElement("h4"); 

    h4A.textContent = `Los pares ordenados de AxB son: ${paresA.join(", ")}`; 
    h4B.textContent = `Los pares ordenados de BxA son: ${paresB.join(", ")}`; 

    div.appendChild(h4A); 
    div.appendChild(h4B); 
}


function devolverNumeros(opcion){
    return fetch('numeros.json')
    .then(response => response.json())
    .then(data => {
        let conjuntoNumeros; 
        switch(opcion){
            case 'R': 
                conjuntoNumeros = data.numeros.reales;
                break; 
            case 'Z': 
                conjuntoNumeros = data.numeros.enteros;
                break; 
            case 'I': 
                conjuntoNumeros = data.numeros.irracionales;
                break; 
            case 'N': 
                conjuntoNumeros = data.numeros.naturales;
                break; 
            case 'C': 
                conjuntoNumeros = data.numeros.complejos;
                break
            case 'Q': 
                conjuntoNumeros = data.numeros.racionales; 
                break; 
            default: 
                return false; 
        }

        return conjuntoNumeros; 
    })
    .catch(error => console.error('Error:', error));
}; 


function diagramaDeVenn(conjunto1, conjunto2, interseccion) {
    let canvas = document.getElementById("vennCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar.

    // Definir colores
    let colorConjuntoA = "blue";
    let colorConjuntoB = "red";
    let colorInterseccion = "purple";

    let grosorTrazo = 4;

    // Dibujar el círculo para el conjunto A
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, 2 * Math.PI); // Ajusta las coordenadas y tamaño según necesites
    ctx.strokeStyle = colorConjuntoA; // Establecer el color de trazo
    ctx.lineWidth = grosorTrazo;
    ctx.stroke();

    // Dibujar el círculo para el conjunto B
    ctx.beginPath();
    ctx.arc(300, 200, 80, 0, 2 * Math.PI); // Ajusta las coordenadas y tamaño según necesites
    ctx.strokeStyle = colorConjuntoB; // Establecer el color de trazo
    ctx.lineWidth = grosorTrazo;
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.textAlign = "center";

    // Dibujar la intersección
    if (interseccion.length > 0 && interseccion[0] !== "∅") {
        interseccion.forEach((valor, index) => {
            ctx.fillStyle = colorInterseccion; // Establecer el color de relleno
            ctx.fillText(valor, 250, 200 + (index * 20)); // Ajusta la posición vertical del texto
        });
    } else {
        ctx.fillText("∅", 250, 200); // Ajusta la posición del texto para el caso de conjunto vacío
    }

    if(conjunto1.filter(elemento => !interseccion.includes(elemento)).length > 0){
        conjunto1.forEach((valor, index) => {
            if (!interseccion.includes(valor)) {
                ctx.fillStyle = colorConjuntoA; // Establecer el color de relleno
                ctx.fillText(valor, 200, 200 + (index * 20)); // Ajusta la posición vertical del texto
            }
        });
    }else{    
        ctx.fillStyle = colorConjuntoA; // Establecer el color de relleno
        ctx.fillText("∅", 200, 200); // Ajusta la posición del texto para el caso de conjunto vacío
    }
     
    if(conjunto2.filter(elemento => !interseccion.includes(elemento)).length > 0){
        conjunto2.forEach((valor, index) => {
            if (!interseccion.includes(valor)) {
                ctx.fillStyle = colorConjuntoB; // Establecer el color de relleno
                ctx.fillText(valor, 300, 200 + (index * 20)); // Ajusta la posición vertical del texto
            }
        });
    }else{    
        ctx.fillStyle = colorConjuntoB; // Establecer el color de relleno
        ctx.fillText("∅", 300, 200); // Ajusta la posición del texto para el caso de conjunto vacío
    }
};

function dibujarMatrizRelacion(conjuntoA, conjuntoB, relacionR) {
    let canvas = document.getElementById("matrizConjuntos");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuración de la matriz
    let filaHeight = canvas.height / (conjuntoA.length + 2); // Se ajusta la altura de la fila
    let columnaWidth = canvas.width / (conjuntoB.length + 2); // Se ajusta el ancho de la columna
    let colorCoincidencia = "red";
    let colorSinCoincidencia = "black";

    // Dibujar los conjuntos A y B
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i < conjuntoA.length; i++) {
        let x = columnaWidth / 2; // Se ajusta horizontalmente
        let y = filaHeight * (i + 2) + filaHeight / 2; // Se centra en la celda
        ctx.fillText(conjuntoA[i], x, y);
    }
    for (let j = 0; j < conjuntoB.length; j++) {
        let x = columnaWidth * (j + 2) + columnaWidth / 2; // Se centra en la celda
        let y = filaHeight / 2; // Se ajusta verticalmente
        ctx.fillText(conjuntoB[j], x, y);
    }

    // Dibujar las relaciones
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "black";
    for (let i = 0; i < conjuntoA.length; i++) {
        for (let j = 0; j < conjuntoB.length; j++) {
            let relacion = `(${conjuntoA[i]}, ${conjuntoB[j]})`; // Se forma la relación
            let x = columnaWidth * (j + 2) + columnaWidth / 2; // Se centra en la celda
            let y = filaHeight * (i + 2) + filaHeight / 2; // Se centra en la celda
            if (relacionR.includes(relacion)) { // Se verifica si la relación está en R
                ctx.fillStyle = colorCoincidencia; 
                ctx.fillText("1", x, y);
            } else {
                ctx.fillStyle = colorSinCoincidencia; 
                ctx.fillText("0", x, y);
            }
        }
    }
}






