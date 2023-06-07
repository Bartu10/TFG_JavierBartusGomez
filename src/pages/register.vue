<template>

    <p class="titleR">¡Crea tu cuenta!</p>

    <div class="base">
      <div class="login-form">
        <form @submit.prevent="register">
            <div class="form-group">
            <label for="name">Name:</label>
            <br>
            <input id="name" type="text" v-model="name">
          </div>
          <div class="form-group">
            <label for="username">Username:</label>
            <br>
            <input id="username" type="text" v-model="username">
          </div>
            <div class="form-group">
            <label for="email">Email:</label>
            <br>
            <input id="email" type="text" v-model="email">
          </div>
          <div class="form-group">
            <label for="password"> Password:</label>
            <br>
            <input id="password" type="password" v-model="password">
          </div>
          <div class="form-group">
            <label for="password2"> Password:</label>
            <br>
            <input id="password2" type="password" v-model="password2">
          </div>
          <button class="btn" type="submit">Iniciar sesión</button>
          <a @click="this.$router.push('/login')">Inicia sesion aquí</a>
        </form>
      </div>
      </div>
    </template>

<script>
export default {
data() {
    return {
    name: '',
    username:'',
    email: '',
    password: '',
    password2: '',
    }
},

methods: {
    async register() {
    
        if(this.password != this.password2){
            console.log("Las contraseñas no coinciden")
            return
        }
        const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
    };

    
    const token = this.$store.state.token
    const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });

    console.log(response)
    if (response.status == 200){
        this.$router.push('/login')
    }

    },
}
}
</script>

<style lang="scss" scoped>

@import '../scss/global.scss';


*{
  font-family: 'WorkSans';
}

body{
  background-color: $principalGreen;
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
