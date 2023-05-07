//JS Popup Notificaciones
const popup = document.getElementById("desplegable-popup-notificaciones")
const botonPanelNotificaciones = document.getElementById("panel-circular-notificaciones")
const botonCerrarPanelNotificaciones = document.getElementById("cerrar-dialogo-notificaciones")

//Cuando se toque en el panel, se abre el popup
botonPanelNotificaciones.addEventListener('click', ()=>{
    popup.showModal();
})


//Cuando se toque en el boton de cerrar el popup, dentro de él mismo, se cierra el popup
botonCerrarPanelNotificaciones.addEventListener('click', ()=>{
    popup.close()
});

//JS Popup Mapa
const popupMapa = document.getElementById("desplegable-popup-mapa")
const botonPanelMapa = document.getElementById("boton-mapas-huertos")
const botonCerrarPanelMapa = document.getElementById("cerrar-dialogo-mapa")

//Cuando se toque en el boton de mapa huertos, se abre el popup
botonPanelMapa.addEventListener('click', ()=>{
    popupMapa.showModal();
})


//Cuando se toque en el boton de cerrar el popup, dentro de él mismo, se cierra el popup
botonCerrarPanelMapa.addEventListener('click', ()=>{
    popupMapa.close()
});

//Botones Iconos Huertos Mapa

const huerto1 = document.getElementById("icono-huerto1")
const huerto2 = document.getElementById("icono-huerto2")
const selectorNombre = document.getElementById("nombre-huerto")

//Eventos click para cada icono dentro del popup, iconos de los huertos, si se hace click cierra popup y
//cambia el valor del huerto en el que estés al que clickes, te mueve de huertos
huerto1.addEventListener("click",function (){
    selectorNombre.value = "Huerto 1"
    popupMapa.close()
})

huerto2.addEventListener("click",function (){
    selectorNombre.value = "Huerto 2"
    popupMapa.close()
})