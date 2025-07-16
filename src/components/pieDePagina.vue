<script setup>
</script>

<template>
  <div class="footer">
    <div class="social-icons">
      <!-- Facebook -->
      <a
        href="https://www.facebook.com/MACAELFITNESSCENTER"
        target="_blank"
        aria-label="Facebook"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0z"
          />
        </svg>
      </a>

      <!-- Instagram -->
      <a
        href="https://www.instagram.com/macaelfitnesscenter/"
        target="_blank"
        class="instagram"
        aria-label="Instagram"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.344 3.608 1.319.975.975 1.257 2.242 1.319 3.608.058 1.265.07 1.645.07 4.84s-.012 3.575-.07 4.84c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.257-3.608 1.319-1.265.058-1.645.07-4.84.07s-3.575-.012-4.84-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.257-2.242-1.319-3.608C2.175 15.618 2.163 15.238 2.163 12s.012-3.575.07-4.84c.062-1.366.344-2.633 1.319-3.608C4.527 2.577 5.794 2.295 7.16 2.233 8.425 2.175 8.805 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.633.131 4.273.388 3.14 1.52 2.007 2.653 1.75 4.013 1.689 5.432.631 8.332.631 15.668 1.689 18.568c.061 1.419.318 2.779 1.451 3.912s2.493 1.39 3.912 1.451c1.28.058 1.689.07 4.948.07s3.668-.012 4.948-.07c1.419-.061 2.779-.318 3.912-1.451s1.39-2.493 1.451-3.912c1.058-2.9 1.058-10.236 0-13.136-.061-1.419-.318-2.779-1.451-3.912S19.419.131 18 .07C16.719.012 16.309 0 13.051 0H12z"
          />
          <path
            d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a4.002 4.002 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"
          />
        </svg>
      </a>
    </div>

    <!-- Ubicación -->
    <a
      class="location-icon"
      href="https://www.google.com/maps/search/?api=1&query=Gimnasio,+Calle+Cruz+de+Mayo,+0,+04867+Macael,+Almería"
      target="_blank"
      rel="noopener noreferrer"
    >
      /Calle Cruz de Mayo, 0, 04867 Macael, Almería
    </a>

    <!-- Teléfono -->
    <a class="phone-icon" href="tel:950128911">Llámanos para mas información.</a>

    <!-- Derechos Reservados -->
    <div class="copyright" role="contentinfo" aria-label="Derechos Reservados">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M14 8a4 4 0 0 0-4 8" />
      </svg>
      Derechos Reservados Macael Fitness Center
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: 20px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}
.footer a:hover,
.footer a:focus {
  color: green;
  text-decoration: none;
}

.location-icon::before {
  content: "\1F4CD"; /* Emoji pin */
  font-size: 24px;
  color: white;
  margin-right: 8px;
}

.phone-icon::before {
  content: "\260E"; /* Emoji teléfono */
  font-size: 24px;
  color: white;
  margin-right: 8px;
}

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
  fill: #1877f2; /* Azul Facebook */
}

.social-icons a.instagram:hover svg {
  fill: #e1306c; /* Rosa Instagram */
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  color: #ffffff;
}

.copyright svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 15px 10px;
  }

  .footer a {
    font-size: 1rem;
    max-width: 100%;
  }

  .location-icon::before,
  .phone-icon::before {
    font-size: 20px;
    margin-right: 6px;
  }

  .copyright {
    font-size: 1rem;
    gap: 4px;
  }

  .copyright svg {
    width: 20px;
    height: 20px;
  }
}
</style>
