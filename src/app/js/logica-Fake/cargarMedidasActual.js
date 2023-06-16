//--------------------------------------------------------
//      GET
//--------------------------------------------------------
//Se exporta de forma que se incluye en etiquetas <script> antes de control-acceso.js

const medidasProcesadas = new Set();//medidas ya procesadas previamente
async function cargarMedidasActual(){
    let valorSelector = {id:document.getElementById("nombre-huerto").value}
    const param = new URLSearchParams(valorSelector);
    let url = '../api/v.1.0/monitorizacion/cargarMedidasActual.php'
    const respuesta = await fetch(`${url}?${param}`);
    if(!respuesta.ok){
        alert("Las última medida no se ha podido cargar")
    }
    const data = await respuesta.json();
    const selectElement = document.getElementById("nombre-huerto");
    const selectedOption = selectElement.selectedOptions[0];
    const selectedOptionName = selectedOption.text;
    let dataJSON = {
        huerto: selectedOptionName,
        idHuerto: document.getElementById("nombre-huerto").value,
        timestamp: obtenerFechaActual(),//Obtiene el date actual en formato SQL
        temperatura: comprobarParametroTemp(data.temperatura),
        ph: comprobarPh(data.ph),
        humedad: comprobarParametroNoPh(data.humedad),
        salinidad: comprobarParametroNoPh(data.salinidad),
        iluminacion: comprobarParametroNoPh(data.iluminacion)
    };

    // Verificar si la medida ya ha sido procesada
    const medidaExistente = Array.from(medidasProcesadas).some(medida => {
        return JSON.stringify(medida) === JSON.stringify(data);
    });
    // Verificar si la medida ya ha sido procesada
    if (!medidaExistente) {
        console.log(medidasProcesadas)
        // La medida no ha sido procesada, crear la notificación
        decidirSiGenerarNotificaciones(dataJSON)//Aqui se decide para que parametros se generan notificaciones
        // Agregar la medida al conjunto de medidas procesadas
        medidasProcesadas.add(data);
    }
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


//Funcion para comprobar los rangos de todos los parametros que no son ph
function comprobarParametroNoPh(parametro) {
    const resultado = {};
    if (parametro < 10 || parametro > 90) {
        resultado.prioridad = "alta";
    } else if (parametro < 20 || parametro > 80) {
        resultado.prioridad = "media";
    }
    else{
        resultado.prioridad = "nada";
    }

    if (parametro < 10 || parametro < 20) {
        resultado.direccion = "bajo";
    } else if (parametro > 80 || parametro > 90) {
        resultado.direccion = "alto";
    }
    else{
        resultado.direccion = "nada";
    }
    return resultado;
}

//Funcion para comprrobar los umbrales del ph
function comprobarPh(ph) {
    const resultado = {};
    if (ph < 2) {
        resultado.prioridad = "alta";
        resultado.direccion = "bajo";
    }
    else if(ph > 12){
        resultado.direccion = "alto";
        resultado.prioridad = "alta";
    }
    else if (ph < 3) {
        resultado.prioridad = "media";
        resultado.direccion = "bajo";
    }
    else if(ph > 11){
        resultado.prioridad = "media";
        resultado.direccion = "alto";
    }
    else{
        resultado.prioridad = "nada";
        resultado.direccion = "nada";
    }
    return resultado;
}

//Funcion para comprobar los rangos de todos los parametros que no son ph
function comprobarParametroTemp(parametro) {
    const resultado = {};
    if (parametro < 10 || parametro > 35) {
        resultado.prioridad = "alta";
    } else if (parametro < 14 || parametro > 30) {
        resultado.prioridad = "media";
    }
    else{
        resultado.prioridad = "nada";
    }

    if (parametro < 10 || parametro < 14) {
        resultado.direccion = "bajo";
    } else if (parametro > 35 || parametro > 30) {
        resultado.direccion = "alto";
    }
    else{
        resultado.direccion = "nada";
    }
    return resultado;
}

async function decidirSiGenerarNotificaciones(datosMedidaPrioridades){
    if(datosMedidaPrioridades.temperatura.prioridad !="nada"){
        await generarNotificaciones(datosMedidaPrioridades.temperatura,datosMedidaPrioridades.huerto,datosMedidaPrioridades.timestamp,"temperatura",datosMedidaPrioridades.idHuerto)
    }
    if(datosMedidaPrioridades.iluminacion.prioridad != "nada"){
        await generarNotificaciones(datosMedidaPrioridades.iluminacion,datosMedidaPrioridades.huerto,datosMedidaPrioridades.timestamp,"iluminacion",datosMedidaPrioridades.idHuerto)
    }
    if(datosMedidaPrioridades.ph.prioridad != "nada"){
        await generarNotificaciones(datosMedidaPrioridades.ph,datosMedidaPrioridades.huerto,datosMedidaPrioridades.timestamp,"ph",datosMedidaPrioridades.idHuerto)
    }
    if(datosMedidaPrioridades.humedad.prioridad != "nada"){
        await generarNotificaciones(datosMedidaPrioridades.humedad,datosMedidaPrioridades.huerto,datosMedidaPrioridades.timestamp,"humedad",datosMedidaPrioridades.idHuerto)
    }
    if(datosMedidaPrioridades.salinidad.prioridad != "nada"){
        await generarNotificaciones(datosMedidaPrioridades.salinidad,datosMedidaPrioridades.huerto,datosMedidaPrioridades.timestamp,"salinidad",datosMedidaPrioridades.idHuerto)
    }
}

// Función para obtener la fecha actual en formato "YYYY-MM-DD" para SQL
function obtenerFechaActual() {
    const fechaActual = new Date();
    const anyo = fechaActual.getFullYear();
    const mes = agregarCeroAlInicio(fechaActual.getMonth() + 1);
    const dia = agregarCeroAlInicio(fechaActual.getDate());
    return `${anyo}-${mes}-${dia}`;
}

// Función que agrega un cero al inicio de cada formato de fecha
function agregarCeroAlInicio(valor) {
    return valor < 10 ? '0' + valor : valor;
}