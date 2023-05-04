//Se crea un evento para cuando el formulario de contraseña olvidada haga submit
document
    .querySelector("form")
    .addEventListener("submit", enviarFormulario);

//Funcion que se ejecuta cuando el submit del formulario de solicitud se dispara, comprueba si cada campo del formulario
//es válido, y si es válido, muestra un popup de correcto
async function enviarFormulario(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email-input")
    if (emailInput.validity.valid) {
        // Si el campo de entrada es válido, mostrar un mensaje de éxito
        alert('Correo enviado con éxito');
        //Vaciamos el formulario
        document.querySelector("form").reset();
        //Se vuelve a la landing page
        location.href = "./index.html";
    }
}