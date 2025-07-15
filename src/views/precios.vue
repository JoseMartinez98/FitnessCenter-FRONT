<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { usuario } from "@/composables/useAuth.js";

const planes = ref([]);
const planFavorito = ref(null);
const idUsuario = computed(() => usuario.value?.id);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/planes");
    planes.value = response.data;

    if (idUsuario.value) {
      const favResponse = await axios.get(`http://localhost:8080/api/favoritos/${idUsuario.value}`);
      if (favResponse.data && favResponse.data.id) {
        planFavorito.value = favResponse.data.id;
      } else {
        planFavorito.value = null;
      }
    }
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
});

const toggleFavorito = async (planId) => {
  if (!idUsuario.value || planFavorito.value === planId) return;

  const request = { idUsuario: idUsuario.value, idPlan: planId };

  try {
    await axios.post("http://localhost:8080/api/favoritos/agregar", request);
    planFavorito.value = planId;
  } catch (error) {
    console.error("Error al agregar favorito:", error);
  }
};

const esFavorito = (planId) => planFavorito.value === planId;
</script>


<template>
  <h1>Cuotas planes de entrenamiento</h1>
  <div class="paginaInicio"></div>
  <h1>Cuotas planes de entrenamiento</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <div class="card" v-for="plan in planes" :key="plan.id">
        <h1>{{ plan.nombre?.toUpperCase() || "Sin nombre" }}</h1>
        <img :src="plan.imagen" alt="Imagen del plan" />
        <h2>PRECIO MENSUAL: <span>{{ plan.precioMensual }}€</span></h2>
        <p>
          Descuento del
          <span class="descuento">{{ plan.descuento }}%</span> para trabajadores
          de Cosentino, precio de: <span>{{ plan.precioConDescuento }}€</span>
        </p>
        <h2>PASE DIARIO: <span>{{ plan.precioDiario }}€</span></h2>

        <!-- Botón de favorito -->
        <button
          @click="toggleFavorito(plan.id)"
          :class="['favorito-btn', esFavorito(plan.id) ? 'favorito-activo' : '']"
          :disabled="esFavorito(plan.id)"
        >
          {{ esFavorito(plan.id) ? '💚 Favorito' : '💚 Añadir a favoritos' }}
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Estilos para los títulos y párrafos, con texto blanco */
h1 {
  color: black;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
}
h2 {
  color: rgb(255, 255, 255);
  margin: 10px;
}
p {
  color: rgb(255, 255, 255);
  margin: 10px;
}

/* Color verde para spans por defecto */
span {
  color: green;
}

/* Color amarillo para el porcentaje de descuento */
.descuento {
  color: yellow;
}

/* Estilos para la sección superior con imagen de mancuernas */
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

/* Contenedor principal con imagen de fondo (logo) */
.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  overflow: hidden;
}

/* Overlay oscuro semi-transparente para oscurecer fondo */
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

/* Contenido encima del overlay */
.rellenoInicio .contenido {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding-top: 50px;
}

/* Contenedor flex para las tarjetas */
.contenido {
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
}

/* Estilos para las tarjetas de los planes */
.card {
  width: 40%;
  background-color: rgb(0, 0, 0);
  border: 2px solid green;
  border-radius: 16px;
  text-align: left;
  margin: 2%;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Imagen dentro de la tarjeta ocupa todo ancho y 50% altura */
.card img {
  width: 100%;
  height: 50%;
}
.favorito-btn {
  display: block;
  width: calc(100% - 40px); /* Asegura que el botón no sobresalga por los márgenes */
  margin: 20px auto; 
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  color: green;
  border: 2px solid green;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  box-sizing: border-box;
}
.favorito-btn {
  display: block;
  width: calc(100% - 40px);
  margin: 20px auto;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  color: green;
  border: 2px solid green;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  box-sizing: border-box;
}

.favorito-btn:hover:not(:disabled) {
  background-color: rgba(170, 180, 170, 0.33);
}

.favorito-btn.favorito-activo {
  background-color: rgb(30, 127, 30);
  color: white;
  border-color: green;
  cursor: default;
}

.card,
.contenido,
.favorito-btn {
  box-sizing: border-box;
}
/* Estilos responsivos para pantallas menores a 768px */
@media screen and (max-width: 768px) {
  .contenido {
    max-width: 95%;
    flex-direction: column;
    padding: 0 10px;
  }
  .card {
    width: 100%;
    margin: 10px 0;
  }
  .card img {
    height: auto;
  }
   .favorito-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    padding: 10px;
    width: 80%; 
    box-sizing: border-box;
  }
}
</style>
