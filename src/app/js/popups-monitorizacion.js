//JS Popup Notificaciones
const popup = document.getElementById("desplegable-popup-notificaciones")
const botonPanelNotificaciones = document.getElementById("panel-circular-notificaciones")
const botonCerrarPanelNotificaciones = document.getElementById("cerrar-dialogo-notificaciones")
botonPanelNotificaciones.addEventListener('click', ()=>{
    popup.showModal();
})

botonCerrarPanelNotificaciones.addEventListener('click', ()=>{
    popup.close()
});

//JS Popup Mapa
const popupMapa = document.getElementById("desplegable-popup-mapa")
const botonPanelNotificacionesMapa = document.getElementById("boton-mapas-huertos")
const botonCerrarPanelNotificacionesMapa = document.getElementById("cerrar-dialogo-mapa")
botonPanelNotificacionesMapa.addEventListener('click', ()=>{
    popupMapa.showModal();
})

botonCerrarPanelNotificacionesMapa.addEventListener('click', ()=>{
    popupMapa.close()
});

//Botones Iconos Huertos Mapa

const huerto1 = document.getElementById("icono-huerto1")
const huerto2 = document.getElementById("icono-huerto2")
const selectorNombre = document.getElementById("nombre-huerto")
huerto1.addEventListener("click",function (){
    selectorNombre.value = "Huerto 1"
    popupMapa.close()
})

huerto2.addEventListener("click",function (){
    selectorNombre.value = "Huerto 2"
    popupMapa.close()
})