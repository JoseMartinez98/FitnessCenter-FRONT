<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { usuario } from "@/composables/useAuth.js";

const usuarioActivo = computed(() => usuario.value);
const planFavorito = ref(null); // Aquí guardamos el objeto completo del plan favorito
const favoritos = ref(new Set());
const plan = computed(() => planFavorito.value);
const idUsuario = computed(() => usuario.value?.id);
console.log("usuario activo:", usuario.value);
const toggleFavorito = async (planId) => {
  const request = { idUsuario: idUsuario.value, idPlan: planId };
  try {
    if (favoritos.value.has(planId)) {
      // Quitar favorito
      await axios.delete("http://localhost:8080/api/favoritos/eliminar", {
        data: request,
      });
      favoritos.value.delete(planId);
      planFavorito.value = null;
    } else {
      // Agregar favorito (único)
      await axios.post("http://localhost:8080/api/favoritos/agregar", request);
      favoritos.value = new Set([planId]);

      // Para mostrar datos completos, necesitamos recargar el plan favorito completo
      const response = await axios.get(
        `http://localhost:8080/api/planes/${planId}`
      );
      planFavorito.value = response.data;
    }
  } catch (error) {
    console.error("Error al cambiar favorito:", error);
  }
};

const esFavorito = (planId) => favoritos.value.has(planId);

onMounted(async () => {
  console.log("onMounted ejecutado, idUsuario:", idUsuario.value);
  if (!idUsuario.value) return;

  try {
    // Obtener los favoritos del usuario
    const response = await axios.get(
      `http://localhost:8080/api/favoritos/${idUsuario.value}`
    );
    console.log("Favoritos API response:", response.data);
    if (response.data && Object.keys(response.data).length > 0) {
      planFavorito.value = response.data;
      favoritos.value = new Set([response.data.id]);
    } else {
      planFavorito.value = null;
      favoritos.value = new Set();
    }
  } catch (error) {
    console.error("Error al cargar plan favorito:", error);
  }
});
</script>

<template>
  <div class="paginaInicio"></div>
  <div class="rellenoInicio">
    <div class="contenido">
      <h1 class="titulo">
        Bienvenid@,
        <span class="nombreUsuario">
          {{
            (usuarioActivo?.nombre || usuarioActivo?.email)?.toUpperCase() || ""
          }}
        </span>
      </h1>
      <h2 class="titulo2">Datos personales:</h2>
      <div class="datosPersonales">
      </div>
      <h2 class="titulo2">Tu plan favorito:</h2>
      <div class="contenidoPerfil" v-if="plan">
        <div class="card">
          <h1>{{ (plan.nombre ?? "Sin nombre").toUpperCase() }}</h1>
          <img :src="`http://localhost:8080${plan.imagen}`" alt="Imagen del plan" />

          <h2>
            PRECIO MENSUAL: <span>{{ plan.precioMensual }}€</span>
          </h2>
          <p>
            Descuento del
            <span class="descuento">{{ plan.descuento }}%</span> para
            trabajadores de Cosentino, precio de:
            <span>{{ plan.precioConDescuento }}€</span>
          </p>
          <h2>
            PASE DIARIO: <span>{{ plan.precioDiario }}€</span>
          </h2>
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
  </div>
</template>

<style scoped>
.titulo {
  background-color: green;
  padding: 1rem;
  background-size: auto;
  border-radius: 16px;
  margin: 20px;
}
.datosPersonales {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nombreUsuario {
  color: black;
}
.contenidoPerfil {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.titulo2 {
  background-color: green;
  padding: 1rem;
  background-size: auto;
  border-radius: 16px;
  margin: 20px;
}
h1 {
  color: rgb(255, 255, 255);
}
h2 {
  color: rgb(255, 255, 255);
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

.rellenoInicio {
  position: relative;
  background-image: url(/images/logoFitnessCenterMacael.png);
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

.rellenoInicio .contenido {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding-top: 50px;
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
.card > h1, h2 {
  margin: 0.5rem;
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
  background-color: rgba(255, 255, 255, 0.1);
}

.card,
.contenido,
.favorito-btn {
  box-sizing: border-box;
}
@media screen and (max-width: 768px) {
  .paginaInicio {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contenido {
    max-width: 95%;
    flex-direction: column;
    padding: 0 10px;
    margin: 0 auto;
  }
  .titulo,
  .titulo2 {
    margin-left: auto;
    margin-right: auto;
    padding: 0.8rem;
  }
  .contenidoPerfil {
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 100%;
    margin: 10px auto;
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
