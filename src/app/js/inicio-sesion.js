//Creamos un evento para cuando el formulario de inicio de sesión se haga submit
document
    .querySelector("form")
    .addEventListener("submit", iniciarSesion);

//Funcion que se ejecuta cuando el submit del inicio de sesion se dispara, recorre el JSON con los usuarios
//y comprueba si el correo y la contraseña coincide con algún usuario y con tipo de usuario para saber a qué
//interfaz acceder

// event:EventoListener---------->iniciarSesion()
async function iniciarSesion(event) {
    event.preventDefault();
    let correo = document.getElementById("email-input").value;
    let contrasenya = document.getElementById("password-input").value;
    let respuestaUsuario = await fetch("../../src/api/v.1.0/usuarios.json");
    let respuestaUsuarioJSON = await respuestaUsuario.json();

    //Comprobamos las credenciales de usuarios
    for(let i =0 ; i<=respuestaUsuarioJSON.length-1;i++){
        if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
        respuestaUsuarioJSON[i].tipo === "usuario-final"){
            location.href = "monitorizacion.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "tecnico"){
            location.href = "Tecnico.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "comercial"){
            location.href = "Comercial.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "administrador"){
            location.href = "Administrador_Web.html";
            break
        }
    }
}