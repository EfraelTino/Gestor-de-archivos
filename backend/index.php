<?php
$title = "Login";

include ('page-master/head.php');
include ('page-master/header.php');
?>

<body>
  <!-- Section: Design Block -->
  <section class="overflow-hidden bg-course">
    <div class="px-0 py-0 px-sm-04 py-sm-5  background-radial-gradient d-flex justify-content-center align-items-center">
      <div class="container my-5  ">
        <div class="row gx-lg-5 align-items-center mb-5 ">
          <div class="col-lg-7 mb-5 mb-lg-0 order-2 order-md-1" style="z-index: 10">
            <h1 class="my-1 my-sm-3 display-5 fw-bold ls-tight text-light">
             Bienvenido al gestor de <br />
              <span class="text-secondarys">Archivos de Tu Podcast</span>
              <br>
            para clientes.
            </h1>
            <p class="mb-4 opacity-60 text-light font-weight-normal fs-6">
            Nuestra plataforma ha sido diseñada especialmente para facilitar la gestión y organización de todos los archivos relacionados con tus producciones de podcast. Con Tu Podcast, puedes descargar fácilmente tus archivos de audio, imágenes, guiones, notas y cualquier otro material relevante para tus episodios.
            </p>
          </div>

          <div class="col-lg-5 mb-5 mb-lg-0 position-relative order-1 order-md-2">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

            <div class="card bg-principal-s border border-dark">
              <div class="card-body px-3 py-3 px-sm-5  py-md-5 px-md-5">

                <h2 class="text-center fw-bold fs-2 text-primarys mb-4 text-light">Inicia Sesión</h2>
                <form class="m-0 p-0" action="" method="#">
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row">

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <label class="form-label text-light" for="email">Correo electrónico</label>
                      <input placeholder="Escribe tu correo electrónico" type="email" id="email" class="form-control" />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                      <label class="form-label text-light" for="password">Contraseña</label>
                      <input placeholder="Escribe una contraseña" type="password" id="password" class="form-control" />
                    </div>

                    <!-- Submit button -->
                    <div class="d-flex justify-content-center text-light">
                      <button onclick="Login()" type="button"
                        class="btn btn-primary btn-block mb-4 py-1 px-4 fs-5 fw-normal text-black">
                        Ingresar
                      </button>
                    </div>

                    <!-- Register buttons -->
                    <div class="text-center">

                      <p class="m-0 text-light px-1">
                        <a href="./register" type="button" class="btn btn-link btn-floating mx-1 text-primarys fs-6">
                          Crear cuenta
                        </a>
                      </p>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</body>

</html>
<?php
// include "page-master/footer.php";
include ('page-master/js.php');
?>