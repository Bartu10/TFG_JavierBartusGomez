<template>

<p class="titleR">¡Inicia Sesion Aqui!</p>

<div class="base">
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <br>
        <input id="email" type="text" v-model="email">
      </div>
      <div class="form-group">
        <label for="password"> Contraseña:</label>
        <br>
        <input id="password" type="password" v-model="password">
      </div>
      <button class="btn" type="submit">Iniciar sesión</button>
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

      const user = {
        email: this.email,
        password: this.password,
      };
      await fetch("http://localhost:8080/token", {
        method: "POST",
        headers: {
          "Authorization": 'Basic ' + window.btoa("javi@gmail.com" + ':' + "123"),
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.text())
      .then(token => {
        console.log(token)
        fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        })
        .then(data => {
          console.log(data.status)
          if(data.status == 200){
          this.$store.commit('setLogged', true)
          this.$store.commit('setUser', user.email)
          this.$store.commit('setToken', token)
          this.$router.push('/')
          
      }})
        
          
          
      })
      
    },


    /*async getUser(){
      const response = await fetch(`http://localhost:8080/users/${this.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();
      this.$store.commit('setUser', data)
    }


    Made it in Springboot
    */

    async closeSesion(){
        this.$store.commit('setLogged', false)
        this.$store.commit('setUser', '')
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

body{
  background-color: $principalGreen;
}

*{
  font-family: 'WorkSans';
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
    width: 25%;
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
        width: 96%;
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
        cursor: pointer;
      }
    }
  }
}
</style>