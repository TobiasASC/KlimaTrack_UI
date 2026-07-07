import api from './api'

export const climaService = {
    async ultimaLectura(ubicacionId) {
        const response = await api.get(`/ubicaciones/${ubicacionId}/lecturas/ultima`)
        return response.data
    },

    async historial(ubicacionId, desde, hasta) {
        const response = await api.get(`/ubicaciones/${ubicacionId}/lecturas`, {
            params: { desde, hasta }
        })
        return response.data
    },

    async resumen(ubicacionId, desde, hasta) {
        const response = await api.get(`/ubicaciones/${ubicacionId}/lecturas/resumen`, {
            params: { desde, hasta }
        })
        return response.data
    },

    async pronosticos(ubicacionId) {
        const response = await api.get(`/ubicaciones/${ubicacionId}/pronosticos`)
        return response.data
    }
}