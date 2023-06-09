<?php
//--------------------------------------------------------
//      POST
//--------------------------------------------------------

/*
 * email,password-repeat  :POST--------------> nuevaContrasenya()----->(HTTP:200 | HTTP:200, valor:Bool) | HTTP:401
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

$pass = $_POST['password-repeat'];
$email = $_POST['email'];
$sqlSelect = "SELECT `usuario`.`email` FROM `usuario` WHERE `usuario`.`contrasenya` = '$pass' 
                                          AND `usuario`.`email` = '$email'";

mysqli_query($connexion, $sqlSelect);

if (mysqli_affected_rows($connexion) === 1) {
    $salida = new stdClass(); // Crear un objeto huerto
    $salida->valor = true;
    http_response_code(200);
    echo(json_encode($salida));
}
else if(mysqli_affected_rows($connexion) === 0) {
    $sqlUpdate = "UPDATE `usuario`
SET `contrasenya` = '$pass' WHERE `usuario`.`email`='$email'";
// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
    mysqli_query($connexion, $sqlUpdate);
    if (mysqli_affected_rows($connexion) === 1) {
        $salida = new stdClass(); // Crear un objeto huerto
        $salida->valor = false;
        http_response_code(200);
        echo(json_encode($salida));
    } else {
        http_response_code(401);
        echo(mysqli_errno($connexion));
    }
}
else{
    http_response_code(401);
    echo(mysqli_errno($connexion));
}

