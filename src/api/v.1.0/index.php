<?php

require_once '../includes/PeticionREST.inc';

$peticion = new PeticionREST('v1.1');

$salida = [];
$salida['metodo'] = $peticion->metodo();
$salida['recurso'] = $peticion->recurso();
if(count($peticion->parametrosPath()) > 0) $salida['parametrosPath'] = $peticion->parametrosPath();
if(count($peticion->parametrosQuery()) > 0)$salida['parametrosQuery'] = $peticion->parametrosQuery();
if(count($peticion->parametrosPost()) > 0)$salida['parametrosPost'] = $peticion->parametrosPost();
if($peticion->parametrosBody() !== null)$salida['parametrosBody'] = $peticion->parametrosBody();


//--------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------
//
// nombre:Texto, password:Texto -> hacerLogin() -> VoF
//
// ---------------------------------------------------------------

function hacerLogin( $email, $password ) {
    $objetoResultado = new stdClass;
    $serverNombre = "localhost";
    $userNombre = "arosjim";
    $password = "12345";
    $dbNombre = "Huertodo1234";
// Crear la conexión
    $conn = mysqli_connect($serverNombre,
        $userNombre, $password, $dbNombre);
// Chequear la conexión
    if (!$conn) {
        die("Error: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM Usuarios";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
// procesar cada fila
        while($row = mysqli_fetch_assoc($result)) {
            if($email == $row["email"] && $password == $row["contrasenya"]){
                $objetoResultado->resultado = true;
                $objetoResultado->rol = $row["rol"];
                $objetoResultado->email = $row["email"];
            }
        }
    } else {
        $objetoResultado->resultado = false;
    }
}

//--------------------------------------------------------------------------------------------------

$objetoResultado = new stdClass;

// creo una sesión
session_start();

// obtengo valores de los parámetros
$email = $_POST["email"];
$password = $_POST["password"];
//
// llamada a la verdadera función.
//
$GLOBALS['hacerLogin'] = hacerLogin( $email, $password);
if ( $GLOBALS['hacerLogin'].resultado == true  ) {

    $objetoResultado->resultado = true;
    $objetoResultado->email = $GLOBALS['hacerLogin'].email; //NO SE SI REALMENTE SE DEBERIA DE DEVOLVER AL CLIENTE ESTO
    $objetoResultado->rol = $GLOBALS['hacerLogin'].rol;


    // guardo en la sesión el nombre del usuario
    session_start();
    $_SESSION["email"] = $_POST["email"];

} else {
    session_destroy();
    $objetoResultado->resultado = false;
}

// echo == devolver
echo json_encode( $objetoResultado );