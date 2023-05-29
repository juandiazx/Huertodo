<?php
/*
 * email:POST--------------> enviarCorreoRestablecerContrasenya()----->HTTP:200 | HTTP:401
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
$usuario = $_POST['email'];
$sql = "SELECT `usuario`.`email` FROM `usuario`
	WHERE `usuario`.`email` = '$usuario'";
$resultado = mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) === 1) {
    $registro = mysqli_fetch_assoc($resultado);
    $salida = [];
    $salida['email'] = $registro['email'];
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($salida);
} else {
    echo json_encode(mysqli_affected_rows($connexion));
    http_response_code(401);
}