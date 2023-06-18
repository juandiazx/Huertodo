async function cargarSolicitudesUsuarios() {
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


    // Función para cargar los datos del archivo JSON a la tabla
  async function cargarDatos() {
    console.log("Empieza la carga de datos del servidor")
            tabla.clear().draw(); // Limpiar la tabla antes de cargar nuevos datos
      var respuesta = await fetch('../api/v.1.0/trabajadores/comercial/cargarSolicitudesUsuarios.php');
      // Verificar si hay datos
            console.log(respuesta);
      var data = await respuesta.json();
      console.log(data);
      if (!respuesta.ok || !data) {
          return; // Resuelve la promesa sin cargar datos adicionales
      }
            $.each(data, function (index, value) {
                var fila = crearFila(value);
                var primerIcono = obtenerPrimerIcono(fila);
                var segundoIcono = obtenerSegundoIcono(fila);
                var tercerIcono = obtenerTercerIcono(fila);

                agregarEventoClickPrimerIcono(primerIcono, fila);
                agregarEventoClickSegundoIcono(segundoIcono, fila);
                agregarEventoClickTercerIcono(tercerIcono, fila);
            });

            tabla.draw(); // Dibujar la tabla con los nuevos datos

    }
    await cargarDatos()
    function crearFila(value) {
        var iconos = '<i class="bi bi-wrench-adjustable"></i> ' +
            '<i class="bi bi-person-add"></i> ' +
            '<i class="bi bi-info-circle"></i>';

        //var estado = obtenerEstado(value.estado); // Obtener el estado dependiendo del valor recibido

        var fila = tabla.row.add([
            value.id,
            value.email,
            value.direccion,
            value.estado,
            iconos
        ]).node();

        $(fila).attr('data-id', value.id);

        return fila;
    }

    /* Función para obtener el estado dependiendo del valor
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
    }                                                       */

    function obtenerPrimerIcono(fila) {
        return $(fila).find('i').first();
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
        var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<h4>Comunicacion con Tecnicos</h4>' +
            '</div>' +
            '</td></tr>');

        $(fila).after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);

        // Agregar el formulario y los botones al div contenido-desplegado
        var form = $('<form method="POST" action="../api/v.1.0/trabajadores/comercial/enviarComunicacionesTecnico.php" target="hidden_iframe"></form>');
        seccion.find('.contenido-desplegado').append(form);

        var selectDe = $('<select class="campos-desplegables-ocultos" name="de"></select>');
        var optionDe1 = $('<option value="2">Comercial 1</option>');
        selectDe.append(optionDe1);
        form.append(selectDe);

        var selectPara = $('<select class="selectores-tablas" name="para"></select>');
        var optionPara1 = $('<option value="3">Técnico 1</option>');
        selectPara.append(optionPara1);
        form.append(selectPara);

        var selectAsunto = $('<select class="selectores-tablas" name="asunto"></select>');
        var optionAsunto1 = $('<option value="Medidas">Medidas</option>');
        var optionAsunto2 = $('<option value="Montaje">Montaje</option>');
        selectAsunto.append(optionAsunto1);
        selectAsunto.append(optionAsunto2);
        form.append(selectAsunto);

        var textareaTexto = $('<textarea class="selectores-tablas" name="texto" placeholder="Texto"></textarea>');
        form.append(textareaTexto);

        var inputFecha = $('<input class="campos-desplegables-ocultos" type="date" name="fecha">');
        var today = new Date();
        var dateString = today.toISOString().split('T')[0]; // Obtener la fecha actual en formato "YYYY-MM-DD"
        inputFecha.val(dateString); // Establecer la fecha actual en el campo de fecha
        form.append(inputFecha);

        // Obtener el valor de la columna "ID" de la tabla
        var id = $(fila).find('td:first-child').text().trim();

        var inputUsuarioSolicitud = $('<input class="campos-desplegables-ocultos" type="text" name="usuario_solicitud">');
        inputUsuarioSolicitud.val(id); // Establecer el valor de usuario_solicitud con el valor de la columna "ID"
        form.append(inputUsuarioSolicitud);

        var enviarBtn = $('<button class="boton-verde-blanco-tablas">Enviar</button>');
        enviarBtn.on('click', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Guardar el contenido del campo de texto antes de enviar el formulario
            var texto = textareaTexto.val();

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

                    // Restaurar el contenido del campo de texto en caso de error
                    textareaTexto.val(texto);
                }
            });
        });
        form.append(enviarBtn);

        var cancelarBtn = $('<button class="boton-verde-blanco-tablas">Cancelar</button>');
        cancelarBtn.on('click', function() {
            seccion.remove();
        });
        form.append(cancelarBtn);

        // Función para mostrar el mensaje de éxito
        function mostrarMensajeExito() {
            var mensajeExito = $('<div class="mensaje-exito">Mensaje enviado correctamente</div>');
            seccion.find('.contenido-desplegado').append(mensajeExito);

            // Ocultar el mensaje después de 3 segundos
            setTimeout(function() {
                mensajeExito.fadeOut('slow', function() {
                    mensajeExito.remove();
                });
            }, 3000);
        }
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
            '<h4>Comunicacion con Administradores Web</h4>' +
            '</div>' +
            '</td></tr>');

        $(fila).after(seccion);

        agregarEventoClickCancelar(seccion, fila);
        agregarEventoClickConfirmar(seccion, fila);

        // Agregar el formulario y los botones al div contenido-desplegado
        var form = $('<form method="POST" action="../api/v.1.0/trabajadores/comercial/enviarComunicacionesAdministradorWeb.php" target="hidden_iframe"></form>');
        seccion.find('.contenido-desplegado').append(form);

        var selectDe = $('<select class="campos-desplegables-ocultos" name="de"></select>');
        var optionDe1 = $('<option value="2">Comercial 1</option>');
        selectDe.append(optionDe1);
        form.append(selectDe);

        var selectPara = $('<select class="selectores-tablas" name="para"></select>');
        var optionPara1 = $('<option value="4">Administrador Web 1</option>');
        selectPara.append(optionPara1);
        form.append(selectPara);

        var selectAsunto = $('<select class="selectores-tablas" name="asunto"></select>');
        var optionAsunto1 = $('<option value="Registro">Registro</option>');
        selectAsunto.append(optionAsunto1);
        form.append(selectAsunto);

        var textareaTexto = $('<textarea class="selectores-tablas campos-desplegables-ocultos" name="texto" placeholder="Texto"></textarea>');
        form.append(textareaTexto);

        var inputFecha = $('<input class="campos-desplegables-ocultos" type="date" name="fecha">');
        var today = new Date();
        var dateString = today.toISOString().split('T')[0]; // Obtener la fecha actual en formato "YYYY-MM-DD"
        inputFecha.val(dateString); // Establecer la fecha actual en el campo de fecha
        form.append(inputFecha);

        // Obtener el valor de la columna "ID" de la tabla
        var id = $(fila).find('td:first-child').text().trim();

        var inputUsuarioSolicitud = $('<input class="campos-desplegables-ocultos" type="text" name="usuario_solicitud">');
        inputUsuarioSolicitud.val(id); // Establecer el valor de usuario_solicitud con el valor de la columna "ID"
        form.append(inputUsuarioSolicitud);

        var enviarBtn = $('<button class="boton-verde-blanco-tablas">Enviar</button>');
        enviarBtn.on('click', function(event) {
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
        cancelarBtn.on('click', function() {
            seccion.remove();
        });
        form.append(cancelarBtn);

        // Función para mostrar el mensaje de éxito
        function mostrarMensajeExito() {
            var mensajeExito = $('<div class="mensaje-exito">Mensaje enviado correctamente</div>');
            seccion.find('.contenido-desplegado').append(mensajeExito);

            // Ocultar el mensaje después de 3 segundos
            setTimeout(function() {
                mensajeExito.fadeOut('slow', function() {
                    mensajeExito.remove();
                });
            }, 3000);
        }
    }


    function obtenerTercerIcono(fila) {
        return $(fila).find('i.bi-info-circle');
    }

    function agregarEventoClickTercerIcono(tercerIcono, fila) {
        $(tercerIcono).on("click", function (event) {
            event.stopPropagation();

            var filaActual = $(this).closest('tr');

            if (filaActual.hasClass("desplegado")) {
                filaActual.removeClass("desplegado");
                filaActual.next().remove();
            } else {
                filaActual.addClass("desplegado");
                mostrarTercerDesplegable(filaActual);
            }
        });
    }

    function mostrarTercerDesplegable(fila) {
        var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
            '<div class="contenido-desplegado">' +
            '<div id="datos-desplegable"></div>' +
            '<button id="cerrar3" class="boton-verde-blanco-tablas">Cerrar</button>' +
            '</div>' +
            '</td></tr>');

        var datosDesplegable = seccion.find("#datos-desplegable");

        obtenerIdFila(fila, function(id) {
            obtenerDatosFila(id, function(datos) {
                datosDesplegable.empty();

                console.log(datos);

                var mensajes = datos.filter(function(comunicacion) {
                    return comunicacion.id === id;
                });

                if (mensajes.length > 0) {
                    var primerMensaje = mensajes[0];
                    var contenidoSolicitud = '<h4>Texto Solicitud</h4>' +
                        '<p>Mensaje: ' + primerMensaje.mensaje + '</p>';
                    datosDesplegable.append(contenidoSolicitud);

                    var contenidoMensajes = '<h4>Mensajes Técnico</h4>';

                    for (var i = 0; i < mensajes.length; i++) {
                        var comunicacion = mensajes[i];
                        var contenido = '<p>Asunto: ' + comunicacion.asunto + '</p>' +
                            '<p>Texto: ' + comunicacion.texto + '</p>' +
                            '<p>Fecha: ' + comunicacion.fecha + '</p>';
                        contenidoMensajes += contenido;
                    }

                    datosDesplegable.append(contenidoMensajes);
                } else {
                    datosDesplegable.text('No se encontraron mensajes.');
                }

                fila.after(seccion);

                agregarEventoClickCerrar3(seccion, fila);
            });
        });
    }






    function obtenerIdSolicitud(fila, callback) {
        var id = $(fila).find('td:first-child').text().trim();
        callback(id);
    }






    function obtenerIdFila(fila, callback) {
        var id = $(fila).find('td:first-child').text().trim();
        callback(id);
    }

    function obtenerDatosFila(id, callback) {
        // Realizar una solicitud AJAX al archivo PHP para obtener los datos del servidor
        $.ajax({
            url: '../api/v.1.0/trabajadores/comercial/cargarRespuestasTecnico.php',
            type: 'GET',
            dataType: 'json',
            data: { usuario_solicitud: id }, // Filtrar por el valor de usuario_solicitud
            success: function(response) {
                // La respuesta contiene los datos obtenidos del servidor
                var datos = response;
                callback(datos);
            },
            error: function(xhr, status, error) {
                console.log('Error en la solicitud AJAX:', error);
            }
        });
    }

    function agregarEventoClickCerrar3(seccion, fila) {
        var botonCerrar = seccion.find("#cerrar3");
        botonCerrar.click(function() {
            seccion.remove();
            // Realizar cualquier otra acción necesaria al cerrar el tercer desplegable
        });
    }

    function agregarEventoClickCancelar(seccion, fila) {
        var botonCancelar = seccion.find("#cancelar");

        botonCancelar.on("click", function () {
            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    function agregarEventoClickConfirmar(seccion, fila) {
        var botonConfirmar = seccion.find("#confirmar");
        botonConfirmar.type = 'submit';

        botonConfirmar.on("click", function () {
            // Obtener los valores seleccionados y el texto del textarea
            var opcionSeleccionada = seccion.find("#opciones").val();
            var asuntoSeleccionado = seccion.find("#asunto").val();
            var mensajeTexto = seccion.find("#mensaje").val();

            // Realizar las acciones necesarias con los valores obtenidos

            fila.removeClass("desplegado");
            seccion.remove();
        });
    }

    $(document).ready(function() {
        $(".dataTables_scrollHeadInner, .content-table.dataTable.no-footer, .dataTables_scrollBody, .bottom").css("width", "100%");
        $(".dataTables_scrollHeadInner, .content-table.dataTable.no-footer, .dataTables_scrollBody").css("overflow", "auto");
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

