// Seleccionar elementos del DOM
const abrirPopupBtn2 = document.getElementById("abrir-popup2");
const cerrarPopupBtn2 = document.getElementById("cerrar-popup2");
const popup2 = document.getElementById("popup2");

// Función para comprobar si todos los campos del formulario están completos
function validarFormulario2() {
    const email2 = document.getElementById("email-input2").value.trim();
    if (email2 === "") {
        alert("Rellena este campo");
        console.log('return false');
        return false;

    }
    console.log('return true');
    return true;
}

// Abrir popup al enviar el formulario con datos válidos
document.getElementById("login-form2").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (validarFormulario2()) {
        popup2.classList.add("mostrar");
        document.querySelector(".popup-contenido").classList.add("mostrar");
    }
});

// Cerrar popup al hacer clic en el fondo negro
popup2.addEventListener("click", function(event) {
    console.log('click volver');
    if (event.target === popup2) {
        popup2.classList.remove("mostrar");
    }
});

// Cerrar popup y redirigir a otra página al hacer clic en el botón "Volver"
cerrarPopupBtn2.addEventListener("click", function() {
    popup2.classList.remove("mostrar");
});
