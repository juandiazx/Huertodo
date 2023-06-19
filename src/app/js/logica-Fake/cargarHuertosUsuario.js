//--------------------------------------------------------
//      GET
//--------------------------------------------------------
//En el servidor recibe los datos de la sesion implicitamente ya, aqui recibe array de objeto, nombres de huerto e id
//Esta funcion de JS solo se cargará en usuario final, no hay que preocuparse por trabajadores


//Se exporta de forma que se incluye en etiquetas <script> antes de control-acceso.js
async function cargarHuertosUsuario(){
    var respuesta = await fetch('../api/v.1.0/monitorizacion/cargarHuertosUsuario.php');
    if(!respuesta.ok){
        document.getElementById("contenedor-espacio-personal-completo").style.height = "82vh"
        document.getElementById("contenedor-notificaciones").remove()
        document.getElementById("contenedor-boton-mapas").remove()
        eliminarHijos("contenedor-monitorizacion")
        let padre = document.getElementById("contenedor-monitorizacion")
        let hijo = document.createElement("div")
        let parrafo = document.createElement("p")
        parrafo.style.marginBottom = "0"
        parrafo.style.textAlign = "center"
        parrafo.textContent = "No tienes ningún huerto registrado aún, lo tendrás cuanto antes"
        hijo.appendChild(parrafo)
        padre.appendChild(hijo)
        return "error"
    }
    else{
        var data = await respuesta.json();
        let selector = document.getElementById("nombre-huerto");

        //A lo mejor hay que iterar sobre el name del selector, no lo se
        data.forEach((objetoHuerto)=>{
            let option = document.createElement("option")
            //Guardamos el id del huerto porque es importante, ya que se pueden repetir nombres
            option.value = objetoHuerto.id;
            option.text = objetoHuerto.nombre;
            selector.appendChild(option);
        })
        await mapaMonitorizacion() //Cargar los huertos en el mapa
        await dinamicaMapaMonitorizacion()
    }
}

//Funcion para eliminar todos los hijos de un contenedor
function eliminarHijos(contenedor) {
    var elementoPadre = document.getElementById(contenedor);
    while (elementoPadre.firstChild) {
        elementoPadre.removeChild(elementoPadre.firstChild);
    }
}