// ---------------------------------------------------
//
// versión fake de una función de la lógica
//
// nombre:Texto, password:Texto -> hacerLogin() -> Boolean
//
// (Boolean devuelto via callback)
//
// ---------------------------------------------------
async function hacerLogin( event ) {
    event.preventDefault();
    let form = new FormData(event.target);
    let email = form.get('email');
    let password = form.get('password');
    form.delete('email');
    form.delete('password');

    let respuesta = await fetch('../api/v1.0/' + email + password,{ //NO SE SI EL REQUEST VA ASI
        method: 'post',
        body: form
    });
    let resultado = await respuesta.json();
    if(resultado.rol == 0){
        location.href = "monitorizacion.html";
    }
    else if(resultado.rol == 2){
        location.href = "Tecnico.html";
    }
    else if(resultado.rol == 1){
        location.href = "Comercial.html";
    }
    else if(resultado.rol == 3){
        location.href = "Administrador_Web.html";
    }
    else{
        alert("Usuario incorrecto, inténtalo de nuevo");
    }
    //Aqui ya se gestiona la respuesta, si es afirmativa pues inicia sesion, si no pues se muestra error
} // ()
