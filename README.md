# 🤸 FitnessCenter-FRONT

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF.svg)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Desplegado en Vercel](https://img.shields.io/badge/Despliegue-Vercel-000000.svg)](https://vercel.com/)

El frontend de **FitnessCenter** es una Interfaz de Usuario (UI) dinámica y reactiva desarrollada con **Vue 3** y **Vite**, diseñada para interactuar con la API RESTful del backend. Permite a los usuarios (miembros y personal administrativo) gestionar rutinas, ver horarios de clases y administrar sus perfiles.

## 🔗 Demo en Vivo

Puedes acceder a una versión beta desplegada y en funcionamiento del proyecto aquí a través de la demo:

👉 **[https://macaelfitnesscenter.vercel.app]** 👈

## 💻 Tecnologías y Herramientas

Este proyecto utiliza un stack moderno para asegurar rendimiento y escalabilidad:

| Componente | Tecnología | Propósito Principal |
| :--- | :--- | :--- |
| **Framework** | **Vue 3 (Composition API)** | Construcción de componentes de la UI. |
| **Build Tool** | **Vite** | Empaquetado rápido de módulos y entorno de desarrollo. |
| **Routing** | **Vue Router** | Navegación entre las diferentes vistas de la aplicación. |
| **State Management** | **[Pinia / Vuex]** | Gestión centralizada del estado de la aplicación (e.g., sesión de usuario, datos de clases).  |
| **HTTP Client** | **Axios / Fetch API** | Comunicación con el backend (API RESTful). |

## 📐 Estructura del Código

La estructura sigue las convenciones recomendadas de Vue/Vite:

src/  
├── assets/             # Archivos estáticos (imágenes, fuentes, SCSS global)  
├── components/         # Componentes reutilizables de UI (Botones, Tarjetas, Menús)  
├── views/              # Componentes de nivel superior que representan las páginas (Rutas)  
├── router/             # Configuración y definición de rutas (index.js)  
├── stores/             # Módulos de gestión de estado con Pinia/Vuex  
├── services/           # Lógica para interactuar con el backend (Axios/API calls)(No reflejado en la raiz, actualmente en desarollo)  
├── App.vue             # Componente raíz de la aplicación  
└── main.js             # Inicialización de la aplicación (montaje, router, store)  


## ✨ Características y Vistas Principales

El frontend cubre la funcionalidad completa del Centro de Fitness, ofreciendo las siguientes vistas:

* **Autenticación :** Formulario para iniciar sesión y registrar nuevos miembros.
* **Inicio :** Vista inicial para el miembro con noticias.
* **Horario de Clases :** Vista interactiva para consultar de las clases por día y hora.
* **Planes :** Interfaz para añadir un plan a favoritos.
* **Rutinas :** Interfaz para descargar rutinas de diferentes tipos.  
* **Perfil de Usuario:** Edición de datos personales y visualización del historial de membresía.
* **[Área Administrativa ]:** Vistas protegidas para la gestión de rutinas, planes y horarios. 

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para levantar el proyecto en tu entorno de desarrollo.

### 1. Requisitos

Asegúrate de tener instalado **Node.js** (se recomienda la versión LTS) y **npm** o **yarn**.

### 2. Clonar el Repositorio

git clone [https://github.com/JoseMartinez98/FitnessCenter-FRONT.git](https://github.com/JoseMartinez98/FitnessCenter-FRONT.git)
cd FitnessCenter-FRONT
### 3. Instalar Dependencias
Bash

npm install
# O si usas yarn
# yarn install
4. Configuración del Entorno (Variables)
Crea un archivo llamado .env en la raíz del proyecto para definir la URL del backend (API REST):

# .env
VITE_API_BASE_URL=http://localhost:8080/api/v1  

### 5. Compilar y Ejecutar en Desarrollo
Bash

npm run dev
La aplicación estará disponible en tu navegador en la URL indicada por Vite (generalmente http://localhost:5173/). Incluye Hot-Module Reloading (HMR) para desarrollo rápido.

### 6. Compilar para Producción
Para generar una versión optimizada y minificada para el despliegue:

Bash

npm run build
Los archivos estáticos listos para ser servidos se generarán en el directorio /dist.
