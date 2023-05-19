var imagen = document.getElementById('flecha-bajar');

function bajarPagina() {
    // Obtener la altura total de la página
    var alturaPagina = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

    // Obtener la altura de la ventana del navegador
    var alturaVentana = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Obtener la cantidad de desplazamiento relativo
    var porcentajeDesplazamiento = 0.53; // (0.5 representa el 50% de la altura de la ventana)

    // Calcular la cantidad de desplazamiento en píxeles
    var desplazamiento = alturaPagina - alturaVentana;
    var desplazamientoRelativo = porcentajeDesplazamiento * desplazamiento;

    // Desplazar la página hacia abajo
    window.scrollTo({
        top: desplazamientoRelativo,
        behavior: 'smooth'
    });
}

imagen.addEventListener('click', bajarPagina);
