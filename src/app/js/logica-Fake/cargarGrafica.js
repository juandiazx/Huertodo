//--------------------------------------------------------
//      GET ESTA FUNCION AUN NO FUNCIONA
//--------------------------------------------------------
async function cargarGrafica(primerTimestamp,segundoTimestamp,idHuerto,parametro){
    let valorSelector = {
        idHuerto:idHuerto,
        parametro:parametro,
        primerTimestamp:primerTimestamp,
        segundoTimestamp:segundoTimestamp
    }
    const param = new URLSearchParams(valorSelector);
    let url = '../api/v.1.0/monitorizacion/cargarGrafica.php'
    const respuesta = await fetch(`${url}?${param}`);
    if(!respuesta.ok){
        let container = document.getElementById("contenedor-graficas-con-filtros")
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.style.padding = "2rem"
        container.style.textAlign = "center"
        container.innerText = "No están disponibles las gráficas"
    }
    const data = await respuesta.json();
    return data;
}