<?php
session_start();
$title = "Cursos - DINASTIA DE ÉXITO ";

include ('./page-master/head.php');
include ("./conexion/Nicolas.php");
$operations = new Nicolas();
if (!isset($_SESSION['usuario_autenticado']) || $_SESSION['usuario_autenticado'] !== true) {
    header("Location: ../login");
    exit;
} else {
    $id_user = $_SESSION['idusuario'];
    $get_user = $operations->getCamposConCondicion("usuarios", "id", $id_user);
    $suscripcion = $get_user[0]['is_premium'];
}

$item1 = "";
$item2 = "active";
$item3 = "";
$item4 = "";
?>

<body class="bg-principal">
    <!-- Section: Design Block -->
    <main class="bg-course">
        <div class="row m-0 p-0">
            <!-- MENU -->
            <?php
            include ('./components/menu.php');
            ?>
            <!-- END MENU -->
        </div>
        <section class=" bg-principal-s">
            <p user-id="<?php echo $id_user ?>" id="userIdHtml" style="color:black;" hidden>
                <?php echo $id_user ?>
            </p>
            <div class="container">
                <div class="row h-100  w-100 p-3">

                    <div class="col-12 col-md-6 col-lg-8 col-xl-8 col-xxl-9">

                        <div class="row  bg- mb-4 p-2">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12">
                                        <h2 class="fw-normal fs-2">
                                            Podcast 1 </h2>
                                            <h2 class="fw-normal fs-2">
                                            Podcast 1 </h2>
                             
                                    </div>
                                </div>
                                <div class="row">

                                </div>
                                <div class="row">



                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                        <?php include ('./components/profile.php'); ?>

                    </div>
                </div>
            </div>
        </section>
    </main>
</body>

<?php
include ('./page-master/js.php');

?>