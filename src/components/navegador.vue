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
import { useRouter } from "vue-router";
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";

// Instancia del router para navegación programática
const router = useRouter();

// Estado reactivo que controla si el menú móvil está abierto o cerrado
const menuAbierto = ref(false);
const usuarioMenuAbierto = ref(false);

// Función para alternar la visibilidad del menú (mostrar/ocultar)
const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
};
const toggleUsuarioMenu = () => {
  // Solo togglea en móvil (chequea ancho ventana)
  if (window.innerWidth <= 768) {
    usuarioMenuAbierto.value = !usuarioMenuAbierto.value;
  }
};
// Función para cerrar sesión:
// - Elimina el token almacenado en localStorage
// - Resetea el estado del usuario
// - Redirige a la página principal
const cerrarSesion = () => {
  localStorage.removeItem("token");
  setUsuario(null);
  router.push("/");
};

// Computed que devuelve el usuario activo actual (reactivo)
const usuarioActivo = computed(() => usuario.value);

// Watcher que observa cambios en el usuario y loguea en consola (para depuración)
watch(
  usuario,
  (nuevo) => {
    console.log("Cambio en usuario:", nuevo);
  },
  { immediate: true }
);

// Al montar el componente, carga la información del usuario desde almacenamiento o API
onMounted(() => {
  cargarUsuario();
});
</script>

<template>
  <nav class="navegador">
    <div class="nav-container">
      <!-- Botón hamburguesa para menú móvil -->
      <button class="hamburguesa" @click="toggleMenu">☰</button>
      <!-- Menú móvil -->
      <ul :class="['navegadorUl', { abierta: menuAbierto }]">
        <li class="navegadorLi">
          <router-link to="/inicio">Inicio</router-link>
        </li>
        <li class="navegadorLi">
          <router-link to="/rutinas">Rutinas</router-link>
        </li>
        <li class="navegadorLi">
          <router-link to="/precios">Precios</router-link>
        </li>
        <li class="navegadorLi">
          <router-link to="/horarios">Horarios</router-link>
        </li>
      </ul>
      <div class="logomenu">
        <img src="/favicon.ico" />
        <p>Macael Fitness Center</p>
      </div>

      <!-- Icono + nombre del usuario (menú desplegable al hacer click) -->
      <div v-if="usuarioActivo" 
      class="usuario-logueado"
      @click="toggleUsuarioMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          fill="currentColor"
        >
          <path
            d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
          />
        </svg>
        {{ usuarioActivo.nombre || usuarioActivo.email }}

        <!-- Menú desplegable -->
        <div class="usuario-dropdown"
        :class="{ abierto: usuarioMenuAbierto }"
        >
          <router-link to="/perfil">Perfil</router-link>
          <a href="#" @click.prevent="cerrarSesion">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Estilos para la barra de navegación */
.logomenu {
  display: flex;
  gap: 1rem;
  margin: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: 30px;
}
.logomenu > img {
  width: 50px;
  height: 50px;
}
.navegador {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  padding: 8px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid green;
}
.usuario-logueado {
  font-weight: bold;
  padding: 20px;
  margin-left: 2%;
  font-size: 20px;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.usuario-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #222;
  border: 1px solid #444;
  padding: 10px;
  flex-direction: column;
  z-index: 1000;
  border-radius: 6px;
  min-width: 150px;
}
.usuario-logueado:hover .usuario-dropdown {
  display: flex;
}
.usuario-dropdown.abierto {
  display: flex;
  flex-direction: column;
}
.usuario-dropdown a,
.usuario-dropdown router-link {
  color: white;
  text-decoration: none;
  margin: 5px 0;
  transition: color 0.2s;
}

.usuario-dropdown a[href^="/perfil"]:hover,
.usuario-dropdown router-link[to="/perfil"]:hover {
  color: green;
}
.usuario-dropdown a[href="#"]:hover {
  color: red;
}

.nav-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

/* Botón hamburguesa oculto por defecto, visible en móviles */
.hamburguesa {
  font-size: 28px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  width: 100%;
}

/* Estilos para el nombre/email del usuario logueado */
.usuario-logueado {
  font-weight: bold;
  padding: 20px;
  margin-left: 2%;
  font-size: 20px;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}
.usuario-logueado:hover {
  color: green;
  cursor: pointer;
}

/* Lista de navegación */
.navegadorUl {
  width: 100%;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style: none;
}

/* Elementos del menú */
.navegadorLi {
  border-left: 2px solid green;
  margin-left: 3%;
  margin-right: 3%;
}
.navegadorLi:hover {
  cursor: pointer;
}

/* Enlaces del menú */
.navegadorLi a {
  text-decoration: none;
  padding: 10px;
  font-size: 20px;
  color: white;
  transition: color 0.3s;
}
.navegadorLi a:hover {
  color: green;
}

/* Estilos responsivos para pantallas menores a 768px */
@media (max-width: 768px) {
  .hamburguesa {
    display: block;
  }
  .navegadorUl {
    display: none;
    flex-direction: column;
    background-color: #111;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    z-index: 1000;
  }
  .navegadorUl.abierta {
    display: flex;
  }
  .navegadorLi {
    width: 80%;
  }
  .navegadorLi a {
    width: 80%;
    padding: 15px 10px;
    display: block;
    border-bottom: 1px solid #333;
    box-sizing: border-box;
    transition: color 0.2s;
  }
  .navegadorLi a:focus {
    color: green;
  }
  .logomenu {
    font-size: 0px;
  }
  .logomenu > img {
    width: 50px;
    height: 50px;
  }
}
</style>
