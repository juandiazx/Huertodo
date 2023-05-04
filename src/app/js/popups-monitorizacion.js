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