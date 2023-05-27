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

//Nos quedamos con la referencia al canvas donde va la grafica historial y creamos un objeto Chart con los datos anteriores
let referenciaContenedor = document.getElementById('grafica-historial');
//Creamos la gráfica
let miGrafica = new Chart(referenciaContenedor,{
    type: 'line',
    data: datos,
    options: opciones
});
document.getElementById("contenedor-humedad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
    datos.datasets[0].data= [57, 100, 37, 10,46,68,82]
    datos.datasets[0].backgroundColor = 'rgb(109,224,234)';
    datos.datasets[0].borderColor = 'rgb(56,153,217)';
    opciones.plugins.title.text = 'Gráfica agua'
    miGrafica.update();
})

document.getElementById("contenedor-salinidad").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
    datos.datasets[0].data= [38, 30, 37, 10,10,50,72]
    opciones.plugins.title.text = 'Gráfica sal'
    datos.datasets[0].backgroundColor = 'rgb(178,178,178)';
    datos.datasets[0].borderColor = 'rgb(101,101,101)';
    miGrafica.update();
})

document.getElementById("contenedor-iluminacion").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
    datos.datasets[0].data= [40, 100, 37, 10,30,68,50]
    opciones.plugins.title.text = 'Gráfica luz'
    datos.datasets[0].backgroundColor = 'rgb(246,255,2)';
    datos.datasets[0].borderColor = 'rgb(241,187,56)';
    miGrafica.update();
})

document.getElementById("contenedor-ph").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
    datos.datasets[0].data= [12, 50, 37, 10,46,28,82]
    opciones.plugins.title.text = 'Gráfica ph'
    datos.datasets[0].backgroundColor = 'rgb(97,108,234)';
    datos.datasets[0].borderColor = 'rgb(43,31,225)';
    miGrafica.update();
})

document.getElementById("contenedor-temperatura").querySelector("img.icono-boton-grafica-historico").addEventListener("click",function (){
    datos.datasets[0].data= [10, 100, 37, 60,46,98,42]
    opciones.plugins.title.text = 'Gráfica temperatura'
    datos.datasets[0].backgroundColor = 'rgb(243,131,135)';
    datos.datasets[0].borderColor = 'rgb(243,31,72)';
    miGrafica.update();
})
