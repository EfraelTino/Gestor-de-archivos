<?php
// Permitir solicitudes desde http://localhost:5173
header("Access-Control-Allow-Origin: http://localhost:5173");

// Permitir el método POST
header("Access-Control-Allow-Methods: POST");

// Permitir el encabezado Content-Type
header("Access-Control-Allow-Headers: Content-Type");

// Permitir el envío de cookies
header("Access-Control-Allow-Credentials: true");
include ("./Nicolas.php");
include ("./jwt.php");
$actions = new Nicolas();
if (isset($_POST['action']) && $_POST['action'] == "login") {
    $email = $_POST["email"];
    $pass = $_POST["pass"];

    $tabla = "usuarios";
    $campos = "id, email, password, nombre, apellido, is_premium, is_admin";
    $usuarios = $actions->getCamposSinCondicion($campos, $tabla);

    if (!$usuarios) {
        $response = array(
            "success" => false,
            "message" => "Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde."
        );
    } else {
        $usuarioEncontrado = false;
        foreach ($usuarios as $usuario) {
            if ($usuario['email'] === $email) {
                $usuarioEncontrado = true;
                $id_user = $usuario['id'];
                $email_db = $usuario['email'];
                $nombres_db = $usuario['nombre'] . " " . $usuario['apellido'];
                $estado = $usuario['is_premium'];
                $tipo = $usuario['is_admin'];
                if (password_verify($pass, $usuario['password'])) {

                    session_start();
                    $_SESSION['usuario_autenticado'] = true;
                    $_SESSION['idusuario'] = $id_user;
                    $_SESSION['email'] = $email_db;
                    $_SESSION['nombres'] = $nombres_db;
                    $_SESSION['estado'] = $estado;
                    $_SESSION['tipo'] = $tipo;
                    $token = generateToken($_SESSION['idusuario']);
                    $response = array(
                        "success" => true,
                        "message" => "¡Bienvenido a nuestra plataforma!",
                        "token" => $token,
                        "email" => $_SESSION['email'],
                        "nombre" => $_SESSION['nombres'],
                        "estado" => $_SESSION['estado'],
                        "tipo" => $_SESSION['tipo'],
                        "id" => $_SESSION['idusuario']
                    );
                } else {
                    $response = array(
                        "success" => false,
                        "message" => "La contraseña ingresada es incorrecta."
                    );
                }
                break; // Sal del bucle una vez que se haya encontrado el usuario
            }
        }
        if (!$usuarioEncontrado) {
            $response = array(
                "success" => false,
                "message" => "No se encontró ningún usuario con la dirección de correo electrónico proporcionada."
            );
        }
    }

    $json_res = json_encode($response);
    echo $json_res;
}
if (isset($_POST['action']) && $_POST['action'] == "getpodcasts") { 
    $userid = $_POST['userid'];
    $tabla = "podcasts";
    $condicion = "id_usuario";
    $podcast = $actions->getDataWhere($tabla, $condicion, $userid);
    try {
        if (!$podcast) {
            $response = array(
                "code" => 404,
                "success" => false,
                "message" => "¡Preparándonos para lanzar tu serie de podcasts! ¡Mantente atento!"
            );
        } else {
            $response = array(
                "code" => 200,
                "success" => true,
                "message" => $podcast
            );
        }
    } catch (\Throwable $th) {
        $response = array(
            "code" => 400,
            "success" => false,
            "message" => $th,
        );
    }
    $json_res = json_encode($response);
    echo $json_res;
}
if (isset($_POST['action']) && $_POST['action'] == "getpodcast_user"){
    // SELECT * FROM archivo_podcast WHERE id_podcast = "1";
    $id_podcast = $_POST['idpodcast'];
    $tabla = "archivo_podcast";
    $condicion = "id_podcast";
    $podcastusuario = $actions->getDataWhere($tabla, $condicion, $id_podcast);
    try {
        if (!$podcastusuario) {
            $response = array(
                "code" => 404,
                "success" => false,
                "message" => "Todavía no se han agregado archivos de tu podcast"
            );
        } else {
            $response = array(
                "code" => 200,
                "success" => true,
                "message" => $podcastusuario
            );
        }
    } catch (\Throwable $th) {
        $response = array(
            "code" => 400,
            "success" => false,
            "message" => $th,
        );
    }
    $json_res = json_encode($response);
    echo $json_res;
}


// get sugerencias
