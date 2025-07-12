<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const token = ref("");
const nuevaContrasena = ref("");
const mensaje = ref("");
const exito = ref(false);

token.value = route.query.token;

const restablecer = async () => {
  try {
    await axios.post("http://localhost:8080/api/usuarios/restablecer-contrasena", {
      token: token.value,
      nuevaContrasena: nuevaContrasena.value
    });
    mensaje.value = "✅ Contraseña restablecida correctamente";
    exito.value = true;  // Marca que se cambió con éxito
  } catch (error) {
    mensaje.value = "❌ Error al restablecer contraseña: " + (error.response?.data || "desconocido");
  }
};

const volverInicio = () => {
  router.push({ name: 'Login' });  // Redirige a la ruta login
};
</script>

<template>
  <div class="inicioSesion">
    <div class="formularioInicioSesion">
      <h1>Establecer nueva contraseña</h1>

      <form v-if="!exito" @submit.prevent="restablecer">
        <input v-model="nuevaContrasena" type="password" placeholder="Nueva contraseña" required />
        <button type="submit">Guardar nueva contraseña</button>
      </form>

      <p v-if="mensaje">{{ mensaje }}</p>

      <!-- Mostrar botón solo si cambió la contraseña con éxito -->
      <button v-if="exito" @click="volverInicio">Volver a inicio</button>
    </div>
  </div>
</template>


<style scoped>
.inicioSesion {
  background-image: url(/public/images/inicioSesion.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
.formularioInicioSesion {
  width: 40%;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  margin-top: 10rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: rgba(67, 199, 52, 0.866);
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.681);
}
form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
input {
  font-size: 1rem;
  padding: 10px;
  color: black;
  background-color: white;
  border-radius: 16px;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}
input:focus {
  outline: none;
  background-color: black;
  border: 2px solid white;
  color: white;
}   
button {
  font-size: 1rem;
  padding: 10px;
  color: white;
  background-color: black;
  border-radius: 16px;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

/* Efecto hover para el botón */
button:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}</style>
