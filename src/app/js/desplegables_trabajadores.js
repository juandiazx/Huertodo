// Función para cerrar todos los elementos del acordeón
const closeAllAcordeonItems = () => {
    // Obtén todos los elementos del acordeón
    const acordeonItems = document.querySelectorAll(".acordeon-item");

    // Itera sobre cada elemento del acordeón
    acordeonItems.forEach(acordeonItem => {
        const acordeonItemHeader = acordeonItem.querySelector(".acordeon-item-header");
        const acordeonItemBody = acordeonItemHeader.nextElementSibling;

        // Remueve la clase "active" del encabezado del elemento del acordeón
        acordeonItemHeader.classList.remove("active");

        // Establece la altura máxima del cuerpo del elemento del acordeón a 0
        acordeonItemBody.style.maxHeight = 0;
    });
};

// Obtén todos los encabezados de los elementos del acordeón
const acordeonItemHeaders = document.querySelectorAll(".acordeon-item-header");

// Itera sobre cada encabezado del elemento del acordeón
acordeonItemHeaders.forEach(acordeonItemHeader => {
    const closeIcon = acordeonItemHeader.querySelector(".close-icon");

    // Agrega un evento de clic al icono de cierre para eliminar el elemento del acordeón
    closeIcon.addEventListener("click", () => {
        const acordeonItem = acordeonItemHeader.parentNode;
        acordeonItem.remove();
    });

    // Agrega un evento de clic al encabezado del elemento del acordeón
    acordeonItemHeader.addEventListener("click", event => {
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

// Agregar evento clic para cerrar todos los elementos del acordeón
const closeAllAcordeonItemsButton = document.querySelector("#close-all-acordeon-items");
closeAllAcordeonItemsButton.addEventListener("click", closeAllAcordeonItems);
