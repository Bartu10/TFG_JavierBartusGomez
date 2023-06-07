<template>
<div class="base">
  <div class="login-form">
    <span>Estamos aquí para ayudarte en todo lo que necesites. No dudes en contactarnos si tienes alguna duda, comentario o sugerencia.</span>
    <form @submit.prevent="enviarCorreo">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
		<input id="nombre" type="text" name="name" v-model="name">
        <label for="email">Correo Electronico:</label>
        <input id="email" type="text" v-model="email">
        <label for="email">Mensaje:</label>
        <textarea id="email" type="text" v-model="mensaje"></textarea>  
      </div>
      <div class="form-group">
        
      </div>
      <button class="btn" type="submit" @click="enviarCorreo">Enviar</button>
    </form>

				

  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        name : '',
        email: '',
        mensaje: ''
    };
  },

  methods:{
    async enviarCorreo(){
        await axios.post('http://localhost:3000/sendMail', {
            name: this.name,
            email: this.email,
            mensaje: this.mensaje
        })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';


body{
  background-image: $principalGreen;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  span{
    font-family: 'WorkSans';
    font-size: 150%;
    padding-bottom:5% ;
  }

  form {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

    .form-group {
        display: flex;
        flex-direction: column;
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
        cursor: pointer;
      }
    }
  }
}
</style>