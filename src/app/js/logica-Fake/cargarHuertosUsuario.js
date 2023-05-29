
//En el servidor recibe los datos de la sesion implicitamente ya, aqui recibe array de nombres de huertof
//Esta funcion de JS solo se cargará en usuario final, no hay que preocuparse por trabajadores

//GET
async function cargarHuertosUsuario(){
    var respuesta = await fetch('../api/v.1.0/monitorizacion/cargarHuertosUsuario.php');
    var data = await respuesta.json();
    let selector = document.getElementById("nombre-huerto");

    //A lo mejor hay que iterar sobre el name del selector, no lo se
    data.forEach(()=>{
        let option = document.createElement("option")
        option.value = nombres[i];
        option.text = nombres[i];
        selector.appendChild(option);
    })
    /*
    var select = document.createElement("select");
select.name = "nombres";

for (var i = 0; i < nombres.length; i++) {
  var option = document.createElement("option");
  option.value = nombres[i];
  option.text = nombres[i];
  select.appendChild(option);
}

document.body.appendChild(select);
    * Aqui se gestiona los nombres de los huertos y se meten en el select
    * Tambien se ponen los nombres en el mapa de huertos
    * Lo de meter nombre actual en formulario de cambio de nombre, datos tiempo real y graficas eso
    * ya serán otras funciones que seran llamadas desde el onChange del select
    * */
}