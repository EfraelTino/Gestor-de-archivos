<?php
$title = "Crear cuenta - NICOLAS ";

include ('page-master/head.php');
include ('page-master/header.php');
?>

<body>
  <!-- Section: Design Block -->
  <section class="overflow-hidden bg-course">
    <div class=" px-4 py-5  background-radial-gradient d-flex justify-content-center align-items-center">
      <div class="container my-5  ">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0 order-2 order-md-1" style="z-index: 10">
          <h1 class="my-1 my-sm-3 display-5 fw-bold ls-tight text-light">
             Bienvenido al gestor de <br />
              <span class="text-secondarys">Archivos de Tu Podcast</span>
              <br>
            para clientes.
            </h1>
            <p class="mb-4 opacity-60 text-light">
            Nuestra plataforma ha sido diseñada especialmente para facilitar la gestión y organización de todos los archivos relacionados con tus producciones de podcast. Con Tu Podcast, puedes descargar fácilmente tus archivos de audio, imágenes, guiones, notas y cualquier otro material relevante para tus episodios.
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0 position-relative order-1 order-md-2">
            <div class="card bg-principal-s border border-dark">
              <div class="card-body px-2 py-3 py-md-5 px-md-5">
                <h2 class="text-center fw-bold fs-2 text-white mb-4">Crear cuenta</h2>

                <form class="m-0 p-0" action="" method="#">
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label text-light" for="form3Example1">Nombres</label>
                        <input placeholder="Escribe tus Nombres..." type="text" id="nombres" class="form-control" />
                        <!-- <input placeholder="Escribe tus Nombres..."  type="text" id="nombres" class="form-control"  value="Efrael"  /> -->
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label text-light" for="form3Example2">Apellidos</label>
                        <input placeholder="Escribe tus Apellidos..." type="text" id="apellidos" class="form-control" />
                        <!-- <input placeholder="Escribe tus Apellidos..." type="text" id="apellidos" class="form-control"  value="Efrael"/> -->
                      </div>
                    </div>
                  </div>

                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <label class="form-label text-light" for="form3Example3">Correo electrónico</label>
                    <input placeholder="Escribe tu correo electrónico" type="email" id="correo" class="form-control" />
                    <!-- <input placeholder="Escribe tu correo electrónico"  type="email" id="correo" class="form-control" value="efrael2001@gmail.com"/> -->
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <label class="form-label text-light" for="form3Example4">Contraseña</label>
                    <!-- <input placeholder="Escribe una contraseña" type="password" id="password" class="form-control" autocomplete="new-password" value="1234566"/> -->
                    <input placeholder="Escribe una contraseña" type="password" id="password" class="form-control"
                      autocomplete="new-password" />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label text-light" for="form3Example4">Repetir contraseña</label>
                    <input placeholder="Repite la contraseña" type="password" id="repeat_password" class="form-control"
                      autocomplete="new-password" />
                    <!-- <input placeholder="Repite la contraseña" type="password" id="repeat_password" class="form-control" autocomplete="new-password"  value="1234566" /> -->
                  </div>

                  <!-- Submit button -->
                  <div class="d-flex justify-content-center">
                    <button onclick="crearCuenta()" type="button"
                      class="btn btn-primary btn-block mb-4 py-1 px-4 fs-5 fw-normal">
                      Registrarse
                    </button>
                  </div>

                  <!-- Register buttons -->
                  <div class="text-center">
                    <div class=" m-0 p-0 d-flex justify-content-center align-items-center ">
                      <p class="m-0 text-light px-1">¿Ya tienes una cuenta?
                        <a href="./" type="button" class=" btn-link btn-floating  text-primarys fs-6 px-1">
                          Inicia Sesión
                        </a>
                      </p>




                    </div>
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