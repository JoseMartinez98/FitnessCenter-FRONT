<script setup>
// Importamos las funciones reactivas y hooks del ciclo de vida de Vue
import { ref, onMounted, onBeforeUnmount } from "vue";
// Importamos axios para realizar peticiones HTTP
import axios from "axios";

// Declaramos una referencia reactiva para almacenar las noticias obtenidas
const noticias = ref([]);
// Referencia reactiva para controlar el índice actual del slider
const currentIndex = ref(0);
// Variable para almacenar el intervalo (no usada en el código actual pero preparada para auto-slide)
let interval = null;

/**
 * Función para avanzar al siguiente slide.
 * Se asegura de que el índice no sobrepase la longitud del array,
 * utilizando el operador módulo para ciclo infinito.
 */
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % noticias.value.length;
};

/**
 * Función para retroceder al slide anterior.
 * También usa módulo para que el índice regrese al final si está en el primero.
 */
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + noticias.value.length) % noticias.value.length;
};

/**
 * Formatea una fecha dada en formato ISO a un formato legible en español.
 * @param {string} dateString - Fecha en formato ISO.
 * @returns {string} Fecha formateada en formato día-mes-año.
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Hook que se ejecuta al montar el componente
onMounted(async () => {
  try {
    // Petición HTTP para obtener las noticias desde una API local
    const response = await axios.get("http://localhost:8080/api/noticias");
    // Asignamos los datos recibidos a la referencia reactiva
    noticias.value = response.data;
  } catch (error) {
    // En caso de error, se muestra en consola
    console.error("Error cargando noticias:", error);
  }
});

// Hook que se ejecuta justo antes de desmontar el componente
onBeforeUnmount(() => {
  // Limpiamos el intervalo para evitar memory leaks (si se usara)
  clearInterval(interval);
});
</script>

<template>
  <div class="rellenoInicio">
    <div class="contenido">
      <!-- Contenedor del slider, se muestra solo si hay noticias cargadas -->
      <div class="slider-container" v-if="noticias.length">
        <!-- Capa de información con título y fecha -->
        <div class="overlay">
          <h2 class="titulo">{{ noticias[currentIndex].titulo }}</h2>
          <p class="fecha">
            {{ formatDate(noticias[currentIndex].fechaRegistro) }}
          </p>
        </div>

        <!-- Cada noticia se representa como un slide con imagen -->
        <div
          class="slide"
          v-for="(noticia, index) in noticias"
          :key="noticia.id"
          :class="{ active: index === currentIndex }"
        >
          <img :src="noticia.imagen" alt="Noticia" class="slide-image" />
        </div>

        <!-- Botones para navegar entre slides -->
        <button class="arrow left" @click="prevSlide">&#10094;</button>
        <button class="arrow right" @click="nextSlide">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales para el fondo y contenedor principal */
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

/* Capa semitransparente sobre el fondo para mejor legibilidad */
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

/* Contenido centrado y con mayor índice de z para estar por encima del overlay */
.rellenoInicio .contenido {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

/* Contenedor del slider ocupando toda la altura disponible */
.slider-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* Estilos para los slides (ocultos por defecto) */
.slide {
  display: none;
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 0;
}

/* Slide activo visible con transición de opacidad */
.slide.active {
  opacity: 1;
  z-index: 1;
  display: block;
}

/* Imagen del slide adaptada para contenerse sin distorsión */
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: transparent;
}

/* Capa de texto superpuesta con fondo verde y padding */
.overlay {
  position: static;
  width: 100%;
  color: white;
  background-color: green;
  padding: 1rem 2rem;
  text-align: center;
  z-index: 2;
}

/* Estilos para el título y fecha dentro del overlay */
.titulo {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
}

.fecha {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

/* Botones flechas para navegación del slider */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  padding: 0 15px;
  cursor: pointer;
  z-index: 3;
  transition: background 0.3s;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}

/* Posición específica para flechas izquierda y derecha */
.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

/* Estilos responsivos para pantallas pequeñas */
@media (max-width: 768px) {
  .rellenoInicio {
    height: auto;
    background-attachment: scroll;
    background-position: center;
    padding-bottom: 2rem;
  }

  .contenido {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .slider-container {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .overlay {
    position: relative;
    padding: 1rem;
    background-color: green;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }

  .titulo {
    font-size: 1.5rem;
  }

  .fecha {
    font-size: 1rem;
  }

  .slide {
    position: relative;
    opacity: 1;
    height: auto;
  }

  .slide-image {
    width: 100%;
    max-height: 60vh;
    object-fit: contain;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.4);
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    z-index: 5;
  }

  .arrow.left {
    left: 10px;
  }

  .arrow.right {
    right: 10px;
  }
}
</style>
