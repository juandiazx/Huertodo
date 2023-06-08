//--------------------------------------------------------
//      DELETE
//--------------------------------------------------------

//Funcion asincrona para borrar una notificacion de la base de datos, es llamada desde cargarBorrarNotificacionesInterfaz()
//Le entra como parámetros el id de la notificacion guardado como atributo y el contenedor DOM de la notificacion
async function borrarNotificacionMonitorizacion(idNotificacion,contenedorNotificacion) {
    const dataId = { idNotificacion }; // Crear un objeto con el parámetro id
    const respuesta = await fetch('../api/v.1.0/monitorizacion/borrarNotificacionMonitorizacion.php', {
        method: 'delete',
        body: JSON.stringify(dataId)
    });
    if (respuesta.ok) {
        contenedorNotificacion.remove(); // Eliminar el contenedor de la notificación del DOM
        await cargarNotificacionesHuertos()//Cargo las notis
        await cargarBorrarNotificacionesInterfaz()//Asigno esta funcion misma a cada notificacion
    }
}

//Llamada desde control-acceso.js y cada 10s en getMedidas.js
//Funcion que asigna a cada icono de cerrar de cada notificacion, el evento relacionado con borrarNotificacionMonitorizacion()
async function cargarBorrarNotificacionesInterfaz(){
    const botonesBorrar = document.querySelectorAll('.icono-borrar-notificacion');
// Iterar sobre cada botón de borrado y agregar un controlador de eventos
    botonesBorrar.forEach((boton) => {
        boton.addEventListener('click', async () => {
            const notificacion = boton.parentNode; // Obtener el contenedor de la notificación
            let idHuerto = notificacion.getAttribute('data-id');//Obtenemos el id de la notificacion
            await borrarNotificacionMonitorizacion(idHuerto,notificacion)//Llamamos a la funcion de la L.N para que borre noti
        });
    });
}