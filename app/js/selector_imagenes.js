let slideIndex = 1;
showSlides(slideIndex);

// Función para avanzar o retroceder a través de las diapositivas
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Función para mostrar una diapositiva específica
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Función principal para mostrar las diapositivas
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides"); // Obtiene todos los elementos con la clase "mySlides"
    let dots = document.getElementsByClassName("demo"); // Obtiene todos los elementos con la clase "demo"
    let captionText = document.getElementById("caption"); // Obtiene el elemento con el ID "caption"

    // Verifica si el índice de la diapositiva está fuera de los límites
    if (n > slides.length) {
        slideIndex = 1; // Reinicia al primer elemento
    }
    if (n < 1) {
        slideIndex = slides.length; // Avanza al último elemento
    }

    // Oculta todas las diapositivas
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Elimina la clase "active" de todos los puntos indicadores
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Muestra la diapositiva actual y agrega la clase "active" al punto indicador correspondiente
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Actualiza el texto de la descripción de la diapositiva
    captionText.innerHTML = dots[slideIndex - 1].alt;
}
