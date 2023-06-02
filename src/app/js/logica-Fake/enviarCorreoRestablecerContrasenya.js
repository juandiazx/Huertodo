//--------------------------------------------------------
//      GET
//--------------------------------------------------------

document.getElementById("login-form").addEventListener('submit', enviarCorreoRestablecerContrasenya);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * enviarCorreoRestablecerContrasenya()
 */
async function enviarCorreoRestablecerContrasenya(event) {
    const popup = document.getElementById("popup");

    event.preventDefault();
    let valorSelector = {email:document.getElementById("email-input").value}
    const param = new URLSearchParams(valorSelector);
    let url = '../api/v.1.0/contrasenya/enviarCorreoRestablecerContrasenya.php'
    const respuesta = await fetch(`${url}?${param}`);
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if(!respuesta.ok){
        mostrarMensajeError()
    }
    else{
        ocultarMensajeError()
        popup.classList.add("mostrar")
    }
}
const cerrarPopupBtn = document.getElementById("cerrar-popup");
// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar")
    window.location.href = "../app/Inicio_sesion.html";
});

function mostrarMensajeError() {
    let mensajeError = document.getElementById("mensaje-error");
    mensajeError.style.display = "block";
}

function ocultarMensajeError(){
    let mensajeError = document.getElementById("mensaje-error");
    mensajeError.style.display = "none";
}