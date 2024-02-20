<template>
  <ul>
    <li>
      <a @click="checkRegistration"><i class="fas fa-user"></i></a>
    </li>
    <li>
      <a @click="$router.push('/products')"><i class="fa-solid fa-shirt"></i></a>
    </li>
    <li>
      <a @click="checkCart"><i class="fa-solid fa-cart-shopping">{{ this.cartLength }}</i></a>
    </li>
    <li>
      <a @click="$router.push('/')"><i class="fa fa-home" aria-hidden="true"></i></a>
    </li>
    <li class="icon">
      <img src="../img/icon.png">
      <span>Timeless 11</span>
    </li>
  </ul>

  
    <div
      class="menu"
      v-show="isMenuOpen"
      @clickaway="isMenuOpen = false"
    >
    <div>
        <i class="fa fa-times" aria-hidden="true" @click="toggleMenu"></i>
      <div class="latbar">
        <span @click="this.$router.push('/user')"><i class="fa-solid fa-user-gear"></i>Mis Datos</span>
        <span @click="this.$router.push('/orders')"><i class="fa-solid fa-box"></i>Pedidos</span>
        <span @click="this.$router.push('/contact')"><i class="fa-solid fa-circle-question"></i>Contacto</span>
        <span @click="closeSession"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</span>
      </div>
      </div>
    </div>
  
  
</template>

<script>
export default {
  data() {
    return {
      cartLength : 0,
      isMenuOpen: false,
      isRegistred: false,
    };
  },

  methods: {


    checkCart(){
      console.log(this.$store.state.user)
      if (this.$store.state.user != "notLogged") {
      this.$router.push('/cart');
      }
      else{
        this.$router.push('/login');
      }

      },


    checkRegistration() {
      console.log(this.$store.state.user)
      if (this.$store.state.user == "notLogged") {
        this.$router.push('/login');
      }
      else{
        this.toggleMenu()
      }
    },

    closeSession(){
        this.toggleMenu()
        this.$store.commit('setLogged', true)
        this.$store.commit('setUser', 'notLogged')
        localStorage.removeItem("cart"); // Limpiar el carrito eliminando el elemento "cart" del almacenamiento local
        location.reload(); // Recargar la página para reflejar los cambios
        this.$router.push('/login')
    },


    calLength(){
      let total = 0
      let calLength = JSON.parse(localStorage.getItem('cart'))
      for(let y in calLength){
        total = total + calLength[y].quantity
        calLength
      }
      this.cartLength = total
    },

    toggleMenu() {
      if(this.$store.state.logged == true){
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.classList.add('page--disabled');
      } else {
        document.body.classList.remove('page--disabled');
      }
    }
    else{
      this.$router.push('/login')
    }
    }
  },

  mounted(){
    this.calLength()
    console.log(this.cartLength)
  }
};
</script>

<style lang="scss" scoped>

.latbar{
  user-select: none;
  cursor: pointer;
  span:hover{
    animation: cambio-color 2s infinite;
    cursor: pointer;
  }
}

@import '../scss/global.scss';


.icon{
  display: flex;
  float: left;
  height: 40px;

  span{
    font-size: 130% ;
    font-family: 'WorkSans' ;
    color: white;
    padding-top: 13px;
    align-self: center;
    padding-left: 10px;
    
  }
  
  img{
    height: 140%;
    
  }
}


.fa-times{
color: white;
font-size: 150%;
padding-right: 9px;
padding-top: 5px;
}

.fa-times:hover{
  color: red;
  cursor: pointer;
}
.user-button {
  z-index: 12;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.user-button i {
  height: 20px;
  padding-top:15px;
  padding-right: 8px;
  color: white;
  
}

.user-button:hover i {
  color: greenyellow;
  cursor: pointer;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: $principalGreen;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 20px 18px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 0;
  right: 16rem;
  width: 200px;
  height: 200px;
  background-color: white;
  z-index: 9999;
  filter: none;
  pointer-events: all;
  user-select: all;
  opacity: 1;
    transition: all 0.3s ease-in-out;
  div{
    
    text-align: right;
    display: flex;
    flex-direction: column;
    background-color: $principalGreen;
    width: 28.5rem;
    height: 50rem;
    opacity: 1;
    border-bottom-left-radius: 20px;
    
  .fa-solid{
    padding-right: 10px;
  }
    div{
      padding-top: 40px ;
      text-align: right;
      span{
        font-size: 160%;
        color: white;
        padding-top:40px;
        padding-left: 20px;
        display: flex;
        img{
          color: white;
          height: 30px;
          padding-right:6px ;
        }
      }
    }
  }
}




</style>

<style lang="scss">
.page--disabled {
  pointer-events: none;
  user-select: none;
}
@keyframes cambio-color {
  0% { color: black; }
  50% { color: white; }
  100% { color: black; }
}

.menu{
  font-family: 'WorkSans';
}

@media (max-width: 500px) {
.icon {
  height: 20px;
  span{
    display: none;
  }
}
}


@media(max-width: 450px){
  .menu div div{
  padding-left:85px ;
}
}

@media(max-width: 375px){
  .menu div div{
  padding-left:100px ;
}
}


</style>