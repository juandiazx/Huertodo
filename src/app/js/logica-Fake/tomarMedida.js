document.getElementById("formulario-tomar-medida").addEventListener('submit',tomarMedida);
//--------------------------------------------------------
//      POST
//--------------------------------------------------------
/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * tomarMedida()
 */

async function tomarMedida(event) {
    event.preventDefault();
    let dataJSON = {
        value: document.getElementById("huerto").value,
        timestamp: obtenerFechaHoraActual(),//Obtiene el datetime actual cuando se toma la medida
        temperatura: obtenerNumeroAleatorio(13,26),
        ph: obtenerNumeroAleatorio(1,14),
        humedad: obtenerNumeroAleatorio(5,97),
        salinidad: obtenerNumeroAleatorio(5,97),
        iluminacion: obtenerNumeroAleatorio(2,98)
    };
    const formData = new FormData();
    formData.append('dataJSON', JSON.stringify(dataJSON));
    const respuesta = await fetch('../api/v.1.0/monitorizacion/tomarMedida.php', {
        method: 'post',
        body: formData
    })
}

//Funcion para obtener numero integer aleatorio entre dos numeros
function obtenerNumeroAleatorio(min, max) {
    // Generar un número aleatorio entre 0 y 1
    const numeroAleatorio = Math.random();

    // Escalar y desplazar el número aleatorio al rango deseado
    const numeroEnRango = numeroAleatorio * (max - min) + min;

    // Redondear el número al entero más cercano si se desea un número entero
    // const numeroEnteroEnRango = Math.round(numeroEnRango);

    return numeroEnRango;
}

//Funcion para obtener la fecha actual en formato datetima para SQL
function obtenerFechaHoraActual() {
    const fechaActual = new Date();
    const anyo = fechaActual.getFullYear();
    const mes = agregarCeroAlInicio(fechaActual.getMonth() + 1);
    const dia = agregarCeroAlInicio(fechaActual.getDate());
    const horas = agregarCeroAlInicio(fechaActual.getHours());
    const minutos = agregarCeroAlInicio(fechaActual.getMinutes());
    const segundos = agregarCeroAlInicio(fechaActual.getSeconds());
    return `${anyo}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

//Funcion que agrega un cero al inicio de cada formato de fecha, cada sección
function agregarCeroAlInicio(valor) {
    return valor < 10 ? '0' + valor : valor;
}