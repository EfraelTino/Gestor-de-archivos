<?php
// Permitir solicitudes desde http://localhost:5173
date_default_timezone_set('America/Bogota');
$fechaActual = date('d/m/Y - h:i', time());
header("Access-Control-Allow-Origin: http://localhost:5173");


// Permitir el método POST
header("Access-Control-Allow-Methods: POST, GET");
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
    $campos = "id, email, password, nombre, apellido, is_premium, is_admin, imagen_profile";
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
                $imagen_profile = $usuario['imagen_profile'];
                if (password_verify($pass, $usuario['password'])) {

                    session_start();
                    $_SESSION['usuario_autenticado'] = true;
                    $_SESSION['idusuario'] = $id_user;
                    $_SESSION['email'] = $email_db;
                    $_SESSION['nombres'] = $nombres_db;
                    $_SESSION['estado'] = $estado;
                    $_SESSION['tipo'] = $tipo;
                    $_SESSION['imagen_profile'] = $imagen_profile;
                    $token = generateToken($_SESSION['idusuario']);
                    $response = array(
                        "success" => true,
                        "message" => "¡Bienvenido a nuestra plataforma!",
                        "token" => $token,
                        "email" => $_SESSION['email'],
                        "nombre" => $_SESSION['nombres'],
                        "estado" => $_SESSION['estado'],
                        "tipo" => $_SESSION['tipo'],
                        "id" => $_SESSION['idusuario'],
                        "profile" => $_SESSION['imagen_profile'],
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
if (isset($_POST['action']) && $_POST['action'] == "getpodcast_user") {
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
if (isset($_POST['action']) && $_POST['action'] == 'get_suggestion') {
    $id_podcast = $_POST['idpodcast'];
    $tabla = "suggestion_podcast";
    $condicion = "id_podcast";
    $sugesstion = $actions->getDataWhere($tabla, $condicion, $id_podcast);
    try {
        if (!$sugesstion) {
            $response = array(
                "code" => 404,
                "success" => false,
                "message" => "No encontramos sugestiones",

            );
        } else {
            $response = array(
                "code" => 200,
                "success" => true,
                "message" => $sugesstion,
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

// Insert suggestion
if (isset($_POST['action']) && $_POST['action'] == 'updatesuggestion') {
    $id_pocast = $_POST['idpodcast'];
    $datasugerencia = $_POST['datasugerencia'];
    try {
        $campodb="suggestion, id_podcast, fecha";
        $valores="?, ?, ?";
        $bind="sis";
        $data = array($datasugerencia, $id_pocast, $fechaActual);
        $insert_suggestion = $actions->postInsert('suggestion_podcast', $campodb, $valores, $bind, $data);
        if ($insert_suggestion) {
            // Decodificar la respuesta JSON para obtener el ID del nuevo registro
            $insert_response = json_decode($insert_suggestion, true);
            $newId = $insert_response['newId'];

            // Enviar solo el ID como respuesta
            $response = array('success' => true, 'code' => 200, 'message' => 'Se insertó la sugerencia!', 'newId' => $newId);
        } else {
            $response = array('success' => false, 'code' => 404, 'message' => 'Ocurrió un error, intente más tarde!');
        }
    } catch (\Throwable $th) {
        $response = array(
            "code" => 400,
            "success" => false,
            "message" => $th->getMessage(),
        );
    }
    echo json_encode($response);
}
if(isset($_POST['action']) && $_POST['action'] == 'deletesuggestion'){
    $id_pocast = $_POST['id'];
    try {
        $deletesuggestion = $actions->deletedata("suggestion_podcast","id",$id_pocast);
   
        if ($deletesuggestion) {
            $response = array('success' => true, 'code' => 200, 'message' => 'Se ha eliminado la sugerencia');
        } else {
            $response = array('success' => false, 'code' => 404, 'message' => 'Errors al eliminar la sugerencia');
        }
        echo json_encode($response);
    } catch (\Throwable $th) {
        $response = array(
            "code" => 400,
            "success" => false,
            "message" => $th->getMessage(),
        );
    }
}

// delete suggestion
