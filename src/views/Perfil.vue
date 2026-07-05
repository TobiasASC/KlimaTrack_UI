<template>
    <div class="container">
        <div class="row ">
        <div class="col-md-12 mb-4">
        <div class="card text-bg-dark h-200 rounded-4">
        <div class="card-body d-flex flex-column justify-content-center">
            <h2 class="card-title texto_secundario">Administra tu cuenta</h2>
            <form action="">
                <div class="row ">
                <div class="col-md-6 mb-3">
                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                <input type="text" class="form-control input-custom" id="exampleFormControlInput1" placeholder="Nombre">
                </div>

                <div class="col-md-6 mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control input-custom" id="exampleFormControlInput1" placeholder="name@example.com">
                </div>

                <div class="col-12 d-flex align-items-center">
                <i class="bi bi-exclamation-octagon fs-4 opacity-50 me-2"></i>
                <span class="opacity-50">Modifica tu contraseña</span>
                <a href="#" class="ms-1">aquí</a>
                </div>
                </div>

            </form>
        </div>
        </div>
        </div>

        <div class="col-md-12 mb-4">
        <div class="card text-bg-dark h-200 rounded-4">
        <div class="card-body d-flex flex-column justify-content-center">
        <h2 class="card-title texto_secundario">Preferencias</h2>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canal de notificación
          </button>
          <ul class="dropdown-menu">
          <li><button class="dropdown-item" type="button">Email</button></li>
          <li><button class="dropdown-item" type="button">Another action</button></li>
          <li><button class="dropdown-item" type="button">Something else here</button></li>
  </ul>
</div>
        </div>
        </div>
        </div>
        
        </div>

        </div>
</template>

<style scoped>
.input-custom{
  border: none !important; /* Elimina cualquier borde blanco */
  background-color: var(--color-secundario); /* Color gris oscuro de fondo (ajústalo al tuyo) */
  color: #ffffff; /* Texto en blanco */
}

.input-custom:focus {
  background-color: var(--color-secundario) !important; 
  color: #000000 !important; /* Cambia el texto a negro para que se vea sobre el blanco */
  box-shadow: none !important; /* Elimina el halo azul por defecto de Bootstrap */
  outline: none; /* Asegura que no haya bordes de enfoque del navegador */
}
</style>