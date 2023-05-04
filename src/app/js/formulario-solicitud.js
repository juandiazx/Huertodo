//Se crea un evento para cuando el formulario de solicitud haga submit
document
    .querySelector("form")
    .addEventListener("submit", enviarFormulario);
const aceptarTerminos = document.getElementById("aceptar-terminos")
const botonSolicitud = document.getElementById("boton-enviar-formulario-solicitud")
aceptarTerminos.addEventListener("click", function (){
    if(aceptarTerminos.checked){
        botonSolicitud.classList.remove("boton-enviar-formulario-solicitud-desactivado")
        botonSolicitud.classList.add("boton-enviar-formulario-solicitud-activo")
    }
    else {
        botonSolicitud.classList.add("boton-enviar-formulario-solicitud-desactivado")
        botonSolicitud.classList.remove("boton-enviar-formulario-solicitud-activo")
    }
})

//Funcion que se ejecuta cuando el submit del formulario de solicitud se dispara, comprueba si cada campo del formulario
//es válido, y si es válido, muestra un popup de correcto
async function enviarFormulario(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email-input")
    const nombreInput = document.getElementById("name-input")
    const apellidosInput = document.getElementById("last-name-input")
    const direccionInput = document.getElementById("address-input")
    const asuntoInput = document.getElementById("subject-input")
    const mensajeInput = document.getElementById("message-input")
    const aceptarTerminos = document.getElementById("aceptar-terminos")
    if (emailInput.validity.valid &&  nombreInput.validity.valid &&  apellidosInput.validity.valid &&
        direccionInput.validity.valid && asuntoInput.validity.valid && mensajeInput.validity.valid &&
        aceptarTerminos.checked) {
        // Si el campo de entrada es válido, mostrar un mensaje de éxito
        alert('El formulario se ha enviado correctamente');
        //Vaciamos el formulario
        document.querySelector("form").reset();
        location.href = "./index.html";
    }
}