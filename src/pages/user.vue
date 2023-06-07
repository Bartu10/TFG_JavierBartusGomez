<template>
  <div class="profile-menu">
    <img :src=this.url alt="Profile Picture" class="profile-picture" @click="securityPhoto()">
    <div class="infoUser">
    <div class="titlePen">
    <span class="title">Tarjeta de Usuario</span>
    <i class="fa-solid fa-pencil" @click=securityCard()></i>
    </div>
    <div class="notEdit" v-if="edit == false">
      <div class="user-info">
  <div class="info-row">
    <span class="label">Nombre:</span>
    <span class="value">{{this.user.name}}</span>
  </div>
  <div class="info-row">
    <span class="label">Email:</span>
    <span class="value">{{this.user.email}}</span>
  </div>
  <div class="info-row">
    <span class="label">Nick:</span>
    <span class="value">{{this.user.username}}</span>
  </div>
  <div class="info-row">
    <span class="label">Password:</span>
    <span class="value">********</span>
  </div>
</div>
    </div>
    <div class="edit" v-if="edit & Security">
    <div class="input-container">
    <span class="label">Nombre:</span>
    <input type="text" class="styled-input" placeholder="Ingresa tu nombre">
    </div>
    <div class="input-container">
      <span class="label">Email:</span>
    <input type="text" class="styled-input" placeholder="Ingresa tu email">
    </div>
    <div class="input-container">
      <span class="label">Nick:</span>
    <input type="text" class="styled-input" placeholder="Ingresa tu nick">
    </div>
    <div class="input-container">
      <span class="label">Password:</span>
    <input type="text" class="styled-input" placeholder="Ingresa tu password">
    </div>
    </div>
    </div>

  </div>
    <input v-if="editPhoto && Security" @change="changeImg" ref="fileInput" id="addImage" type="file" class="styled-input" placeholder="Ingresa tu texto">
  <div class="popup-container" v-if="this.editSecurity">
    <div class="popup">
      <div class="closeSecurity">
      <i class="fa fa-times" @click="this.editSecurity = false"></i>
    </div>
      <p>Editar perfil</p>
      <p>Ingresa la contraseña para continuar</p>
      <input type="password" class="styled-input" placeholder="Ingresa tu contraseña" v-model="password">
      <button class="btn" @click="passwordSecurity()">Enviar</button>
      
    </div>
  </div>


</template>
  
<script>
import axios from "axios";
export default {
  data() {
    return {
      password: '',
      editSecurity: false,
      Security: false,
      user: '',
      edit: false,
      editPhoto: false,
      url: '',
    };
  },


  async created() {
    await this.callUser();
    console.log("user",this.user);
    await this.getImg();
  },


  methods:{


    async getImg(){
      const token = this.$store.state.token;
      console.log("imageid",this.user.imageid)
      const getImage = await axios.get(`http://localhost:8080/images/${this.user.imageid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }, 
      });

      console.log("jhioqhfouiwejhgiowhjgiowrHBGOUERHBGERIOHag",getImage.data)
      this.url = getImage.data;

    }
,


    async changeImg(e) {
  const file = e.target.files[0];
  const token = this.$store.state.token;

  // Create a FormData object to send the image file
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', 'Profile Picture');

  // Make a POST request to the server endpoint
  await axios.post('http://localhost:8080/images/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async response => {
      // Handle the response from the server
      console.log("imageidddddd",response.data);
      const imageid = response.data;
      

      console.log("imageid",imageid)
      // Make the PUT request to update the user's image
      const editUI = await axios.put(`http://localhost:8080/user/image/${this.$store.state.user}/`, { "imageid" : imageid}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("editUI",editUI.data.imageid);
      //todo:aqui cambiar la imagen del usuario
      const getImage = await axios.get(`http://localhost:8080/images/${editUI.data.imageid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }, 
      });

      console.log(getImage.data)
      this.url = getImage.data;


      // You can update the user's image or perform any other necessary actions here
    })
    .catch(error => {
      console.error(error);
      // Handle the error in case it occurs
    });
},
    async passwordSecurity(){
      console.log("Introduced ",this.password)

      const user = {
        email: this.$store.state.user,
        password: this.password,
      };


      console.log(user)
      const token = this.$store.state.token
      console.log("prelogin")
      await fetch("http://localhost:8080/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(user),
})
  .then(data => {
    console.log(data)
    console.log(user)
    if (data.status == 200){
      this.Security = true;
      this.editSecurity = false;
    }
    console.log("data",data)

  })
  .catch(error => {
    console.log(error);
    this.Security = false;
  });
      
    
    },



    securityPhoto(){
      if(this.Security == true){
        this.editPhoto = true
        this.$nextTick(() => {
          this.$refs.fileInput.click(); // Activar clic en el input de archivo
        });
              
      }
      if(this.Security == false){
        this.editSecurity = true
      }
    },

    securityCard(){
      if(this.Security == true){
        this.edit = !this.edit
              
      }
      if(this.Security == false){
        this.editSecurity = true
      }
    },

  

    async callUser(){
      const token = this.$store.state.token
      console.log("preGetUser")
      const response = await fetch(`http://localhost:8080/users/mail/${this.$store.state.user}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .catch(error => {
        console.error(error); 
      });
      this.user = response
      console.log("userFunctions",this.user) 
    },

  }

};
</script>
<style lang="scss" scoped>
@import '../scss/global.scss';


#addImage{
display: none;
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
.closeSecurity{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;

  i{
    font-size: 150%;
    cursor: pointer;
  }
}


.label{
  font-weight: bold;
  margin-right: 100px;
  font-size: 135%;
}

.notEdit{
  margin-bottom: 165px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p, span, input{
  font-family: "WorkSans";
}


  .fa-solid{
    font-size: 200%;
  }
  .fa-solid:hover{
    color: $principalGreen;
    cursor: pointer;
  }

span{

  font-size: 120%;
  padding-top: 11%;
}

.title{
  font-size: 200%;
  padding: 0%;
  margin-right: auto;
}

.titlePen{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.infoUser{
  width: 100%;
  margin-left: 60px;
  height: 400px;
  display: grid;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-menu {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.profile-picture {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  margin-bottom: 10px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

.profile-picture:hover {
  animation: pulse 1s infinite;
  cursor: pointer;
  filter: brightness(50%);

}

h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.menu-list {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.menu-list li {
  margin-bottom: 10px;
}

.menu-list li a {
  color: #007bff;
  text-decoration: none;
}

.menu-list li a:hover {
  text-decoration: underline;
  cursor: pointer;
}


.input-container {
  position: relative;
  margin: 20px;
}

// Estilos para el input
.styled-input {
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #999;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: $principalGreen; // Cambiar color al enfocar el input
  }
  
  &::placeholder {
    color: #999; // Color del texto de placeholder
    opacity: 0.7; // Opacidad del texto de placeholder
  }
}

.user-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .info-row {
    padding: 30px;
    display: flex;
    margin-bottom: 10px;
  }

  .label {
    width: 100px;
    font-weight: bold;
  }

  .value {
    flex-grow: 1;
  }
}




.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

button {
  margin-top: 10px;
}




@media (max-width: 700px) {
  .profile-menu {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-picture{
    width: 100%;
    height: auto;
  }
  .infoUser{
width: 90%;
  margin-left: 0px;
}

  .profile-menu{
    background-color: white;
  }

}


</style>