<?php

require_once('../logica/hacerLogin.php');

// ----------------------------------------------------------------
//
// GET ../rest/hacerLogin.php?nombre=<Texto>&password=<Texto>
//
// @return
//  VoF: true si el login OK
//
// @return
//  usuario:Texto
//       devuelto implicitamente en la variable global de sesión
//       (en el navegador no se pordrá acceder a la var. global)
//
// ----------------------------------------------------------------

$objetoResultado = new stdClass;

// creo una sesión
session_start();

// obtengo valores de los parámetros
$nombre = $_GET["nombre"];
$password = $_GET["password"];

//
// llamada a la verdadera función.
//
if ( hacerLogin( $nombre, $password) == true  ) {

    $objetoResultado->resultado = true;
    $objetoResultado->usuario = $nombre;

    // guardo en la sesión el nombre del usuario
    session_start();
    $_SESSION["usuario"] = $_GET["nombre"];

} else {
    session_destroy();
    $objetoResultado->resultado = false;
}

// echo == devolver
echo json_encode( $objetoResultado );


//------------------------------------------------------------------------------
//diHola.php

require_once('../logica/diHola.php');

// -------------------------------------------------
//
// GET ../rest/diHola.php
//
// usuario:Texto -> diHola() -> (nombre:Texto, saludo:Texto) | error:Texto
//
// usuario: recibido de forma implícita en la sesión
// (nombre:Texto, saludo:Texto) | error:Texto : devuelto en un mismo JSON
//
// -------------------------------------------------

session_start();

// creo el objeto resultado
$objetoResultado = new stdClass;

// compruebo si esto lo pide un usuario
// antes acreditado mediante login
if ( ! isset( $_SESSION["usuario"]) ) {
    // no es un usuario acreditado
    $objetoResultado->error = "usuario no acreditado";
    // $objetoResultado->nombre = "";
    // $objetoResultado->saludo = "";
    // echo == devolver
    echo json_encode( $objetoResultado );
    return;
}

// Sí que es un usuario acreditado:
$usuario = $_SESSION["usuario"];

//
// llamada a la verdadera función.
//
$objetoResultado = diHola( $usuario );

$objetoResultado->error = 0;

// echo == devolver
echo json_encode( $objetoResultado );
?>
