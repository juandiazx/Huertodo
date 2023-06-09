// Seleccionar elementos del DOM
const abrirPopupBtn = document.getElementById("abrir-popup");
const cerrarPopupBtn = document.getElementById("cerrar-popup");
const popup = document.getElementById("popup");

// Función para comprobar si todos los campos del formulario están completos
function validarFormulario() {
    const email = document.getElementById("email-input").value.trim();
    if (email === "") {
        alert("Rellena este campo");
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
        window.location.href = "Inicio_sesion.html";
    }
});

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar");
    window.location.href = "Inicio_sesion.html";
});
