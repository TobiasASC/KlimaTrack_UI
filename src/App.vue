<template>
  <div class="container-fluid text-light min-vh-100 p-0">
    <div class="d-flex min-vh-100">
      
      <!-- Sidebar DENTRO del flex -->
      <SideBarView/>
      
      <!-- Contenedor Derecho convertido en columna flex -->
      <div class="flex-grow-1 d-flex flex-column">
        
        <!-- Topbar pegado completamente arriba -->
        <TopBarView/>
        
        <!-- Contenido Principal (Dashboard) con su padding -->
        <main class="flex-grow-1 p-4 estilo-fondo">
          <RouterView />
        </main>

      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideBarView from './views/components/SideBar.vue'
import TopBarView from './views/components/TopBar.vue'
</script>

<!--Estila elementos de todo el proyecto-->
<style>
:root {
  --fondo-body: #2b333b;
  --color-primario: #028da8;
  --color-secundario: #6b7179;

}

.texto_secundario{
    font-family: "Nunito Sans", sans-serif;
}

</style>

<!--Style scoped solo estila a los elementos de este componente-->
<style scoped>
.titulo_principal {
  font-family: "Momo Trust Display", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.texto_secundario a {
  font-weight: 400;
  font-style: normal;
}

.estilo-fondo{
  background-color: var(--fondo-body);
}
</style>
