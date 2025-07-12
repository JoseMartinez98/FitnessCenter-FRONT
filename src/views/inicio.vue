<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const noticias = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/noticias");
    noticias.value = response.data;
  } catch (error) {
    console.error("Error cargando noticias:", error);
  }
});
</script>

<template>
  <h1>Últimas noticias</h1>
  <div class="paginaInicio"></div>
  <div class="rellenoInicio">
    <div class="contenido">
      <div class="noticia" v-for="noticia in noticias" :key="noticia.id">
        <div class="overlay">
          <h2 class="titulo">{{ noticia.titulo }}</h2>
          <p class="fecha">{{ noticia.contenido }}</p>
        </div>
        <img :src="noticia.imagen" alt="Noticia" class="noticia-imagen" />
        <p class="fecha">{{ formatDate(noticia.fechaRegistro) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
h1 {
  color: black;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
}
.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  min-height: 100vh;
  overflow: hidden;
  padding: 2rem 0;
}

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

.contenido {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}

.noticia {
  background-color: rgba(0, 0, 0, 0.89);
  color: green;
  border: 2px solid white;
  padding: 1rem;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  text-align: center;
}

.noticia-imagen {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin-top: 1rem;
  border-radius: 16px;
}

.titulo {
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  border-bottom: 2px solid green;
}

.fecha {
  font-size: 1rem;
  margin-top: 0.5rem;
  color: white;
  text-justify: auto;
  margin-left:1rem;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .titulo {
    font-size: 1.5rem;
  }

  .fecha {
    font-size: 0.9rem;
  }

  .noticia-imagen {
    max-height: 300px;
  }
}
</style>
