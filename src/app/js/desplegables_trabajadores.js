const acordeonItemHeaders = document.querySelectorAll(".acordeon-item-header");

acordeonItemHeaders.forEach(acordeonItemHeader => {
    // Agregar evento click al icono de cierre
    const closeIcon = acordeonItemHeader.querySelector(".close-icon");
    closeIcon.addEventListener("click", () => {
        const acordeonItem = acordeonItemHeader.parentNode;
        acordeonItem.remove();
    });

    acordeonItemHeader.addEventListener("click", event => {
        const currentlyActiveAcordeonItemHeader = document.querySelector(".acordeon-item-header.active");
        if(currentlyActiveAcordeonItemHeader && currentlyActiveAcordeonItemHeader!==acordeonItemHeader) {
            currentlyActiveAcordeonItemHeader.classList.toggle("active");
            currentlyActiveAcordeonItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        acordeonItemHeader.classList.toggle("active");
        const acordeonItemBody = acordeonItemHeader.nextElementSibling;
        if(acordeonItemHeader.classList.contains("active")) {
            acordeonItemBody.style.maxHeight = acordeonItemBody.scrollHeight + "px";
        }
        else {
            acordeonItemBody.style.maxHeight = 0;
        }

    });
});
