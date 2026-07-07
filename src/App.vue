<template>
  <div class="container-fluid text-light min-vh-100 p-0">
    <div class="d-flex min-vh-100">
      <SideBarView v-if="!route.meta.requiresAuthLayout" />

      <div
        class="flex-grow-1 d-flex flex-column"
        :class="{ 'margen-sidebar': !route.meta.requiresAuthLayout }"
      >
      <button class="btn text-white d-lg-none me-3 fs-3 p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuLateral" aria-controls="menuLateral">
  <i class="bi bi-list"></i>
</button>
        <TopBarView v-if="!route.meta.requiresAuthLayout" />

        <main class="flex-grow-1 p-4 pb-5 estilo-fondo">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router' // Importamos useRoute
import SideBarView from './views/components/SideBar.vue'
import TopBarView from './views/components/TopBar.vue'

// Inicializamos la ruta para poder leerla en el template
const route = useRoute()
</script>

<!--Estila elementos de todo el proyecto-->
<style>
:root {
  --fondo-body: #2b333b;
  --color-primario: #0474c4;
  --color-secundario: #6b7179;
}

.texto_secundario {
  font-family: 'Nunito Sans', sans-serif;
}

/* Solo aplica el margen si la pantalla tiene más de 992px de ancho (Escritorio) */
@media (min-width: 992px) {
  .margen-sidebar {
    margin-left: 250px;
  }
}
</style>

<!--Style scoped solo estila a los elementos de este componente-->
<style scoped>
.titulo_principal {
  font-family: 'Momo Trust Display', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.texto_secundario a {
  font-weight: 400;
  font-style: normal;
}

.estilo-fondo {
  background-color: var(--fondo-body);
}
</style>
