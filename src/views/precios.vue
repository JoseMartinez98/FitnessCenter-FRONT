<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { usuario } from "@/composables/useAuth.js";

const planes = ref([]);
const planFavorito = ref(null);
const idUsuario = computed(() => usuario.value?.id);
const planEditando = ref(null);
const mostrarFormulario = ref(false);
const esAdmin = computed(
  () =>
    Array.isArray(usuario.value?.roles) &&
    usuario.value.roles.some((rol) => rol.toLowerCase() === "role_admin")
);
const cargarPlanes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/planes");
    planes.value = response.data;
    console.log(planes.value)

    if (idUsuario.value) {
      const favResponse = await axios.get(
        `http://localhost:8080/api/favoritos/${idUsuario.value}`
      );
      if (favResponse.data && favResponse.data.id) {
        planFavorito.value = favResponse.data.id;
      } else {
        planFavorito.value = null;
      }
    }
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
};
onMounted(async () => {
  await cargarPlanes();
});

const eliminarPlan = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este plan?")) {
    try {
      await axios.delete(`http://localhost:8080/api/planes/${id}`);
      await cargarPlanes();
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
      alert("No se pudo eliminar el plan.");
    }
  }
};
const editarPlan = (id) => {
  const plan = planes.value.find((p) => p.id === id);
  planEditando.value = { ...plan };
  mostrarFormulario.value = true;
};

const guardarCambios = async () => {
  try {
    await axios.put(
      `http://localhost:8080/api/planes/editarPlan/${planEditando.value.id}`,
      planEditando.value
    );
    await cargarPlanes(); 
    planEditando.value = null;
    mostrarFormulario.value = false;
  } catch (error) {
    alert("Error al guardar los cambios");
    console.error(error);
  }
};


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
  <div class="paginaInicio"></div>
  <h1>Cuotas planes de entrenamiento</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <div class="card" v-for="plan in planes" :key="plan.id">
        <h1>{{ plan.nombre?.toUpperCase() || "Sin nombre" }}</h1>
        <img :src="`http://localhost:8080${plan.imagen}`" alt="Imagen del plan" />
        <h2>
          PRECIO MENSUAL: <span>{{ plan.precioMensual }}€</span>
        </h2>
        <p>
          Descuento del
          <span class="descuento">{{ plan.descuento }}%</span> para trabajadores
          de Cosentino, precio de: <span>{{ plan.precioConDescuento }}€</span>
        </p>
        <h2>
          PASE DIARIO: <span>{{ plan.precioDiario }}€</span>
        </h2>

        <!-- Botón de favorito -->
        <button
          v-if="!esAdmin"
          @click="toggleFavorito(plan.id)"
          :class="[
            'favorito-btn',
            esFavorito(plan.id) ? 'favorito-activo' : '',
          ]"
          :disabled="esFavorito(plan.id)"
        >
          {{ esFavorito(plan.id) ? "💚 Favorito" : "💚 Añadir a favoritos" }}
        </button>
        <button v-if="esAdmin" class="eliminar" @click="eliminarPlan(plan.id)">
          Eliminar
        </button>
        <button v-if="esAdmin" class="editar" @click="editarPlan(plan.id)">
          Editar
        </button>
        <transition name="fade-slide">
          <div
            v-if="planEditando && planEditando.id === plan.id"
            class="formulario-editar"
          >
            <h2>Editar Plan</h2>
            <label>Nombre:</label>
            <input v-model="planEditando.nombre" />

            <label>Precio Mensual (€):</label>
            <input type="number" v-model="planEditando.precioMensual" />

            <label>Precio Diario (€):</label>
            <input type="number" v-model="planEditando.precioDiario" />

            <label>Descuento (%):</label>
            <input type="number" step="0.01" v-model="planEditando.descuento" />

            <div class="formulario-botones">
              <button class="btn-guardar" @click="guardarCambios">
                Guardar
              </button>
              <button class="btn-cancelar" @click="planEditando = null">
                Cancelar
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para los títulos y párrafos, con texto blanco */
h1 {
  color: white;
  background-color: green;
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
  color: rgba(255, 255, 255, 0.89);
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
  background-color: rgba(0, 0, 0, 0.822);
  text-align: left;
  font-weight: bolder !important;
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
  width: calc(
    100% - 40px
  ); /* Asegura que el botón no sobresalga por los márgenes */
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
.editar {
  color: white;
  background-color: rgb(234, 177, 71);
  border: none;
  padding: 12px 12px;
  border-radius: 16px;
  font-size: 16px;
  margin: 1rem;
}
.editar:hover {
  cursor: pointer;
  scale: 1;
  background-color: rgb(173, 130, 52);
}
.formulario-editar {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid green;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
}

.formulario-editar label {
  margin-top: 0.5rem;
  font-weight: bold;
  color: lightgreen;
}

.formulario-editar input {
  margin: 0.3rem 0 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
}

.formulario-botones {
  display: flex;
  justify-content: space-between;
}

.btn-guardar,
.btn-cancelar {
  flex: 1;
  margin: 0.5rem 0.25rem;
  padding: 0.6rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-guardar {
  background-color: green;
  color: white;
}

.btn-guardar:hover {
  background-color: darkgreen;
}

.btn-cancelar {
  background-color: gray;
  color: white;
}

.btn-cancelar:hover {
  background-color: #444;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

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
