<script setup>
import { ref, onMounted } from "vue"; // Importa funciones reactivas y ciclo de vida de Vue
import axios from "axios"; // Importa axios para hacer peticiones HTTP

const rutinas = ref([]); // Define un array reactivo para almacenar las rutinas

// Se ejecuta cuando el componente está montado
onMounted(async () => {
  try {
    // Petición GET para obtener las rutinas desde el backend
    const response = await axios.get("http://localhost:8080/api/rutinas");
    rutinas.value = response.data; // Asigna la respuesta al array reactivo
  } catch (error) {
    // Si hay error, se muestra en consola
    console.error("Error al cargar las rutinas:", error);
  }
});

// Función para descargar un documento dado su URL
const descargarDocumento = (ruta) => {
  const enlace = document.createElement("a"); // Crea un elemento <a> temporal
  enlace.href = ruta; // Asigna la ruta del archivo
  enlace.download = ""; // Indica que será una descarga
  enlace.target = "_blank"; // Abre en una pestaña nueva (opcional)
  enlace.click(); // Simula el click para iniciar la descarga
};
</script>

<template>
  <h1> rutinas</h1>
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
            </td>
          </tr>
        </tbody>
      </table>
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
h1{
  color: black;
  background-color: rgb(255, 255, 255);
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
  border: 1px solid green;
  text-align: center;
}

/* Encabezados de la tabla */
.tabla-rutinas th {
  background-color: #222;
  color: green;
}

/* Filas pares con fondo claro */
.tabla-rutinas tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Filas impares con fondo gris y texto blanco */
.tabla-rutinas tr:nth-child(odd) {
  background-color: rgb(190, 190, 190);
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

/* Estilos responsivos para pantallas pequeñas */
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
    border: 2px solid green;
    border-radius: 10px;
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
