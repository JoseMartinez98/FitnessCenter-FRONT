<script setup>
// Actualmente no se utiliza lógica o estado reactivo en este componente,
// por lo que el bloque <script setup> está vacío.
</script>

<template>
  <h1>Horarios de las clases</h1>
  <!-- Contenedor superior con imagen de fondo fija, representa cabecera visual -->
  <div class="paginaInicio"></div>
  <!-- Contenedor principal con fondo de logo y contenido superpuesto -->
  <div class="rellenoInicio">
    <div class="contenido">
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
  height: 100vh;
  overflow: hidden;
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
  color: black;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
}
</style>
