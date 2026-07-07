<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card text-bg-dark h-200 rounded-4">
          <div class="card-body d-flex flex-column justify-content-center">
            <h2 class="card-title texto_secundario">Administra tu cuenta</h2>
            
            <div v-if="mensajeExito" class="alert alert-success" role="alert">
            {{ mensajeExito }}
            </div>
            <div v-if="mensajeError" class="alert alert-danger" role="alert">
            {{ mensajeError }}
            </div>

            <form @submit.prevent="actualizarDatosUsuario">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                  <input
                    type="text"
                    class="form-control input-custom"
                    id="exampleFormControlInput1"
                    placeholder="Nombre"
                    v-model="nombreUsuario"
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control input-custom"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    v-model="correoUsuario"
                  />
                </div>

                <div class="col-12 d-flex align-items-center">
                  <i class="bi bi-exclamation-octagon fs-4 opacity-50 me-2"></i>
                  <span class="opacity-50">Modifica tu contraseña</span>
                  <a href="#" class="ms-1">aquí</a>
                </div>
                <div class="col-12 text-end">
                <button type="submit" class="btn btn-secondary boton-custom" :disabled="cargando">
                <span v-if="cargando" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ cargando ? 'Guardando...' : 'Guardar cambios' }}
                </button>
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
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
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
.input-custom {
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

.boton-custom:hover {
  background-color: var(--color-primario);
}
</style>

<script setup>
import { ref, onMounted } from 'vue' // Agregamos ref y onMounted
import { authService } from '@/services/authService'
import { perfilService } from '@/services/perfilService'

const nombreUsuario = ref('Cargando...')
const correoUsuario = ref('Cargando...')

// ¡AQUÍ ESTÁN LAS VARIABLES QUE FALTABAN!
const cargando = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')

const obtenerDatosUsuario = async () => {
  try {
    const respuesta = await authService.me()

    console.log('Datos recibidos del servidor:', respuesta)

    nombreUsuario.value = respuesta.usuario.nombre || 'Usuario'
    correoUsuario.value = respuesta.usuario.email || 'email@gmail.com'
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    nombreUsuario.value = 'Usuario' // Fallback si hay error
    correoUsuario.value = 'email@gmail.com' // Fallback si hay error
  }
}

// NUEVA FUNCIÓN: Envía los datos modificados a Laravel
const actualizarDatosUsuario = async () => {
  mensajeExito.value = ''
  mensajeError.value = ''
  cargando.value = true

  try {
    // Preparamos el objeto con los datos actuales de los inputs (v-model)
    const datos = {
      nombre: nombreUsuario.value, 
      email: correoUsuario.value
    }

    // CORRECCIÓN: Cambiamos perfilService por authService
    const respuesta = await perfilService.actualizarPerfil(datos)
    
    // Si sale bien, mostramos el mensaje que nos devuelve Laravel
    mensajeExito.value = respuesta.mensaje || 'Perfil actualizado correctamente.'
    
  } catch (error) {
    console.error('Error al actualizar el perfil:', error)
    
    // Capturamos los errores de validación de Laravel (ej. si el email ya existe)
    if (error.response && error.response.data.errors) {
      mensajeError.value = Object.values(error.response.data.errors).flat().join(' ')
    } else {
      mensajeError.value = 'Ocurrió un error al intentar actualizar los datos.'
    }
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  obtenerDatosUsuario()
})
</script>
