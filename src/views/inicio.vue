<script setup>
import { ref, onMounted, computed } from "vue";
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";
import axios from "axios";

const noticias = ref([]);
const currentPage = ref(0);
const totalPages = ref(0);
const pageSize = 5;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const esAdmin = computed(
  () =>
    Array.isArray(usuario.value?.roles) &&
    usuario.value.roles.some((rol) => rol.toLowerCase() === "role_admin")
);

const fetchNoticias = async (page = 0) => {
  try {
    const response = await axios.get("http://localhost:8080/api/noticias", {
      params: {
        page,
        size: pageSize,
      },
    });
    noticias.value = response.data.content;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.number;
  } catch (error) {
    console.error("Error cargando noticias:", error);
  }
};
const eliminarNoticia = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
    try {
      await axios.delete(`http://localhost:8080/api/noticias/${id}`);
      await fetchNoticias(currentPage.value); // recarga la página actual
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      alert("No se pudo eliminar la noticia.");
    }
  }
};

onMounted(() => {
  fetchNoticias();
});
</script>

<template>
  <div class="paginaInicio"></div>
  <h1>Últimas noticias</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <div class="noticia" v-for="noticia in noticias" :key="noticia.id">
        <div class="overlay">
          <h2 class="titulo">{{ noticia.titulo }}</h2>
          <p class="fecha">{{ noticia.contenido }}</p>
        </div>
        <img
          :src="`http://localhost:8080${noticia.imagen}`"
          alt="Noticia"
          class="noticia-imagen"
        />
        <p class="fecha">{{ formatDate(noticia.fechaRegistro) }}</p>
        <button
          v-if="esAdmin"
          class="eliminar"
          @click="eliminarNoticia(noticia.id)"
        >
          Eliminar
        </button>
      </div>
      <div class="paginacion">
        <button :disabled="currentPage === 0" @click="fetchNoticias(0)">
          &lt;&lt;
        </button>
        <button
          :disabled="currentPage === 0"
          @click="fetchNoticias(currentPage - 1)"
        >
          &lt;
        </button>
        <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage + 1 >= totalPages"
          @click="fetchNoticias(currentPage + 1)"
        >
          &gt;
        </button>
        <button
          :disabled="currentPage + 1 >= totalPages"
          @click="fetchNoticias(totalPages - 1)"
        >
          &gt;&gt; 
        </button>
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
  color: white;
  background-color: green;
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
  background-color: rgba(0, 0, 0, 0.836);
  color: green;
  padding: 1rem;
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
  font-weight: bolder;
  margin-top: 0.5rem;
  color: white;
  text-justify: auto;
  margin-left: 1rem;
  margin-right: 1rem;
}
.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.paginacion button {
  all: unset;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: green;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 12px;
  transition: all 0.2s;
}
.paginacion button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.paginacion button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
