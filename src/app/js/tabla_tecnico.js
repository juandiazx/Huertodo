$(document).ready(function() {
    var tablaSegunda = $("#tablaSegunda").DataTable({
        language: {
            // Configuración del idioma
            info: "",  // Elimina el texto "Showing 1 to 10 of 20 entries"
            search: "",  // Elimina el texto "Search:"
            searchPlaceholder: "Buscar",  // Define un texto de marcador de posición para el campo de búsqueda
            lengthMenu: "Mostrar _MENU_",  // Define el texto del menú desplegable de "Show Entries"
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            }
        },
        // Configuración de la tabla
        lengthChange: false,  // Deshabilita la funcionalidad de cambiar la cantidad de registros por página
        searching: false,  // Deshabilita la función de búsqueda
        info: false,  // Deshabilita la información de la paginación y cantidad de registros
        paging: true  // Habilita la paginación
    });

    cargarDatos();

    function cargarDatos() {
        $.getJSON("v.1.0/datos_tabla2.json", function(data) {
            tablaSegunda.clear().draw();

            $.each(data, function(index, value) {
                var fila = crearFila(value);
                var primerIcono = obtenerPrimerIcono(fila);

                agregarEventoClickFila(fila);
                agregarEventoClickPrimerIcono(primerIcono, fila);
            });

            tablaSegunda.draw();
        });
    }

    function crearFila(value) {
        var fila = tablaSegunda.row
            .add([
                value.id,
                value.nombre,
                value.direccion,
                value.tarea,
                value.fecha,
            ])
            .node();

        $(fila).attr("data-id", value.id);

        return fila;
    }

    function obtenerPrimerIcono(fila) {
        return $(fila).find("i").first();
    }

    function agregarEventoClickFila(fila) {
        $(fila).on("click", function(event) {
            var filaActual = $(this);

            if (filaActual.hasClass("desplegado")) {
                filaActual.removeClass("desplegado");
                filaActual.next().remove();
            } else {
                filaActual.addClass("desplegado");
                mostrarDesplegable(filaActual);
            }
        });
    }

    function agregarEventoClickPrimerIcono(primerIcono, fila) {
        $(primerIcono).on("click", function(event) {
            event.stopPropagation();

            var filaActual = $(this).closest("tr");

            if (filaActual.hasClass("desplegado")) {
                filaActual.removeClass("desplegado");
                filaActual.next().remove();
            } else {
                filaActual.addClass("desplegado");
                mostrarDesplegable(filaActual);
            }
        });
    }

    function mostrarDesplegable(fila) {
        var seccion = $(
            '<tr class="seccion-desplegada"><td colspan="5">' +
            '<div class="contenido-desplegado">' +
            '<h4>Información adicional</h4>' +
            '<p><strong>Comercial:</strong> ' + obtenerTexto() + '</p>' +
            '<p><strong>Mensaje:</strong> ' + obtenerTextoRepresentativo() + '</p>' +
            '<br>' +
            '<textarea id="mensajeArea" placeholder="Escribir mensaje..."></textarea>' +
            '<br>' +
            '<button id="confirmar">Confirmar</button>' +
            '<button id="cancelar">Cancelar</button>' +
            '</div>' +
            '</td></tr>'
        );

        fila.after(seccion);
        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);
    }

    function agregarEventoClickCancelar(seccion, fila) {
        var botonCancelar = seccion.find("#cancelar");

        botonCancelar.on("click", function(event) {
            event.stopPropagation();
            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    function agregarEventoClickConfirmar(seccion, fila) {
        var botonConfirmar = seccion.find("#confirmar");

        botonConfirmar.on("click", function(event) {
            event.stopPropagation();
            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    function obtenerTexto() {
        // Aquí puedes obtener el texto correspondiente del JSON o de alguna otra fuente de datos
        return "Texto de ejemplo";
    }

    function obtenerTextoRepresentativo() {
        // Aquí puedes obtener el texto representativo correspondiente del JSON o de alguna otra fuente de datos
        return "Texto representativo de ejemplo";
    }
});
