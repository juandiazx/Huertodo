
function toggleMenu(){
    const menu = this.id()
    menu.classList.toggle("activo")
    document.querySelectorAll("#main-menu ul a").forEach(function (enlace){
        enlace.addEventListener("click", function (){
            menu.classList.remove("activo")
        })
    })
}