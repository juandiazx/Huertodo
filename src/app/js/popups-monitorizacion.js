//---------------------------------------------------------------------------------------
// Notificaciones
//---------------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------------
// Cambiar nombre
//---------------------------------------------------------------------------------------
//JS Popup Cambiar Nombre Huerto
const popupNombre = document.getElementById("desplegable-popup-cambiar-nombre-huerto")
const botonPanelNombre = document.getElementById("icono-editar-nombre")
const botonCerrarPanelNombre = document.getElementById("cerrar-dialogo-cambiar-nombre")

//Cuando se toque en el panel, se abre el popup
botonPanelNombre.addEventListener('click', ()=>{
    popupNombre.showModal();
})


//Cuando se toque en el boton de cerrar el popup, dentro de él mismo, se cierra el popup
botonCerrarPanelNombre.addEventListener('click', ()=>{
    popupNombre.close()
});
//------------------------------------------------------------------
//Para que se cambie el nombre de qué huerto vas a cambiar el nombre
let select = document.getElementById("nombre-huerto")
select.addEventListener("change",cambiarNombrePopUpCambiarNombre)
async function cambiarNombrePopUpCambiarNombre(){
    let label = document.getElementById("formulario-cambiar-nombre-huerto").querySelector("label")
    let selector = document.getElementById("nombre-huerto")
    let nombreSelect = selector.options[selector.selectedIndex].textContent
    label.innerText = "Nombre nuevo para " + nombreSelect;
}

//---------------------------------------------------------------------------------------
// Mapa
//---------------------------------------------------------------------------------------
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
    selectorNombre.value = "1"
    popupMapa.close()
})

huerto2.addEventListener("click",function (){
    selectorNombre.value = "2"
    popupMapa.close()
})