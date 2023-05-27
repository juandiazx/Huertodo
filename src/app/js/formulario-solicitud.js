//Guardamos los id del checkbox de aceptar terminos y el boton de enviar el formulario
const aceptarTerminos = document.getElementById("aceptar-terminos")
const botonSolicitud = document.getElementById("boton-enviar-formulario-solicitud")


//Añadimos un evento click al checkbox de aceptar terminos
//cuando esté marcado la clase activo del boton se pondrá cuando no, se quitará y se pondrá la clase inactivo
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