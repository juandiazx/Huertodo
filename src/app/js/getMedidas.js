//Codigo para cuando el select cambia de valor, se carguen las medidas actuales del nuevo huerto

let selectorNombres = document.getElementById("nombre-huerto")
selectorNombres.addEventListener("change",cargarMedidasActual)

async function actualizarEspacioPersonal(){
    await cargarMedidasActual()
    await cargarNotificacionesHuertos()
    await cargarBorrarNotificacionesInterfaz()
}

//Codigo para que cada cierto intervalo tambien se ejecute la carga de medidas actuales

setInterval(actualizarEspacioPersonal,10000)

