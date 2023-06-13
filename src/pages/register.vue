<template>
  <p class="titleR">¡Crea tu cuenta!</p>

  <div class="base">
    <div class="login-form">
      <form @submit.prevent="register">
        <!-- Campo de entrada para el nombre -->
        <div class="form-group">
          <label for="name">Nombre:</label>
          <br>
          <input id="name" type="text" v-model="name">
        </div>
        <!-- Campo de entrada para el nombre de usuario -->
        <div class="form-group">
          <label for="username">Nick:</label>
          <br>
          <input id="username" type="text" v-model="username">
        </div>
        <!-- Campo de entrada para el correo electrónico -->
        <div class="form-group">
          <label for="email">Email:</label>
          <br>
          <input id="email" type="text" v-model="email">
        </div>
        <!-- Campo de entrada para la contraseña -->
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <br>
          <input id="password" type="password" v-model="password">
        </div>
        <!-- Campo de entrada para repetir la contraseña -->
        <div class="form-group">
          <label for="password2">Repite tu contraseña:</label>
          <br>
          <input id="password2" type="password" v-model="password2">
        </div>
        <!-- Botón para registrar -->
        <button class="btn" type="submit">Registrate</button>
        <!-- Enlace para iniciar sesión -->
        <a @click="this.$router.push('/login')">Inicia sesion aquí</a>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: '',               // Variable para almacenar el nombre del usuario
      username: '',           // Variable para almacenar el nombre de usuario
      email: '',              // Variable para almacenar el correo electrónico del usuario
      password: '',           // Variable para almacenar la contraseña del usuario
      password2: '',          // Variable para almacenar la confirmación de contraseña del usuario
    }
  },

  methods: {
    async register() {
      if (this.password != this.password2) {
        console.log("Las contraseñas no coinciden");    // Mensaje de consola si las contraseñas no coinciden
        return;
      }
      const user = {
        name: this.name,                // Asigna el valor del nombre a la propiedad 'name' del objeto 'user'
        username: this.username,        // Asigna el valor del nombre de usuario a la propiedad 'username' del objeto 'user'
        email: this.email,              // Asigna el valor del correo electrónico a la propiedad 'email' del objeto 'user'
        password: this.password,        // Asigna el valor de la contraseña a la propiedad 'password' del objeto 'user'
      };

      const token = this.$store.state.token;    // Obtiene el token de autenticación del estado de la aplicación
      const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,     // Agrega el token de autenticación en el encabezado de la solicitud
        },
        body: JSON.stringify(user),     // Convierte el objeto 'user' a una cadena JSON y lo asigna al cuerpo de la solicitud
      });

      console.log(response);     // Muestra la respuesta en la consola
      if (response.status == 200) {
        this.$router.push('/login');     // Redirecciona al usuario a la página de inicio de sesión si el registro fue exitoso
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../scss/global.scss';     // Importa el archivo de estilos global

*{
  font-family: 'WorkSans';     // Aplica la fuente 'WorkSans' a todos los elementos
}

body{
  background-color: $principalGreen;     // Establece el color de fondo del cuerpo del documento
}

.titleR{
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;

  form {
    width: 35%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

    a {
      margin-top: 1rem;
      text-align: center;
      color: $principalGreen;     // Establece el color de enlace principal
      cursor: pointer;
      &:hover {
        color: $secondaryGreen;     // Establece el color de enlace secundario al pasar el cursor sobre él
      }
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      input {
        font-size: 1.2rem;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 95%;

        &:focus {
          outline: none;
          border-color: #5b5de5;     // Establece el color del borde al enfocar el campo de entrada
        }
      }
    }

    .btn {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: $principalGreen;     // Establece el color de fondo del botón
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #4CA686;     // Establece el color de fondo del botón al pasar el cursor sobre él
        cursor: pointer;
      }
    }
  }
}
</style>
