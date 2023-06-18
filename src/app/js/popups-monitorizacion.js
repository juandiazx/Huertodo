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
    let inputClandestino = document.getElementById("input-clandestino")
    let nombreSelect = selector.options[selector.selectedIndex].textContent
    label.innerText = "Nombre nuevo para " + nombreSelect;
    inputClandestino.value = selector.value; //Le asignamos al input clandestino el valor del select
}

//---------------------------------------------------------------------------------------
// Mapa
//---------------------------------------------------------------------------------------

async function dinamicaMapaMonitorizacion(){
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

//Funcion para hacer scroll hacia arriba
    function subirPagina() {
        // Obtener la altura total de la página
        var alturaPagina = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

        // Obtener la altura de la ventana del navegador
        var alturaVentana = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Obtener la cantidad de desplazamiento relativo
        var porcentajeDesplazamiento = -0.35; // (0.5 representa el 50% de la altura de la ventana)

        // Calcular la cantidad de desplazamiento en píxeles
        var desplazamiento = alturaPagina - alturaVentana;
        var desplazamientoRelativo = porcentajeDesplazamiento * desplazamiento;

        // Desplazar la página hacia abajo
        window.scrollTo({
            top: desplazamientoRelativo,
            behavior: 'smooth'
        });
    }

    const huerto1 = document.getElementById("icono-huerto1")
    const huerto2 = document.getElementById("icono-huerto2")
    const selectorNombre = document.getElementById("nombre-huerto")

    const nombreHuerto1 = document.getElementById("mapa-huerto-1").querySelector("p")
    if(selectorNombre.options.length ==2){
        var nombreHuerto2 = document.getElementById("mapa-huerto-2").querySelector("p")
    }

        setTimeout(async function(){
            nombreHuerto1.innerText = selectorNombre.options[0].text;
            if(selectorNombre.options.length ==2){
                nombreHuerto2.innerText = selectorNombre.options[1].text
            }
            await cambiarFocusIconoMapa()
        },200)

//Eventos click para cada icono dentro del popup, iconos de los huertos, si se hace click cierra popup y
//cambia el valor del huerto en el que estés al que clickes, te mueve de huertos

//Cada vez que se hace click en el icono de huerto del mapa, se cargan las medidas actuales de ese huerto
//y se actualiza el nombre en el popup de cambiar nombre del huerto, se cierra popup y se hace scroll
    const mapaHuerto1 = document.getElementById("mapa-huerto-1")
    const mapaHuerto2 = document.getElementById("mapa-huerto-2")
    async function cambiarFocusIconoMapa(){
        console.log(selectorNombre.value)
        if(selectorNombre.options[0].value == selectorNombre.value){
            mapaHuerto1.style.background = "#06884D"
            if(selectorNombre.options.length ==2){
                mapaHuerto2.style.background = "transparent"
            }
        }
        else if(selectorNombre.options[1].value == selectorNombre.value){
            if(selectorNombre.options.length ==2){
                mapaHuerto2.style.background = "#06884D"
            }
            mapaHuerto1.style.background = "transparent"
        }
    }
    selectorNombre.addEventListener("change",cambiarFocusIconoMapa)
    huerto1.addEventListener("click",async function (){
        selectorNombre.value = selectorNombre.options[0].value
        await cambiarFocusIconoMapa()
        await cargarMedidasActual()
        await cambiarNombrePopUpCambiarNombre()
        await graficas()
        popupMapa.close()
        subirPagina()
    })

    if(selectorNombre.options.length ==2){
        huerto2.addEventListener("click",async function (){
            selectorNombre.value = selectorNombre.options[1].value
            await cambiarFocusIconoMapa()
            await cargarMedidasActual()
            await cambiarNombrePopUpCambiarNombre()
            await graficas()
            popupMapa.close()
            subirPagina()
        })
    }
}
