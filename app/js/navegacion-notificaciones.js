    function mostrarInput(element) {
    element.parentNode.classList.add("activo");
}

    function ocultarInput(element) {
    element.parentNode.classList.remove("activo");
}

    let ventasPorPagina = 5;

    let pagina = 1;

    let ventas = [];

    const contenedor = document.getElementById('tablaVentas');

    (async () => {
    const respuesta = await fetch('../api/v.1.0/registros.json');
    const data = await respuesta.json();
    ventas = data;

    let ultimaPagina = Math.ceil(ventas.length / ventasPorPagina);
    let ultimoBoton = document.querySelector("#paginador > button:last-child")
    ultimoBoton.innerText = ultimaPagina;
    ultimoBoton.onclick = () => cambiarPagina(ultimaPagina);

    let inputPagina = document.querySelector("#paginador input");
    inputPagina.max = ultimaPagina;
    inputPagina.min = 1;

    cambiarPagina(1);
})();

    function crearFilaVenta(venta) {
    let fila = document.createElement('tr');
    let celdaVendedor = document.createElement('td');
    celdaVendedor.textContent = venta.vendedor.nombre + ' ' + venta.vendedor.apellidos;
    let celdaCliente = document.createElement('td');
    celdaCliente.textContent = venta.cliente.nombre;
    let celdaFecha = document.createElement('td');
    celdaFecha.textContent = venta.fecha;
    let celdaImporte = document.createElement('td');
    celdaImporte.textContent = venta.importe + '€';
    fila.append(celdaVendedor, celdaCliente, celdaFecha, celdaImporte);
    return fila;
}

    function cambiarPagina(numeroPagina) {
    pagina = numeroPagina;
    contenedor.innerHTML = "";
    let inicio = (pagina - 1) * ventasPorPagina;
    for (let i = inicio; i < inicio + ventasPorPagina; i++) {
    let venta = ventas[i];
    if (venta) contenedor.appendChild(crearFilaVenta(venta));
}
    let inputPagina = document.querySelector("#paginador input");
    inputPagina.value = pagina;
}