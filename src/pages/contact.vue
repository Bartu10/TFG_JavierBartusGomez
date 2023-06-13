<template>
  <!-- Contenedor principal -->
  <div class="base">
    <div class="login-form">
      <!-- Mensaje de ayuda -->
      <span>Estamos aquí para ayudarte en todo lo que necesites. No dudes en contactarnos si tienes alguna duda, comentario o sugerencia.</span>
      
      <!-- Formulario -->
      <form @submit.prevent="enviarCorreo">
        <!-- Grupo de campos -->
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <!-- Campo de entrada para el nombre -->
          <input id="nombre" type="text" name="name" v-model="name">
          
          <label for="email">Correo Electronico:</label>
          <!-- Campo de entrada para el correo electrónico -->
          <input id="email" type="text" v-model="email">
          
          <label for="email">Mensaje:</label>
          <!-- Campo de entrada para el mensaje -->
          <textarea id="email" type="text" v-model="mensaje"></textarea>
        </div>
        
        <!-- Grupo de campos vacío (sin contenido) -->
        <div class="form-group"></div>
        
        <!-- Botón de envío -->
        <button class="btn" type="submit" @click="enviarCorreo">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importar el módulo 'axios' para realizar solicitudes HTTP
import router from '@/router'; // Importar el módulo de enrutamiento de Vue.js

export default {
  data() {
    return {
      name: '', // Variable para almacenar el nombre ingresado por el usuario
      email: '', // Variable para almacenar el correo electrónico ingresado por el usuario
      mensaje: '', // Variable para almacenar el mensaje ingresado por el usuario
    };
  },

  methods: {
    async enviarCorreo() {
      // Método para enviar el formulario por correo electrónico
      await axios.post('https://paypalmailnode.onrender.com/sendMail', {
        name: this.name,
        email: this.email,
        mensaje: this.mensaje,
      })
      .then(router.push('/')); // Redirigir a la página principal después de enviar el formulario
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

/* Estilos para el fondo del cuerpo */
body {
  background-image: $principalGreen;
}

.login-form {
  /* Estilos para el formulario de inicio de sesión */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  span {
    /* Estilos para el mensaje de ayuda */
    font-family: 'WorkSans';
    font-size: 150%;
    padding-bottom: 5%;
  }

  form {
    /* Estilos para el formulario en sí */
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

    .form-group {
      /* Estilos para los grupos de campos */
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        /* Estilos para las etiquetas de los campos */
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      input {
        /* Estilos para los campos de entrada */
        font-size: 1.2rem;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;

        &:focus {
          outline: none;
          border-color: #5b5de5;
        }
      }
    }

    .btn {
      /* Estilos para el botón de envío */
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: $principalGreen;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #4CA686;
        cursor: pointer;
      }
    }
  }
}
</style>