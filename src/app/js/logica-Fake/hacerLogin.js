document.getElementById("login-form").addEventListener('submit', crearSesion);
/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * crearSesion()
 */

async function crearSesion(event) {
    // eliminamos el mensaje de error previo, si lo hay
    /*const output = document.getElementById("output");
    output.classList.remove("error");*/

    event.preventDefault();
    const formData = new FormData(event.target);
    const respuesta = await fetch('../api/v.1.0/sesion/', {
        method: 'post',
        body: formData
    })
    const data = await respuesta.json();
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if(respuesta.ok){
        if (data.rol == "usuario") {
            // redirigimos a la página correspondiente
            location.href = 'monitorizacion.html';
        }
        else if(data.rol == "comercial"){
            location.href = 'Comercial.html';
        }
        else if(data.rol == "tecnico"){
            location.href = 'Tecnico.html';
        }
        else if(data.rol == "administrador"){
            location.href = 'Administrador_Web.html';
        }
    }
    else {
        alert("Usuario incorrecto, inténtelo de nuevo");
        // si no, mostramos un mensaje de error
        /* output.innerText = "Credenciales no válidas";
         output.classList.add("error");*/
    }
}