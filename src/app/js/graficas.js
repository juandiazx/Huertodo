document.addEventListener("DOMContentLoaded",graficas)
async function graficas(){
    let container = document.getElementById("contenedor-graficas-con-filtros")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Crear el contenedor de la gráfica
    const contenedorGrafica = document.createElement("div");
    contenedorGrafica.id = "contenedor-grafica-historial";

// Crear el elemento canvas para la gráfica
    const canvasGrafica = document.createElement("canvas");
    canvasGrafica.id = "grafica-historial";
    canvasGrafica.setAttribute("aria-label", "Grafica Interactiva Histórico Parámetros");
    canvasGrafica.setAttribute("role", "img");

// Agregar el canvas al contenedor de la gráfica
    contenedorGrafica.appendChild(canvasGrafica);

// Crear el contenedor de los botones de filtro de la gráfica
    const contenedorBotonesFiltro = document.createElement("div");
    contenedorBotonesFiltro.id = "contenedor-botones-filtro-grafica";

// Crear el botón "Semana"
    const botonSemana = document.createElement("button");
    botonSemana.id = "boton-filtro-grafica-semana";
    botonSemana.textContent = "Semana";

// Crear el botón "Mes"
    const botonMes = document.createElement("button");
    botonMes.id = "boton-filtro-grafica-mes";
    botonMes.textContent = "Mes";

// Agregar los botones al contenedor de filtros
    contenedorBotonesFiltro.appendChild(botonSemana);
    contenedorBotonesFiltro.appendChild(botonMes);

// Agregar los contenedores al documento
    container.appendChild(contenedorGrafica);
    container.appendChild(contenedorBotonesFiltro);
//setTimeout porque la carga de fuentes poppins para el chart, tarda sus 100ms, con el DOM, no funcionaba
setTimeout(async function () {
    document.getElementById("grafica-historial").remove()
    const nuevoCanvas = document.createElement('canvas');
    nuevoCanvas.id = 'grafica-historial';
    const contenedor = document.getElementById('contenedor-grafica-historial');
    contenedor.appendChild(nuevoCanvas);
    var huertoSelect = document.getElementById("nombre-huerto").value
    let datosInicialesHumedad = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"humedad")

    //Comienza el script para añadir en el HTML todos los datos al canvas
//PODRIA SER UN POPUP EN VEZ,LOS DATOS CAMBIARÍAN SEGUN BOTON

//Los datos que irán asignados a data de nuestro objeto
    var datos = {
        labels: datosInicialesHumedad.map(objeto => obtenerFecha(objeto.timestamp)),//['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],
        datasets: [
            {
                data: datosInicialesHumedad.map(objeto => objeto.humedad),//data: [57, 100, 37, 10,46,68,82]
                fill: true,
                backgroundColor : 'rgb(109,224,234)',
                borderColor : 'rgb(56,153,217)',
                tension: 0.5,
            }
        ]
    };

//Opciones que irán asignadas a options de nuestro objeto
    var opciones = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                color: '#000000'
            },
            title: {
                display: true, text: 'Gráfica humedad',
                font: {
                    size:17,
                    family: 'Poppins',
                    weight: "500"
                }
            },
            logoImage: {

            }
        },
        scales: {
            y: {
                ticks: {
                    // Para añadir a cada valor del eje y, el %
                    callback: function(value) {
                        return value + "%";
                    }
                }
            }
        }
    };
//--------------------------------------------------
//LogoImage Plugin block
    const logo = new Image();

    const logoImage = {
        logo: logo.src = "images/drop.png",
        id: 'logoImage',
        beforeDraw(chart,args,options){
            const {ctx,chartArea:{top,bottom,left,right}} = chart;
            ctx.save()
            if(logo.complete){
                ctx.drawImage(logo,4,4, 22,22)
            }
            /*else{
                logo.onload = ()=> chart.drawImage();
            }*/
            ctx.restore()
        }
    }
//--------------------------------------------------

//Nos quedamos con la referencia al canvas donde va la grafica historial y creamos un objeto Chart con los datos anteriores
    var referenciaContenedor = document.getElementById('grafica-historial');

//Creamos la gráfica

    var miGrafica = new Chart(referenciaContenedor,{
        type: 'line',
        data: datos,
        options: opciones,
        plugins: [logoImage]
    });
    miGrafica.update()
    //--------------------------------------
    await asignacionFuncionBotonesFiltros("humedad",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones
    //--------------------------------------

    //--------------------------------SECCION DONDE SE ASIGNA EL EVENTO CLICK A CADA ICONO DE GRAFICA DE CADA PARAMETRO---------------------

    //--------------------
    //HUMEDAD
    //--------------------
    document.getElementById("contenedor-humedad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        huertoSelect = document.getElementById("nombre-huerto").value
        borrarContenidoDelContenedorFiltro()
        agregarBotonesAlContenedorFiltro()
        let datosHumedadStart = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"humedad")

        datos.datasets[0].data= datosHumedadStart.map(objeto => objeto.humedad)
        datos.labels = datosHumedadStart.map(objeto => obtenerFecha(objeto.timestamp))

        datos.datasets[0].backgroundColor = 'rgb(109,224,234)';
        datos.datasets[0].borderColor = 'rgb(56,153,217)';
        opciones.plugins.title.text = 'Gráfica humedad'
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/drop.png"

        await asignacionFuncionBotonesFiltros("humedad",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones

        miGrafica.update();
        //Se asigna a cada boton la funcion de una forma, el evento que se dispara
    })
//------------------------------
    //--------------------
    //SALINIDAD
    //--------------------
    document.getElementById("contenedor-salinidad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        borrarContenidoDelContenedorFiltro()
        agregarBotonesAlContenedorFiltro()
        let datosSalinidadStart = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"salinidad")

        datos.datasets[0].data= datosSalinidadStart.map(objeto => objeto.salinidad)
        datos.labels = datosSalinidadStart.map(objeto => obtenerFecha(objeto.timestamp))

        opciones.plugins.title.text = 'Gráfica sal'
        datos.datasets[0].backgroundColor = 'rgb(217,217,217)';
        datos.datasets[0].borderColor = 'rgb(171,171,171)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/salt.png"
        await asignacionFuncionBotonesFiltros("salinidad",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones
        miGrafica.update();
    })
//------------------------------
    //--------------------
    //ILUMINACION
    //--------------------
    document.getElementById("contenedor-iluminacion").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        borrarContenidoDelContenedorFiltro()
        agregarBotonesAlContenedorFiltro()
        let datosIluminacionStart = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"iluminacion")

        datos.datasets[0].data= datosIluminacionStart.map(objeto => objeto.iluminacion)
        datos.labels = datosIluminacionStart.map(objeto => obtenerFecha(objeto.timestamp))

        opciones.plugins.title.text = 'Gráfica iluminación'
        datos.datasets[0].backgroundColor = 'rgb(246,255,2)';
        datos.datasets[0].borderColor = 'rgb(241,187,56)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/brightness.png"
        await asignacionFuncionBotonesFiltros("iluminacion",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones
        miGrafica.update();
    })
//------------------------------
    //--------------------
    //PH
    //--------------------
    document.getElementById("contenedor-ph").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        borrarContenidoDelContenedorFiltro()
        agregarBotonesAlContenedorFiltro()
        let datosPHStart = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"ph")

        datos.datasets[0].data= datosPHStart.map(objeto => objeto.ph)
        datos.labels = datosPHStart.map(objeto => obtenerFecha(objeto.timestamp))

        opciones.plugins.title.text = 'Gráfica ph'
        datos.datasets[0].backgroundColor = 'rgb(140,201,245)';
        datos.datasets[0].borderColor = 'rgb(56,114,222)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value;
            }
        }
        logoImage.logo = logo.src = "images/ph.png"
        await asignacionFuncionBotonesFiltros("ph",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones
        miGrafica.update();
    })
//------------------------------
    //--------------------
    //TEMPERATURA
    //--------------------
    document.getElementById("contenedor-temperatura").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        borrarContenidoDelContenedorFiltro()
        agregarBotonesAlContenedorFiltro()
        let datosTemperaturaStart = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"temperatura")

        datos.datasets[0].data= datosTemperaturaStart.map(objeto => objeto.temperatura)
        datos.labels = datosTemperaturaStart.map(objeto => obtenerFecha(objeto.timestamp))

        opciones.plugins.title.text = 'Gráfica temperatura'
        datos.datasets[0].backgroundColor = 'rgb(243,131,135)';
        datos.datasets[0].borderColor = 'rgb(243,31,72)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "ºC";
            }
        }
        logoImage.logo = logo.src = "images/thermometer.png"
        await asignacionFuncionBotonesFiltros("temperatura",datos,miGrafica,huertoSelect)//Asigna a los botones de filtro sus funciones
        miGrafica.update();
    })
}, 600);

function obtenerFechaHaceUnaSemana() {
    var fechaActual = new Date();  // Fecha de referencia actual
    fechaActual.setDate(fechaActual.getDate() - 8);  // Retroceder una semana

    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    var anio = fechaActual.getFullYear();
    var hora = '01';
    var minuto = '00';
    var segundo = '00';

    // Asegurarse de que el formato tenga dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = anio + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;
    return fechaFormateada;
}

//Funcion para obtener la fecha de hace un mes comparado con la fecha actual
function obtenerFechaHaceUnMes() {
    var fechaActual = new Date();  // Fecha de referencia actual
    fechaActual.setMonth(fechaActual.getMonth() - 1);  // Retroceder un mes

    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    var anio = fechaActual.getFullYear();
    var hora = '01';
    var minuto = '00';
    var segundo = '00';

    // Asegurarse de que el formato tenga dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = anio + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;
    return fechaFormateada;
}

//Funcion para obtener la fecha actual en formato datetima para SQL
function obtenerFechaHoraActual() {
    const fechaActual = new Date();
    const anyo = fechaActual.getFullYear();
    const mes = agregarCeroAlInicio(fechaActual.getMonth() + 1);
    const dia = agregarCeroAlInicio(fechaActual.getDate());
    const horas = agregarCeroAlInicio(fechaActual.getHours());
    const minutos = agregarCeroAlInicio(fechaActual.getMinutes());
    const segundos = agregarCeroAlInicio(fechaActual.getSeconds());
    return `${anyo}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

//Funcion que agrega un cero al inicio de cada formato de fecha, cada sección
function agregarCeroAlInicio(valor) {
    return valor < 10 ? '0' + valor : valor;
}

//Funcion para obtener solo la fecha del formato SQL DATETIME
function obtenerFecha(fechaCompleta) {
    const fecha = fechaCompleta.split(' ')[0];
    return fecha;
}


//----------------------------------------------------------

async function asignacionFuncionBotonesFiltros(parametro,datos,miGrafica,huertoSelect){
    //Asignación del boton semanal evento click
    document.getElementById("boton-filtro-grafica-semana").addEventListener("click",async function (){
        let datosParametro = await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,parametro)
        datos.datasets[0].data= datosParametro.map(objeto => objeto[parametro])
        datos.labels = datosParametro.map(objeto => obtenerFecha(objeto.timestamp))
        miGrafica.update();
    })

    //Asignación del boton mensual evento click
    document.getElementById("boton-filtro-grafica-mes").addEventListener("click",async function (){
        let datosParametro = await cargarGrafica(obtenerFechaHaceUnMes(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,parametro)
        datos.datasets[0].data= datosParametro.map(objeto => objeto[parametro])
        datos.labels = datosParametro.map(objeto => obtenerFecha(objeto.timestamp))
        miGrafica.update();
    })
}

//Funcion para agregar los botones de filtro graficas
function agregarBotonesAlContenedorFiltro() {
    var contenedor = document.getElementById('contenedor-botones-filtro-grafica');

    // Crea el botón "Semana"
    var botonSemana = document.createElement('button');
    botonSemana.id = 'boton-filtro-grafica-semana';
    botonSemana.textContent = 'Semana';

    // Crea el botón "Mes"
    var botonMes = document.createElement('button');
    botonMes.id = 'boton-filtro-grafica-mes';
    botonMes.textContent = 'Mes';

    // Agrega los botones al contenedor
    contenedor.appendChild(botonSemana);
    contenedor.appendChild(botonMes);
}

//Funcion para borrar todo el contenido de dentro del contenedor de filtros
function borrarContenidoDelContenedorFiltro() {
    var contenedor = document.getElementById('contenedor-botones-filtro-grafica');

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
}