// Seleccionar elementos del DOM
const abrirPopupBtn = document.getElementById("abrir-popup");
const cerrarPopupBtn = document.getElementById("cerrar-popup");
const popup = document.getElementById("popup");

// Función para comprobar si todos los campos del formulario están completos
function validarFormulario() {
    const contrasena1 = document.getElementById("password-input").value.trim();
    const contrasena2 = document.getElementById("password-input_2").value.trim();
    if (contrasena1 === contrasena2) {
        console.log('return true');
        return true;

    }
    console.log('return false');
    mostrarError()
    return false;

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
    console.log('click volver');
    if (event.target === popup) {
        popup.classList.remove("mostrar");
        window.location.href = "../app/Inicio_sesion.html";
    }
});

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn.addEventListener("click", function() {
    popup.classList.remove("mostrar");
    window.location.href = "../app/Inicio_sesion.html";
});

function mostrarError(){
    let mensajeError = document.getElementById("mensaje-error-contraseña");
    mensajeError.style.display = "block";
}
