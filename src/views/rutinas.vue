<script setup>
import { ref, onMounted, computed } from "vue";
import { usuario } from "@/composables/useAuth";
import axios from "axios";

const rutinas = ref([]);
const currentPage = ref(0);
const totalPages = ref(0);
const pageSize = 5;

const esAdmin = computed(
  () =>
    Array.isArray(usuario.value?.roles) &&
    usuario.value.roles.some((rol) => rol.toLowerCase() === "role_admin")
);

const fetchRutinas = async (page = 0) => {
  try {
    const response = await axios.get("http://localhost:8080/api/rutinas", {
      params: {
        page,
        size: pageSize,
      },
    });
    rutinas.value = response.data.content;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.number;
  } catch (error) {
    console.error("Error al cargar las rutinas:", error);
  }
};

const eliminarRutina = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
    try {
      await axios.delete(`http://localhost:8080/api/rutinas/${id}`);
      await fetchRutinas(currentPage.value); // recarga la página actual
    } catch (error) {
      console.error("Error al eliminar la rutina:", error);
      alert("No se pudo eliminar la rutina.");
    }
  }
};

const descargarDocumento = (ruta) => {
  const enlace = document.createElement("a");
  enlace.href = ruta;
  enlace.download = "";
  enlace.target = "_blank";
  enlace.click();
};

onMounted(() => {
  fetchRutinas();
});
</script>

<template>
  <div class="paginaInicio"></div>
  <!-- Fondo con imagen de mancuernas -->
  <h1>RUTINAS DE ENTRENAMIENTO</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <table class="tabla-rutinas">
        <thead>
          <tr>
            <th>Nombre</th>
            <!-- Encabezado columna nombre rutina -->
            <th>Entrenamiento</th>
            <!-- Encabezado columna tipo entrenamiento -->
            <th>Documento</th>
            <!-- Encabezado columna para descargar documento -->
          </tr>
        </thead>
        <tbody>
          <!-- Itera sobre cada rutina y la muestra en la tabla -->
          <tr v-for="rutina in rutinas" :key="rutina.id">
            <td data-label="Nombre">{{ rutina.nombre }}</td>
            <!-- Nombre rutina -->
            <td data-label="Entrenamiento">{{ rutina.entrenamiento }}</td>
            <!-- Tipo entrenamiento -->
            <td data-label="Documento">
              <!-- Botón para descargar el documento asociado -->
              <button @click="descargarDocumento(rutina.documento)">
                📄 Descargar
              </button>
              <button
                v-if="esAdmin"
                class="eliminar"
                @click="eliminarRutina(rutina.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paginacion">
        <button :disabled="currentPage === 0" @click="fetchRutinas(0)">
          &lt;&lt;
        </button>
        <button
          :disabled="currentPage === 0"
          @click="fetchRutinas(currentPage - 1)"
        >
          &lt;
        </button>
        <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage + 1 >= totalPages"
          @click="fetchRutinas(currentPage + 1)"
        >
          &gt;
        </button>
        <button
          :disabled="currentPage + 1 >= totalPages"
          @click="fetchRutinas(totalPages - 1)"
        >
          &gt;&gt; 
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para la sección con la imagen de mancuernas */
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

/* Fondo con logo y efecto oscuro */
.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  padding-bottom: 1rem;
}

/* Capa oscura para mejorar legibilidad */
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

/* Contenido por encima de la capa oscura */
.rellenoInicio .contenido {
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

/* Estilos para la tabla de rutinas */
.tabla-rutinas {
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
  color: black;
  z-index: 2;
  position: relative;
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
  background-color: green;
  width: 80%;
  margin: 20px auto;
  padding: 1rem;
  border-radius: 16px;
}

/* Celdas de la tabla */
.tabla-rutinas th,
.tabla-rutinas td {
  padding: 2rem;
  text-align: center;
  font-weight: bold;
}

/* Encabezados de la tabla */
.tabla-rutinas th {
  background-color: #000000;
  color: green;
}

/* Filas pares con fondo claro */
.tabla-rutinas tr:nth-child(even) {
  background-color: #f2f2f2d8;
}

/* Filas impares con fondo gris y texto blanco */
.tabla-rutinas tr:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.775);
  color: white;
}

/* Estilo botón descargar */
.tabla-rutinas button {
  background-color: #4caf50;
  color: white;
  padding: 12px 12px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.tabla-rutinas button:hover {
  background-color: #45a049;
}
.tabla-rutinas .eliminar {
  color: white;
  background-color: red;
  border: none;
  padding: 12px 12px;
  border-radius: 16px;
  font-size: 16px;
  margin: 1rem;
}
.tabla-rutinas .eliminar:hover {
  background-color: rgb(184, 2, 2);
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

@media (max-width: 768px) {
  .tabla-rutinas {
    width: 95%;
    border: 0;
  }

  /* Oculta encabezados en móvil */
  .tabla-rutinas thead {
    display: none;
  }

  /* Convierte filas en bloques */
  .tabla-rutinas tr {
    display: block;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: white;
  }

  /* Celdas en formato flex para mostrar etiqueta y contenido */
  .tabla-rutinas td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid #ddd;
    position: relative;
    text-align: center;
  }

  /* Etiquetas antes del contenido en móvil */
  .tabla-rutinas td::before {
    content: attr(data-label);
    font-weight: bold;
    color: green;
    flex-basis: 40%;
  }

  /* Última celda sin borde inferior */
  .tabla-rutinas td:last-child {
    border-bottom: none;
  }
}
</style>
