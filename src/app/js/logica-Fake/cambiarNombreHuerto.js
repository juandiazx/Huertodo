//--------------------------------------------------------
//      POST
//--------------------------------------------------------

document.getElementById("formulario-cambiar-nombre-huerto").addEventListener("submit",cambiarNombreHuerto);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * cambiarNombreHuerto()
 * HTTP POST PORQUE PUT NO FUNCIONA AL RECIBIR
 */

async function cambiarNombreHuerto(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const respuesta = await fetch('../api/v.1.0/monitorizacion/cambiarNombreHuerto.php', {
        method: 'post',
        body: formData
    })
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if(respuesta.ok){
        document.getElementById("formulario-cambiar-nombre-huerto").querySelector("button").style.background = "grey"
        document.getElementById("formulario-cambiar-nombre-huerto").querySelector("button").disabled = true
        let mensajeExito = document.getElementById("mensaje-exito-cambiar-nombre");
        mensajeExito.style.display = "block"
        document.getElementById("cerrar-dialogo-cambiar-nombre").addEventListener("click",()=>{
            location.reload();
        })
    }
}