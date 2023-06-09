// Obtenemos todos los iconos de clase "bi"
var iconos = document.getElementsByClassName("bi");

// Recorremos los iconos y añadimos un listener de eventos
Array.from(iconos).forEach(function(icono) {
    icono.addEventListener("click", function() {
        // Obtenemos el padre del icono, que sería el elemento <tr>
        var fila = icono.parentNode.parentNode;

        // Quitamos la clase "active-row" de todas las filas
        var filas = document.getElementsByTagName("tr");
        Array.from(filas).forEach(function(f) {
            f.classList.remove("active-row");
        });

        // Agregamos la clase "active-row" a la fila actual
        fila.classList.add("active-row");
    });
});
