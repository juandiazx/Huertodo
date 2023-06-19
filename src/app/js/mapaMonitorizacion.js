async function mapaMonitorizacion(){
    const selectHuertos = document.getElementById("nombre-huerto");
    const cantidadValores = selectHuertos.options.length;
    console.log(cantidadValores)
    if(cantidadValores == 1){
        // Crear el elemento section
        const section = document.createElement("section");
        section.classList.add("contenedor-icono-huerto-mapa");
        section.id = "mapa-huerto-1";

// Crear la imagen
        const imagen = document.createElement("img");
        imagen.id = "icono-huerto1";
        imagen.classList.add("icono-huerto-mapa");
        imagen.src = "images/icono-huerto-mapa.png";
        imagen.alt = "Icono huerto";

        const parrafo = document.createElement("p");
        parrafo.textContent = "Calabazas";

// Agregar la imagen al section
        section.appendChild(imagen);

// Agregar el párrafo al div
        section.appendChild(parrafo);

// Agregar el div al section
        section.appendChild(parrafo);

// Agregar el section al documento
        const contenedorPadre = document.getElementById("contenedor-mapa");
        contenedorPadre.appendChild(section);
    }
    else{
        // Crear el elemento section
        const section1 = document.createElement("section");
        section1.classList.add("contenedor-icono-huerto-mapa");
        section1.id = "mapa-huerto-1";

// Crear la imagen
        const imagen1 = document.createElement("img");
        imagen1.id = "icono-huerto1";
        imagen1.classList.add("icono-huerto-mapa");
        imagen1.src = "images/icono-huerto-mapa.png";
        imagen1.alt = "Icono huerto";

        const parrafo1 = document.createElement("p");
        parrafo1.textContent = "Calabazas";

// Agregar la imagen al section
        section1.appendChild(imagen1);

// Agregar el párrafo al div
        section1.appendChild(parrafo1);

// Agregar el section al documento
        const contenedorPadre1 = document.getElementById("contenedor-mapa");
        contenedorPadre1.appendChild(section1);

// Crear el elemento section
        const section = document.createElement("section");
        section.classList.add("contenedor-icono-huerto-mapa");
        section.id = "mapa-huerto-2";

// Crear la imagen
        const imagen = document.createElement("img");
        imagen.id = "icono-huerto2";
        imagen.classList.add("icono-huerto-mapa");
        imagen.src = "images/icono-huerto-mapa.png";
        imagen.alt = "Icono huerto";

        const parrafo = document.createElement("p");
        parrafo.textContent = "Tomates";

// Agregar la imagen al section
        section.appendChild(imagen);

// Agregar el div al section
        section.appendChild(parrafo);

        // Agregar el section al documento
        const contenedorPadre = document.getElementById("contenedor-mapa");
        contenedorPadre.appendChild(section);
    }
}



