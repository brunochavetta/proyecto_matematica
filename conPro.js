function calcularMultiplicación(){
    let n = parseInt(document.getElementById("n").value);
    let k = parseInt(document.getElementById("k").value);
}

function calcularVariacion(){
    let n = parseInt(document.getElementById("n").value);
    let k = parseInt(document.getElementById("k").value);

    escribirFraccion(`${n}!`, `(${n} - ${k})!`); 
    let factorialN = factorial(n); 
    let arrayN = factorialN.split("*").map(Number); 
    console.log(arrayN); 
    let resta = n-k; 
    let resultado = 1; 

    for(let i = 0; i < arrayN.length; i++){
        if(arrayN[i] == resta){
            arrayN.splice(i+1);  
        }
    }

    let factorialEnTexto = arrayN.join(" * "); 
    console.log(factorialEnTexto); 

    escribirFraccion(`${factorialEnTexto}!`, `${resta}!`); 

    let indiceAEliminar = arrayN.indexOf(resta);
    if (indiceAEliminar !== -1) {
        arrayN.splice(indiceAEliminar, 1);
    }

    for(let i = 0; i < arrayN.length; i++){
        resultado *= arrayN[i]; 
        console.log(resultado); 
    }

    let divResultado = document.getElementById("resultadoVariacion"); 

    divResultado.textContent = `${arrayN.join(" * ")} = ${resultado}`; 
}

function calcularVariacionConRepeticion(){
    let n = parseInt(document.getElementById("n").value);
    let k = parseInt(document.getElementById("k").value);

    let potencia = document.getElementById("variacionPotencia"); 
    potencia.textContent = `${n}^${k} = ${Math.pow(n, k)}`; 

}



function escribirFraccion(numerador, denominador){
    let fraccion = document.getElementById("fraccion");  

    let spanDenominador = document.createElement("span");
    spanDenominador.className = "denominator"; 
    let spanNumerador = document.createElement("span");
    spanNumerador.className = "numerator";  
    let br1 = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br"); 

    spanNumerador.textContent = numerador; 
    spanDenominador.textContent = denominador; 

    fraccion.appendChild(spanNumerador); 
    fraccion.appendChild(spanDenominador); 
    fraccion.appendChild(br1); 
    fraccion.appendChild(br2); 
    fraccion.appendChild(br3); 
 
}


function factorial(num) {
    if (num === "0" || num === "1"){
        return "1";
    }
    let proceso = ""
    for (let i = num; i >= 1; i--) {
        proceso += `${i} * `;
    }
    return proceso;
}