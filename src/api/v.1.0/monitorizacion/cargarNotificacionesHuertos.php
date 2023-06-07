<?php
//--------------------------------------------------------
//      GET
//--------------------------------------------------------

//FUNCION QUE RECIBE UN ARRAY CON TODOS LOS HUERTOS QUE POSEE EL USUARIO PARA DEVOLVER TODAS LAS
//NOTIFICACIONES QUE SON DE ESOS HUERTOS, ES DECIR DEL USUARIO

/*
 * [id(huerto)]:GET-------> cargarNotificacioneshuertos()---> http:200,
 *                                                          [JSON{id,fecha,contenido,huerto,prioridad}] | 500
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

// Obtener el valor de los IDs de los huertos desde la URL
$idsHuertosString = $_GET["idsHuertos"];

// Convertir la cadena en un array
$idsHuertos = explode(",", $idsHuertosString);


// Escapar los IDs de los huertos para evitar inyección de SQL
$idsEscapados = array_map(array($connexion, 'real_escape_string'), $idsHuertos);

// Construir la cláusula IN
$clausulaIn = "'" . implode("','", $idsEscapados) . "'";

// Construir la consulta SQL
$sql = "SELECT * FROM `notificaciones` WHERE `notificaciones`.`huerto` IN ($clausulaIn) 
ORDER BY `notificaciones`.`id` DESC";

$resultado = mysqli_query($connexion, $sql);
if (mysqli_affected_rows($connexion) > 0) {
    $salida = []; // Crear un array vacío para almacenar las notificaciones

    // Iterar sobre los resultados y guardar cada notificacion en el array salida
    while ($registro = mysqli_fetch_assoc($resultado)) {
        $notificacion = new stdClass(); // Crear un objeto
        $notificacion->id = $registro['id'];
        $notificacion->fecha = $registro['fecha'];
        $notificacion->contenido = $registro['contenido'];
        $notificacion->prioridad = $registro['prioridad'];
        $salida[] = $notificacion; // Agregar la notificacion al array salida
    }
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($salida);
} else {
    $respuesta = new stdClass(); // Crear un objeto
    $respuesta->valor = false;
    echo json_encode($respuesta);
    http_response_code(401);
}
