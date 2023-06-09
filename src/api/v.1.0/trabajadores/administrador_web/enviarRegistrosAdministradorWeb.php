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
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre); //$bbdd_nombre
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');

$contrasenya = $_POST['contrasenya'];
$rol = 1;
$id = $_POST['usuario_solicitud'];

// Obtener los datos de la tabla "solicitud" en función de la coincidencia de IDs
$sql = "SELECT `solicitud`.`id`, `solicitud`.`email`, `solicitud`.`nombreApellidos`, `solicitud`.`direccion`
        FROM `solicitud` WHERE `solicitud`.`id` = '$id';";
$resultado = mysqli_query($connexion, $sql);

if (mysqli_num_rows($resultado) > 0) {
    $salida = [];

    while ($registro = mysqli_fetch_assoc($resultado)) {
        $solicitudes = new stdClass();
        $solicitudes->id = $registro['id'];
        $solicitudes->email = $registro['email'];
        $solicitudes->nombreApellidos = $registro['nombreApellidos'];
        $solicitudes->direccion = $registro['direccion'];

        // Insertar los datos en la tabla "usuario"
        $email = mysqli_real_escape_string($connexion, $registro['email']);
        $nombreApellidos = mysqli_real_escape_string($connexion, $registro['nombreApellidos']);
        $direccion = mysqli_real_escape_string($connexion, $registro['direccion']);
        $insertSql = "INSERT INTO `usuario` (`email`, `nombreApellidos`, `contrasenya`, `rol`, `direccion`)
                      VALUES ('$email', '$nombreApellidos', '$contrasenya', '$rol', '$direccion')";

        mysqli_query($connexion, $insertSql);

        $salida[] = $solicitudes;
    }

    http_response_code(200);
    echo json_encode($salida);
} else {
    http_response_code(401);
    echo json_encode(array('message' => 'No se encontraron huertos.'));
}
?>
