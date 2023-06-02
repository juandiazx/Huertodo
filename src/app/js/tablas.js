$(document).ready(function () {
    var tabla = $("#tablax").DataTable({
        language: {
            processing: "Tratamiento en curso...",
            search: "Buscar&nbsp;:",
            infoEmpty: "No existen datos.",
            infoFiltered: "(filtrado de _MAX_ elementos en total)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron datos con tu búsqueda",
            emptyTable: "No hay datos disponibles en la tabla.",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último",
            },
            aria: {
                sortAscending:
                    ": active para ordenar la columna en orden ascendente",
                sortDescending:
                    ": active para ordenar la columna en orden descendente",
            },
        },
        dom: 'rt<"bottom"p>',
        scrollY: "100vh",
        scrollCollapse: true,
        responsive: {
            details: false,
        },
    });

    // Llamada a la función cargarDatos para agregar los datos del archivo JSON a la tabla
    cargarDatos();

    // Función para cargar los datos del archivo JSON a la tabla
    function cargarDatos() {
        $.getJSON("v.1.0/usuarios_solicitud.json", function (data) {
            tabla.clear().draw(); // Limpiar la tabla antes de cargar nuevos datos

            $.each(data, function (index, value) {
                var fila = crearFila(value);
                var primerIcono = obtenerPrimerIcono(fila);
                var segundoIcono = obtenerSegundoIcono(fila);

                agregarEventoClickPrimerIcono(primerIcono, fila);
                agregarEventoClickSegundoIcono(segundoIcono, fila);
            });

            tabla.draw(); // Dibujar la tabla con los nuevos datos
        });
    }

    function crearFila(value) {
        var iconos = '<i class="bi bi-wrench-adjustable"></i> ' +
            '<i class="bi bi-person-add"></i>';

        var estado = obtenerEstado(value.estado); // Obtener el estado dependiendo del valor recibido

        var fila = tabla.row.add([
            value.id,
            value.email,
            value.direccion,
            estado,
            iconos
        ]).node();

        $(fila).attr('data-id', value.id);

        return fila;
    }

// Función para obtener el estado dependiendo del valor
    function obtenerEstado(estado) {
        switch (estado) {
            case 0:
                return 'Nada';
            case 1:
                return 'Medidas';
            case 2:
                return 'Montaje';
            case 3:
                return 'Registrado';
            default:
                return '';
        }
    }

    function obtenerPrimerIcono(fila) {
        return $(fila).find('i').first();
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
        $(primerIcono).on("click", function (event) {
            event.stopPropagation();

            var filaActual = $(this).closest('tr');

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
        var seccion = $('<tr class="seccion-desplegada"><td colspan="4">' +
            '<div class="contenido-desplegado">' +
            '<h4>Información adicional</h4>' +
            '<label for="opciones">Opciones:</label>' +
            '<select id="opciones" required>' +
            '<option value="opcion1">Técnico 1</option>' +
            '<option value="opcion2">Técnico 2</option>' +
            '<option value="opcion3">Técnico 3</option>' +
            '</select>' +
            '<label for="asunto">Asunto:</label>' +
            '<select id="asunto" required>' +
            '<option value="asunto1">Medida</option>' +
            '<option value="asunto2">Montaje</option>' +
            '</select>' +
            '<label for="mensaje">Mensaje:</label>' +
            '<textarea type="text" id="mensaje" placeholder="Escribe aquí" required></textarea>' +
            '<button id="cancelar">Cancelar</button>' +
            '<button id="confirmar">Confirmar</button>' +
            '</div>' +
            '</td></tr>');

        fila.after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);
    }

    function obtenerSegundoIcono(fila) {
        return $(fila).find('i.bi-person-add');
    }
    function agregarEventoClickSegundoIcono(segundoIcono, fila) {
        $(segundoIcono).on("click", function (event) {
            event.stopPropagation();

            var filaActual = $(this).closest('tr');

            if (filaActual.hasClass("desplegado")) {
                filaActual.removeClass("desplegado");
                filaActual.next().remove();
            } else {
                filaActual.addClass("desplegado");
                mostrarSegundoDesplegable(filaActual);
            }
        });
    }

    function mostrarSegundoDesplegable(fila) {
        var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<h4>Segundo Desplegable</h4>' +
            '<label for="opciones2">Opciones:</label>' +
            '<select id="opciones2" required>' +
            '<option value="opcion1">Administrador Web 1</option>' +
            '<option value="opcion2">Administrador Web 2</option>' +
            '<option value="opcion3">Administrador Web 3</option>' +
            '</select>' +
            '<label for="mensaje2">Mensaje:</label>' +
            '<textarea type="text" id="mensaje2" placeholder="Escribe aquí cualquier información extra" required></textarea>' +
            '<button id="cancelar2">Cancelar</button>' +
            '<button id="confirmar2">Confirmar</button>' +
            '</div>' +
            '</td></tr>');

        fila.after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);
    }
    function agregarEventoClickCancelar(seccion, fila) {
        seccion.find('#cancelar').on('click', function() {
            fila.removeClass('desplegado');
            seccion.remove();
        });
    }

    function agregarEventoClickConfirmar(seccion, fila) {
        seccion.find('#confirmar').on('click', function() {
            var opcionSeleccionada = seccion.find('#opciones').val();
            var mensaje = seccion.find('#mensaje').val();

            // Realizar acción deseada con la opción seleccionada y el mensaje

            fila.removeClass('desplegado');
            seccion.remove();
        });
    }

});
