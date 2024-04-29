<?php
$title = "Lista de Estudiantes - DINASTIA DE ÉXITO";
include ("./conexion/Nicolas.php");
include ('./page-master/head.php');
session_start();
if (!isset($_SESSION['usuario_autenticado']) || $_SESSION['usuario_autenticado'] !== true) {
    header("Location: ../login");
    exit;
} else {
    $id_user = $_SESSION['idusuario'];
}
$operations = new Nicolas();
$item1 = "";
$item2 = "";
$item3 = "active";
$item4 = "";
?>

<body class="bg-principal" cz-shortcut-listen="true">
    <main>
        <div class="row m-0 p-0 sticky-top">
            <!-- MENU -->
            <?php
            include ('./components/menu.php');

            ?>
            <!-- END MENU -->
        </div>
        <section class="container">
            <div class="row container p-3">
                <div class="col-12">
                    <div class="row">
                        <div class="col-4">
                            <div class="row m-0 p-0 mt-5 mb-2">
                                <h2 class="fw-semibold fs-2 m-0 p-0">
                                    Estudiantes registrados
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="bootgrid">
                            <div class="flex justify-between table-header">
                                <div class="flex items-center">
                                    <div class="row my-3">

                                        <label class="col-auto d-flex align-items-center gap-2">
                                            Visualizar
                                            <select class="form-select bg-dark text-white" id="amount_show"
                                                name="amount_show">
                                                <option value="10" selected="">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                            Registros
                                        </label>
                                    </div>
                                    <!-- <div>
                                        <select id="customer" name="customer">
                                            <option value="1">Google</option>
                                            <option value="2">StackOverflow</option>
                                            <option value="3">PayPal</option>
                                        </select>
                                    </div> -->
                                </div>
                            </div>
                            <table id="data-table" class="table  table-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Foto de perfil</th>
                                        <th>Nombre del estudiante</th>
                                        <th>Email</th>
                                        <th>Telf.</th>
                                        <th>Suscripción</th>
                                        <th>Fecha inicio</th>
                                        <th>Acciones</th>
                                        <th>

                                        </th>

                                    </tr>
                                </thead>
                                <tbody id="tbody-insert">

                                </tbody>
                                <!-- <tfoot>
                                    <tr>
                                        <td colspan="7" id="tfoot-paging">Datos no encuentrados</td>
                                    </tr>
                                </tfoot> -->
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php
    include ('./components/profile.php');
    include_once ('./page-master/js.php');
    ?>
    <script src="./js/students.js"></script>
</body>