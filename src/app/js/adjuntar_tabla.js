function cargarDatos() {
    var tabla = document.getElementById("tabla-datos");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "v.1.0/usuarios_solicitud.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var datosJSON = JSON.parse(xhr.responseText);
            datosJSON.forEach(function(dato) {
                var fila = document.createElement("tr");
                var celdaId = document.createElement("td");
                celdaId.textContent = dato.id;
                fila.appendChild(celdaId);
                var celdaNombre = document.createElement("td");
                celdaNombre.textContent = dato.nombre;
                fila.appendChild(celdaNombre);
                var celdaEmail = document.createElement("td");
                celdaEmail.textContent = dato.email;
                fila.appendChild(celdaEmail);
                var celdaDireccion = document.createElement("td");
                celdaDireccion.textContent = dato.direccion;
                fila.appendChild(celdaDireccion);
                var celdaTelefono = document.createElement("td");
                celdaTelefono.textContent = dato.telefono;
                fila.appendChild(celdaTelefono);

                var celdaProceso = document.createElement("td");
                celdaProceso.classList.add("proceso-icons");
                var editIcon = document.createElement("i");
                editIcon.classList.add("fas", "fa-edit");
                editIcon.title = "Editar";
                editIcon.addEventListener("click", function() {
                    editarRegistro(dato.id);
                });
                celdaProceso.appendChild(editIcon);
                var deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fas", "fa-trash");
                deleteIcon.title = "Eliminar";
                deleteIcon.addEventListener("click", function() {
                    eliminarRegistro(dato.id);
                });
                celdaProceso.appendChild(deleteIcon);
                fila.appendChild(celdaProceso);

                tabla.appendChild(fila);
            });
        }
    };
    xhr.send();
}
