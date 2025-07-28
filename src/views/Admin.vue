<script setup>
import { ref } from "vue";
import axios from "axios";

const titulo = ref("");
const contenido = ref("");
const imagenFile = ref(null);
const imagenUrl = ref("");
const nombre = ref("");
const entrenamiento = ref("");
const pdfFile = ref(null);
const planNombre = ref("");
const precioMensual = ref("");
const precioDiario = ref("");
const descuento = ref("");
const planImagenFile = ref(null);
const horarioImagenFile = ref(null);

const handleFileChange = (event) => {
  imagenFile.value = event.target.files[0];
};

const handleFileChangePdf = (event) => {
  pdfFile.value = event.target.files[0];
};

const handleFileChangePlanImagen = (event) => {
  planImagenFile.value = event.target.files[0];
};

const mostrarFormularios = ref({
  noticia: false,
  rutina: false,
  plan: false,
});

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

const enviarRutina = async () => {
  try {
    let documentoUrl = "";

    if (pdfFile.value) {
      const formData = new FormData();
      formData.append("file", pdfFile.value);

      const resp = await axios.post(
        "http://localhost:8080/api/upload-rutina",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      documentoUrl = resp.data;
    }

    const nueva = {
      nombre: nombre.value,
      entrenamiento: entrenamiento.value,
      documento: documentoUrl,
    };

    await axios.post("http://localhost:8080/api/subirRutina", nueva);
    alert("Rutina creada correctamente");

    nombre.value = "";
    entrenamiento.value = "";
    pdfFile.value = null;
  } catch (error) {
    console.error("Error al crear rutina:", error);
    alert("Error al crear la rutina");
  }
};
const enviarPlan = async () => {
  try {
    let urlImagen = "";

    if (planImagenFile.value) {
      const formData = new FormData();
      formData.append("file", planImagenFile.value);

      const response = await axios.post(
        "http://localhost:8080/api/planes/upload-plan",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      urlImagen = response.data;
    }

    const nuevoPlan = {
      nombre: planNombre.value,
      precioMensual: precioMensual.value,
      precioDiario: precioDiario.value,
      descuento: descuento.value,
      imagen: urlImagen,
    };

    await axios.post("http://localhost:8080/api/planes/subirPlan", nuevoPlan);
    alert("Plan creado correctamente");

    planNombre.value = "";
    precioMensual.value = "";
    precioDiario.value = "";
    descuento.value = "";
    planImagenFile.value = null;
  } catch (error) {
    console.error("Error al crear el plan:", error);
    alert("Error al crear el plan");
  }
};
const handleFileChangeHorarioImagen = (event) => {
  horarioImagenFile.value = event.target.files[0];
};

const enviarHorario = async () => {
  try {
    let urlImagen = "";

    if (horarioImagenFile.value) {
      const formData = new FormData();
      formData.append("file", horarioImagenFile.value);

      const response = await axios.post(
        "http://localhost:8080/api/horario/subir-imagen",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      urlImagen = response.data;
    }

    alert("Imagen del horario subida correctamente");

    horarioImagenFile.value = null;
  } catch (error) {
    console.error("Error al subir la imagen del horario:", error);
    alert("Error al subir la imagen del horario");
  }
};
</script>

<template>
  <div class="paginaInicio"></div>
  <h1>ADMINISTRAR CONTENIDOS</h1>
  <div class="rellenoInicio">
    <div class="contenido">
      <h2
        @click="mostrarFormularios.noticia = !mostrarFormularios.noticia"
        style="cursor: pointer"
      >
        Administrar noticias
        <span>{{ mostrarFormularios.noticia ? "▲" : "▼" }}</span>
      </h2>
      <div v-if="mostrarFormularios.noticia" class="formulario">
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
      <h2
        @click="mostrarFormularios.rutina = !mostrarFormularios.rutina"
        style="cursor: pointer"
      >
        Administrar Rutinas
        <span>{{ mostrarFormularios.rutina ? "▲" : "▼" }}</span>
      </h2>
      <div v-if="mostrarFormularios.rutina" class="formulario">
        <h2>Crear nueva rutina</h2>
        <form @submit.prevent="enviarRutina">
          <label>
            Nombre:
            <input v-model="nombre" required />
          </label>
          <label>
            Entrenamiento:
            <select v-model="entrenamiento" required>
              <option disabled value="">Selecciona una opción</option>
              <option value="piscina">Piscina</option>
              <option value="musculacion">Musculación</option>
              <option value="spinning">Spinning</option>
              <option value="pilates">Pilates</option>
              <option value="natacion">Natación</option>
              <option value="aquagym">Aquagym</option>
            </select>
          </label>
          <label>
            Documento:
            <input
              type="file"
              @change="handleFileChangePdf"
              accept="documento/*"
              required
            />
          </label>
          <button type="submit">Publicar Rutina</button>
        </form>
      </div>
      <h2
        @click="mostrarFormularios.plan = !mostrarFormularios.plan"
        style="cursor: pointer"
      >
        Administrar Planes
        <span>{{ mostrarFormularios.plan ? "▲" : "▼" }}</span>
      </h2>
      <div v-if="mostrarFormularios.plan" class="formulario">
        <h2>Crear nuevo plan</h2>
        <form @submit.prevent="enviarPlan">
          <label>
            Nombre:
            <input v-model="planNombre" required />
          </label>
          <label>
            Precio Mensual:
            <input type="number" v-model="precioMensual" required step="0.01" />
          </label>
          <label>
            Precio Diario:
            <input type="number" v-model="precioDiario" required step="0.01" />
          </label>
          <label>
            Descuento (%):
            <input type="number" v-model="descuento" required step="0.01" />
          </label>
          <label>
            Imagen del Plan:
            <input
              type="file"
              @change="handleFileChangePlanImagen"
              accept="image/*"
              required
            />
          </label>
          <button type="submit">Publicar Plan</button>
        </form>
      </div>
      <h2
        @click="mostrarFormularios.horario = !mostrarFormularios.horario"
        style="cursor: pointer"
      >
        Administrar Horario
        <span>{{ mostrarFormularios.horario ? "▲" : "▼" }}</span>
      </h2>
      <div v-if="mostrarFormularios.horario" class="formulario">
        <h2>Subir imagen del horario</h2>
        <form @submit.prevent="enviarHorario">
          <label>
            Imagen del Horario:
            <input
              type="file"
              @change="handleFileChangeHorarioImagen"
              accept="image/*"
              required
            />
          </label>
          <button type="submit">Subir Imagen</button>
        </form>
      </div>
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
  min-height: 100vh;
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

.formulario > h2 {
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
  background-color: #8f8f8f;
  color: white;
  font-size: 1rem;
}

.formulario textarea {
  resize: vertical;
  min-height: 100px;
}

.formulario input[type="file"] {
  background-color: #8f8f8f;
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
input {
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #8f8f8f;
  color: white;
  font-size: 1rem;
  width: 100%;
}
input:focus {
  outline: none;
  color: black;
  background-color: white;
}
select {
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #8f8f8f;
  color: white;
  font-size: 1rem;
  width: 100%;
}
select:focus {
  outline: none;
  color: black;
  background-color: white;
}
textarea {
  outline: none;
}
textarea:focus {
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
