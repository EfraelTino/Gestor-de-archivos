<?php
session_start();
if (!isset($_SESSION['usuario_autenticado']) || $_SESSION['usuario_autenticado'] !== true) {
    header("Location: ../login");
    exit;
} else {
    $id_user = $_SESSION['idusuario'];
}
$title = "Setting - NICOLAS ";

include ('./page-master/head.php');
include ("./conexion/Nicolas.php");
$operations = new Nicolas();
$item1 = "";
$item2 = "";
$item3 = "";
$item4 = "active";
$get_user = $operations->getCamposConCondicion("usuarios", "id", $id_user);
$data_user = array();
foreach ($get_user as $data) {
    $data_user[] = $data;
}
// var_dump($data_user);
?>

<body class="bg-principal" cz-shortcut-listen="true">
    <main>
        <div class="row m-0 p-0 sticky-top">
            <!-- MENU -->
            <?php
            include ('./components/menu.php');

            ?>
            <!-- END MENU -->
            <p  id="userid" hidden><?php echo$id_user ?></p>
        </div>
    </main>
    <section class="container">
        <div class="row container p-3">
            <div class="col-12">
                <div class="row">
                    <div class="row m-0 p-0 mt-5 mb-2">
                        <h2 class="fw-semibold fs-2 m-0 p-0 py-3">
                            Cuenta
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <!-- PHOTO PROFILE -->
                    <div class="col-12">
                        <div class="row">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12 col-md-6 col-lg-4 rounded-circle">
                                            <img src="./assets/users/<?php echo $data_user[0]['imagen_profile'] == '' ? 'carpintero.webp' : $data_user[0]['imagen_profile'] ?>" alt="Foto de perfil"
                                                class="rounded-circle bg-dark object-fit-cover foto-profile p-2" style="height: 250px;">
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-4 align-items-center" id="choose-item">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h3>Nombre del usuario</h3>
                                                    <p><strong class="text-primarys">Tipo de suscripción: </strong>
                                                        <?php echo $data_user[0]['is_premium'] == 0 ? 'Free' : 'Premium'; ?>
                                                    </p>
                                                </div>
                                                <div class="col-12">
                                                    <p><strong class="text-primarys">Email: </strong>
                                                        <?php echo $data_user[0]['email']; ?>
                                                    </p>
                                                </div>
                                                <div class="col-12">
                                                    <p><strong class="text-primarys">Telf: </strong>
                                                        <?php echo $data_user[0]['telf'] == '' ? 'Sin especificar' : $data_user[0]['telf']; ?>
                                                    </p>
                                                </div>
                                                <div class="col-12">
                                                    <p><strong class="text-primarys">Fecha Suscripción: </strong>
                                                        <?php echo $data_user[0]['fecha'] == '' ? 'Sin suscripción' : $data_user[0]['fecha']; ?>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-warning fw-semibold" onclick="chooseProfile()">
                                                    Cambiar foto de perfil<svg xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" fill="black"
                                                        class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd"
                                                            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z">
                                                        </path>
                                                        <path
                                                            d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-8" id="save_options">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row">

                    </div>
                </div>
                <div class="row">
                    <div class="row m-0 p-0 mt-5 mb-2">
                        <h2 class="fw-semibold fs-2 m-0 p-0 py-3">
                            Datos Personales
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <form enctype="multipart/form-data" class="row">
                            <div class="mb-3 col-12 col-md-6">
                                <label for="nombre" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="nombre"
                                    value="<?php echo $data_user[0]['nombre'] ?>" name="nombre" required>
                            </div>
                            <div class="mb-3 col-12 col-md-6">
                                <label for="apellido" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="apellido" name="apellido" required
                                    value="<?php echo $data_user[0]['nombre'] ?>">
                            </div>
                            <div class="mb-3 col-12 col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" name="email" required
                                    disabled value="<?php echo $data_user[0]['email'] ?>">
                            </div>
                            <div class="mb-3 col-12 col-md-6">
                                <label for="telf" class="form-label">Teléfono</label>
                                <input type="number" class="form-control" id="telf" name="telf" required
                                    value="<?php echo $data_user[0]['telf'] ?>">
                            </div>
                            <div class="mb-3 col-12 col-md-6">
                                <label for="pass" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="pass" name="pass" required
                                    placeholder="******">
                            </div>
                            <div class="mb-3 col-12 col-md-6">
                                <label for="passr" class="form-label">Reperir contraseña</label>
                                <input type="password" class="form-control" id="passr" name="passr" required
                                    placeholder="******">
                            </div>

                            <div class="col-12 mb-5">
                                <button type="button" onclick="updatedatas();" class="btn btn-primary fw-bolder">ACTUALIZAR
                                    DATOS</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- END PHOTO PROFILE -->
            </div>
        </div>
        </div>
    </section>
    <?php
    include ('./components/profile.php');
    include_once ('./page-master/js.php');
    ?>
    <script src="./js/setting.js"></script>
</body>