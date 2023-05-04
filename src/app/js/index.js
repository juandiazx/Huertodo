
// menu:DOM ELEMENT----->toggleMenu()
// Funcion que varía el activo del menu y por cada elemento de la lista del menu que se clicka desactiva el menu desplegable
function toggleMenu(menu){
    menu.classList.toggle("activo")
    document.querySelectorAll("#main-menu ul a").forEach(function (enlace){
        enlace.addEventListener("click", function (){
            menu.classList.remove("activo")
        })
    })
}

//Trozo de código para cambiar de desplegable dentro de la landing page, resenyas

//Guardamos los id de las resenyas
let primeraResenya = document.getElementById("resenya-1")
let segundaResenya = document.getElementById("resenya-2")
let terceraResenya = document.getElementById("resenya-3")


//Código para que siempre que se entre a la landing page, el botón de ir a la izquierda tenga menos opacidad
if(primeraResenya.classList[1] == "resenya-activa"){
    document.getElementById("deslizar-izquierda-resenya").style.border = "0.11em #93C5B3FF solid"
}

//Evento que ocurre cuando se clicka en el boton de deslizar a la izquierda
document.getElementById("deslizar-izquierda-resenya").addEventListener("click",function () {

    if (segundaResenya.classList[1] == "resenya-activa"){
        segundaResenya.classList.remove("resenya-activa")
        primeraResenya.classList.add("resenya-activa")
        document.getElementById("deslizar-izquierda-resenya").style.border = "0.11em #93C5B3FF solid"
    }
    else if (terceraResenya.classList[1] == "resenya-activa"){
        terceraResenya.classList.remove("resenya-activa")
        segundaResenya.classList.add("resenya-activa")
        document.getElementById("deslizar-derecha-resenya").style.border = "0.11em #06884DFF solid"
    }
})

//Evento que ocurre cuando se clicka en el boton de deslizar a la derecha
document.getElementById("deslizar-derecha-resenya").addEventListener("click",function () {
    if (primeraResenya.classList[1] == "resenya-activa"){
        primeraResenya.classList.remove("resenya-activa")
        segundaResenya.classList.add("resenya-activa")
        document.getElementById("deslizar-izquierda-resenya").style.border = "0.11em #06884DFF solid"
    }
    else if (segundaResenya.classList[1] == "resenya-activa"){
        segundaResenya.classList.remove("resenya-activa")
        terceraResenya.classList.add("resenya-activa")
        document.getElementById("deslizar-derecha-resenya").style.border = "0.11em #93C5B3FF solid"
    }
})