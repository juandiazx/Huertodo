<?php
//--------------------------------------------------------
//      GET
//--------------------------------------------------------

// TIENE QUE DEVOLVER UN ARRAY DE NOMBRES DE LOS HUERTOS DEL USUARIO

/*
 * user (implícitamente desde la sesión): objetoJSON-------> cargarHuertosUsuario---> http:200, [huerto:JSON{id,nombre}]
 *
 * */
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';

// Establecer las cabeceras de respuesta antes de cualquier salida
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
header('Content-Type: application/json; charset=utf-8');

try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre);
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');

session_start();

$user = $_SESSION['user'];
$id = $user['id'];

$sql = "SELECT `solicitud`.`id`, `solicitud`.`nombreApellidos`, `solicitud`.`email`, `solicitud`.`estado`, `comunicacion_trabajadores`.`fecha`, `comunicacion_trabajadores`.`usuario_solicitud` FROM `solicitud`, `comunicacion_trabajadores` WHERE `solicitud`.`estado` = 2 AND `comunicacion_trabajadores`.`usuario_solicitud` = `solicitud`.`id` AND `comunicacion_trabajadores`.`para` = 4";
$resultado = mysqli_query($connexion, $sql);

if (mysqli_num_rows($resultado) > 0) {
    $salida = [];

    while ($registro = mysqli_fetch_assoc($resultado)) {
        $solicitudes = new stdClass();
        $solicitudes->id = $registro['id'];
        $solicitudes->nombreApellidos = $registro['nombreApellidos'];
        $solicitudes->email = $registro['email'];
        $solicitudes->estado = $registro['estado'];
        $solicitudes->fecha = $registro['fecha'];
        $salida[] = $solicitudes;
    }

    http_response_code(200);
    echo json_encode($salida);
} else {
    http_response_code(401);
    echo json_encode(array('message' => 'No se encontraron huertos.'));
}
