<style>
    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #aaa;
    }

    .form_search {
        display: flex;
        justify-content: start;
        padding-left: 32px;
    }

    .profile_icon {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<!-- Modal -->
<div class="modal fade fixed" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel">Busca tus recursos</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Buscar recursos" id="inputsearch"
                            aria-label="Search">
                        <button class="btn btn-warning fw-semibold" type="button" onclick="buscarCurso();">Buscar</button>
                    </form>


                </div>
                <span class="text-black">Reultado de búsqueda:</span>
                <div class="">
                    <div class="col-12 card ">
                        <div class="result" id="result_modal">
                            <div class="row justify-content-between align-items-center p-3">


                            <small class="text-black text-center">Resultados...</small>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar </button>
                <button type="button" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>