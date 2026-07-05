<template>
    <div class="container">
        <div class="row">
        <div class="col-md-12 mb-4">
        <div class="card text-bg-dark h-100 border-secondary rounded-4">
          <div class="card-body d-flex flex-column justify-content-center">
            <h2 class="card-title texto_secundario">Añade el destino de tu alerta</h2>
            <p class="card-text opacity-50">Selecciona el medio de notificación para las alertas</p>
          </div>
        </div>
        </div>
        </div>
        <!--Secciones de: Crear nueva alerta, editar alertas, eliminar alerta, pausar alerta, historial de alertas-->

<div class="row">
  <div class="col-md-12 mb-0">
    <ul class="nav nav-underline" id="myTab" role="tablist">
      
      <!-- Pestaña para Notifications -->
      <li class="nav-item" role="presentation">
        <a class="nav-link" 
           id="notifications-tab" 
           data-bs-toggle="tab" 
           href="#notifications-pane" 
           role="tab" 
           aria-controls="notifications-pane" 
           aria-selected="false">
           Notificaciones
        </a>
      </li>

      <!-- Pestaña para Destinations (Activa por defecto) -->
      <li class="nav-item" role="presentation">
        <a class="nav-link active" 
           id="destinations-tab" 
           data-bs-toggle="tab" 
           href="#destinations-pane" 
           role="tab" 
           aria-controls="destinations-pane" 
           aria-selected="true">
           Destinatarios
        </a>
      </li>

    </ul>
  </div>
</div>

<div class="input-group mb-2 mt-3">
  <!-- Botón de Filtro (Izquierda) -->
  <button class="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #343a40; border: none;">
    <!-- Icono de filtro en SVG -->
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </button>
  
  <!-- Menú desplegable para futuros filtros -->
  <ul class="dropdown-menu dropdown-menu-dark">
    <li><a class="dropdown-item" href="#">Filtro 1</a></li>
    <li><a class="dropdown-item" href="#">Filtro 2</a></li>
  </ul>

  <!-- Input del Buscador -->
  <input type="text" class="form-control buscador-custom" placeholder="Buscar...">

  <!-- Botón de Buscar (Derecha) -->
  <button class="btn text-white boton-custom" type="button">Buscar</button>
</div>

      <!--Tablas-->
      <div class="tab-content" id="myTabContent">

        <div class="tab-pane fade" id="notifications-pane" role="tabpanel" aria-labelledby="notifications-tab" tabindex="0">

          <table class="table table-dark table-hover mt-0">
            <thead>
                <tr>
                    <th>ID Alerta</th>
                    <th>Mensaje</th>
                    <th>ID Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#001</td>
                    <td>Alerta temperatura baja</td>
                    <td>3/7/26</td>
                </tr>
            </tbody>
          </table>
        </div>

        <div class="tab-pane fade show active" id="destinations-pane" role="tabpanel" aria-labelledby="destinations-tab" tabindex="0">
        
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Nombre</th>
                    <th>URL</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Email</td>
                    <td>Admin</td>
                    <td>admin@gmail.com</td>
                    <td>activo</td>
                </tr>
            </tbody>
          </table>
          
        </div>
      </div>

      <button type="button" class="btn btn-secondary boton-custom"><i class="bi bi-plus"></i>Nueva alerta</button>
    </div>



    
</template>



<style scoped>
/* Estilos específicos si los necesitas */

.nav-underline {
  --bs-nav-link-color: #6c757d; /* Color normal */
  --bs-nav-link-hover-color: #ffff; /* Color al pasar el mouse (hover) */
  --bs-nav-underline-link-active-color: var(--color-primario); /* Color del enlace ACTIVO y su línea */
}

.fondo-buscador{
  background-color: var(--color-secundario);
}

/* Estado inactivo del buscador */
.buscador-custom {
  border: none !important; /* Elimina cualquier borde blanco */
  background-color: var(--color-secundario); /* Color gris oscuro de fondo (ajústalo al tuyo) */
  color: #ffffff; /* Texto en blanco */
}

/* Estado activo (cuando le das click al buscador) */
.buscador-custom:focus {
  background-color: var(--color-secundario) !important; 
  color: #000000 !important; /* Cambia el texto a negro para que se vea sobre el blanco */
  box-shadow: none !important; /* Elimina el halo azul por defecto de Bootstrap */
  outline: none; /* Asegura que no haya bordes de enfoque del navegador */
}

/* Ajusta el color del texto de relleno (placeholder) al darle click */
.buscador-custom:focus::placeholder {
  color: #6c757d; /* Gris claro para el "Buscar..." cuando el fondo es blanco */
}

.boton-custom:hover{
  background-color: var(--color-primario);
}
</style>