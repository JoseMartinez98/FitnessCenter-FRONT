import { ref } from 'vue'

// Estado reactivo para el usuario
const usuario = ref(null)

// Función para cargar usuario desde localStorage
const cargarUsuario = () => {
  const usuarioGuardado = localStorage.getItem('usuario')
  if (usuarioGuardado) {
    usuario.value = JSON.parse(usuarioGuardado)
  } else {
    usuario.value = null
  }
}

// Función para actualizar usuario y guardar en localStorage
const setUsuario = (nuevoUsuario) => {
  usuario.value = nuevoUsuario
  if (nuevoUsuario) {
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario))
  } else {
    localStorage.removeItem('usuario')
  }
}

// Carga inicial al importar el módulo
cargarUsuario()

export {
  usuario,
  setUsuario,
  cargarUsuario
}
