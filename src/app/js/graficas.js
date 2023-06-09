//setTimeout porque la carga de fuentes poppins para el chart, tarda sus 100ms, con el DOM, no funcionaba
setTimeout(async function () {
    //Comienza el script para añadir en el HTML todos los datos al canvas
//PODRIA SER UN POPUP EN VEZ,LOS DATOS CAMBIARÍAN SEGUN BOTON

//Los datos que irán asignados a data de nuestro objeto
    let datos = {
        labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],
        datasets: [
            {
                data: [57, 100, 37, 10,46,68,82],//await cargarGrafica(obtenerFechaHaceUnaSemana(obtenerFechaHoraActual()),obtenerFechaHoraActual(),huertoSelect,"humedad"),//[57, 100, 37, 10,46,68,82],//await cargarGrafica()
                fill: true,
                backgroundColor : 'rgb(109,224,234)',
                borderColor : 'rgb(56,153,217)',
                tension: 0.5,
            }
        ]
    };

//Opciones que irán asignadas a options de nuestro objeto
    let opciones = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                color: '#000000'
            },
            title: {
                display: true, text: 'Gráfica agua',
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

    let miGrafica = new Chart(referenciaContenedor,{
        type: 'line',
        data: datos,
        options: opciones,
        plugins: [logoImage]
    });
    miGrafica.update()
    document.getElementById("contenedor-humedad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        datos.datasets[0].data= [57, 100, 37, 10,46,68,82]
        datos.datasets[0].backgroundColor = 'rgb(109,224,234)';
        datos.datasets[0].borderColor = 'rgb(56,153,217)';
        opciones.plugins.title.text = 'Gráfica agua'
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/drop.png"
        miGrafica.update();
        //Se asigna a cada boton la funcion de una forma, el evento que se dispara
    })

    document.getElementById("contenedor-salinidad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        datos.datasets[0].data= [38, 30, 37, 10,10,50,72]
        opciones.plugins.title.text = 'Gráfica sal'
        datos.datasets[0].backgroundColor = 'rgb(217,217,217)';
        datos.datasets[0].borderColor = 'rgb(171,171,171)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/salt.png"
        miGrafica.update();
    })

    document.getElementById("contenedor-iluminacion").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        datos.datasets[0].data= [40, 100, 37, 10,30,68,50]
        opciones.plugins.title.text = 'Gráfica luz'
        datos.datasets[0].backgroundColor = 'rgb(246,255,2)';
        datos.datasets[0].borderColor = 'rgb(241,187,56)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "%";
            }
        }
        logoImage.logo = logo.src = "images/brightness.png"
        miGrafica.update();
    })

    document.getElementById("contenedor-ph").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        datos.datasets[0].data= [6, 5, 3, 4,7,5,8]
        opciones.plugins.title.text = 'Gráfica ph'
        datos.datasets[0].backgroundColor = 'rgb(140,201,245)';
        datos.datasets[0].borderColor = 'rgb(56,114,222)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value;
            }
        }
        logoImage.logo = logo.src = "images/ph.png"
        miGrafica.update();
    })

    document.getElementById("contenedor-temperatura").querySelector("img.icono-boton-grafica-historico").addEventListener("click",async function (){
        datos.datasets[0].data= [11, 14, 19, 15,25,16,17]
        opciones.plugins.title.text = 'Gráfica temperatura'
        datos.datasets[0].backgroundColor = 'rgb(243,131,135)';
        datos.datasets[0].borderColor = 'rgb(243,31,72)';
        opciones.scales.y.ticks = {
            callback:function (value) {
                return value + "ºC";
            }
        }
        logoImage.logo = logo.src = "images/thermometer.png"
        miGrafica.update();
    })
}, 600);

function obtenerFechaHaceUnaSemana() {
    var fechaActual = new Date();  // Fecha de referencia actual
    fechaActual.setDate(fechaActual.getDate() - 7);  // Retroceder una semana

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