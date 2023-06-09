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

$sql = "SELECT `comunicacion_trabajadores`.`para`, `comunicacion_trabajadores`.`asunto`, `comunicacion_trabajadores`.`texto`, `comunicacion_trabajadores`.`fecha`, `comunicacion_trabajadores`.`usuario_solicitud`, `solicitud`.`id` 
        FROM `comunicacion_trabajadores`
        INNER JOIN `solicitud` ON `comunicacion_trabajadores`.`usuario_solicitud` = `solicitud`.`id`
        WHERE `comunicacion_trabajadores`.`para` = 2
        AND `solicitud`.`id` = `comunicacion_trabajadores`.`usuario_solicitud`";

$resultado = mysqli_query($connexion, $sql);

if (mysqli_num_rows($resultado) > 0) {
    $salida = [];

    while ($registro = mysqli_fetch_assoc($resultado)) {
        $comunicacion = new stdClass();
        $comunicacion->para = $registro['para'];
        $comunicacion->asunto = $registro['asunto'];
        $comunicacion->texto = $registro['texto'];
        $comunicacion->fecha = $registro['fecha'];
        $comunicacion->usuario_solicitud = $registro['usuario_solicitud'];
        $comunicacion->id = $registro['id'];
        $salida[] = $comunicacion;
    }

    http_response_code(200);
    echo json_encode($salida);

} else {
    http_response_code(401);
    echo json_encode(array('message' => 'No se encontraron comunicaciones.'));
}
?>
