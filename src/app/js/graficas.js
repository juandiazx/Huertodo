//setTimeout porque la carga de fuentes poppins para el chart, tarda sus 100ms, con el DOM, no funcionaba
setTimeout(function () {
    //Comienza el script para añadir en el HTML todos los datos al canvas
//PODRIA SER UN POPUP EN VEZ,LOS DATOS CAMBIARÍAN SEGUN BOTON

//Los datos que irán asignados a data de nuestro objeto
    let datos = {
        labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado','domingo'],
        datasets: [
            {
                data: [57, 100, 37, 10,46,68,82],
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
    document.getElementById("contenedor-humedad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
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
    })

    document.getElementById("contenedor-salinidad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
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

    document.getElementById("contenedor-iluminacion").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
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

    document.getElementById("contenedor-ph").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
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

    document.getElementById("contenedor-temperatura").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
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
}, 200);
