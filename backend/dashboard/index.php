<?php
$title = "Principal - Gestor de archivos";
include ('./page-master/head.php');
include "./conexion/Nicolas.php";
$operations = new Nicolas();
session_start();
if (!isset($_SESSION['usuario_autenticado']) || $_SESSION['usuario_autenticado'] !== true) {
    header("Location: ../login");
    exit;
} else {
    $id_user = $_SESSION['idusuario'];
    $get_user = $operations->getCamposConCondicion("usuarios", "id", $id_user);
    $suscripcion = $get_user[0]['is_premium'];
}



$item1 = "active";
$item2 = "";
$item3 = "";
$item4 = "";


?>


<body class="bg-body">
    <!-- Section: Design Block -->
    <div class="row m-0 p-0" style="position: sticky; top:0; z-index:99;">
        <?php
        include ('./components/menu.php');
        ?>
    </div>
    <section class=" bg-principal ">
        <p user-id="<?php echo trim($id_user) ?>" id="userIdHtml" hidden><?php echo trim($id_user) ?></p>
        <p user-id="<?php echo trim($id_user) ?>" id="suscrupcion" hidden><?php echo trim($suscripcion) ?></p>
        <div class="container">
            <div class="row p-0 m-0 pt-3 p-0 mb-5">
                <!-- MENU -->
                <div class="container d-flex gap-3 "><a href="#videos">Video completo</a><a href="#short">Shorts</a><a
                        href="#fotos">Fotos</a></div>
                <div class="col-12 col-md-12 col-lg-8    8 m-0 p-0">
                    <div class="row mb-5" id="videos">
                        <h2 class="">Tus vídeos producidos</h2>
                        <div class="row">
                            <iframe src="https://drive.google.com/file/d/17pjGvCiASsQG0upa98LeXaaUnCFqFPNi/preview"
                                width="640" height="480" allow="autoplay"></iframe>
                            <a href="https://drive.google.com/file/d/17pjGvCiASsQG0upa98LeXaaUnCFqFPNi/view?usp=sharing"
                                class="btn btn-warning">Ver archivo</a>
                        </div>
                    </div>
                    <div class="row mb-5" id="short">
                        <div class="col-12">
                            <h2 class="my-2">Shorts</h2>
                            <iframe src="https://drive.google.com/file/d/17pjGvCiASsQG0upa98LeXaaUnCFqFPNi/preview"
                            width="640" height="480" allow="autoplay"></iframe>
                        </div>
                    </div>
                    <div class="row mb-5" id="fotos">
                        <div class="col-12">
                            <h2 class="my-2">Fotos</h2>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </section>

    <?php include ('./components/profile.php');
    include_once ('./page-master/js.php');
    ?>