<template>
  <div>
    <div class="row">
<div class="col-md-12 mb-4">
  <div class="card text-bg-dark h-100 border-secondary">
    <!-- Aplicamos las clases flex aquí -->
    <div class="card-body d-flex align-items-center justify-content-between">
      
      <div class="form-check form-switch fs-4 mb-0"> <!-- mb-0 elimina margen extra -->
        <input class="form-check-input" type="checkbox" role="switch" id="interruptor">
        <label class="form-check-label" for="interruptor">°C/°F</label>
      </div>
      
      <!-- Cambiamos onclick por @click (Vue) -->
      <button class="btn btn-secondary" @click="alternarIdioma">{{ textoIdioma }}</button>
      
    </div>  
  </div>
</div>
      
<!-- Tarjeta Resumen -->
      <div class="col-md-6 mb-4">
        <div class="card text-bg-dark h-100 border-secondary">
          
          <div class="mx-3 my-3 d-flex justify-content-between align-items-center texto_secundario">
            <div>
              <h3 class="mb-0">Clima en Resistencia</h3>
              <h5 class="text-muted mt-1">22:30 | Jueves</h5>
            </div>
            <!-- Un texto descriptivo opcional en la esquina superior -->
            <span class="badge text-bg-secondary fs-6">Parcialmente Nublado</span>
          </div>

          <div class="card-body d-flex flex-column justify-content-center pt-0">
            <!-- Contenedor Flex para alinear ícono y temperatura -->
            <div class="d-flex align-items-center mb-3">
              <!-- Ícono de clima -->
              <i class="bi bi-cloud-moon text-info" style="font-size: 5.5rem; line-height: 1; margin-right: 20px;"></i>
              <!-- Temperatura -->
              <h1 class="display-1 fw-bold mb-0">26°C</h1>
            </div>
            
            <p class="card-text fs-5 text-light opacity-75">
              Humedad: 75% &nbsp;|&nbsp; Viento: 15 km/h
            </p>
          </div>
          
        </div>
      </div>

      <!-- Tarjeta de los Gráficos Sincronizados -->
      <div class="col-md-6 mb-4 texto_secundario">
        <div class="card text-bg-dark border-secondary">
          <div class="card-header border-secondary">
            Tendencia Dual: Temperatura y Humedad
          </div>
          <div class="card-body">
            
            <!-- Gráfico 1 (Reemplaza al 'fb') -->
            <apexchart 
              type="line" 
              height="160" 
              :options="opcionesGrafico1" 
              :series="seriesGrafico1"
            ></apexchart>

            <!-- Gráfico 2 (Reemplaza al 'tw') -->
            <apexchart 
              type="line" 
              height="160" 
              :options="opcionesGrafico2" 
              :series="seriesGrafico2"
            ></apexchart>

          </div>
        </div>
      </div>

      <div class="col-md-8 mb-4 texto_secundario">
      <div class="card text-bg-dark border-secondary">
      <div class="card-header border-secondary">
          Precipitaciones Acumuladas
      </div>
      <apexchart 
      type="bar" 
      height="160" 
      :options="opcionesGrafico3" 
      :series="seriesGrafico3"
      ></apexchart>
      </div>
      </div>

      <div class="col-md-8 mb-4 texto_secundario">
      <div class="card text-bg-dark border-secondary">
      <div class="card-header border-secondary">
          Mapa de alertas
      </div>
      <apexchart 
      type="heatmap" 
      height="160" 
      :options="opcionesGrafico4" 
      :series="seriesGrafico4"
      ></apexchart>
      </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 1. Creamos una variable reactiva para el texto del botón
const textoIdioma = ref('ENG')

// 2. Creamos la función al estilo Vue
const alternarIdioma = () => {
  if (textoIdioma.value === "ENG") {
    textoIdioma.value = "SPA"
    // Llama aquí a tu función para cambiar el idioma a español
  } else {
    textoIdioma.value = "ENG"
    // Llama aquí a tu función para cambiar el idioma a inglés
  }
}

// ==========================================
// GRÁFICO 1 (Basado en el 'options' original)
// ==========================================

// REGLA 2: Separamos la data de las opciones y aplicamos REGLA 3 (ref)
const seriesGrafico1 = ref([
  {
    name: 'Temperatura',
    // Como no tenemos su función generadora, ponemos datos duros con formato [timestamp, valor]
    data: [
      [new Date('2026-07-01').getTime(), 25],
      [new Date('2026-07-02').getTime(), 28],
      [new Date('2026-07-03').getTime(), 22],
      [new Date('2026-07-04').getTime(), 18],
      [new Date('2026-07-05').getTime(), 19]
    ]
  }
])

const opcionesGrafico1 = ref({
  chart: {
    id: 'fb', // Mantenemos el ID original
    group: 'social', // El grupo es lo que los sincroniza
    type: 'line',
    height: 160,
    background: 'transparent',
    toolbar: { show: false } // Agregado para que se vea limpio
  },
  colors: ['#008FFB'], // El color original
  theme: { mode: 'dark' }, // Agregado para tu dashboard oscuro
  xaxis: { type: 'datetime' } // Agregado para que el eje X sepa que son fechas
})


// ==========================================
// GRÁFICO 2 (Basado en el 'optionsLine2' original)
// ==========================================

const seriesGrafico2 = ref([
  {
    name: 'Humedad',
    data: [
      [new Date('2026-07-01').getTime(), 50],
      [new Date('2026-07-02').getTime(), 45],
      [new Date('2026-07-03').getTime(), 80],
      [new Date('2026-07-04').getTime(), 95],
      [new Date('2026-07-05').getTime(), 60]
    ]
  }
])

const opcionesGrafico2 = ref({
  chart: {
    id: 'tw',
    group: 'social', // MISMO GRUPO -> ¡Sincronizados!
    type: 'line',
    height: 160,
    background: 'transparent',
    toolbar: { show: false }
  },
  colors: ['#546E7A'],
  theme: { mode: 'dark' },
  xaxis: { type: 'datetime' }
})



// ==========================================
// GRÁFICO 3
// ==========================================
const seriesGrafico3 = ref([
  {
    name: 'Precipitaciones (mm)',
    data: [
      [new Date('2026-07-01').getTime(), 0],
      [new Date('2026-07-02').getTime(), 0],
      [new Date('2026-07-03').getTime(), 15], // Día de lluvia
      [new Date('2026-07-04').getTime(), 45], // Tormenta
      [new Date('2026-07-05').getTime(), 0]
    ]
  }
])

const opcionesGrafico3 = ref({
  chart: {
    id: 'graficoLluvia', // Debe ser un ID ÚNICO
    group: 'social', // ¡CRUCIAL! Debe ser EL MISMO grupo que los gráficos 1 y 2
    type: 'bar',
    height: 160,
    background: 'transparent',
    toolbar: { show: false }
  },
  colors: ['#00E396'], // Un color distinto, como verde o celeste
  theme: { mode: 'dark' },
  xaxis: { type: 'datetime' }
})


// ==========================================
// GRÁFICO 4 (Mapa de Calor - Intensidad Térmica)
// ==========================================
const seriesGrafico4 = ref([
  {
    // Fila 1: Noche
    name: 'Noche',
    data: [15, 18, 22, 19, 16] // Valores correspondientes a cada columna
  },
  {
    // Fila 2: Tarde (Aquí ponemos un pico de 39°C para simular una alerta)
    name: 'Tarde',
    data: [28, 32, 39, 35, 26] 
  },
  {
    // Fila 3: Mañana
    name: 'Mañana',
    data: [20, 22, 26, 24, 19]
  }
])

const opcionesGrafico4 = ref({
  chart: {
    id: 'heatmapAlertas', // Siempre asegúrate de no dejar el ID vacío
    type: 'heatmap',
    height: 250, // Aumentamos un poco el alto para que entren bien las filas
    background: 'transparent',
    toolbar: { show: false }
  },
  
  // AQUÍ ESTÁ EL SECRETO: La configuración de la escala de colores superior
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 20,
            name: 'Agradable',
            color: '#00A100' // Verde
          },
          {
            from: 21,
            to: 30,
            name: 'Cálido',
            color: '#FFB200' // Amarillo
          },
          {
            from: 31,
            to: 60,
            name: 'Calor Extremo',
            color: '#FF0000' // Rojo
          }
        ]
      }
    }
  },
  
  dataLabels: {
    enabled: false // Oculta los números dentro de los cuadros para un look más limpio
  },
  theme: { mode: 'dark' },
  
  // EL EJE X: Aquí definimos los nombres de las columnas
  xaxis: {
    type: 'category', // Cambiamos datetime por category
    categories: ['01 Jul', '02 Jul', '03 Jul', '04 Jul', '05 Jul']
  }
})

</script>

<script>
    function alternarIdioma() {
        const boton = document.getElementById('botonToggle');
        
        if (boton.textContent === "ENG") {
            boton.textContent = "SPA";
            // Llama aquí a tu función para cambiar el idioma a inglés
        } else {
            boton.textContent = "ENG";
            // Llama aquí a tu función para cambiar el idioma a español
        }
    }
</script>

<style scoped>
/* Estilos específicos si los necesitas */
.texto_secundario{
    font-family: "Nunito Sans", sans-serif;
}
</style>