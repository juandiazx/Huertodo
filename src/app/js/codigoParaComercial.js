document.addEventListener("DOMContentLoaded", function() {
    const leftButton = document.querySelector(".left-button");
    const rightButton = document.querySelector(".right-button");
    const formularioAdmin = document.querySelector("#formulario-admin");
    const formularioTecnico = document.querySelector("#formulario-tecnico");

    leftButton.addEventListener("click", function() {
        leftButton.classList.add("active");
        rightButton.classList.remove("active");
        formularioAdmin.classList.remove("hidden");
        formularioTecnico.classList.add("hidden");
    });

    rightButton.addEventListener("click", function() {
        rightButton.classList.add("active");
        leftButton.classList.remove("active");
        formularioTecnico.classList.remove("hidden");
        formularioAdmin.classList.add("hidden");
    });
});
