<script setup>
/**
 * Componente de navegación principal para la aplicación.
 *
 * Funcionalidades:
 * - Controla el estado de sesión del usuario y muestra el nombre o email cuando está logueado.
 * - Permite cerrar sesión eliminando el token y limpiando el estado del usuario.
 * - Maneja un menú responsive con un botón tipo "hamburguesa" para dispositivos móviles.
 * - Observa cambios en el usuario para responder a actualizaciones en el estado de autenticación.
 */

import { ref, onMounted, watch, computed } from "vue";
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";

// Instancia del router para navegación programática

// Estado reactivo que controla si el menú móvil está abierto o cerrado
const menuAbierto = ref(false);

// Función para alternar la visibilidad del menú (mostrar/ocultar)
const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
};
const esAdmin = computed(
  () =>
    Array.isArray(usuario.value?.roles) &&
    usuario.value.roles.some((rol) => rol.toLowerCase() === "role_admin")
);

// Función para cerrar sesión:
// - Elimina el token almacenado en localStorage
// - Resetea el estado del usuario
// - Redirige a la página principal

// Computed que devuelve el usuario activo actual (reactivo)
const usuarioActivo = computed(() => usuario.value);

// Watcher que observa cambios en el usuario y loguea en consola (para depuración)
watch(
  usuario,
  (nuevo) => {
    console.log("Cambio en usuario:", nuevo);
    console.log("ROL:", nuevo?.roles);
  },
  { immediate: true }
);

// Al montar el componente, carga la información del usuario desde almacenamiento o API
onMounted(() => {
  cargarUsuario();
});
</script>

<template>
  <nav v-if="usuarioActivo" class="menu-lateral">
    <ul>
      <li>
        <router-link to="/inicio">
          <svg
            class="icono"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path
              d="M3 9.75L12 3l9 6.75v10.5a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 20.25V9.75z"
            />
            <path d="M9 22V12h6v10" />
          </svg>
          <span class="texto">Inicio</span>
        </router-link>
      </li>
      <li>
        <router-link to="/rutinas">
          <svg
            class="icono"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path
              d="M12 2a2 2 0 0 1 2 2v4h2.5a1.5 1.5 0 0 1 0 3H14v2h3.5a1.5 1.5 0 0 1 0 3H14v4a2 2 0 0 1-4 0v-4H6.5a1.5 1.5 0 0 1 0-3H10v-2H6.5a1.5 1.5 0 0 1 0-3H10V4a2 2 0 0 1 2-2z"
            />
          </svg>
          <span class="texto">Rutinas</span>
        </router-link>
      </li>
      <li>
        <router-link to="/precios">
          <svg
            class="icono"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path
              d="M12 1.5C6.753 1.5 2.5 5.753 2.5 11S6.753 20.5 12 20.5 21.5 16.247 21.5 11 17.247 1.5 12 1.5zm1 14H9.5a.5.5 0 1 1 0-1H13a1.5 1.5 0 0 0 0-3H11a2.5 2.5 0 1 1 0-5h1a.5.5 0 1 1 0 1H11a1.5 1.5 0 1 0 0 3h2a2.5 2.5 0 0 1 0 5z"
            />
          </svg>
          <span class="texto">Precios</span>
        </router-link>
      </li>
      <li>
        <router-link to="/horarios">
          <svg
            class="icono"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 1.5a10.5 10.5 0 1 0 10.5 10.5A10.513 10.513 0 0 0 12 1.5zm.75 11.25H12a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 1.5 0v5.25H15a.75.75 0 0 1 0 1.5z"
            />
          </svg>
          <span class="texto">Horarios</span>
        </router-link>
      </li>
      <li v-if="esAdmin">
        <router-link to="/Admin">
          <svg
            class="icono"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              d="M11.983 1.5c-.658 0-1.22.474-1.326 1.125l-.144.867a7.518 7.518 0 0 0-1.655.957l-.789-.456a1.5 1.5 0 0 0-2.06.55l-.5.866a1.5 1.5 0 0 0 .394 1.94l.765.574a7.51 7.51 0 0 0-.002 1.915l-.763.573a1.5 1.5 0 0 0-.393 1.94l.5.866a1.5 1.5 0 0 0 2.06.55l.789-.455c.513.41 1.065.753 1.655.957l.144.867a1.5 1.5 0 0 0 2.951 0l.144-.867a7.518 7.518 0 0 0 1.655-.957l.789.455a1.5 1.5 0 0 0 2.06-.55l.5-.866a1.5 1.5 0 0 0-.394-1.94l-.764-.573a7.51 7.51 0 0 0 .002-1.915l.763-.574a1.5 1.5 0 0 0 .393-1.94l-.5-.866a1.5 1.5 0 0 0-2.06-.55l-.789.456a7.518 7.518 0 0 0-1.655-.957l-.144-.867A1.5 1.5 0 0 0 11.983 1.5zM9.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0z"
            />
          </svg>
          <span class="texto">Admin</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu-lateral {
  position: fixed;
  top: 20%;
  left: 0;
  height: 50vh;
  background-color: black;
  border: 2px solid green;
  border-radius: 50px;
  width: 75px;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 100;
}

.menu-lateral:hover {
  width: 200px;
}

.menu-lateral ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
}

.menu-lateral li {
  width: 100%;
}

.menu-lateral a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 1rem;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.2s, color 0.2s;
}

.menu-lateral a:hover {
  background-color: #1a1a1a;
  color: green;
}

.menu-lateral a.cerrar:hover {
  color: red;
}

.menu-lateral .icono {
  width: 40x;
  height: 40px;
  min-width: 40px;
  fill: currentColor;
}

.menu-lateral .texto {
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-lateral:hover .texto {
  opacity: 1;
}
@media (max-width: 768px) {
  .menu-lateral {
    display: none;
  }
}
</style>
