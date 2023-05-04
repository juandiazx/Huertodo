document
    .querySelector("form")
    .addEventListener("submit", iniciarSesion);

//Funcion que se ejecuta cuando el submit del inicio de sesion se dispara, recorre el JSON con los usuarios
//y comprueba si el correo y la contraseña coincide con algún usuario y con tipo de usuario para saber a qué
//interfaz acceder
async function iniciarSesion(event) {
    event.preventDefault();
    let correo = document.getElementById("email-input").value;
    let contrasenya = document.getElementById("password-input").value;
    let respuestaUsuario = await fetch("../../src/api/v.0.0/usuarios.json");
    let respuestaUsuarioJSON = await respuestaUsuario.json();
    for(let i =0 ; i<=respuestaUsuarioJSON.length-1;i++){
        if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
        respuestaUsuarioJSON[i].tipo === "usuario-final"){
            location.href = "monitorizacion.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "tecnico"){
            location.href = "tecnico.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "comercial"){
            location.href = "comercial.html";
            break
        }
        else if(respuestaUsuarioJSON[i].correo === correo && respuestaUsuarioJSON[i].contrasenya === contrasenya &&
            respuestaUsuarioJSON[i].tipo === "administrador"){
            location.href = "administrador.html";
            break
        }
        else if(i=== respuestaUsuarioJSON.length-1){
            alert("Usuario incorrecto, inténtalo de nuevo");
        }
    }
}