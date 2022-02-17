"use strict"

// declaración de variables, constantes
const filas = 3,
    columnas = 4;
const maxNum = (filas * columnas) / 2,
    minNum = 1;
let aCartas, aParejas, contador, contadorIntentos, horaInicio;

// carga del fichero
window.addEventListener("load", function () {
    addElementosHTML();
    let botonComenzar = document.getElementById("comenzar");
    botonComenzar.addEventListener("click", function () {
        contador = 0, contadorIntentos = 0, horaInicio = new Date();
        aCartas = [], aParejas = [];
        // añadir cartas al array
        aCartas = addCartasArray();
        // añadir cartas a la tabla
        addCartasTabla();
        // desabilitar botón comenzar
        desabilitarBotonComenzar();
        // empezar el tiempo de juego

    });
});
// funciones
let addElementosHTML = () => {
    document.getElementById("tablero").appendChild(crearElementoHTML("h1", "titulo", "titulo-tablero", "Juego de Parejas"));
    crearTabla();
    crearBotonComenzar();
}
let crearElementoHTML = (tipo, id, clase, texto) => {
    let elemento = document.createElement(tipo);
    if (id != null && id != "") elemento.id = id;
    if (clase != null && clase != "") elemento.className = clase;
    if (texto != null && texto != "") elemento.innerText = texto;
    return elemento;
}
let crearTabla = () => {
    let contador = 0;
    let tablero = document.getElementById("tablero");
    tablero.appendChild(crearElementoHTML("table", "tabla", "tabla"));
    let tabla = document.getElementById("tabla");
    for (let i = 1; i < (filas + 1); i++) {
        tabla.appendChild(crearElementoHTML("tr", i, "tr-tabla"));
        for (let j = 1; j < (columnas + 1); j++) {
            contador++;
            document.getElementById(i).appendChild(crearElementoHTML("td", `${i}-${j}`, "td-tabla"));
            document.getElementById(`${i}-${j}`).appendChild(crearElementoHTML("img", `img${contador}`, "imgs-tabla"));
        }
    }
}
let crearBotonComenzar = () => {
    let tablero = document.getElementById("tablero");
    tablero.appendChild(crearElementoHTML("button", "comenzar", "boton-comenzar", "Comenzar"));
}
let desabilitarBotonComenzar = () => {
    let boton = document.getElementById("comenzar");
    boton.disabled = true;
}
let addCartasTabla = () => {
    // añadimos la parte de atras de las cartas y le establecemos el evento click a cada una de ellas
    for (let x = 1; x < (filas * columnas) + 1; x++) {
        let carta = document.getElementById(`img${x}`);
        carta.src = "IMG/back.png";
        carta.addEventListener("click", mostrarCarta);
    }
}

function mostrarCarta() {
    this.removeEventListener("click", mostrarCarta);
    let cartaActual = this.id.slice(3);
    if (aParejas.length < 2) {
        aParejas.push(cartaActual);
    } else {
        aParejas = [];
        aParejas.push(cartaActual);
    }

    this.src = `IMG/carta${aCartas[cartaActual - 1]}.png`;

    if (aParejas.length == 2) {
        let pulsada1 = aParejas[0];
        let pulsada2 = aParejas[1];
        setTimeout(function () {
            if (aCartas[pulsada1 - 1] != aCartas[pulsada2 - 1]) {
                document.getElementById(`img${pulsada1}`).src = "IMG/back.png";
                document.getElementById(`img${pulsada2}`).src = "IMG/back.png";
                document.getElementById(`img${pulsada1}`).addEventListener("click", mostrarCarta);
                document.getElementById(`img${pulsada2}`).addEventListener("click", mostrarCarta);
            } else {
                contador++;
            }
            contadorIntentos++;
            if (contador == maxNum) {
                let tiempo = Math.round(((new Date()) - horaInicio) / 1000);
                let nuevoRecord = guardarResultado(contadorIntentos, tiempo);
                alert(`${nuevoRecord} Enhorabuena!! Has completado el juego en ${contadorIntentos} intentos y ${tiempo} segundos`);
                document.getElementById("comenzar").disabled = false;
            }
        }, 800);
    }
}
let guardarResultado = (cI, t) => {
    let nuevoRecord = "";
    let resultado = [];
    resultado[0] = cI; // cI => contador de intentos
    resultado[1] = t; // t => tiempo
    if (localStorage.getItem('resultado') == null) {
        localStorage.setItem('resultado', resultado);
    } else {
        let aResultado = localStorage.getItem('resultado').split(",");
        if (aResultado[0] >= resultado[0] && aResultado[1] > resultado[1]) {
            localStorage.setItem('resultado', resultado);
            nuevoRecord = "¡Has superado el Record Actual!";
        }
    }
    console.log("Record: " + localStorage.getItem('resultado'));
    return nuevoRecord;
}
let addCartasArray = () => {
    let array = [];
    for (let x = 0; x < (maxNum); x++) {
        let num = randomNumber();
        let isIn = false;
        array.forEach(element => {
            if (element == num) {
                isIn = true;
            }
        });
        if (isIn) {
            x--;
        } else {
            array.push(num);
        }
    }
    array = array.concat(array);
    // desordenamos el array
    array = desordenarArray(array);
    return array;
}
let randomNumber = () => {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}
let desordenarArray = (array) => {
    array.sort(function (a, b) {
        return 0.5 - Math.random()
    });
    return array;
}