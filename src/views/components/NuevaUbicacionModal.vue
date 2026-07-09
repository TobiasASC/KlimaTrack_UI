<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content text-bg-dark">
          <div class="modal-header border-secondary">
            <h5 class="modal-title texto_secundario">Nueva ubicación</h5>
            <button type="button" class="btn-close btn-close-white" @click="cerrar"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nombre de la ubicación</label>
              <input
                v-model="nombre"
                type="text"
                class="form-control"
                placeholder="Ej: Casa, Quinta, Oficina..."
              />
            </div>

            <label class="form-label d-block mb-1">
              Elegí el punto en el mapa
            </label>
            <div ref="mapaRef" class="mapa-contenedor rounded-3"></div>

            <div class="mt-2 opacity-75 small" v-if="lat && lng">
              Lat: {{ lat.toFixed(5) }} &nbsp;|&nbsp; Lng: {{ lng.toFixed(5) }}
            </div>
            <div class="mt-2 opacity-50 small" v-else>
              Hacé clic en el mapa para marcar la ubicación
            </div>

            <div class="text-danger small mt-2" v-if="error">{{ error }}</div>
          </div>

          <div class="modal-footer border-secondary">
            <button class="btn btn-outline-light" @click="cerrar">Cancelar</button>
            <button
              class="btn btn-secondary"
              :disabled="!puedeGuardar || guardando"
              @click="guardar"
            >
              <span v-if="guardando" class="spinner-border spinner-border-sm me-2"></span>
              Guardar ubicación
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ubicacionService } from '@/services/ubicacionService'

// Fix típico de Leaflet + bundlers: los íconos default no cargan bien
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

const emit = defineEmits(['creada'])

const modalRef = ref(null)
const mapaRef = ref(null)
let modalInstance = null
let mapa = null
let marcador = null

const nombre = ref('')
const lat = ref(null)
const lng = ref(null)
const guardando = ref(false)
const error = ref(null)

const puedeGuardar = computed(() => nombre.value.trim() !== '' && lat.value !== null && lng.value !== null)

const inicializarMapa = () => {
  if (mapa) return // ya inicializado

  // Centro por defecto: Resistencia, Chaco
  mapa = L.map(mapaRef.value).setView([-27.4514, -58.9867], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa)

  mapa.on('click', (e) => {
    lat.value = e.latlng.lat
    lng.value = e.latlng.lng

    if (marcador) {
      marcador.setLatLng(e.latlng)
    } else {
      marcador = L.marker(e.latlng).addTo(mapa)
    }
  })
}

const abrir = async () => {
  // reset del formulario cada vez que se abre
  nombre.value = ''
  lat.value = null
  lng.value = null
  error.value = null
  if (marcador) {
    mapa.removeLayer(marcador)
    marcador = null
  }

  modalInstance.show()

  // Leaflet necesita que el contenedor ya sea visible para calcular tamaños
  await nextTick()
  setTimeout(() => mapa?.invalidateSize(), 200)
}

const cerrar = () => {
  modalInstance.hide()
}

const guardar = async () => {
  guardando.value = true
  error.value = null
  try {
    const nueva = await ubicacionService.crear({
      nombre: nombre.value.trim(),
      latitud: lat.value,
      longitud: lng.value
    })
    emit('creada', nueva)
    cerrar()
  } catch (e) {
    error.value = 'No se pudo guardar la ubicación. Intentá de nuevo.'
    console.error(e)
  } finally {
    guardando.value = false
  }
}

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
  // Inicializamos el mapa recién cuando el modal termina de mostrarse
  modalRef.value.addEventListener('shown.bs.modal', inicializarMapa)
})

onBeforeUnmount(() => {
  mapa?.remove()
  modalInstance?.dispose()
})

defineExpose({ abrir })
</script>

<style scoped>
.mapa-contenedor {
  height: 320px;
  width: 100%;
}
.texto_secundario {
  font-family: "Nunito Sans", sans-serif;
}
</style>