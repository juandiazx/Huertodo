//Codigo para cuando el select cambia de valor, se carguen las medidas actuales del nuevo huerto

let selectorNombres = document.getElementById("nombre-huerto")
selectorNombres.addEventListener("change",cambiarMedidasActual)

async function cambiarMedidasActual(){
    await cargarMedidasActual()
}

