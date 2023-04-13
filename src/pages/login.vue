<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input id="username" type="text" v-model="username">
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" type="password" v-model="password">
      </div>
      <button class="btn" type="submit">Iniciar sesión</button>
    </form>

    <button class="btn" @click="closeSesion">Cerrar Sesion</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
       //TODO Comprobar en la BD
        this.$store.commit('setLogged', true)
        this.$store.commit('setUser', this.username)
        console.log(this.$store.state);
    },


    async closeSesion(){
        this.$store.commit('setLogged', false)
        this.$store.commit('setUser', '')
        console.log(this.$store.state);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

body{
  background-color: $principalGreen;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

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
        &:focus {
          outline: none;
          border-color: #5b5de5;
        }
      }
    }

    .btn {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: $principalGreen;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: #4CA686;
      }
    }
  }
}
</style>