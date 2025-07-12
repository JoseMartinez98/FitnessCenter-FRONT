import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/inicioSesion.vue'),
    meta: { title: 'Macael Fitness Center | Inicio Seseión' }
  },
  {
    path: '/registroUsuario',
    name: 'Registro',
    component: () => import('../views/registroUsuario.vue'),
    meta: { title: 'Macael Fitness Center | Registro' }
  },
    {
    path: "/cambiar-contrasena",
    name: "CambiarContrasena",
    component: () => import('../views/CambiarContrasena.vue'),
    meta: { title: 'Macael Fitness Center | Recuperar contraseña' }
  },
  {
  path: "/restablecer-contrasena",
  name: "RestablecerContrasena",
  component: () => import("../views/RestablecerContrasena.vue"),
  meta: { title: 'Macael Fitness Center | Recuperar contraseña' }
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('../views/inicio.vue'),
    meta: { title: 'Macael Fitness Center | Inicio' }
  },
  {
    path: '/rutinas',
    name: 'rutinas',
    component: () => import('../views/rutinas.vue'),
    meta: { title: 'Macael Fitness Center | Rutinas' }
  },
  {
    path: '/precios',
    name: 'precios',
    component: () => import('../views/precios.vue'),
    meta: { title: 'Macael Fitness Center | Precios' }
  },
  {
    path: '/horarios',
    name: 'horarios',
    component: () => import('../views/horarios.vue'),
    meta: { title: 'Macael Fitness Center | Horarios' }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/perfil.vue'),
    meta: { title: 'Macael Fitness Center | Perfil' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Cambia el título del documento en cada navegación
router.beforeEach((to, from, next) => {
  const defaultTitle = 'Macael Fitness Center'
  document.title = to.meta.title || defaultTitle
  next()
})

export default router
