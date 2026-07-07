<template>
  <aside
    class="offcanvas-lg offcanvas-start bg-dark text-white position-fixed top-0 start-0 vh-100"
    tabindex="-1"
    id="menuLateral"
    style="width: 250px; z-index: 1000"
  >
    <div class="offcanvas-header d-lg-none border-bottom border-secondary">
      <h5 class="offcanvas-title titulo_principal mb-0">KlimaTrack</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        data-bs-target="#menuLateral"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body d-flex flex-column h-100 p-3 pt-lg-4">
      <h3 class="mb-4 text-white titulo_principal d-none d-lg-block">KlimaTrack</h3>
      <hr class="text-info d-none d-lg-block mt-0" />

      <ul class="nav flex-column texto_secundario fw-bold">
        <li class="nav-item mb-2">
          <RouterLink
            to="/"
            class="nav-link text-white"
            active-class="fw-bold seccion-activa rounded"
            @click="cerrarMenu"
          >
            Dashboard
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink
            to="/alertas"
            class="nav-link text-white"
            active-class="fw-bold seccion-activa rounded"
            @click="cerrarMenu"
          >
            Alertas
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/anomalias"
            class="nav-link text-white"
            active-class="fw-bold seccion-activa rounded"
            @click="cerrarMenu"
          >
            Anomalias
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/historicos"
            class="nav-link text-white"
            active-class="fw-bold seccion-activa rounded"
            @click="cerrarMenu"
          >
            Datos historicos
          </RouterLink>
        </li>
      </ul>

      <div class="usuario-sidebar mt-auto">
        <hr class="text-info mt-0 mb-3" />
        <button
          class="btn dropdown-toggle usuario-btn w-100 text-start text-white"
          type="button"
          data-bs-toggle="dropdown"
        >
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-sidebar">
              <i class="bi bi-person-fill"></i>
            </div>
            <strong>{{ nombreUsuario }}</strong>
          </div>
        </button>

        <ul class="dropdown-menu">
          <li>
            <button @click="ejecutarLogout" class="dropdown-item">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue' // Agregamos ref y onMounted
import { authService } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. Creamos la variable reactiva con un texto por defecto
const nombreUsuario = ref('Cargando...')

// 2. Creamos la función para pedir los datos
const obtenerDatosUsuario = async () => {
  try {
    const respuesta = await authService.me()
    // Asumimos que Laravel devuelve un objeto con la propiedad 'name'
    nombreUsuario.value = respuesta.usuario.nombre || 'Usuario'
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    nombreUsuario.value = 'Usuario' // Fallback si hay error
  }
}

// 3. Ejecutamos la función apenas el componente se monta en pantalla
onMounted(() => {
  obtenerDatosUsuario()
})

const ejecutarLogout = async () => {
  try {
    await authService.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const cerrarMenu = () => {
  // Comprobamos si el ancho de la pantalla es menor a 992px (móvil/tablet)
  if (window.innerWidth < 992) {
    // Buscamos el botón de la 'X' que tiene el offcanvas y lo "clickeamos"
    const botonCerrar = document.querySelector('.btn-close-white')
    if (botonCerrar) {
      botonCerrar.click()
    }
  }
}
</script>

<style scoped>
/* Estilos específicos de esta vista si los necesitas */

.titulo_principal {
  font-family: 'Momo Trust Display', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.texto_secundario {
  font-family: 'Nunito Sans', sans-serif;
}

li:hover {
  background-color: var(--color-primario);
  border-radius: 8px;
}

.seccion-activa {
  background-color: var(--color-primario);
}


.avatar-sidebar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--color-primario);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
