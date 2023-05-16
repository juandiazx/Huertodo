document
    .querySelector("form")
    .addEventListener("submit", iniciarSesion);

async function iniciarSesion(event) {
    event.preventDefault();
    let correo = document.getElementById("email-input").value;
    let contrasenya = document.getElementById("password-input").value;
    let respuestaUsuario = await fetch("../../src/api/v.1.0/usuarios.json");
    let respuestaUsuarioJSON = await respuestaUsuario.json();

    let usuarioEncontrado = false;

    // Comprobamos las credenciales de usuarios
    for(let i = 0; i <= respuestaUsuarioJSON.length - 1; i++){
        if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya) {
            usuarioEncontrado = true;

            if(respuestaUsuarioJSON[i].tipo === "usuario-final") {
                location.href = "monitorizacion.html";
            } else if(respuestaUsuarioJSON[i].tipo === "tecnico") {
                location.href = "Tecnico.html";
            } else if(respuestaUsuarioJSON[i].tipo === "comercial") {
                location.href = "Comercial.html";
            } else if(respuestaUsuarioJSON[i].tipo === "administrador") {
                location.href = "Administrador_Web.html";
            }

            break;
        }
    }

    if(!usuarioEncontrado) {
        mostrarMensajeError();
    }
}

function mostrarMensajeError() {
    let mensajeError = document.getElementById("mensaje-error");
    mensajeError.style.display = "block";
}
