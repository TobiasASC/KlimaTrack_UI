import api from './api'

export const authService = {
    async login(email, password) {
        const response = await api.post('/login', { email, password })
        localStorage.setItem('token', response.data.token)
        return response.data
    },

    async register(datos) {
        const response = await api.post('/register', datos)
        localStorage.setItem('token', response.data.token)
        return response.data
    },

    async logout() {
        await api.post('/logout')
        localStorage.removeItem('token')
    },

    async me() {
        const response = await api.get('/me')
        return response.data
    }
}