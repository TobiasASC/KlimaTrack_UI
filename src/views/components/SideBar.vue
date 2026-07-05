<template>

    <!-- Sidebar (Barra Lateral) -->
    <nav class="bg-dark p-3 min-vh-100 flex-shrink-0" style="width: 250px;">
        <h3 class="mb-4 text-white titulo_principal">KlimaTrack</h3>

        <hr class="text-info">

        <ul class="nav flex-column texto_secundario fw-bold">
        <li class="nav-item mb-2">
            <RouterLink to="/" class="nav-link text-white" active-class="fw-bold seccion-activa rounded">
            Dashboard
            </RouterLink>
        </li>
        <li class="nav-item mb-2">
            <RouterLink to="/alertas" class="nav-link text-white" active-class="fw-bold seccion-activa rounded">
            Alertas
            </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="/anomalias" class="nav-link text-white" active-class="fw-bold seccion-activa rounded">
            Anomalias
            </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="/historicos" class="nav-link text-white" active-class="fw-bold seccion-activa rounded">
            Datos historicos
            </RouterLink>
        </li>
        </ul>
    </nav>

</template>

<script setup>
// Aquí más adelante haremos la petición fetch al backend
</script>


<style scoped>
/* Estilos específicos de esta vista si los necesitas */

.titulo_principal {
font-family: "Momo Trust Display", sans-serif;
font-weight: 400;
font-style: normal;
}

.texto_secundario{
    font-family: "Nunito Sans", sans-serif;
}

li:hover{
    background-color: var(--color-primario);
    border-radius: 8px;
}

.seccion-activa{
    background-color: var(--color-primario);
}

</style>