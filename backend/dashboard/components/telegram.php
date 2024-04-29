<div class="section card bg-dark p-3 border border-dark">
    <div class="row m-0">
        <div class="col-12">
            <div class="row m-0">
                <div class="col-6">
                    <h3>
                        ¡Aprenda aún más!
                    </h3>
                    <p>
                        Únete a nuestro grupo de Telegram
                    </p>
                </div>
                <div class="col-6">
                    <img src="../assets/img/carpintero.webp" alt="Icono Usuario">

                </div>
            </div>
            <div class="row">
                <a href="#" class="btn btn-primary">
                    Ir a Telegram <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="section card bg-dark mt-5 p-3">
                                        <?php
                                        $search_user = $operations->getCamposConCondicion("anuncio", "estado", "1 ORDER BY id DESC LIMIT 1");
                                        if (!empty($search_user)) {
                                            ?>
                                            <div class="row m-0">
                                                <!-- MOSTRAR PERFIL USUARIO -->
                                                <!-- FECHA -->
                                                <div class="col-12 m-0 p-0">
                                                    <div class="row">
                                                        <?php
                                                        $id_int = $search_user[0]['id_user'];
                                                        $search_data = $operations->getCamposConCondicion("usuarios", "id", $id_int);
                                                        if (!empty($search_data)) {
                                                            ?>
                                                            <div class="col-3"><img src="./assets/users/<?php echo $search_data[0]['imagen_profile'] ?>" alt="Perfil"
                                                                    class="rounded-circle bg-prirncipal-s object-fit-cover foto-profile p-2 w-100" style="height:70px;">
                                                            </div>
                                                            <div class="col-9 d-flex flex-column justify-content-center">
                                                                <div class="col-12 m-0 p-0">
                                                                    <small>
                                                                        <strong>
                                                                            <?php

                                                                            echo $search_data[0]["nombre"] . " " . $search_data[0]['apellido'];

                                                                            ?>
                                                                        </strong>
                                                                    </small>
                                                                </div>
                                                                <div class="col-12 m-0">
                                                                    <small>
                                                                       <strong>Publicado: </strong> <?php echo $search_user[0]['fecha']; ?>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        <?php
                                                        } else {
                                                            echo "No se encontraron datos de usuarios para el ID especificado.";
                                                        }
                                                        ?>
                                                    </div>
                                                    <div class="row m-0">
                                                        <?php
                                                        if ($search_user[0]['imagen'] == '') {
                                                            ?>
                                                            <div class="col-12 m-0 p-0">
                                                                <p>
                                                                    <strong class="text-danger">¡Anuncio!</strong>
                                                                </p>
                                                                <h3 class="fw-bolder">
                                                                    <?php echo $search_user[0]['titulo']; ?>
                                                                </h3>
                                                                <?php
                                                                if ($search_user[0]['descripcion'] != '') {
                                                                    echo '<p>' . $search_user[0]["descripcion"] . '</p>';
                                                                }
                                                                ?>

                                                            </div>
                                                        <?php } else if ($search_user[0]['imagen'] != '') { ?>
                                                                <div class="col-12 m-0 p-0">
                                                                    <p>
                                                                        <strong class="text-danger">¡Anuncio!</strong>
                                                                    </p>
                                                                    <h3 class="fw-bold fs-4">
                                                                    <?php echo $search_user[0]['titulo']; ?>
                                                                    </h3>
                                                                </div>
                                                                <div class="col-6">
                                                                    <img src="./assets/anuncio/<?php echo $search_user[0]['imagen'] ?>"
                                                                        alt="Icono Usuario">
                                                                </div>

                                                                <?php
                                                                if ($search_user[0]['descripcion'] != '') {
                                                                    echo '<div class="col-6"><p><small>' . $search_user[0]["descripcion"] . '</small></p></div>';
                                                                }
                                                        }
                                                        ?>


                                                    </div>
                                                    <?php
                                                    if ($search_user[0]['enlace'] != '') {
                                                        ?>
                                                        <div class="row my-2 mt-4 m-0">
                                                            <a href="<?php echo $search_user[0]['enlace'] ?>"
                                                                class="btn btn-warning" target="_blank">
                                                                Ver más <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                    height="16" fill="black" class="bi bi-chevron-right"
                                                                    viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd"
                                                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708">
                                                                    </path>
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    <?php }
                                                    ?>
                                                </div>
                                            </div>
                                        <?php } else { ?>
                                            <p class="m-0 text-center">
                                                <strong class="text-danger ">Pronto nuevos anuncios...</strong>
                                            </p>
                                        <?php }
                                        ?>

                                    </div>