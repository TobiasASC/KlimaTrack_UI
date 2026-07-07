<template>
<div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
  
    <div class="card text-bg-dark rounded-4 texto_secundario" style="width: 450px; max-width: 90vw;">
        <div class="card-body p-4 d-flex flex-column justify-content-center">
      <div class="text-center mb-1">
        <i class="bi bi-person-fill fs-1"></i>
      </div>

      <form class="text-center" @submit.prevent="iniciarSesion">
        <h2 class="mb-4">Iniciar sesión</h2>

        <!-- Alerta para mostrar errores del backend -->
          <div v-if="errorMsg" class="alert alert-danger" role="alert">
            {{ errorMsg }}
          </div>

        <div class="mb-3 text-start">
          <label class="form-label">Correo electrónico</label>
          <input type="email" v-model="email" class="form-control" required>
        </div>

        <div class="mb-3 text-start">
          <label class="form-label">Contraseña</label>
            <input type="password" v-model="password" class="form-control pe-5" id="password-login" required>
        </div>


        <p class="mt-3">
          ¿No tenés una cuenta? <router-link to="/register">Registrate acá</router-link>
        </p>

        <div class="d-grid">
            <button type="submit" class="btn btn-lg btn-auth" :disabled="cargando">
              <span v-if="cargando" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ cargando ? 'Iniciando...' : 'Iniciar sesión' }}
            </button>
          </div>

      </form>

    </div>
    </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService' // Asegúrate de que la ruta sea la correcta

// Variables reactivas
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const cargando = ref(false)

const router = useRouter()

// Función que se ejecuta al enviar el formulario
const iniciarSesion = async () => {
  errorMsg.value = '' // Limpiamos errores previos
  cargando.value = true // Mostramos el estado de carga

  try {
    // Usamos el servicio que creaste en authService.js
    await authService.login(email.value, password.value)
    
    // Si sale bien (el token se guardó en localStorage), redirigimos al inicio
    router.push('/') 
    
  } catch (error) {
    // Si el backend devuelve un error (ej. credenciales incorrectas)
    if (error.response && error.response.status === 401) {
      errorMsg.value = 'Correo o contraseña incorrectos.'
    } else if (error.response && error.response.data.errors) {
       // Manejar errores de validación de Laravel
       errorMsg.value = Object.values(error.response.data.errors).flat().join(' ')
    } else {
      errorMsg.value = 'Ocurrió un error al intentar iniciar sesión.'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.btn-auth{
    background-color: var(--color-primario);
    color: rgb(255, 255, 255);
}

.btn-auth:hover{
    background-color: #248C54;
}

</style>