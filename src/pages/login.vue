<template>
  <!-- Formulario de inicio de sesión -->
  <p class="titleR">¡Inicia Sesion Aqui!</p>

  <div class="base">
      <div class="login-form">
          <form @submit.prevent="login">
              <!-- Campo de entrada para el correo electrónico -->
              <div class="form-group">
                  <label for="email">Email:</label>
                  <br>
                  <input id="email" type="text" v-model="email">
              </div>
              <!-- Campo de entrada para la contraseña -->
              <div class="form-group">
                  <label for="password"> Contraseña:</label>
                  <br>
                  <input id="password" type="password" v-model="password">
              </div>
              <!-- Botón para iniciar sesión -->
              <button class="btn" type="submit">Iniciar sesión</button>
              <!-- Enlace para registrarse -->
              <a @click="this.$router.push('/register')">Registrate aquí</a>
          </form>
      </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            // Objeto con los datos del usuario para iniciar sesión
            const user = {
                email: this.email,
                password: this.password,
            };
            // Realizar solicitud para obtener el token de autenticación
            await fetch("https://proyectspring-production.up.railway.app/token", {
                method: "POST",
                headers: {
                    "Authorization": 'Basic ' + window.btoa(this.email + ':' + this.password),
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.text())
            .then(token => {
                console.log(token);
                // Realizar solicitud para iniciar sesión con el token y los datos del usuario
                fetch("https://proyectspring-production.up.railway.app/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(user),
                })
                .then(data => {
                    console.log(data.status);
                    if(data.status == 200){
                        // Establecer el estado de inicio de sesión en el almacenamiento
                        this.$store.dispatch('updateLoggedState', true);
                        this.$store.dispatch('updateUserState', user.email);
                        this.$store.dispatch('updateTokenState', token);
                    }
                });
            });
        },

        async closeSesion(){
            // Cerrar sesión y restablecer el estado de inicio de sesión en el almacenamiento
            this.$store.commit('setLogged', false);
            this.$store.commit('setUser', '');
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

body{
    background-color: $principalGreen; // Establece el color de fondo del cuerpo
}

*{
    font-family: 'WorkSans'; // Establece la fuente para todos los elementos del documento
}

.titleR{
    font-size: 3rem; // Tamaño de fuente del título
    text-align: center; // Alineación centrada del título
    margin-top: 5rem; // Margen superior del título
}

.login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; // Altura del formulario de inicio de sesión

    form {
        width: 25%; // Ancho del formulario
        border: 1px solid black; // Borde del formulario
        display: flex;
        flex-direction: column;
        background-color: #fff; // Color de fondo del formulario
        padding: 2rem; // Espacio interno del formulario
        border-radius: 8px; // Borde redondeado del formulario
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); // Sombra del formulario

        a{
            margin-top: 1rem; // Margen superior para el enlace de registro
            text-align: center; // Alineación centrada para el enlace de registro
            color: $principalGreen; // Color del texto del enlace
            cursor: pointer;
            &:hover {
                color: $secondaryGreen; // Color del texto del enlace al pasar el cursor
            }
        }
        .form-group {
            margin-bottom: 1rem; // Margen inferior para el grupo de elementos del formulario
            label {
                font-size: 1.2rem; // Tamaño de fuente para las etiquetas del formulario
                margin-bottom: 0.5rem; // Margen inferior para las etiquetas del formulario
            }
            input {
                width: 96%; // Ancho del campo de entrada del formulario
                font-size: 1.2rem; // Tamaño de fuente para el campo de entrada
                padding: 0.5rem; // Espacio interno para el campo de entrada
                border-radius: 4px; // Borde redondeado para el campo de entrada
                border: 1px solid #ccc; // Borde del campo de entrada
                &:focus {
                    outline: none; // Elimina el contorno al enfocar el campo de entrada
                    border-color: #5b5de5; // Color del borde al enfocar el campo de entrada
                }
            }
        }

        .btn {
            font-size: 1.2rem; // Tamaño de fuente para el botón de inicio de sesión
            padding: 0.5rem 1rem; // Espacio interno del botón de inicio de sesión
            background-color: $principalGreen; // Color de fondo del botón de inicio de sesión
            color: #fff; // Color del texto del botón de inicio de sesión
            border: none; // Sin borde para el botón de inicio de sesión
            border-radius: 4px; // Borde redondeado para el botón de inicio de sesión
            cursor: pointer;
            &:hover {
                background-color: #4CA686; // Color de fondo al pasar el cursor sobre el botón de inicio de sesión
                cursor: pointer;
            }
        }
    }
}
</style>