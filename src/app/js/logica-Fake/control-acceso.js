
//Function asincrona autoejecutable cuando se carga la pagina,
(async () => {
    const respuesta = await fetch('../api/v.1.0/sesion/');
    if(respuesta.ok) {
        const data = await respuesta.json();
        /*document.getElementById('user-name').innerText = data.nombre; //HAY QUE HACER QUE PONGA QUE USUARIO ES*/
        let body = document.querySelector("body");
        document.body.classList.remove("loading");
        //Hay que ponerle a todo el body de los espacios personales, la clase loading que tendra un display none
    } else {
        location.href = './Inicio_sesion.html';
        alert("Acceso restringido, no puede acceder");
    }
})()


//Funcion asincrona para borrar la sesion y salir del espacio personal
async function logout() {
    const respuesta = await fetch('../api/v.1.0/sesion/', {
        method: 'delete'
    });
    if(respuesta.ok) {
        location.href = "../../index.html";
    }
}