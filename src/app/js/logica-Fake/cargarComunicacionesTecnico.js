async function cargarComunicacionesTecnico() {
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
                sortAscending: ": active para ordenar la columna en orden ascendente",
                sortDescending: ": active para ordenar la columna en orden descendente",
            },
        },
        dom: 'rt<"bottom"p>',
        scrollY: "100vh",
        scrollCollapse: true,
        responsive: {
            details: false,
        },
    });

    // Función para cargar los datos del archivo JSON a la tabla
    async function cargarDatos3() {
        console.log("Empieza la carga de datos del servidor");
        tabla.clear().draw();
        var respuesta = await fetch(
            "../api/v.1.0/trabajadores/tecnico/cargarComunicacionesTecnico.php"
        );
        console.log(respuesta);
        var data = await respuesta.json();
        console.log(data);

        data.forEach((value) => {
            var fila = tabla
                .row.add([
                    value.id,
                    value.nombreApellidos,
                    value.direccion,
                    value.asunto,
                    value.fecha,
                    '<i class="bi bi-tools"></i>',
                ])
                .node();

            $(fila).attr("data-id", value.id);
        });

        tabla.draw();
    }

    await cargarDatos3();

    function mostrarDesplegable(fila) {
        var seccion = $('<tr class="seccion-desplegada">' +
            '<td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<h4>Comunicacion con Comercial</h4>' +
            '</div>' +
            '</td>' +
            '</tr>');

        fila.after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);

        var form = $('<form method="POST" action="../api/v.1.0/trabajadores/tecnico/enviarTareaCompletadaComercial.php"></form>');
        seccion.find('.contenido-desplegado').append(form);

        var inputDe = $('<input class="campos-desplegables-ocultos" type="text" name="de" readonly>');
        inputDe.val("3"); // Establecer el valor del campo "De"
        form.append(inputDe);

        var inputPara = $('<input class="campos-desplegables-ocultos" type="text" name="para" readonly>');
        inputPara.val("2"); // Establecer el valor del campo "Para"
        form.append(inputPara);

        var inputAsunto = $('<input class="campos-desplegables-ocultos" type="text" name="asunto">');
        var tarea = fila.find('td:nth-child(4)').text().trim(); // Obtener el valor de la columna "Tarea" de la fila parent
        inputAsunto.val(tarea); // Establecer el valor del campo "Asunto" con el valor de la columna "Tarea"
        form.append(inputAsunto);

        var textareaTexto = $('<textarea class="selectores-tablas" name="texto" placeholder="Escribe las medidas o confirma el montaje"></textarea>');
        form.append(textareaTexto);

        var inputFecha = $('<input class="campos-desplegables-ocultos" type="date" name="fecha">');
        var today = new Date();
        var dateString = today.toISOString().split('T')[0];
        inputFecha.val(dateString);
        form.append(inputFecha);

        var id = $(fila).find('td:first-child').text().trim();

        var inputUsuarioSolicitud = $('<input class="campos-desplegables-ocultos" type="text" name="usuario_solicitud">');
        inputUsuarioSolicitud.val(id);
        form.append(inputUsuarioSolicitud);

        var enviarBtn = $('<button class="boton-verde-blanco-tablas">Enviar</button>');
        enviarBtn.on('click', function (event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Realizar la solicitud AJAX para enviar los datos del formulario
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form.serialize(),
                success: function() {
                    // Borrar el contenido del campo de texto después de enviar el formulario
                    textareaTexto.val("");

                    // Mostrar el mensaje de éxito
                    mostrarMensajeExito();
                },
                error: function() {
                    // Mostrar un mensaje de error en caso de que la solicitud falle
                    console.log("Error al enviar el formulario");
                }
            });
        });
        form.append(enviarBtn);

        var cancelarBtn = $('<button class="boton-verde-blanco-tablas">Cancelar</button>');
        cancelarBtn.on('click', function () {
            seccion.remove();
        });
        form.append(cancelarBtn);

        // Función para mostrar el mensaje de éxito
        function mostrarMensajeExito() {
            var mensajeExito = $('<div class="mensaje-exito">Mensaje enviado correctamente</div>');
            seccion.find('.contenido-desplegado').append(mensajeExito);

            // Ocultar el mensaje después de 3 segundos
            setTimeout(function () {
                mensajeExito.fadeOut('slow', function () {
                    mensajeExito.remove();
                });
            }, 3000);
        }
    }


    function agregarEventoClickCancelar(seccion, fila) {
        var botonCancelar = seccion.find(".boton-cerrar-sesion");

        botonCancelar.on("click", function () {
            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    function agregarEventoClickConfirmar(seccion, fila) {
        var botonConfirmar = seccion.find(".boton-cerrar-sesion");

        botonConfirmar.on("click", function () {
            var opcionSeleccionada = seccion.find('input[name="de"]').val();
            var asuntoSeleccionado = seccion.find('input[name="asunto"]').val();
            var mensajeTexto = seccion.find('textarea[name="texto"]').val();

            // Realizar las acciones necesarias con los valores obtenidos

            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    $("#tablax tbody").on("click", 'i.bi.bi-tools', function (event) {
        var fila = $(this).closest("tr");

        if (fila.hasClass("desplegado")) {
            fila.removeClass("desplegado");
            fila.next(".seccion-desplegada").remove();
        } else {
            mostrarDesplegable(fila);
            fila.addClass("desplegado");
        }
    });
}