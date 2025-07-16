<script setup>
import { ref } from "vue";
import axios from "axios";

const titulo = ref("");
const contenido = ref("");
const imagenFile = ref(null);
const imagenUrl = ref("");

const handleFileChange = (event) => {
  imagenFile.value = event.target.files[0];
};

const enviarNoticia = async () => {
  try {
    let urlImagen = "";

    if (imagenFile.value) {
      const formData = new FormData();
      formData.append("file", imagenFile.value);

      const response = await axios.post(
        "http://localhost:8080/api/upload-imagen",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      urlImagen = response.data; 
    }
    const nuevaNoticia = {
      titulo: titulo.value,
      contenido: contenido.value,
      imagen: urlImagen,
    };

    await axios.post("http://localhost:8080/api/subirNoticias", nuevaNoticia);
    alert("Noticia creada correctamente");

    titulo.value = "";
    contenido.value = "";
    imagenFile.value = null;
    imagenUrl.value = "";
  } catch (error) {
    console.error("Error al crear la noticia:", error);
    alert("Error al crear la noticia");
  }
};
</script>

<template>
  <div class="paginaInicio"></div>
  <h1>ADMINISTRAR CONTENIDOS</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <h2>Administrar noticias</h2>
      <div class="formulario">
        <h2>Crear nueva noticia</h2>
        <form @submit.prevent="enviarNoticia">
          <label>
            Título:
            <input v-model="titulo" required />
          </label>
          <label>
            Contenido:
            <textarea v-model="contenido" required />
          </label>
          <label>
            Imagen:
            <input
              type="file"
              @change="handleFileChange"
              accept="image/*"
              required
            />
          </label>
          <button type="submit">Publicar Noticia</button>
        </form>
      </div>
      <h2>Administrar Rutinas</h2>
      <h2>Administrar Planes</h2>
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
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.contenido {
  padding: 20px;
}
h1 {
  color: black;
  background-color: green;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
}
h2 {
  color: black;
  background-color: white;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}
.formulario {
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  width: 80%;
  color: white;
  margin-bottom: 1rem;
}

.formulario > h2{
    color: black;
  background-color: green;
}

.formulario label {
  display: block;
  margin-bottom: 1.5rem;
  text-align: left;
  font-weight: bold;
}

.formulario input[type="text"],
.formulario textarea,
.formulario input[type="file"] {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: white;
  font-size: 1rem;
}

.formulario textarea {
  resize: vertical;
  min-height: 100px;
}

.formulario input[type="file"] {
  background-color: #2e2e2e;
  color: lightgreen;
}

.formulario button {
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.formulario button:hover {
  background-color: #45a049;
}
input{
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: white;
  font-size: 1rem;
}
input:focus{
outline: none;
color: black;
background-color: white;
}
textarea{
  outline: none;
}
textarea:focus{
  outline: none;
  color: black;
  background-color: white;
}
@media (max-width: 768px) {
  .formulario {
    width: 100%;
  }
}
</style>
