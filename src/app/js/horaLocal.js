window.addEventListener("load",obtenerHoraActual);
//Actualiza la hora cada minuto, hora local monitorzacion
function obtenerHoraActual() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();

    // Formatear los minutos con ceros iniciales si son menores a 10
    minutos = (minutos < 10 ? "0" : "") + minutos;

    // Concatenar la hora en formato HH:MM
    var horaActual = hora + ":" + minutos;

    let divHora = document.getElementById("hora-huerto")
    divHora.textContent = horaActual
}

// Llamar a la función de actualización de hora cada 20s
setInterval(obtenerHoraActual, 20000);