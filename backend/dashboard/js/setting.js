$(()=>{
    $("#save_options").hide();
    $("#choose-item").show();
})

function validCantCampos(campo, cantidad) {
    return campo.trim().length >= cantidad || undefined;
}
function chooseProfile() { 
    $("#choose-item").hide();
    const htmlsave  =`<div class="row d-flex align-items-center h-100">
    <div class="col-auto">
    <form enctype="multipart/form-data">
        <div class="mb-3">
            <label for="formFile" class="form-label">Carga tu foto de
                perfil</label>
                <label for="nuevafoto" class="form-label">Foto de perfil recomendado: <strong class="text-danger">720*720px </strong> ||
                                                Extensiones <strong class="text-danger">.JPG - .JPEG - .WEBP
                                                </strong></label>
            <input type="file" class="form-control" id="nuevafoto" name="nuevafoto"
            accept=".jpg, .jpeg, .png, .webp" required>
        </div>
        <button type="button" onclick="updateprofile();" class="btn btn-primary fw-semibold">
            Guardar <svg xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" fill="currentColor" class="bi bi-save"
                viewBox="0 0 16 16">
                <path
                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
            </svg>
        </button>
    </form>
    </div>
</div>`
    $("#save_options").show();
    $("#save_options").html(htmlsave)
 }

 function updateprofile() {
    const fotocurso = $("#nuevafoto");
    const parseid = parseInt($('#userid').html());
    function handleFileChange() {
      const archivos = $(this).prop("files");
  
      if (archivos.length === 0) {
        return Toastify({
          close: true,
          text: "Se necesita una foto",
          duration: 3000,
          backgroundColor: "#ff4d4d",
        }).showToast();
      } else {
        // Acceder al primer archivo seleccionado
        const archivo = archivos[0];
        return archivo;
      }
    }
    const archivo = handleFileChange.call(fotocurso[0]);
    // Verificar si se seleccionó un archivo
    if (!archivo) {
      return;
    }
    const formData = new FormData();
    formData.append("action", "updatefoto");
    formData.append("imagen", archivo);
    formData.append("id", parseid);
    try {
        $.ajax({
          url: "./conexion/students.php",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: () => {
            return Toastify({
              close: false,
              text: "Cargando...",
              duration: 3000,
              backgroundColor: "#00f059",
            }).showToast();
          },
          success: (response) => {
            const result = response.success;
            result == true ? location.reload():  Toastify({
                close: true,
                text: response.message,
                duration: 3000,
                backgroundColor: "#ff4d4d",
              }).showToast();
          },
          error: (xhr, status, error) => {
            console.log("XHR", xhr);
            console.log("STATUS", status);
            console.log("ERROR", error);
          }
        })
    }catch(error)
    {
        Toastify({
            close: true,
            text: "¡Error, intente de nuevo!",
            duration: 3000,
            backgroundColor: "#ff4d4d",
          }).showToast();
    }
 }
 function updatedatas() {
    const name = $("#nombre").val();
    const apellido = $("#apellido").val();
    const telf = $("#telf").val();
    const pass = $("#pass").val();
    const passr = $("#passr").val();
    const parseid = parseInt($('#userid').html());
    if (!validCantCampos(name, 2)) {
        Toastify({
            text: "Por favor ingrese un nombre válido",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    if (!validCantCampos(apellido, 4)) {
        Toastify({
            text: "Por favor ingrese un apellido válido",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    if (!validCantCampos(telf, 4)) {
        Toastify({
            text: "Por favor ingrese un teléfono válido",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    if (!validCantCampos(pass, 5)) {
        Toastify({
            text: "La contraseña debe ser mayor a 6 dígitos",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    if (!validCantCampos(passr, 5)) {
        Toastify({
            text: "Repite nuevamente la contraseña",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    if (pass != passr) {
        Toastify({
            text: "Las contraseñas no coindicen",
            duration: 3000,
            backgroundColor: "#ff4d4d"
        }).showToast();
        return;
    }
    const formData = new FormData();
    formData.append("action", "updateprofile");
    formData.append("name", name);
    formData.append("apellido", apellido);
    formData.append("telf", telf);
    formData.append("pass", pass);
    formData.append("passr", passr);
    formData.append("id", parseid);
    $.ajax({
        url: "./conexion/students.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: () => {
          Toastify({
            close: true,
            text: "Cargando...",
            duration: 3000,
            backgroundColor: "#00f059",
          }).showToast();
        },      success: (response) => {
            const result = response.success;
            result == true ? location.reload():  Toastify({
                close: true,
                text: response.message,
                duration: 3000,
                backgroundColor: "#ff4d4d",
              }).showToast();
        },
        error: (xhr, status, error) => {
            Toastify({
                close: true,
                text: "Error inesperado",
                duration: 3000,
                backgroundColor: "#ff4d4d",
              }).showToast();
        }
    })
 }