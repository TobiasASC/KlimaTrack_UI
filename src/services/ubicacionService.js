// src/services/ubicacionService.js
import api from './api'

export const ubicacionService = {
    async listar() {
        const response = await api.get('/ubicaciones')
        return response.data
    },

    async crear(datos) {
        const response = await api.post('/ubicaciones', datos)
        return response.data
    },

    async actualizar(id, datos) {
        const response = await api.put(`/ubicaciones/${id}`, datos)
        return response.data
    },

    async eliminar(id) {
        const response = await api.delete(`/ubicaciones/${id}`)
        return response.data
    }
}