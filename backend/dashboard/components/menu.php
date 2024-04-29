<?php
$tabla = "usuarios";
$condicion = "id";
$params = $id_user;
$obtenerUsuario = $operations->getCamposConCondicion($tabla, $condicion, $params);
$obtenerUsuario = $operations->getCamposConCondicion($tabla, $condicion, $params);
$tipo_user = $obtenerUsuario[0]['is_admin'];
?>
<nav class="navbar navbar-expand-md navbar-dark sticky-top bg-black shadow " data-bs-theme="dark">
    <div class="container">
        <a class="navbar-brand" href="./">
            <img src="https://tupodcast.pe/wp-content/uploads/2023/11/cropped-tupodcast-200x67.webp" alt=""
                style="width:180px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link <?php echo $item1; ?>" aria-current="page" href="./">Principal</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $item1; ?>" aria-current="page" href="./form.php">Formulario Invitados</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link <?php echo $item2 ?> nav-link dropdown-toggle" href="#" id="navbarDropdown"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Podcasts</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Podcast 1</a></li>
                        <li><a class="dropdown-item" href="#">Podcast 2</a></li>
                        <li><a class="dropdown-item" href="#">Podcast 3</a></li>
                        <li><a class="dropdown-item" href="#">Podcast 4</a></li>

                    </ul>
                </li>
                <li class="nav-item">
                    <?php
                    if ($tipo_user == 1 || $tipo_user == '1') {
                        echo
                            ' <a class="nav-link ' . $item3 . '" href="./users.php">Usuarios</a>
                ';
                    }
                    ?>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $item4 ?>" href="./setting.php">Ajustes</a>
                </li>
            </ul>
            <ul class="navbar-nav mb-2">
                <div class="row">
                    <div class="col-auto">
                        <div class="form-group has-search">
                            <span class="fa fa-search form-control-feedback">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </span>

                            <input type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                class="form-control form_search text-body-tertiary" placeholder="Search"
                                value="Buscar Recursos....">
                        </div>
                    </div>
                    <div class="col-auto">
                        <li class="nav-item dropdown-center">
                            <div class="row">
                                <div class="col-12">

                                    <a class="nav-link dropdown-toggle bg-black rounded-circle mx-2 text-black w-auto d-flex justify-content-center align-items-center name_user"
                                        href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <?php
                                        if (!empty($obtenerUsuario)) {
                                            ?>
                                            <p class="text-white m-0 p-0 fs-6">
                                                <?php
                                                echo $obtenerUsuario[0]['nombre'] . " " . $obtenerUsuario[0]['apellido'];
                                                ?>
                                            </p>
                                            <?php
                                        } else {
                                            echo "No se encontró ningún usuario con el ID proporcionado.";
                                        }
                                        ?>
                                        <img src="./assets/users/<?php
                                        echo $obtenerUsuario[0]['imagen_profile'] == '' ? '' : $obtenerUsuario[0]['imagen_profile'];
                                        ?>" style="width: 20px;" alt="Perfil">

                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="./setting.php">Cuenta</a></li>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li><a class="dropdown-item" href="./conexion/destroy.php">Salir</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</nav>