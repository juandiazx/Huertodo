<?php
//--------------------------------------------------------
//      POST
//--------------------------------------------------------

/*
 * nombre-huerto , id  :POST--------------> cambiarNombreHuerto()----->Update en BD, HTTP:200 | HTTP:401
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

$nombre = $_POST['nombre-huerto'];
$id = $_POST['id'];
$sql = "UPDATE `huertos`
SET `nombre` = '$nombre' WHERE `huertos`.`id` = '$id'";
// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) === 1) {
    http_response_code(200);
} else {
    http_response_code(401);
    die(mysqli_errno($connexion));
}