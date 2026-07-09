<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card text-bg-dark h-100 rounded-4">
          <div class="card-body d-flex flex-column justify-content-center">
            <h2 class="card-title texto_secundario">Ubicaciones</h2>
            <p class="card-text opacity-50">Administra tus ubicaciones</p>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="destinations-pane"
        role="tabpanel"
        aria-labelledby="destinations-tab"
        tabindex="0"
      >
        <div v-if="cargando" class="text-center py-4 opacity-50">Cargando ubicaciones...</div>

        <table v-else class="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha adherida</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ubi in ubicaciones" :key="ubi.id">
              <td>{{ ubi.nombre }}</td>
              <td>{{ formatearFecha(ubi.created_at) }}</td>
              <td>
                <span class="badge" :class="ubi.activo ? 'text-bg-success' : 'text-bg-secondary'">
                  {{ ubi.activo ? 'activo' : 'inactivo' }}
                </span>
              </td>
            </tr>
            <tr v-if="ubicaciones.length === 0">
              <td colspan="3" class="text-center opacity-50">
                No tenés ubicaciones cargadas todavía
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button type="button" class="btn btn-secondary boton-custom" @click="modalRef.abrir()">
      <i class="bi bi-plus"></i>Nueva ubicacion
    </button>

    <NuevaUbicacionModal ref="modalRef" @creada="onUbicacionCreada" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ubicacionService } from '@/services/ubicacionService'
import NuevaUbicacionModal from '@/views/components/NuevaUbicacionModal.vue'

const ubicaciones = ref([])
const cargando = ref(true)
const modalRef = ref(null)

const cargarUbicaciones = async () => {
  cargando.value = true
  try {
    const respuesta = await ubicacionService.listar()
    console.log('Respuesta cruda:', respuesta) // dejalo un toque más para confirmar
    ubicaciones.value = Array.isArray(respuesta) ? respuesta : (respuesta?.data ?? [])
  } catch (e) {
    console.error(e)
    ubicaciones.value = []
  } finally {
    cargando.value = false
  }
}

const onUbicacionCreada = (nueva) => {
  // Defensa extra: si por algo ubicaciones.value no es array, lo reseteamos
  if (!Array.isArray(ubicaciones.value)) {
    ubicaciones.value = []
  }
  ubicaciones.value.push(nueva)
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-AR')
}

onMounted(cargarUbicaciones)
</script>
