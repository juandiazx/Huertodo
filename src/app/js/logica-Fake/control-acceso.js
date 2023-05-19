
//Function asincrona autoejecutable cuando se carga la pagina,
//GET ../api/v.1.0/sesion  rol:String----->comprobarSesion()
//Comprueba si existe una sesión, si existe pues carga la página, si no, no la muestra y redirige al Inicio de sesión
async function comprobarSesion(rol) {
    const respuesta = await fetch('../api/v.1.0/sesion/');
    const data = await respuesta.json();
    if(respuesta.ok && data.rol ==rol) {
        /*document.getElementById('user-name').innerText = data.nombre; //HAY QUE HACER QUE PONGA QUE USUARIO ES*/
        let body = document.querySelector("body");
        document.body.classList.remove("loading");
        document.getElementById("contenedor-nombre-usuario").innerText = "Bienvenido " + data.nombreApellidos;
        //Hay que ponerle a todo el body de los espacios personales, la clase loading que tendra un display none
    }
    //Si hay una sesion pero el rol en esta sesion es distinto al del que llama a la funcion
    else if(respuesta.ok && rol !=data.rol){
        //Luego, como realmente hay una sesion, te redirije a tu espacio correspondiente
        if(data.rol == "comercial"){
            location.href = './Comercial.html';
            alert("Acceso restringido");
        }
        else if(data.rol == "usuario"){
            location.href = './monitorizacion.html';
            alert("Acceso restringido");
        }
        else if(data.rol == "tecnico"){
            location.href = './Tecnico.html';
            alert("Acceso restringido");
        }
        else if(data.rol == "administrador"){
            location.href = './Administrador_Web.html';
            alert("Acceso restringido");
        }
    }
    else {
        location.href = './Inicio_sesion.html';
        alert("Acceso restringido, no puede acceder");
    }
}


//Funcion asincrona para borrar la sesion y salir del espacio personal
// DELETE ../api/v.1.0/sesion  borrarSesion()
async function borrarSesion() {
    const respuesta = await fetch('../api/v.1.0/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        location.href = "../../index.html";
    }
}