
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

