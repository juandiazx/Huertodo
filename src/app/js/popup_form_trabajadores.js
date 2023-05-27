// Seleccionar elementos del DOM
const abrirPopupAdminBtn = document.getElementById("abrir-popup-admin");
const abrirPopupTecnicoBtn = document.getElementById("abrir-popup-tecnico");
const cerrarPopupBtn = document.getElementById("cerrar-popup");
const popup = document.getElementById("popup");

// Función para comprobar si todos los campos del formulario están completos
function validarFormulario(formId) {
    const form = document.getElementById(formId);
    const email = form.querySelector(`#${formId} input[name="email"]`).value.trim();
    const message = form.querySelector(`#${formId} textarea[name="message"]`).value.trim();
    if (email === "" || message === "") {
        alert("Rellena todos los campos");
        return false;
    }
    return true;
}

// Abrir popup al enviar el formulario con datos válidos (formulario admin)
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (validarFormulario("login-form")) {
        popup.classList.add("mostrar");
        document.querySelector(".popup-contenido").classList.add("mostrar");
    }
});

// Abrir popup al enviar el formulario con datos válidos (formulario técnico)
document.getElementById("login-form2").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (validarFormulario("login-form2")) {
        popup.classList.add("mostrar");
        document.querySelector(".popup-contenido").classList.add("mostrar");
    }
});

// Cerrar popup al hacer clic en el fondo negro
popup.addEventListener("click", function(event) {
    if (event.target === popup) {
        popup.classList.remove("mostrar");
    }
});

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar");
});
