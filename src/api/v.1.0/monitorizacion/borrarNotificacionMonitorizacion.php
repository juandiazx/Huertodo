<?php
//--------------------------------------------------------
//      DELETE
//--------------------------------------------------------

/*
 * idNotificacion:DELETE--------------> borrarNotificacionMonitorizacion()----->DELETE en BD, HTTP:200 | HTTP:401
 *
 * */
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';
try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password,$bbdd_nombre); //$bbdd_nombre
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');

$data = file_get_contents('php://input');

// Decodificar los datos del cuerpo de la solicitud (por ejemplo, si está en formato JSON)
$params = json_decode($data, true);

// Obtener el parámetro enviado en la solicitud DELETE
$id = $params['idNotificacion'];

$sql = "DELETE FROM `notificaciones` WHERE `notificaciones`.`id` = '$id'";
// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) === 1) {
    http_response_code(200);
} else {
    http_response_code(401);
    echo($id);
}