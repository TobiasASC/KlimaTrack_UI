<template>
  <!-- Usamos py-3 y px-4 para darle el mismo padding lateral que tiene el main -->
  <header class="fondo-topbar d-flex align-items-center justify-content-between py-3 px-4 shadow-sm">
    
    <!-- logo / titulo -->
    <div class="d-flex align-items-center">
        <!-- Reemplazamos "Sección" por la variable reactiva -->
        <h4 class="m-0 titulo_principal fs-6  opacity-50">{{ nombreSeccion }}</h4>
    </div>

    <!-- Contenedor principal del widget -->


    <!-- iconos -->
    
    <div class="d-flex align-items-center gap-3 fs-4">
        <div class="d-flex align-items-center bg-light rounded px-3 shadow-sm" style="width: fit-content;">

    
    <!-- 1. Ícono a la izquierda -->
    
    <i class="bi bi-cloud-moon-fill text-secondary fs-2 me-3"></i>

    <!-- 2. Textos apilados en el centro -->
    <div class="d-flex flex-column me-4">
      <span class="fw-bold text-dark lh-1 mb-1 fs-6">Resistencia</span>
      <span class="text-secondary lh-1" style="font-size: 0.85rem;">Chaco</span>
    </div>
    <RouterLink to="/ubicaciones"><i class="bi bi-pencil-fill text-secondary fs-4"></i></RouterLink>
    </div>
    

        <a href="#" class="text-light" style="cursor: pointer;">
            <i class="bi bi-bell-fill icono-topbar"></i>
        </a>

        <RouterLink to="/perfil" class="nav-link text-white" style="cursor: pointer;">
        <i class="bi bi-person-fill icono-topbar"></i>
        </RouterLink>
    </div>
    
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Obtenemos el objeto de la ruta actual
const route = useRoute();

// Creamos una propiedad computada que retorna el nombre de la ruta.
// Usamos una ruta por defecto ('Dashboard') por si la ruta actual no tiene nombre.
const nombreSeccion = computed(() => {
  return route.name || 'Dashboard'; 
});
</script>

<style scoped>
.titulo_principal {
  font-family: "Momo Trust Display", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* Efecto hover suave para el icono */
.icono-topbar:hover {
  opacity: 0.8;
}

.fondo-topbar{
  background-color: var(--fondo-body);
}
</style>