<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { usuario } from "@/composables/useAuth.js";

const planes = ref([]);
const planFavorito = ref(null);  // id del plan favorito actual
const idUsuario = computed(() => usuario.value?.id);

onMounted(async () => {
  try {
    // Cargar todos los planes
    const response = await axios.get("http://localhost:8080/api/planes");
    planes.value = response.data;

    // Cargar plan favorito único del usuario
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
  if (!idUsuario.value) return;

  const request = { idUsuario: idUsuario.value, idPlan: planId };

  try {
    if (planFavorito.value === planId) {
      // Si el plan ya es favorito, lo quitamos
      await axios.delete("http://localhost:8080/api/favoritos/eliminar", {
        data: request,
      });
      planFavorito.value = null;
    } else {
      // Si no es favorito, lo ponemos como favorito
      await axios.post("http://localhost:8080/api/favoritos/agregar", request);
      planFavorito.value = planId;
    }
  } catch (error) {
    console.error("Error al cambiar favorito:", error);
  }
};

const esFavorito = (planId) => planFavorito.value === planId;
</script>


<template>
  <!-- Parte superior con imagen de fondo -->
  <div class="paginaInicio"></div>

  <!-- Contenedor principal con imagen de fondo y contenido -->
  <div class="rellenoInicio">
    <div class="contenido">
      <!-- Recorre la lista de planes y crea una tarjeta por cada uno -->
      <div class="card" v-for="plan in planes" :key="plan.id">
        <!-- Nombre del plan en mayúsculas -->
        <h1>{{ plan.nombre?.toUpperCase() || "Sin nombre" }}</h1>

        <!-- Imagen del plan -->
        <img :src="plan.imagen" alt="Imagen del plan" />

        <!-- Precio mensual -->
        <h2>
          PRECIO MENSUAL: <span>{{ plan.precioMensual }}€</span>
        </h2>

        <!-- Descuento para trabajadores de Cosentino y precio con descuento -->
        <p>
          Descuento del
          <span class="descuento">{{ plan.descuento }}%</span> para trabajadores
          de Cosentino, precio de: <span>{{ plan.precioConDescuento }}€</span>
        </p>

        <!-- Precio de pase diario -->
        <h2>
          PASE DIARIO: <span>{{ plan.precioDiario }}€</span>
        </h2>
        <!-- Botón de Favorito -->
        <button
          @click="toggleFavorito(plan.id)"
          :class="['favorito-btn', esFavorito(plan.id) ? 'activo' : '']"
        >
          {{
            esFavorito(plan.id)
              ? "💔 Quitar de favoritos"
              : "💚 Añadir a favoritos"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para los títulos y párrafos, con texto blanco */
h1 {
  color: rgb(255, 255, 255);
  margin: 10px;
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
  background-color: rgba(0, 0, 0, 0.237);
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
.favorito-btn.activo {
  border-color: red;
  color: red;
}
.favorito-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.favorito-btn.activo {
  border-color: red;
  color: red;
}
.favorito-btn:hover {
  background-color: rgba(255, 255, 255, 0.18);
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
