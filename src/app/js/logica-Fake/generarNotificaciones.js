//--------------------------------------------------------
//      POST
//--------------------------------------------------------
/**
 * Se ejecutará cuando se tome una medida.
 * datosParametros: JSON{salinidad,temperatura, ph, humedad, iluminacion}
 * generarNotificaciones()
 */

async function generarNotificaciones(dataPrioridadDireccion,huerto,timestamp,tipoParametro,idHuerto) {
    const dataJSONnotificacion = {
        prioridad:dataPrioridadDireccion.prioridad,
        idHuerto:idHuerto,
        timestamp:timestamp,
        mensaje:convertirPrioridadDireccion(dataPrioridadDireccion,tipoParametro,huerto)
    }
    const formData = new FormData();
    formData.append('dataJSONnotificacion', JSON.stringify(dataJSONnotificacion));
    const respuesta = await fetch('../api/v.1.0/monitorizacion/generarNotificaciones.php', {
        method: 'post',
        body: formData
    })
}

function convertirPrioridadDireccion(dataPrioridadDireccion,parametro,huerto){
    let textoOut = ""
    if(parametro=="ph"){
        if(dataPrioridadDireccion.direccion=="alto" && dataPrioridadDireccion.prioridad=="alta" ){
            textoOut= `El valor de ph en ${huerto} ha subido más de 12`
        }
        else if(dataPrioridadDireccion.direccion=="alto" && dataPrioridadDireccion.prioridad=="media"){
            textoOut= `El valor de ph en ${huerto} ha subido más de 11`
        }
        else if(dataPrioridadDireccion.direccion=="bajo" && dataPrioridadDireccion.prioridad=="alta"){
            textoOut= `El valor de ph en ${huerto} ha bajado más de 2`
        }
        else if(dataPrioridadDireccion.direccion=="bajo" && dataPrioridadDireccion.prioridad=="media"){
            textoOut= `El valor de ph en ${huerto} ha bajado más de 3`
        }
    }
    else{
        if(dataPrioridadDireccion.direccion=="alto" && dataPrioridadDireccion.prioridad=="alta" ){
            textoOut= `El valor de ${parametro} en ${huerto} ha subido más de 90%`
        }
        else if(dataPrioridadDireccion.direccion=="alto" && dataPrioridadDireccion.prioridad=="media"){
            textoOut= `El valor de ${parametro} en ${huerto} ha subido más de 80%`
        }
        else if(dataPrioridadDireccion.direccion=="bajo" && dataPrioridadDireccion.prioridad=="alta"){
            textoOut= `El valor de ${parametro} en ${huerto} ha bajado más de 10%`
        }
        else if(dataPrioridadDireccion.direccion=="bajo" && dataPrioridadDireccion.prioridad=="media"){
            textoOut= `El valor de ${parametro} en ${huerto} ha bajado más de 20%`
        }
    }
    return textoOut
}