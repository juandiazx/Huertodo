//Function asincrona autoejecutable cuando se carga la pagina,
//GET ../api/v.1.0/sesion  rol:String----->comprobarSesion()
//Comprueba si existe una sesión, si existe pues carga la página, si no, no la muestra y redirige al Inicio de sesión
async function comprobarSesion(rol) {
    try{
        var respuesta = await fetch('../api/v.1.0/sesion/');
        var data = await respuesta.json();
    }
    catch(err){
        location.href = './Inicio_sesion.html';
        alert("Acceso restringido, no puede acceder");
    }
    if(respuesta.ok && data.rol ==rol) {
        if(data.rol == "comercial"){
            //Se cargan todos los datos de comercial con las funciones
        }
        else if(data.rol == "usuario"){
            await cargarHuertosUsuario();
            //Funcion para poner el nombre predeterminado en el popup de cambiar nombre, popups-monitorizacion.js
            await cambiarNombrePopUpCambiarNombre()
            await cargarMedidasActual()
            //Se cargan numero de notificaciones, datos tiempo real huerto predeterminado, datos huertos, y grafica predeterminada
        }
        else if(data.rol == "tecnico"){
            //Se cargan todos los datos de tecnico con las funciones
        }
        else if(data.rol == "administrador"){
            //Se cargan todos los datos de administrador con las funciones
        }
        let body = document.querySelector("body");
        document.body.classList.remove("loading");
        document.getElementById("contenedor-nombre-usuario").innerText = "¡Bienvenido, " + data.nombreApellidos+"!";

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
}
async function comprobarSiSesionIniciadaEnLogin(){
    try{
        var respuesta = await fetch('../api/v.1.0/sesion/');
        var data = await respuesta.json();
    }
    catch(err){
        document.querySelector("body").classList.remove("loading");
    }
    if(respuesta.ok){
        if(data.rol == "comercial"){
            location.href = './Comercial.html';
        }
        else if(data.rol == "usuario"){
            location.href = './monitorizacion.html';
        }
        else if(data.rol == "tecnico"){
            location.href = './Tecnico.html';
        }
        else if(data.rol == "administrador"){
            location.href = './Administrador_Web.html';
        }
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


/*
Este codigo es el que funciona en el servidor de produccion los try y catch solo funcionan en test local

//Function asincrona autoejecutable cuando se carga la pagina,
//GET ../api/v.1.0/sesion  rol:String----->comprobarSesion()
//Comprueba si existe una sesión, si existe pues carga la página, si no, no la muestra y redirige al Inicio de sesión
async function comprobarSesion(rol) {
    var respuesta = await fetch('../api/v.1.0/sesion/');
    var data = await respuesta.json();
    if(respuesta.ok && data.rol ==rol) {
        if(data.rol == "comercial"){
            //Se cargan todos los datos de comercial con las funciones
        }
        else if(data.rol == "usuario"){
            await cargarHuertosUsuario();
            //Se cargan numero de notificaciones, datos tiempo real huerto predeterminado, datos huertos, y grafica predeterminada
        }
        else if(data.rol == "tecnico"){
            //Se cargan todos los datos de tecnico con las funciones
        }
        else if(data.rol == "administrador"){
            //Se cargan todos los datos de administrador con las funciones
        }
        let body = document.querySelector("body");
        document.body.classList.remove("loading");
        document.getElementById("contenedor-nombre-usuario").innerText = "¡Bienvenido, " + data.nombreApellidos+"!";
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
else{
    location.href = './Inicio_sesion.html';
    alert("Acceso restringido, no puede acceder");
}
}
async function comprobarSiSesionIniciadaEnLogin(){
    var respuesta = await fetch('../api/v.1.0/sesion/');
    var data = await respuesta.json();
    if(respuesta.ok){
        if(data.rol == "comercial"){
            location.href = './Comercial.html';
        }
        else if(data.rol == "usuario"){
            location.href = './monitorizacion.html';
        }
        else if(data.rol == "tecnico"){
            location.href = './Tecnico.html';
        }
        else if(data.rol == "administrador"){
            location.href = './Administrador_Web.html';
        }
    }
    else{
        document.querySelector("body").classList.remove("loading");
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
 */