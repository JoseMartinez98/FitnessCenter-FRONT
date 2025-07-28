<script setup>
import { ref, onMounted, computed } from "vue";
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";
import axios from "axios";
const Horario = ref([]);
const esAdmin = computed(
  () =>
    Array.isArray(usuario.value?.roles) &&
    usuario.value.roles.some((rol) => rol.toLowerCase() === "role_admin")
);
const eliminarImagen = async (imagenCompleta, id) => {
  try {
    await axios.delete(`http://localhost:8080/api/horario/${id}`);
    Horario.value = Horario.value.filter((h) => h.id !== id);
    alert("Imagen eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    alert("Hubo un error al eliminar la imagen");
  }
};

const cargarHorario = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/horario/imagen"
    );
    Horario.value = response.data;
    console.log(Horario.value);
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
};
onMounted(() => {
  cargarHorario();
});
</script>
<template>
  <div class="paginaInicio"></div>
  <h1>Horario Gimnasio</h1>
  <div class="rellenoInicio">
    <div class="contenido"></div>
    <div class="card" v-for="foto in Horario" :key="foto.id">
      <button
        v-if="esAdmin"
        class="eliminar"
        @click="eliminarImagen(foto.imagen, foto.id)"
      >
        Eliminar
      </button>
      <img
        :src="`http://localhost:8080${foto.imagen}`"
        alt="Imagen del horario"
      />
    </div>
  </div>
</template>
<style scoped>
/* Estilos para la sección de encabezado con imagen de fondo fija */
.paginaInicio {
  background-image: url(/images/mancuernas.jpeg);
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  height: 20vh;
  width: 100%;
}

/* Contenedor principal con fondo de logo, posición relativa para superposición */
.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  min-height: 100vh;
}

/* Overlay semitransparente para oscurecer el fondo y mejorar legibilidad */
.rellenoInicio::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.573);
  z-index: 1;
}

/* Contenedor interno con contenido, elevado en z-index para estar sobre overlay */
.rellenoInicio .contenido {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding-top: 50px;
}

/* Fondo claro y padding para la tabla y contenido principal */
.contenido {
  padding: 20px;
}
h1 {
  color: white;
  background-color: green;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
}
h2 {
  text-align: center;
  margin-bottom: 2%;
  color: rgb(4, 255, 4);
  border-radius: 16px;
  padding: 1rem;
  font-weight: bold;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}

.card img {
  margin-top: 0;
  width: 100%;
  height: 80%;
}
.eliminar {
  color: white;
  background-color: red;
  border: none;
  padding: 12px 12px;
  border-radius: 16px;
  font-size: 16px;
  margin: 1rem;
}
.eliminar:hover {
  cursor: pointer;
  scale: 1;
  background-color: rgb(184, 2, 2);
}

@media (max-width: 768px) {
  .contenido {
    padding: 10px;
  }

  h2 {
    font-size: 1.4rem !important;
  }

  .paginaInicio {
    height: 15vh;
    background-attachment: scroll;
  }

  .rellenoInicio {
    height: auto;
    padding-bottom: 30px;
    background-attachment: scroll;
  }

  .rellenoInicio .contenido {
    padding-top: 20px;
  }

  /* Ajuste opcional para mejorar contraste en modo móvil */
  .rellenoInicio .contenido {
    color: black;
  }
}
</style>
