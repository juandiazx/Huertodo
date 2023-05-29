document.getElementById("login-form").addEventListener('submit', enviarCorreoRestablecerContrasenya);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * enviarCorreoRestablecerContrasenya()
 */
async function enviarCorreoRestablecerContrasenya(event) {
    //FALTA UNIR ESTO AL POPUP DE ENVIO CON EXITO Y UN MENSAJE DE ERROR DE NO ENCONTRADO EL CORREO
    event.preventDefault();
    const formData = new FormData(event.target);
    //A lo mejor conviene hacer con GET
    const respuesta = await fetch('../api/v.1.0/contrasenya/enviarCorreoRestablecerContrasenya.php', {
        method: 'post',
        body: formData
    })
    const data = await respuesta.json();
    // si el resultado de la petición es OK (i.e. código HTTP 200)
    if(respuesta.ok){
        //Popup de exito
    }
    else{
        //Error
    }
}
