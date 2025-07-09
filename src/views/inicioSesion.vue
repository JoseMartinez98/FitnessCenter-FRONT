<script setup>
// Importamos funciones reactivas y hooks del ciclo de vida de Vue
import { ref, onMounted } from "vue";
// Importamos axios para hacer peticiones HTTP
import axios from "axios";
// Importamos el router para navegación programática
import { useRouter } from "vue-router";
// Importamos funciones y variables relacionadas con la autenticación del usuario
import { usuario, setUsuario, cargarUsuario } from "@/composables/useAuth";

// Creamos una instancia del router para poder redirigir rutas
const router = useRouter();

// Declaramos variables reactivas para email, contraseña, mensaje y estado de error
const email = ref("");
const password = ref("");
const mensaje = ref("");
const error = ref(false);

// Función asincrónica para manejar el inicio de sesión
const inicioSesion = async () => {
  try {
    // Realizamos petición POST al backend para autenticar usuario
    const response = await axios.post(
      "http://localhost:8080/api/usuarios/login",
      {
        email: email.value,
        password: password.value,
      },
    );

    // 🔍 Mostramos en consola la respuesta para depuración
    console.log("Respuesta del backend:", response.data);

    // ✅ Validamos que el token exista antes de guardarlo
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      setUsuario(response.data.usuario);
      router.push("/inicio");
    } else {
      console.error("⚠️ No se recibió token del backend. Revisar respuesta:", response.data);
      mensaje.value = "Error inesperado: el servidor no devolvió un token válido.";
      error.value = true;
    }
  } catch (err) {
    // ❌ Captura y muestra error en la UI
    mensaje.value = err.response?.data || "Error al iniciar sesión";
    error.value = true;
    console.error("Error al iniciar sesión:", err);
  }
};


// Obtenemos el token almacenado en localStorage para validar sesión
const token = localStorage.getItem("token");

// Hacemos una petición GET protegida para verificar que el token es válido
axios.get("http://localhost:8080/api/usuarios/protegido", {
  headers: {
    Authorization: `Bearer ${token}`,  // Enviamos token en encabezado
  },
});

// Al montar el componente verificamos si ya hay un token guardado
onMounted(() => {
  const token = localStorage.getItem("token");
  // Si hay token, redirigimos directamente a la página principal
  if (token) {
    router.push("/inicio");
  }
});
</script>

<template>
  <div class="inicioSesion">
    <div class="social-icons">
      <!-- Icono y enlace a Facebook -->
      <a
        href="https://www.facebook.com/MACAELFITNESSCENTER"
        target="_blank"
        aria-label="Facebook"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0z"
          />
        </svg>
      </a>

      <!-- Icono y enlace a Instagram -->
      <a
        href="https://www.instagram.com/macaelfitnesscenter/"
        target="_blank"
        class="instagram"
        aria-label="Instagram"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.344 3.608 1.319.975.975 1.257 2.242 1.319 3.608.058 1.265.07 1.645.07 4.84s-.012 3.575-.07 4.84c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.257-3.608 1.319-1.265.058-1.645.07-4.84.07s-3.575-.012-4.84-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.257-2.242-1.319-3.608C2.175 15.618 2.163 15.238 2.163 12s.012-3.575.07-4.84c.062-1.366.344-2.633 1.319-3.608C4.527 2.577 5.794 2.295 7.16 2.233 8.425 2.175 8.805 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.633.131 4.273.388 3.14 1.52 2.007 2.653 1.75 4.013 1.689 5.432.631 8.332.631 15.668 1.689 18.568c.061 1.419.318 2.779 1.451 3.912s2.493 1.39 3.912 1.451c1.28.058 1.689.07 4.948.07s3.668-.012 4.948-.07c1.419-.061 2.779-.318 3.912-1.451s1.39-2.493 1.451-3.912c1.058-2.9 1.058-10.236 0-13.136-.061-1.419-.318-2.779-1.451-3.912S19.419.131 18 .07C16.719.012 16.309 0 13.051 0H12z"
          />
          <path
            d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a4.002 4.002 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"
          />
        </svg>
      </a>
    </div>
    
    <!-- Formulario para inicio de sesión -->
    <form
      @submit.prevent="inicioSesion"  
      class="formularioInicioSesion"
      action=""
      method="post"
    >
    <!-- Prevenimos el submit estándar y ejecutamos la función inicioSesion -->
      <h1>INICIAR SESIÓN</h1>
      <!-- Campo para email enlazado a la variable reactiva email -->
      <input v-model="email" type="email" placeholder="Correo" required />
      <!-- Campo para contraseña enlazado a la variable reactiva password -->
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <!-- Botón para enviar formulario -->
      <button type="submit">Entrar</button>
      <!-- Mensaje de error o información, se muestra sólo si mensaje no está vacío -->
      <p v-if="mensaje" :class="{ error: error }">{{ mensaje }}</p>
      <!-- Enlace para ir a la página de registro de usuario -->
      <router-link class="enlace" to="/registrousuario">
        ¿Aún no estás registrado? Haga click aqui para registrase.
      </router-link>
    </form>
  
  </div>
</template>

<style scoped>
/* Estilos generales para el formulario y la página */

/* Título */
h1 {
  font-size: 2rem;
  text-align: center;
}

/* Estilos para los inputs */
input {
  margin: 10px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 16px;
  width: 80%;
  box-sizing: border-box;
}

/* Estilos cuando el input está enfocado */
input:focus {
  outline: none;
  background-color: black;
  border: 2px solid white;
  color: white;
}

/* Botón de enviar */
button {
  font-size: 1rem;
  padding: 10px;
  color: white;
  background-color: black;
  border-radius: 16px;
  transition: all 0.3s ease;
  width: 60%;
  margin-top: 10px;
}

/* Efecto hover para el botón */
button:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Enlace para registro */
.enlace {
  margin: 10px;
  font-size: 14px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  text-align: center;
}

/* Efecto hover para enlace */
.enlace:hover {
  color: blue;
  text-decoration: underline;
}

/* Contenedor principal */
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

/* Formulario */
.formularioInicioSesion {
  width: 40%;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  margin-top: 5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: rgba(67, 199, 52, 0.866);
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.681);
}

/* Estilo para mensajes de error */
.error {
  padding: 5px;
  margin: 5px;
  border-radius: 16px;
  color: rgb(251, 251, 251);
  background-color: red;
}

/* Estilos para los iconos sociales */
.social-icons {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 20px;
}

.social-icons a {
  display: inline-block;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.social-icons a:hover {
  transform: scale(1.2);
}

.social-icons svg {
  width: 100%;
  height: 100%;
  fill: white;
  transition: fill 0.3s ease;
}

.social-icons a:hover svg {
  fill: #1877f2; /* Azul Facebook por defecto */
}

.social-icons a.instagram:hover svg {
  fill: #e1306c; /* Rosa Instagram por defecto */
}

/* Estilos para móviles */
@media screen and (max-width: 480px) {
  .formularioInicioSesion {
    width: 90%;
    padding: 15px;
    margin-top: 10rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  input,
  button {
    font-size: 0.95rem;
  }

  .enlace {
    font-size: 12px;
  }
}
</style>
