//--------------------------------------------------------
//      GET
//--------------------------------------------------------
//aqui recibe array de objeto, nombres de huerto e id

//Esto dispara el event, se dispara cuando el DOM termina de cargarse
document.addEventListener('DOMContentLoaded',cargarHuertosTomarMedida)
async function cargarHuertosTomarMedida(){
    var respuesta = await fetch('../api/v.1.0/monitorizacion/cargarHuertosTomarMedida.php');
    var data = await respuesta.json();
    let selector = document.getElementById("huerto");

    //Iteramos sobre el array devuelto
    data.forEach((objetoHuerto)=>{
        let option = document.createElement("option")
        //Guardamos el id del huerto porque es importante, ya que se pueden repetir nombres
        option.value = objetoHuerto.id;
        option.text = objetoHuerto.nombre;
        selector.appendChild(option);
    })
}
