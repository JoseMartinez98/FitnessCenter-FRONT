<script setup>
// Actualmente no se utiliza lógica o estado reactivo en este componente,
// por lo que el bloque <script setup> está vacío.
</script>

<template>
  <!-- Contenedor superior con imagen de fondo fija, representa cabecera visual -->
  <div class="paginaInicio"></div>
  <h1>Horarios de las clases</h1>
  <!-- Contenedor principal con fondo de logo y contenido superpuesto -->
  <div class="rellenoInicio">
    <div class="contenido">
      <!-- Título centrado, estilizado con color verde y negrita -->
      <h2>Horario Clases Dirigidas 24-25</h2>

      <!-- Tabla principal con horario semanal de clases dirigidas -->
      <table>
        <thead>
          <tr>
            <!-- Encabezados de columnas para hora y días de la semana -->
            <th>Hora</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Filas que representan franjas horarias con clases programadas -->
          <!-- Uso de colspan para unir celdas cuando una clase ocupa varias columnas -->
          <!-- Clases codificadas con clases CSS para aplicar estilos diferenciados -->
          <tr>
            <td class="time-col">8:15</td>
            <td class="aquasalud" colspan="4">AQUAGYM</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">9:15</td>
            <td class="aquasalud" colspan="4">AQUAGYM</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">10:15</td>
            <td class="aquasalud">AQUAGYM</td>
            <td class="aquasalud">AQUAGYM</td>
            <td class="aquasalud">AQUAGYM</td>
            <td class="pilates">PILATES</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">11:15</td>
            <td class="aquasalud" colspan="4">AQUAGYM</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">14:15</td>
            <td class="ciclo">SPINNING</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="ciclo">SPINNING</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="crosshiit">MUSCULACION</td>
          </tr>
          <tr>
            <td class="time-col">16:00</td>
            <td class="ciclo">SPINNING</td>
            <td class="ciclo nat-infantil">SPINNING<br />NATACIÓN</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="ciclo nat-infantil">SPINNING<br />NATACIÓN</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">17:00</td>
            <td></td>
            <td class="nat-infantil">NATACIÓN</td>
            <td></td>
            <td class="nat-infantil">NATACIÓN</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">18:00</td>
            <td></td>
            <td class="pilates nat-infantil">PILATES<br />NATACIÓN</td>
            <td></td>
            <td class="pilates nat-infantil">PILATES<br />NATACIÓN</td>
            <td></td>
          </tr>
          <tr>
            <td class="time-col">19:00</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="zumba">
              PILATES<br /><span
                class="nat-adultos"
                style="display: block; margin-top: 3px"
                >NATACIÓN</span
              >
            </td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="zumba">
              PILATES<br /><span
                class="nat-adultos"
                style="display: block; margin-top: 3px"
                >NATACIÓN</span
              >
            </td>
            <td class="pilates">PILATES</td>
          </tr>
          <tr>
            <td class="time-col">20:00</td>
            <td class="ciclo pilates">SPINNING<br />PILATES</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td class="ciclo pilates">SPINNING<br />PILATES</td>
            <td class="crosshiit">MUSCULACIÓN</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <!-- Nota informativa resaltada en rojo indicando condición mínima para impartir clases -->
      <p>*Mínimo 5 personas para impartir clase</p>
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
p {
  text-align: center;
  color: rgb(255, 181, 32);
  margin-top: 2%;
  font-weight: bold;
  border-radius: 16px;
  padding: 1rem;
}
/* Estilo para la tabla: ancho máximo, centrado, fondo blanco y sombra sutil */
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Estilos básicos para celdas: bordes, alineación y padding */
th,
td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 8px;
  font-size: 14px;
}

/* Encabezados con fondo negro y texto blanco para contraste */
th {
  background: #000;
  color: white;
}

/* Columna de horario con fondo gris claro y texto negro en negrita */
.time-col {
  background: #ddd;
  font-weight: bold;
  color: black;
}

/* Clases específicas para tipos de actividades, diferenciadas por color y estilos */
.aquasalud {
  background: #c9d9eb;
  font-weight: bold;
  color: black;
}

.ciclo {
  background: #ffeb99;
  font-style: italic;
  font-weight: bold;
  color: black;
}

.crosshiit {
  background: #d1e7c0;
  font-weight: bold;
  color: black;
}

.nat-infantil {
  background: #79a8d1;
  font-style: italic;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.pilates {
  background: #f4a6c1;
  font-weight: bold;
  color: black;
}

.body {
  background: #e86d6d;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.zumba {
  background: #7f4bca;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.nat-adultos {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.gap {
  background: #f6c99b;
  font-weight: bold;
  color: black;
}

/* Adaptación responsiva para dispositivos móviles */
@media (max-width: 768px) {
  .contenido {
    padding: 10px;
  }

  h2 {
    font-size: 1.4rem !important;
  }

  /* La tabla se vuelve scrollable horizontalmente para mejor usabilidad en pantallas pequeñas */
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    max-width: 100%;
    font-size: 12px;
  }

  th,
  td {
    padding: 6px 4px;
    font-size: 12px;
    white-space: nowrap;
  }

  th {
    font-size: 13px;
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

  td {
    line-height: 1.2em;
  }

  /* Ajuste opcional para mejorar contraste en modo móvil */
  .rellenoInicio .contenido {
    color: black;
  }
}
</style>
