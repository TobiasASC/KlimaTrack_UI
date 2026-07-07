import axios from 'axios'

const api = axios.create({
  baseURL: 'http://klimatrack.test/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 1. Interceptor de PETICIONES (REQUEST): Agrega el token antes de que salga la petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 2. Interceptor de RESPUESTAS (RESPONSE): Maneja los errores si el token caducó
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')

      // Solo redirigimos si la ruta actual NO es /login ni /register
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default api
