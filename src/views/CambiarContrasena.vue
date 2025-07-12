<!-- src/views/CambiarContrasena.vue -->
<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const mensaje = ref("");

const enviarSolicitud = async () => {
  try {
    await axios.post(
      "http://localhost:8080/api/usuarios/solicitar-restablecimiento",
      {
        email: email.value,
      }
    );
    mensaje.value =
      "📧 Se ha enviado un correo para restablecer tu contraseña.";
  } catch (error) {
    mensaje.value =
      "❌ Error al enviar el correo. Verifica el email ingresado.";
  }
};
</script>

<template>
  <div class="inicioSesion">
    <div class="formularioInicioSesion">
        <h1>Restablecer Contraseña</h1>
        <form @submit.prevent="enviarSolicitud">
          <input
            v-model="email"
            type="email"
            placeholder="Ingresa tu correo"
            required
          />
          <button type="submit">Enviar enlace de recuperación</button>
          <p v-if="mensaje">{{ mensaje }}</p>
        </form>
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
}
</style>
