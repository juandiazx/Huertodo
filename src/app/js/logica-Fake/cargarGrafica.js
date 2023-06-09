//--------------------------------------------------------
//      GET
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
        alert("Las última medida no se ha podido cargar")
    }
    const data = await respuesta.json();
}