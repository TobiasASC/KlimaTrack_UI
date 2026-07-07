<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <div class="card text-bg-dark rounded-4 texto_secundario" style="width: 450px; max-width: 90vw">
      <div class="card-body p-4 d-flex flex-column justify-content-center">
        <div class="text-center mb-1">
          <i class="bi bi-person-fill-add fs-1"></i>
        </div>
        <form class="text-center" @submit.prevent="registrarUsuario">
          <h2 class="mb-4">Registro</h2>

          <!-- Alerta para mostrar errores del backend -->
          <div v-if="errorMsg" class="alert alert-danger" role="alert">
            {{ errorMsg }}
          </div>

          <div class="mb-3 text-start">
            <label class="form-label">Nombre completo</label>
            <input type="text" v-model="form.nombre" class="form-control" required />
          </div>

          <div class="mb-3 text-start">
            <label class="form-label">Correo electrónico</label>
            <input type="email" v-model="form.email" class="form-control" required />
          </div>

          <div class="mb-3 text-start">
            <label class="form-label">Contraseña</label>
            <input type="password" v-model="form.password" class="form-control" required />
          </div>

          <div class="mb-3 text-start">
            <label class="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              v-model="form.password_confirmation"
              class="form-control"
              required
            />
          </div>

          <p class="mt-3">
            ¿Ya tenés cuenta? <router-link to="/login">Iniciá sesión acá</router-link>
          </p>

          <div class="d-grid">
            <button type="submit" class="btn btn-lg btn-auth" :disabled="cargando">
              <span
                v-if="cargando"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ cargando ? 'Registrando...' : 'Registrarse' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()

// Agrupamos los datos del formulario (los nombres coinciden con lo que espera Laravel)
const form = reactive({
  nombre: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errorMsg = ref('')
const cargando = ref(false)

const registrarUsuario = async () => {
  errorMsg.value = ''
  cargando.value = true

  try {
    // Enviamos el objeto form completo a tu servicio
    await authService.register(form)

    // Si sale bien, redirigimos al home
    router.push('/')
  } catch (error) {
    // Capturamos los errores de validación de Laravel (ej. email ya registrado, passwords no coinciden)
    if (error.response && error.response.data.errors) {
      // Convertimos el objeto de errores de Laravel en un solo texto
      errorMsg.value = Object.values(error.response.data.errors).flat().join(' ')
    } else {
      errorMsg.value = 'Ocurrió un error en el servidor.'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.btn-auth {
  background-color: var(--color-primario);
  color: rgb(255, 255, 255);
}

.btn-auth:hover {
  background-color: #248c54;
}
</style>
