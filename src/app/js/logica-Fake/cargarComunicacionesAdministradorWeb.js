async function cargarComunicacionesAdministradorWeb() {
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

    async function cargarDatos2() {
        console.log("Empieza la carga de datos del servidor");
        tabla.clear().draw();
        var respuesta = await fetch(
            "../api/v.1.0/trabajadores/administrador_web/cargarComunicacionesAdministradorWeb.php"
        );
        console.log(respuesta);
        var data = await respuesta.json();
        console.log(data);

        var datosFiltrados = data.filter((item) => item.estado === "2");
        var uniqueDatos = Array.from(
            new Set(datosFiltrados.map(JSON.stringify))
        ).map(JSON.parse);

        uniqueDatos.forEach((value) => {
            var fila = tabla.row
                .add([
                    value.id,
                    value.nombreApellidos,
                    value.email,
                    value.fecha,
                    '<i class="bi bi-person-add"></i>',
                ])
                .node();

            $(fila).attr("data-id", value.id);
        });

        tabla.draw();
    }

    await cargarDatos2();

    function mostrarDesplegable(fila) {
        var seccion = $(
            '<tr class="seccion-desplegada">' +
            '<td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<h4>Comunicacion con Comercial</h4>' +
            "</div>" +
            "</td>" +
            "</tr>"
        );

        fila.after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);

        var form = $(
            '<form method="POST" action="../api/v.1.0/trabajadores/administrador_web/enviarRegistrosAdministradorWeb.php" target="hidden_iframe"></form>'
        );
        seccion.find(".contenido-desplegado").append(form);

        var inputContrasenya = $(
            '<input type="text" class="inputs-texto-trabajadores" name="contrasenya" placeholder="Contraseña">'
        );
        form.append(inputContrasenya);

        // Obtener el valor de la columna "ID" de la tabla
        var id = $(fila).find('td:first-child').text().trim();

        var inputUsuarioSolicitud = $('<input class="campos-desplegables-ocultos" type="text" name="usuario_solicitud">');
        inputUsuarioSolicitud.val(id); // Establecer el valor de usuario_solicitud con el valor de la columna "ID"
        form.append(inputUsuarioSolicitud);

        var enviarBtn = $('<button class="boton-verde-blanco-tablas">Enviar</button>');
        enviarBtn.on('click', function() {
            form.submit();
        });
        form.append(enviarBtn);

        var cancelarBtn = $('<button class="boton-verde-blanco-tablas">Cancelar</button>');
        cancelarBtn.on('click', function() {
            seccion.remove();
        });
        form.append(cancelarBtn);

        // Desvincular los controladores de eventos 'click' previos
        enviarBtn.off('click');
        cancelarBtn.off('click');

        cancelarBtn.on("click", function () {
            fila.removeClass("desplegado");
            seccion.remove();
        });

        enviarBtn.on("click", async function () {
            var contrasenya = seccion.find('input[name="contrasenya"]').val();

            // Realizar la solicitud AJAX para enviar los datos del formulario
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form.serialize(),
                success: function() {
                    // Borrar el contenido del campo de contraseña después de enviar el formulario
                    inputContrasenya.val("");

                    // Mostrar el mensaje de éxito
                    mostrarMensajeExito();
                },
                error: function() {
                    // Mostrar un mensaje de error en caso de que la solicitud falle
                    console.log("Error al enviar el formulario");
                }
            });

            fila.removeClass("desplegado");
            seccion.remove();
        });
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

        botonConfirmar.on("click", async function () {
            var contrasenya = seccion.find('input[name="contrasenya"]').val();

            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    // Evento de clic para el icono en cada fila
    $("#tablax tbody").on("click", "i.bi-person-add", function (event) {
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
