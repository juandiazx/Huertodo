//ESTO ES TODO FAKE REALMENTE, HABRIA QUE INVOLUCRAR LA LLAMADA A SERVIDOR


//Guardamos IDs de los spans donde van los datos en tiempo real de monitorizacion
const humedad = document.getElementById("contenedor-humedad").querySelector("span")
const salinidad = document.getElementById("contenedor-salinidad").querySelector("span")
const iluminacion = document.getElementById("contenedor-iluminacion").querySelector("span")
const ph = document.getElementById("contenedor-ph").querySelector("span")
const temperatura = document.getElementById("contenedor-temperatura").querySelector("span")

// Genera un número aleatorio entre min (incluido) y max (excluido) y redondeandolo a la baja
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Creamos un evento que tiene lugar cuando la pagina se carga, el DOM, y posteriormente inicia intervalos de 16 segundos
//con valores random para cada parametro en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    setInterval(function (){
            humedad.innerText = getRandomNumber(50,75)+"%"
            salinidad.innerText = getRandomNumber(10,30)+"%"
            iluminacion.innerText = "Alta"
            ph.innerText = getRandomNumber(3,6)
            temperatura.innerText = getRandomNumber(14,20)+"ºC"
    }, 30000);
});