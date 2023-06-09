<?php
//--------------------------------------------------------
//      GET
//--------------------------------------------------------

//FUNCION QUE RECIBIRÁ EL NOMBRE DEL HUERTO QUE SERA PREDETERMINADO EL PRIMERO Y LUEGO SE EJECUTA LA FUNCION
//CADA VEZ QUE EL SELECT CAMBIA, DEVOLVERA UN OBJETO CON TODAS LAS MEDIDAS ACTUALES, CADA INTERVALO DE TIEMPO
//SE EJECUTA LA FUNCION DE NUEVO PARA RECOGER LOS DATOS

/*
 * id(huerto):GET-------> cargarMedidasActual()---> http:200,
 *                                                          JSON{salinidad,temperatura, ph, humedad, iluminacion} | 500
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

$idHuerto = $_GET['id'];
$sql = "SELECT `medicion`.`temperatura`,`medicion`.`humedad`,`medicion`.`ph`,`medicion`.`salinidad`,`medicion`.`iluminacion`
    FROM `medicion`
	WHERE `medicion`.`huerto` = '$idHuerto'
	ORDER BY `medicion`.`id` DESC
	LIMIT 1";
$resultado = mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) > 0) {
    $registro = mysqli_fetch_assoc($resultado);
    $medicion = new stdClass(); // Crear un objeto medicion
    $medicion->temperatura = $registro['temperatura'];
    $medicion->humedad = $registro['humedad'];
    $medicion->ph = $registro['ph'];
    $medicion->salinidad = $registro['salinidad'];
    $medicion->iluminacion = $registro['iluminacion'];
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($medicion);
} else {
    echo json_encode(mysqli_affected_rows($connexion));
    http_response_code(401);
}