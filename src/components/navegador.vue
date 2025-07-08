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

// Función para alternar la visibilidad del menú (mostrar/ocultar)
const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
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

      <!-- Mostrar link al perfil solo si el usuario está logueado -->
      <router-link
        v-if="usuarioActivo"
        to="/perfil"
        class="usuario-logueado"
        style="display: flex; align-items: center; gap: 8px"
      >
        <!-- Icono SVG representando al usuario -->
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
        <!-- Mostrar nombre o email del usuario -->
        {{ usuarioActivo.nombre || usuarioActivo.email }}
      </router-link>

      <!-- Menú de navegación -->
      <ul class="navegadorUl" :class="{ abierta: menuAbierto }">
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
        <li class="navegadorLi">
          <a href="#" @click.prevent="cerrarSesion">Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Estilos para la barra de navegación */

.navegador {
  background-color: black;
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  display: flex;
  width: 100%;
  justify-content: flex-start;
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
  display: flex;
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

/* Color especial para el último elemento (Cerrar sesión) */
.navegadorUl li:last-child a {
  color: red;
}
.navegadorUl li:last-child a:hover {
  color: darkred;
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
  .navegadorUl li:last-child a {
    color: red;
  }
  .navegadorUl li:last-child a:focus {
    color: darkred;
  }
}
</style>
