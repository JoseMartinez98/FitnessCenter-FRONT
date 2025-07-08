<script setup>
import { ref, onMounted } from "vue"; // Importa funciones reactivas y ciclo de vida de Vue
import axios from "axios"; // Importa axios para hacer peticiones HTTP

const planes = ref([]); // Variable reactiva para almacenar la lista de planes

// Al montar el componente, cargar los datos desde la API
onMounted(async () => {
  try {
    // Petición GET a la API para obtener los planes
    const response = await axios.get("http://localhost:8080/api/planes");
    console.log("Respuesta de API:", response.data);

    // Guardar la respuesta en la variable reactiva
    planes.value = response.data;
  } catch (error) {
    // En caso de error, mostrar en consola
    console.error("Error cargando planes:", error);
  }
});
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
}

/* Imagen dentro de la tarjeta ocupa todo ancho y 50% altura */
.card img {
  width: 100%;
  height: 50%;
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
}
</style>
