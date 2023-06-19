<?php
//--------------------------------------------------------
//      POST
//--------------------------------------------------------

/*
 * formularioSolicitud:POST--------------> guardarFormularioSolicitud()----->Insert en BD, HTTP:200 | HTTP:500
 *
 * */
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';

try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre);
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}

mysqli_query($connexion, 'SET NAMES utf8mb4');

$nombreHuerto = $_POST['nombre'];
$usuario = $_POST['usuario'];

// Insertar los datos en la tabla "huertos"
$insertSql = "INSERT INTO `huertos` (`nombre`, `usuario`)
              VALUES ('$nombreHuerto', '$usuario')";

if (mysqli_query($connexion, $insertSql)) {
    http_response_code(200);
    echo json_encode(array('message' => 'Huerto registrado exitosamente.'));
} else {
    http_response_code(500);
    echo json_encode(array('message' => 'Error al registrar el huerto.'));
}
?>
