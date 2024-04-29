$(() => {
  // Click en el paginado
  addImage();
  console.log("antes A AJX");
  $(document).on("click", ".pagination li a", function (evt) {
    evt.preventDefault();
    ajaxLoad($(this).data("page"));
  });

  // Cambio de valor
  $("#amount_show").change(function (evt) {
    evt.preventDefault();
    ajaxLoad(1); // ACA volvemos a la pagina 1 porque la config cambió
  });

  ajaxLoad(1);

  // Función que busca los registros
  function ajaxLoad(page) {
    console.log("ENTRO A AJX");
    const formData = new FormData();
    formData.append("action", "getstudents");
    formData.append("page", page);
    formData.append("amount_show", $("#amount_show").val());
    // formData.append("customer", $("#customer").val());
    let endpoint = "./conexion/students.php";
    $.ajax({
      url: endpoint,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: () => {},
      success: (response) => {
        console.log("RESPONSE: ", response);
        let rows = "";
        let pos = 0;
        users = response.records;
        for (let i = 0; i < users.length; i++) {
          pos++;
          rows += `
                  <tr>
                      <td>${pos}</td>
                      <td>
                        <img class="card-img object-fit-cover" style="width:50px; height:50px" src="./assets/users/${
                          users[i].imagen_profile
                        }" alt="${users[i].nombre} ${users[i].apellido}"/>
                      </td>
                      <td>
                        <p class="titulo-curso m-0 p-0">${users[i].nombre} ${
            users[i].apellido
          }</p>
                      </td>
                      <td>
                        ${users[i].email}
                      </td>
                      <td>${
                        users[i].telf == ""
                          ? "<small>Sin asignar</small>"
                          : users[i].telf
                      }
                      </td>
                      <td>
                        <p class="m-0 p-0" id="suscripcion-${users[i].id}">${
            users[i].is_premium == 0 ? "Free" : "Premium"
          }</p>
                      </td>
                      <td>
                          <p id="fecha_student-${users[i].id}">
                            ${
                              users[i].fecha == ""
                                ? "<small>No especificado</small>"
                                : `<small>${users[i].fecha}</small>`
                            }
                          <p>
                      </td>
                      <td>
                      <div id="item_student-${users[i].id}">
  ${
    users[i].is_premium == 0
      ? `<button onclick="powerUser(${users[i].id},${users[i].is_premium})" class="btn btn-light" href="">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-power" viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1z"></path>
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
      </svg>
    </button>`
      : `<button onclick="powerUser(${users[i].id},${users[i].is_premium})" class="btn btn-warning">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-power" viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1z"></path>
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
      </svg>
    </button>`
  }
</div>
                      <td>
                  </tr>`;
        }
        $("#tbody-insert").html(rows);

        // Creamos el paginado
        $("#tfoot-paging").html(
          createPaging({
            url: endpoint,
            current_page: response.current_page,
            total_records: response.total_records,
            records_by_page: response.records_by_page,
          })
        );
      },
      error: (xhr, status, error) => {
        console.log("xhr: ", xhr);
        console.log("status: ", status);
        console.log("error: ", error);
      },
    });
  }

  // Funcion para crear el paginado según la configruación recibida
  function createPaging(data) {
    let html = '<div class="pagination"><ul class="pagination">',
      total_pages = Math.ceil(data.total_records / data.records_by_page);

    if (data.current_page > 1) {
      html += `<li><a data-page="1"><i class="icon-angle-double-arrow"></i></a></li>
              <li><a data-page="${
                data.current_page - 1
              }"><i class="icon-angle-left"></i></a></li>`;
    }

    for (let i = 1; i <= total_pages; i++) {
      if (data.current_page == i) {
        html += `<li><a class="page-link active">${i}</a></li>`;
      } else {
        html += `<li><a class="page-link" data-page="${i}">${i}</a></li>`;
      }
    }

    if (data.current_page < total_pages) {
      html += `<li><a class="page-link" data-page="${
        data.current_page + 1
      }"><i class="icon-angle-right"></i></a></li>
              <li><a class="page-link" data-page="${total_pages}"><i class="icon-angle-double-right"></i></a></li>`;
    }

    html += "</ul></div>";
    return html;
  }
});
async function powerUser(iduser, estado) {
  const convertirEstado = parseInt(estado);

  if (convertirEstado == 1 || convertirEstado == "1") {
    const result = await desactivarusuario(iduser, convertirEstado);
    console.log("entro a estado 1");
  } else {
    const desactivar = await acativarusuario(iduser, convertirEstado);
    console.log("entro a estado 0");
  }
}

function acativarusuario(id, estado) {
  const date = moment();
  const formattedDate = date.format("DD MMM YYYY");
  console.log(formattedDate);
  console.log("actuviar usuario");
  try {
    const formData = new FormData();
    formData.append("action", "activarusuario");
    formData.append("idusuario", id);
    $.ajax({
      url: "./conexion/students.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: () => {},
      success: (response) => {
        console.log(response);
        const result = response.success;
        // console.log(response);
        if (result == true) {
          $(`#fecha_student-${id}`).html(`<small>${formattedDate}</small>`);
          $(`#item_student-${id}`)
            .html(`<button onclick="powerUser(${id},1)"  class="btn btn-warning" href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-power" viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1z"></path>
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
      </svg>
              </button>`);
          $(`#suscripcion-${id}`).html("Premium");
        } else {
          Toastify({
            close: true,
            text: response.message,
            duration: 3000,
            backgroundColor: "#ff4d4d",
          }).showToast();
        }
      },
      error: (xhr, status, error) => {
        console.log("XHR: ", xhr);
        console.log("STATUS: ", status);
        console.log("ERROR: ", error);
        // Toastify({
        //   close: true,
        //   text: xhr.responseText,
        //   duration: 3000,
        //   backgroundColor: "#ff4d4d",
        // }).showToast();
      },
    });
  } catch (error) {
    console.log("Error en catch: ", error);
    // Toastify({
    //   close: true,
    //   text: "¡Error, intente de nuevo!",
    //   duration: 3000,
    //   backgroundColor: "#ff4d4d",
    // }).showToast();
  }
}
function desactivarusuario(id, estado) {
  console.log("DESACTIVAR USUARIO");
  console.log("USUARIO ID: ", id, " ESTADO DE USUARIO: ", estado);
  try {
    const formData = new FormData();
    formData.append("action", "desactivarusuario");
    formData.append("iduser", id);
    $.ajax({
      url: "./conexion/students.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: () => {},
      success: (response) => {
        const result = response.success;
        console.log(response);
        if (result == true) {
          $(`#item_student-${id}`)
            .html(`<button onclick="powerUser(${id},0)"  class="btn btn-light" href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-power" viewBox="0 0 16 16">
            <path d="M7.5 1v7h1V1z"></path>
            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
          </svg>
          </button>`);
          $(`#suscripcion-${id}`).html("Free");
        } else {
          Toastify({
            close: true,
            text: response.message,
            duration: 3000,
            backgroundColor: "#ff4d4d",
          }).showToast();
        }
      },
      error: (xhr, status, error) => {
        console.log("XHR: ", xhr);
        console.log("STATUS: ", status);
        console.log("ERROR: ", error);
        // Toastify({
        //   close: true,
        //   text: xhr.responseText,
        //   duration: 3000,
        //   backgroundColor: "#ff4d4d",
        // }).showToast();
      },
    });
  } catch (error) {
    console.log("Error en catch: ", error);
    // Toastify({
    //   close: true,
    //   text: "¡Error, intente de nuevo!",
    //   duration: 3000,
    //   backgroundColor: "#ff4d4d",
    // }).showToast();
  }
}
const notImage = () => {
  $("#formdara").html(`
  <h3 class="fw-bold mt-5">Anuncio con Imagen</h3>
                                        <div class="mb-3">
                                            <label for="titulo" class="form-label">Título</label>
                                            <input type="text" class="form-control" id="titulo" name="titulo" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="descripcion" class="form-label">Descripción</label>
                                            <textarea class="form-control" name="descripcion" id="descripcion"
                                                rows="3"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="estado" class="form-label">Estado del anuncio</label>
                                            <select class="form-select" aria-label="Default select example" id="estado"
                                                required name="estado">
                                                <option class="text-black" value="1">
                                                    Activo
                                                </option>
                                                <option class="text-black" value="0">
                                                    Desactivo
                                                </option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="enlace" class="form-label">enlace de redirección</label>
                                            <input type="text" class="form-control" id="enlace" name="enlace" required>
                                        </div>
                                        <button type="button" onclick="addAnuncio(1);"
                                            class="btn btn-primary fw-semibold">Guardar Anuncio</button>
                                            `);
};
const addImage = () => {
  $("#formdara").html(`
  <h3 class="fw-bold mt-5">Anuncio sin Imagen</h3>
  <div class="mb-3">
                                            <label for="nuevafoto" class="form-label">Foto del anuncio
                                                recomendado: <strong class="text-danger">720*720px </strong> ||
                                                Extensiones <strong class="text-danger">.JPG - .JPEG - .WEBP
                                                </strong></label>
                                            <input type="file" class="form-control" id="nuevafoto" name="nuevafoto"
                                                accept=".jpg, .jpeg, .png, .webp" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="titulo" class="form-label">Título</label>
                                            <input type="text" class="form-control" id="titulo" name="titulo" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="descripcion" class="form-label">Descripción</label>
                                            <textarea class="form-control" name="descripcion" id="descripcion"
                                                rows="3"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="estado" class="form-label">Estado del anuncio</label>
                                            <select class="form-select" aria-label="Default select example" id="estado"
                                                required name="estado">
                                                <option class="text-black" value="1">
                                                    Activo
                                                </option>
                                                <option class="text-black" value="0">
                                                    Desactivo
                                                </option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="enlace" class="form-label">Enlace de redirección</label>
                                            <input type="text" class="form-control" id="enlace" name="enlace" required>
                                        </div>
                                        <button type="button" onclick="addAnuncio(2);"
                                            class="btn btn-primary fw-semibold">Guardar Anuncio</button>`);
};
const addAnuncio = (param) => {
  const fotocurso = $("#nuevafoto");
  const titulo = $("#titulo").val();
  const descripcion = $("#descripcion").val();
  const estado = $("#estado").val();
  const enlace = $("#enlace").val();
  const userIdHtml = $("#userIdHtml").html();
  const formData = new FormData();
  if (titulo.length == 0 || titulo.length == null) {
    return Toastify({
      close: true,
      text: "Ingresa un título al anuncio",
      duration: 3000,
      backgroundColor: "#ff4d4d",
    }).showToast();
  }
  if (param == "2" || param == 2) {

    function handleFileChange() {
      const archivos = $(this).prop("files");

      if (archivos.length === 0) {
        return Toastify({
          close: true,
          text: "Se necesita una imagen para el anuncio",
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
    if (!archivo) {
      return;
    }
    formData.append("action", "newanuncio1");
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("estado", estado);
    formData.append("enlace", enlace);
    formData.append("imagen", archivo);
    formData.append("userIdHtml", userIdHtml);
    try {
      $.ajax({
        url: "./conexion/students.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: () => {
          return Toastify({
            close: true,
            text: "Cargando...",
            duration: 3000,
            backgroundColor: "#00f059",
          }).showToast();
        },
        success: (response) => {
          if(response.success == true){
            window.reload();
          }else{
            return Toastify({
              close: true,
              text: "Error al crear el anuncio",
              duration: 3000,
              backgroundColor: "#ff4d4d",
            }).showToast();
          }
        },

        error: (xhr, status, error) => {
          // console.log("XHR", xhr);
          // console.log("STATUS", status);
          // console.log("ERROR", error);
          Toastify({
            close: true,
            text: "¡Error, intente de nuevo!",
            duration: 3000,
            backgroundColor: "#ff4d4d",
          }).showToast();
        },
      });
    } catch (error) {
      // console.log(error);
      Toastify({
        close: true,
        text: "¡Error, intente de nuevo!",
        duration: 3000,
        backgroundColor: "#ff4d4d",
      }).showToast();
    }
  } else if (param == "1" || param == 1) {
    formData.append("action", "newanuncio2");
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("estado", estado);
    formData.append("enlace", enlace);
    formData.append("userIdHtml", userIdHtml);
    try {
      $.ajax({
        url: "./conexion/students.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: () => {
          return Toastify({
            close: true,
            text: "Cargando...",
            duration: 3000,
            backgroundColor: "#00f059",
          }).showToast();
        },
        success: (response) => {
          if(response.success == true){
            window.reload();
          }else{
            return Toastify({
              close: true,
              text: "Error al crear el anuncio",
              duration: 3000,
              backgroundColor: "#ff4d4d",
            }).showToast();
          }
        },
        error: (xhr, status, error) => {
          // console.log("XHR", xhr);
          // console.log("STATUS", status);
          // console.log("ERROR", error);
          Toastify({
            close: true,
            text: "¡Error, intente de nuevo!",
            duration: 3000,
            backgroundColor: "#ff4d4d",
          }).showToast();
        },
      });
    } catch (error) {

      Toastify({
        close: true,
        text: "¡Error, intente de nuevo!",
        duration: 3000,
        backgroundColor: "#ff4d4d",
      }).showToast();
    }
  } else {
    Toastify({
      close: true,
      text: "¡Error, intente de nuevo!",
      duration: 3000,
      backgroundColor: "#ff4d4d",
    }).showToast();
  }
};
