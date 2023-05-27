document.getElementById("login-form").addEventListener('submit', guardarFormularioSolicitud);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * guardaraFormularioSolicitud()
 */

async function guardarFormularioSolicitud(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const respuesta = await fetch('../api/v.1.0/formularioSolicitud/guardarFormularioSolicitud.php', {
        method: 'post',
        body: formData
    })
    const data = await respuesta.json();
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if(respuesta.ok){

    }
}

