<template>
    <div class="grid">
    <div v-for="(fav,index) in favs" :key="fav.nombre" class="cell">
      <img :src=fav.img class="icon">
      <div>
      <h3>{{ fav.name }}</h3>
      <p>Precio: {{ fav.price }}</p>
      <p>Cantidad : <button @click="this.Decrease(index,1)">-</button>{{fav.quantity}}<button @click="this.Increase(index, 1)">+</button></p>
      <p>Talla : {{fav.talla}}</p>
      <a @click="deleteProductCart(index)"><i class="fa-solid fa-xmark"></i></a>
      </div>
    </div>
    <h2 v-if="!this.total == 0">Precio Total: {{' ' + this.total}}€</h2>
    <button v-if="!this.total == 0" @click="callOrder">Comprar</button>
    <button v-if="!this.total == 0" @click="clearCart">Limpiar Carrito</button>
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
  
  .emptyCart{
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
          display: flex;
          margin-top: 1%;
          div{
              margin-left: 2%;
          }
      }
  }
  </style>
  