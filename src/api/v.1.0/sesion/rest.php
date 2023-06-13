<?php

// usuario:String, password:String ---->consultarUsuarioContrasenya() ------> consultaSQL:String
function consultarUsuarioContrasenya($usuario,$password){
    return "SELECT `usuario`.`id`, `usuario`.`email`, `usuario`.`rol`,`usuario`.`nombreApellidos`, `roles`.`rol` FROM `usuario` INNER JOIN `roles` ON`usuario`.`rol` = `roles`.`id`
	WHERE `usuario`.`email` = '$usuario' AND `usuario`.`contrasenya` = '$password'";
}

//--------------------------------------------------------------------------------------------------------------

// user----->comprobarSesion()-----> http:200 , JSON{id:N,rol:String,email:String, idRol:N} | http:401
// user: recibido de forma implícita en la sesión
// (nombre:Texto, saludo:Texto) | error:Texto : devuelto en un mismo JSON

function comprobarSesion(){
    session_start();
    if(!isset($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode($_SESSION ['user']);
    } else {
        http_response_code(200);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($_SESSION ['user']);
    }
}

//--------------------------------------------------------------------------------------------------------------
// bbdd_servidor:String,
// bbdd_nombre:String,
// bbdd_user:String, ----->crearSesion()-----> http:200 , JSON{id:N,rol:String,email:String, idRol:N} | http:401 | http:500
// bbdd_password:String,
// email:String,
// password:String
//
// email,password: recibido de forma implícita en POST
// (email:Texto, password:Texto) | error:Texto : devuelto en un mismo JSON
function crearSesion($bbdd_servidor,$bbdd_user,$bbdd_password,$bbdd_nombre){
    try {
        $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password,$bbdd_nombre); //$bbdd_nombre
    } catch (Exception $e) {
        http_response_code(500);
        die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
    }
    mysqli_query($connexion, 'SET NAMES utf8mb4');
    $usuario = $_POST['email'];
    $password = $_POST['password'];
    $sql = consultarUsuarioContrasenya($usuario,$password);
    $resultado = mysqli_query($connexion, $sql);
    if (mysqli_affected_rows($connexion) === 1) {
        $registro = mysqli_fetch_assoc($resultado);
        session_start();
        $_SESSION['user'] = $registro;
        $salida = [];
        $salida['id'] = $registro['id'];
        $salida['nombreApellidos'] = $registro['nombreApellidos'];
        $salida['email'] = $registro['email'];
        $salida['rol'] = $registro['rol'];
        http_response_code(200);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($salida);
    } else {
        echo json_encode(mysqli_affected_rows($connexion));
        http_response_code(401);
    }
}
//--------------------------------------------------------------------------------------------------------------
// sesion --->borrarSesion()----> sesion, http:200 | http:500
// sesion: devuelve la sesion borrada, vacía
function borrarSesion(){
    // Inicializar la sesión.
    session_start();
    // Destruir todas las variables de sesión.
    $_SESSION = array();
    // Si se desea destruir la sesión completamente, borre también la cookie de sesión.
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    // Finalmente, destruir la sesión.
    session_destroy();
}