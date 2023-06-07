<template>
    <div class="grid">
    <div v-for="(fav,index) in favs" :key="fav.nombre" class="cell">
      <img :src=fav.img class="icon">
      <div>
      <p class="p-name">{{ fav.name }}</p>
      <p class="p-talla">{{ fav.talla }}</p>
      <p class="p-price">{{ fav.price }}€</p>
      <div class="quantity">
      <p class="p-quantity"><button @click="this.Decrease(index,1)" class="btn">-</button>{{fav.quantity}}<button @click="this.Increase(index, 1)" class="btn">+</button></p>
      </div>
      <p class="p-price">{{ fav.price * fav.quantity }}€</p>
      <a @click="deleteProductCart(index)"><i class="fa-solid fa-xmark"></i></a>
      </div>
    </div>
    <div class="payment">
    <h2 v-if="!this.total == 0">Precio Total: {{' ' + this.total}}€</h2>
    <button v-if="!this.total == 0" @click="callOrder" class="btn">Comprar</button>
    <button v-if="!this.total == 0" @click="clearCart" class="btn">Limpiar Carrito</button>
    </div>
  </div>
  <div class="emptyCart" v-if="this.total == 0">
  <img class="imgCart" src="../img/carro-vacio.png">
  <span>No hay productos en el carrito.</span>
  </div>
  
  
  </template>
  <script>
  export default {
      data() {
          return {
              description:'',
              quantity:'',
              image: '',
              favs: '',
              total: 0
          }
      },
      methods: {
        async callOrder() {
          try {
            let dato = {
              value: this.total,
              description: this.description,
              objects: this.favs,
            };
            const response = await fetch("http://localhost:3000/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                
              },
              body: JSON.stringify(dato),
            });
    
            const data = await response.json();
            window.location.href = data.links[1].href;
          } catch (error) {
            console.error(error);
          }
        },
  
          clearCart() {
            localStorage.removeItem("cart");
            location.reload()
          },
  
          deleteProductCart(index){
              this.favs.splice(index,1)
              localStorage.setItem('cart', JSON.stringify(this.favs))
              location.reload()
              
          },
  
  
        Decrease(index, number){
          this.favs[index].quantity -= number
          this.calcTotal()
          if(this.favs[index].quantity == 0){
            this.deleteProductCart(index)
          }
        },
  
        Increase(index, number){
          console.log(this.favs[index])
            this.favs[index].quantity += number    
            this.calcTotal() 
        },
  
  
          calcTotal() {
              let tota = 0;
              for (let x in this.favs) {
                  tota = tota + this.favs[x].price * this.favs[x].quantity
              }
              console.log("tota",tota)
              this.total = tota
          }
      },
      created() {
          this.favs = JSON.parse(localStorage.getItem('cart'))
          this.calcTotal()
      },
  
      updated() {
          
      let listaNombres = this.favs.map(p => p.name);
      let names = listaNombres.join(', ');
          this.description = `La compra es de ${names}`
      }
  
  }
  </script>
  
  <style lang="scss" scoped>
  @import "../scss/global.scss";



  .fa-solid{
    cursor: pointer;
  }

  .payment{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 5%;
    margin-bottom: 4rem;
  }

  .btn {
      font-size: 1.2rem;
      margin: 2px;
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
  .quantity{
    flex: none;
  }


  p{
      margin-right: 13vw;
  }

  .p-titles{
    display: flex;
    margin-bottom: 2%;
  }

  @keyframes pulse{
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .emptyCart{
    animation: pulse 4s infinite;
    margin-top: 15%;
    display: flex;
    flex-direction:column ;
    span{
      text-align: center;
      margin-left: 47px;
    }
  }

  .imgCart{
    padding-bottom: 20px;
    width: 200px;
    align-self: center;
    padding-top: 20px;
  }


  *:not(.fa-solid){
      font-family: 'WorkSans'
  }
  
  
  img{
      height: 200px;
  }
  
  .grid{
      padding-left: 5%;
      .cell{
          width: 85%;
          display: flex;
          margin-top: 1%;
          border-bottom: 1px solid lightgrey;
          div{
              display: flex;
              margin-left: 2%;
              align-items: center;
          }
      }
  }
  </style>
  