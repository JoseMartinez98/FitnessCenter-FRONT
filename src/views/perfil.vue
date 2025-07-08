<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";
const usuarioActivo = computed(() => usuario.value);

</script>
<template>
  <div class="paginaInicio"></div>
  <div class="rellenoInicio">
    <div class="contenido">
      <h1 class="titulo">Bienvenid@, {{ usuarioActivo.nombre || usuarioActivo.email }}</h1>
    </div>
  </div>
</template>
 
<style scoped>
.titulo{
    width: fit-content;
    background-color: green;
    padding: 1rem;
    background-size: auto;
    border-radius: 16px;
    margin-left: 2rem;
}
.paginaInicio {
  background-image: url(/images/mancuernas.jpeg);
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position:bottom ;
  height: 20vh;
  width: 100%;
}

.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  height: 100vh;
  overflow: hidden;
}

.rellenoInicio::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.237); 
  z-index: 1;
}

.rellenoInicio .contenido {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding-top: 50px;
}
</style>

