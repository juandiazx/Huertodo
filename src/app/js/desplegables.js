const acordeonItemHeaders = document.querySelectorAll(".acordeon-item-header");

acordeonItemHeaders.forEach(acordeonItemHeader => {
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