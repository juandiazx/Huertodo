//--------------------------------------------------------
//      POST
//--------------------------------------------------------

document.getElementById("login-form").addEventListener("submit",nuevaContrasenya);


/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * nuevaContrasenya()
 * HTTP POST PORQUE PUT NO FUNCIONA AL RECIBIR
 */

async function nuevaContrasenya(event) {
    event.preventDefault();
    const password1 = document.getElementById("password-input").value
    const password2 = document.getElementById("password-input_2").value

    if(password1 !== password2){
        document.getElementById("mensaje-error-contrasenya").innerText = "Las contraseñas no coinciden, inténtalo de nuevo"
        document.getElementById("mensaje-error-contrasenya").style.display = "block"
    }
    else{
        const formData = new FormData(event.target);
        const respuesta = await fetch('../api/v.1.0/contrasenya/nuevaContrasenya.php', {
            method: 'post',
            body: formData
        })
        const data = await respuesta.json()
        // si el resultado de la petición es OK (i.e. código HTTP 200)
        if(respuesta.ok && data.valor == false){
            document.getElementById("mensaje-error-contrasenya").style.display = "none"
            popupContrasenyaNueva()
        }
        else if(respuesta.ok && data.valor==true){
            document.getElementById("mensaje-error-contrasenya").innerText = "Introduce una nueva contraseña, no la misma que ya tienes"
            document.getElementById("mensaje-error-contrasenya").style.display = "block"
        }
        else{
            document.getElementById("mensaje-error-contrasenya").innerText = "El email introducido no es correcto"
            document.getElementById("mensaje-error-contrasenya").style.display = "block"
        }
    }
}


const cerrarPopupBtn = document.getElementById("cerrar-popup");
const popup = document.getElementById("popup");

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar");
    window.location.href = "../app/Inicio_sesion.html";
});
// Función para comprobar si todos los campos del formulario están completos
function popupContrasenyaNueva() {
    popup.classList.add("mostrar");
    document.querySelector(".popup-contenido").classList.add("mostrar");
}