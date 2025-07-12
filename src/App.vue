<script setup>
import { computed } from "vue"; // Importa computed para crear propiedades reactivas calculadas
import { useRoute } from "vue-router"; // Importa useRoute para acceder a la ruta actual
import { usuario } from "@/composables/useAuth"; // Importa el estado reactivo del usuario desde un composable

import navegador from "./components/navegador.vue"; // Importa el componente navegador (barra de navegación)
import pieDePagina from "./components/pieDePagina.vue"; // Importa el componente pie de página
import MenuLateral from "./components/MenuLateral.vue";

const route = useRoute(); // Obtiene la ruta actual
// Define las rutas donde NO se debe mostrar el navegador (login y registro)
const rutasSinNavegador = ["/iniciodesesion", "/registrousuario"];

// Computed que determina si se debe mostrar el navegador
const mostrarNavegador = computed(() => {
  // Obtiene el token almacenado (aunque no se usa luego en la lógica)
  const token = localStorage.getItem("token");

  // Devuelve true si hay un usuario logueado y la ruta actual NO está en rutasSinNavegador
  return usuario.value !== null && !rutasSinNavegador.includes(route.path);
});
</script>

<template>
  <div class="app-container">
    <!-- Muestra el navegador sólo si mostrarNavegador es true -->
    <navegador v-if="mostrarNavegador" />

    <!-- Contenedor principal para las vistas del router -->
    <main class="main-content">
      <MenuLateral />
      <router-view />
      <!-- Aquí se renderizan las rutas hijas -->
    </main>

    <!-- Pie de página siempre visible -->
    <pieDePagina />
  </div>
</template>

<style scoped>
.app-container {
  display: flex; /* Usamos flexbox para organizar verticalmente */
  flex-direction: column; /* Columna para que pie quede abajo */
  overflow: visible;
  min-height: 100vh; /* Altura mínima para que ocupe toda la pantalla */
}

.main-content {
  flex: 1 0 auto; /* Crece para ocupar espacio disponible */
  display: flex;
  flex-direction: column; /* Columnas para el contenido principal */
}
</style>
