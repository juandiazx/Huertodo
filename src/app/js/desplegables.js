// Obtén todos los encabezados de los elementos del acordeón
const acordeonItemHeaders = document.querySelectorAll(".acordeon-item-header");

// Itera sobre cada encabezado del elemento del acordeón
acordeonItemHeaders.forEach(acordeonItemHeader => {
    acordeonItemHeader.addEventListener("click", event => {
        // Obtén el encabezado del elemento del acordeón actualmente activo
        const currentlyActiveAcordeonItemHeader = document.querySelector(".acordeon-item-header.active");

        // Si hay un elemento del acordeón activo diferente al actual, ciérralo
        if (currentlyActiveAcordeonItemHeader && currentlyActiveAcordeonItemHeader !== acordeonItemHeader) {
            currentlyActiveAcordeonItemHeader.classList.toggle("active");
            currentlyActiveAcordeonItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        // Cambia la clase "active" del encabezado del elemento del acordeón actual
        acordeonItemHeader.classList.toggle("active");
        const acordeonItemBody = acordeonItemHeader.nextElementSibling;

        // Si el encabezado del elemento del acordeón está activo, establece la altura máxima del cuerpo del elemento del acordeón a su altura real
        if (acordeonItemHeader.classList.contains("active")) {
            acordeonItemBody.style.maxHeight = acordeonItemBody.scrollHeight + "px";
        } else {
            // Si no está activo, establece la altura máxima del cuerpo del elemento del acordeón a 0
            acordeonItemBody.style.maxHeight = 0;
        }
    });
});
