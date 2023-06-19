<?php
//--------------------------------------------------------
//      GET
//--------------------------------------------------------

//FUNCION QUE RECIBIRÁ EL NOMBRE DEL HUERTO QUE SERA PREDETERMINADO EL PRIMERO Y LUEGO SE EJECUTA LA FUNCION
//CADA VEZ QUE EL SELECT CAMBIA, DEVOLVERA UN OBJETO CON TODAS LAS MEDIDAS ACTUALES, CADA INTERVALO DE TIEMPO
//SE EJECUTA LA FUNCION DE NUEVO PARA RECOGER LOS DATOS

/*
 * idHuerto,parametro,primerTimestamp,segundoTimestamp:GET-------> cargarGrafica()---> http:200,
 *                                                          [JSON{salinidad,temperatura, ph, humedad, iluminacion,tiempo}] | 500
 *
 * */

$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';
try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre); //$bbdd_nombre
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');

$idHuerto = $_GET['idHuerto'];
$parametro = $_GET['parametro'];
$primerTimestamp = $_GET['primerTimestamp'];
$segundoTimestamp = $_GET['segundoTimestamp'];
$sql = "SELECT `medicion`.`temperatura`, `medicion`.`humedad`, `medicion`.`ph`, `medicion`.`salinidad`, `medicion`.`iluminacion`, `medicion`.`tiempo`
    FROM `medicion`
    WHERE `medicion`.`huerto` = '$idHuerto' 
    AND `medicion`.`tiempo` BETWEEN '$primerTimestamp' AND '$segundoTimestamp'
    ORDER BY `medicion`.`id` ASC";
$resultado = mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) > 0) {
    $salida = []; // Crear un array vacío para almacenar los huertos

    // Iterar sobre los resultados y guardar cada huerto en el array salida
    while ($registro = mysqli_fetch_assoc($resultado)) {
        $medida = new stdClass(); // Crear un objeto huerto
        $medida->temperatura = $registro['temperatura'];
        $medida->salinidad = $registro['salinidad'];
        $medida->humedad = $registro['humedad'];
        $medida->ph = $registro['ph'];
        $medida->iluminacion = $registro['iluminacion'];
        $medida->timestamp = $registro['tiempo'];
        $salida[] = $medida; // Agregar el huerto al array salida
    }
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($salida);
} else {
    echo json_encode($idHuerto);
    http_response_code(401);
}