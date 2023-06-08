//--------------------------------------------------------
//      GET
//--------------------------------------------------------

//Funcion para cargarNotificaciones de todos los huertos del usuario en espacio personal
async function cargarNotificacionesHuertos(){
    //Obtenemos los ids de los huertos que tiene el usuario, los metemos en la url del fetch
    let select = document.getElementById("nombre-huerto");
    let idsHuertos = [];
    Array.from(select.options).forEach(function(option) {
        idsHuertos.push(option.value);
    });
    let parametroSinConvertir = {
        idsHuertos:idsHuertos
    }
    let urlParams = new URLSearchParams();

    for (let key in parametroSinConvertir) {
        urlParams.append(key, parametroSinConvertir[key]);
    }
    let url = '../api/v.1.0/monitorizacion/cargarNotificacionesHuertos.php'
    const respuesta = await fetch(`${url}?${urlParams}`);
    var data = await respuesta.json();
    if(respuesta.ok && data.valor == false){ //Si no hay notificaciones
        //Pues entonces cambiamos icono de campana e indicamos que no hay notificaciones
        document.getElementById("parrafo-numero-notificaciones").textContent = "No hay notificaciones"
        document.getElementById("icono-campana-notificaciones").src = "images/icono-notificaciones-sin.png"
        document.getElementById("texto-sin-notificaciones").style.display = "block"
        document.getElementById("contenedor-sin-notificaciones").style.height = "100%"
    }
    else{
        //Si hay notificaciones pues indicamos cuantas y cambiamos el icono

        document.getElementById("icono-campana-notificaciones").src = "images/icono-notificaciones-con.png"
        let textoPluralSingular = "notificaciones"
        //Si solo hay una notificacion, pues la palabra sera notificación no notificaciones
        if(data.length == 1){
            textoPluralSingular = "notificación"
        }
        document.getElementById("parrafo-numero-notificaciones").textContent = `${data.length} ${textoPluralSingular}`
        document.getElementById("texto-sin-notificaciones").style.display = "none"
        document.getElementById("contenedor-sin-notificaciones").style.height = "0%"
        //Eliminamos todas notificaciones de la interfaz antes:
        eliminarContenedoresHijos("desplegable-popup-notificaciones", 'contenedor-notificacion-especifica')
// Iteramos sobre el array y crear los elementos de notificación correspondientes
        data.forEach(function(notificacion) {
            let elementoNotificacion = crearElementoNotificacion(notificacion);
            // Agregar el elemento de notificación al contenedor deseado en tu HTML
            let contenedorNotificaciones = document.getElementById("desplegable-popup-notificaciones");
            contenedorNotificaciones.appendChild(elementoNotificacion);
        });
        //aqui se terminan de crear todos
    }
}

//Funcion para crear un contendor de notificacion especifica
function crearElementoNotificacion(notificacion) {
    // Crear el elemento contenedor
    var contenedor = document.createElement('div');
    contenedor.classList.add('contenedor-notificacion-especifica');

    // Asignar el ID de notificación como un atributo personalizado
    contenedor.setAttribute('data-id', notificacion.id);

    // Crear el elemento de icono de prioridad
    var iconoPrioridad = document.createElement('div');
    iconoPrioridad.classList.add('icono-prioridad-notificacion');

    // Crear la imagen del icono de prioridad
    var imagenPrioridad = document.createElement('img');
    if(notificacion.prioridad == "media"){
        imagenPrioridad.src = `images/icons8-neutral-50.png`;
    }
    else{
        imagenPrioridad.src = `images/icons8-sad-50.png`;
    }
    imagenPrioridad.alt = 'Icono Prioridad Notificacion';

    // Agregar la imagen al elemento de icono de prioridad
    iconoPrioridad.appendChild(imagenPrioridad);

    // Crear el elemento de texto de notificación
    var notificacionTexto = document.createElement('div');
    notificacionTexto.classList.add('notificacion-especifica-texto');

    // Crear el párrafo de texto de notificación
    var parrafoTexto = document.createElement('p');
    parrafoTexto.textContent = notificacion.contenido;

    // Agregar el párrafo al elemento de texto de notificación
    notificacionTexto.appendChild(parrafoTexto);

    // Crear el elemento de fecha de notificación
    var notificacionFecha = document.createElement('div');
    notificacionFecha.classList.add('notificacion-especifica-fecha');

    // Crear el párrafo de fecha de notificación
    var parrafoFecha = document.createElement('p');
    parrafoFecha.textContent = formatearFecha(notificacion.fecha);

    // Agregar el párrafo al elemento de fecha de notificación
    notificacionFecha.appendChild(parrafoFecha);

    // Crear el elemento de icono de borrar notificación
    var iconoBorrar = document.createElement('div');
    iconoBorrar.classList.add('icono-borrar-notificacion');

    // Crear el botón de eliminar notificación
    var botonEliminar = document.createElement('i');
    botonEliminar.classList.add('bi', 'bi-x-lg');

    // Agregar el botón al elemento de icono de borrar notificación
    iconoBorrar.appendChild(botonEliminar);

    // Agregar todos los elementos al contenedor
    contenedor.appendChild(iconoPrioridad);
    contenedor.appendChild(notificacionTexto);
    contenedor.appendChild(notificacionFecha);
    contenedor.appendChild(iconoBorrar);
    return contenedor;
}

//Funcion para formatear la fecha obtenida por el sql, obtiene una fecha en formato date de sql y la devuelve
//en formato 07/05/23
function formatearFecha(fecha) {
    // Dividir la fecha en partes (año, mes, día)
    const partes = fecha.split('-');
    const anio = partes[0].slice(-2);
    const mes = partes[1];
    const dia = partes[2];
    // Construir la fecha en el nuevo formato
    return `${dia}/${mes}/${anio}`;
}

//Funcion para eliminar los contenedores hijos
function eliminarContenedoresHijos(contenedorPadreId, claseEspecifica) {
    // Obtener el contenedor padre
    const contenedorPadre = document.getElementById(contenedorPadreId);

    // Obtener todos los contenedores hijos con la clase específica
    const contenedoresHijos = contenedorPadre.querySelectorAll('.' + claseEspecifica);

    // Eliminar cada contenedor hijo
    contenedoresHijos.forEach(contenedorHijo => {
        contenedorHijo.remove();
    });
}