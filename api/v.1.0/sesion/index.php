<?php
include('rest.php');
//Varios casos de petición HTTP, GET, POST y DELETE, sino devuelve 405
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo comprobarSesion();
        break;
    case 'POST':
        //Para produccion: 'localhost:3306','jdiagut1_masterS','Huertodo1234','jdiagut1_proyectoHuertodo'
        echo crearSesion('localhost','root','','test_local');
        break;
    case 'DELETE':
        echo borrarSesion();
        break;
    default:
        //Si ninguno de los casos anteriores se cumple, devolver codigo HTTP 405
        http_response_code(405);
}