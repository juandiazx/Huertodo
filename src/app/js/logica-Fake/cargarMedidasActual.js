//--------------------------------------------------------
//      GET
//--------------------------------------------------------
//Se exporta de forma que se incluye en etiquetas <script> antes de control-acceso.js
async function cargarMedidasActual(){
    let valorSelector = {id:document.getElementById("nombre-huerto").value}
    const param = new URLSearchParams(valorSelector);
    let url = '../api/v.1.0/monitorizacion/cargarMedidasActual.php'
    const respuesta = await fetch(`${url}?${param}`);
    const data = await respuesta.json();

//Guardamos IDs de los spans donde van los datos en tiempo real de monitorizacion
    const humedad = document.getElementById("contenedor-humedad").querySelector("span")
    const salinidad = document.getElementById("contenedor-salinidad").querySelector("span")
    const iluminacion = document.getElementById("contenedor-iluminacion").querySelector("span")
    const ph = document.getElementById("contenedor-ph").querySelector("span")
    const temperatura = document.getElementById("contenedor-temperatura").querySelector("span")

    humedad.innerText = data.humedad+"%"
    salinidad.innerText = data.salinidad+"%"
    iluminacion.innerText = data.iluminacion+"%"
    ph.innerText = data.ph
    temperatura.innerText = data.temperatura+"ºC"
}