import api from './api'

export const perfilService = {

async actualizarPerfil(datos) {
        // Usamos PUT porque vamos a sobreescribir datos existentes
        const response = await api.put('/perfil', datos)
        return response.data
    },

    async cambiarPassword(datos) {
        // Separamos la contraseña por seguridad en su propia ruta
        const response = await api.put('/password', datos)
        return response.data
    }

}