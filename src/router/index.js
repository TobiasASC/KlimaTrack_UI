import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
// Importa tus otras vistas (debes crearlas en la carpeta views)
import AlertasView from '../views/AlertasView.vue'
import Anomalias from '../views/Anomalias.vue'
import DatosHistoricos from '../views/DatosHistoricos.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Perfil from '../views/Perfil.vue'
import Ubicaciones from '../views/Ubicaciones.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/alertas',
      name: 'Alertas',
      component: AlertasView
    },
    {
      path: '/anomalias',
      name: 'Anomalias',
      component: Anomalias
    },
    {
      path: '/historicos',
      name: 'Datos historicos',
      component: DatosHistoricos
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/ubicaciones',
      name: 'Ubicaciones',
      component: Ubicaciones
    }


  ]
})

export default router