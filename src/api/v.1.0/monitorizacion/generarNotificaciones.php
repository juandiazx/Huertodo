<?php
//--------------------------------------------------------
//      POST
//--------------------------------------------------------

/*
 * {idHuerto,timestamp,prioridad,mensaje}:POST--------------> generarNotificaciones()----->Inserts en BD, HTTP:200 | HTTP:500
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
$objeto = json_decode($_POST['dataJSONnotificacion'], true);
$idHuerto = $objeto['idHuerto'];
$timestamp = $objeto['timestamp'];
$prioridad = $objeto['prioridad'];
$mensaje = $objeto['mensaje'];

$sql = "INSERT INTO `notificaciones` (`fecha`, `contenido`, `huerto`, `prioridad`)
VALUES ('$timestamp', '$mensaje', '$idHuerto', '$prioridad')";

// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    // podemos usar mysqli_errno para concretar el código de respuesta
    echo(mysqli_errno($connexion));
}