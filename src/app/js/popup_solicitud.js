// Seleccionar elementos del DOM
const abrirPopupBtn = document.getElementById("abrir-popup");
const cerrarPopupBtn = document.getElementById("cerrar-popup");
const popup = document.getElementById("popup");

// Función para comprobar si todos los campos del formulario están completos
function validarFormulario() {
    const email = document.getElementById("email-input").value.trim();
    if (email === "") {
        return false;
    }
    return true;
}

// Abrir popup al enviar el formulario con datos válidos
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (validarFormulario()) {
        popup.classList.add("mostrar");
        document.querySelector(".popup-contenido").classList.add("mostrar");
    }
});

// Cerrar popup al hacer clic en el fondo negro
popup.addEventListener("click", function(event) {
    if (event.target === popup) {
        popup.classList.remove("mostrar");
        window.location.href = "../../index.html";
    }
});

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar");
    window.location.href ="../../index.html";
});


// Guardamos los id del checkbox de aceptar términos y el botón de enviar el formulario
const aceptarTerminos = document.getElementById("aceptar-terminos");
const botonSolicitud = document.getElementById("boton-enviar-formulario-solicitud");

// Añadimos un evento click al checkbox de aceptar términos
// Cuando esté marcado, la clase activo del botón se agregará, cuando no, se quitará y se pondrá la clase inactivo
aceptarTerminos.addEventListener("click", function() {
    if (aceptarTerminos.checked) {
        botonSolicitud.classList.remove("boton-enviar-formulario-solicitud-desactivado");
        botonSolicitud.classList.add("boton-enviar-formulario-solicitud-activo");
    } else {
        botonSolicitud.classList.add("boton-enviar-formulario-solicitud-desactivado");
        botonSolicitud.classList.remove("boton-enviar-formulario-solicitud-activo");
    }


});