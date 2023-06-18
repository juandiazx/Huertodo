async function cargarUsuariosRegistrados() {
    var tabla = $("#tablax-2").DataTable({
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
        columns: [
            { data: "id" },
            { data: "email" },
            { data: "nombreApellidos" },
            { data: "numHuertos" },
            { data: null },
        ],
        columnDefs: [
            {
                targets: -1,
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return '<i class="bi bi-plus-square"></i>';
                },
            },
        ],
        "bAutoWidth": false
    });

    async function cargarDatos() {
        console.log("Cargando Usuarios Registrados...");
        tabla.clear().draw();
        var respuesta = await fetch(
            "../api/v.1.0/trabajadores/administrador_web/cargarUsuariosRegistrados.php"
        );
        console.log(respuesta);
        var data = await respuesta.json();
        console.log(data);
        // Verificar si hay datos
        if (!respuesta.ok || !data) {
            return; // Resuelve la promesa sin cargar datos adicionales
        }

        tabla.rows.add(data).draw();
    }

    await cargarDatos();

    function mostrarDesplegable(fila) {
        var seccion = $(
            '<tr class="seccion-desplegada">' +
            '<td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<h4>Registrar Nuevo Huerto</h4>' +
            '<button class="boton-verde-blanco-tablas">Registrar</button>' +
            '<button class="boton-verde-blanco-tablas">Cancelar</button>' +
            '</div>' +
            '</td>' +
            '</tr>'
        );

        fila.after(seccion);

        var form = $(
            '<form method="POST" action="../api/v.1.0/trabajadores/administrador_web/registrarHuertos.php" target="hidden_iframe"></form>'
        );
        seccion.find(".contenido-desplegado").append(form);

        var inputUsuario = $('<input class="campos-desplegables-ocultos" type="text" name="usuario">');
        inputUsuario.val(fila.find("td:first-child").text()); // Establecer el valor de usuario con el valor de la primera celda de la fila
        form.append(inputUsuario);

        var inputNombreHuerto = $(
            '<input type="text" class="inputs-texto-trabajadores" name="nombreHuerto" placeholder="Nombre del Huerto">'
        );
        form.append(inputNombreHuerto);

                var registrarBtn = seccion.find("button:contains('Registrar')");
        var cancelarBtn = seccion.find("button:contains('Cancelar')");

        cancelarBtn.on("click", function () {
            fila.removeClass("desplegado");
            seccion.remove();
        });

        registrarBtn.on("click", async function () {
            var nombreHuerto = seccion.find('input[name="nombreHuerto"]').val();
            var latitud = seccion.find('input[name="latitud"]').val();
            var longitud = seccion.find('input[name="longitud"]').val();

            // Realizar la solicitud AJAX para registrar el nuevo huerto
            $.ajax({
                type: "POST",
                url: form.attr("action"),
                data: {
                    nombre: nombreHuerto,
                    usuario: inputUsuario.val()
                },
                success: function () {
                    // Mostrar el mensaje de éxito
                    var mensajeRegistro = $("#mensajeRegistro");
                    mensajeRegistro.text("Registro exitoso");

                    // Borrar los campos de texto después de dos segundos
                    setTimeout(function () {
                        inputNombreHuerto.val("");
                        inputLatitud.val("");
                        inputLongitud.val("");
                        mensajeRegistro.text("");
                    }, 2000);
                },
                error: function () {
                    // Mostrar un mensaje de error en caso de que la solicitud falle
                    console.log("Error al registrar el huerto");
                },
            });

            fila.removeClass("desplegado");
            seccion.remove();
        });
    }




    // Evento de clic para el icono en cada fila
    $("#tablax-2 tbody").on("click", "i.bi-plus-square", function (event) {
        var fila = $(this).closest("tr");

        if (fila.hasClass("desplegado")) {
            fila.removeClass("desplegado");
            fila.next(".seccion-desplegada").remove();
        } else {
            mostrarDesplegable(fila);
            fila.addClass("desplegado");
        }
    });

    $(document).ready(function() {
        $(".dataTables_scrollHeadInner, .content-table.dataTable.no-footer, .dataTables_scrollBody, .bottom").css("width", "100%");
        $(".dataTables_scrollHeadInner, content-table.dataTable.no-footer, .dataTables_scrollBody").css("overflow", "auto");
        $(".bottom").css("margin-top", "2rem");
        $(".content-table").css("border-radius", "5px 5px 0 0");
    });

    // Función para bloquear la orientación si el ancho de la pantalla es menor a 646 píxeles
    function lockOrientation() {
        if (window.innerWidth < 646) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape").then(function() {
                    console.log("La orientación se ha bloqueado correctamente");
                }).catch(function(error) {
                    console.log("No se pudo bloquear la orientación:", error);
                });
            } else {
                console.log("El dispositivo no admite la función para bloquear la orientación");
            }
        }
    }

    // Llama a la función para bloquear la orientación si es necesario
    lockOrientation();
}

