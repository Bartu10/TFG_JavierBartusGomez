<template>
<span>Cart</span>
  <div class="grid">
  <div v-for="(fav,index) in favs" :key="fav.nombre" class="cell">
    <img :src=this.image class="icon">
    <div>
    <h3>{{ fav.nombre }}</h3>
    <p>Precio: {{ fav.precio }}</p>
    <p>Cantidad : {{fav.quantity}}</p>
    <p>Talla : {{fav.talla}}</p>
    <a @click="deleteProductCart(index)"><i class="fa-solid fa-xmark"></i></a>
    </div>
  </div>
  <h2 v-if="!this.total == 0">Precio Total: {{' ' + this.total}}€</h2>
  <button v-if="!this.total == 0" @click="callOrder">Comprar</button>
  <button v-if="!this.total == 0" @click="clearCart">Limpiar Carrito</button>
  <span v-if="this.total == 0">No hay productos en el carrito.</span>
  


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
      async callProducts() {
        //const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYmFydHUiLCJleHAiOjE2ODI3NzM1MTMsImlhdCI6MTY4Mjc2OTkxMywic2NvcGUiOiIifQ.ZV6pCnljBOzcs26P6ELMpWbCOYzACFbdxA8XBvmyWDiCFblEq_oW26RZwk8Pob94a5f_sr_YcOh6o_UJmZYz-XL5nyvhFTrG49KrYgVnbu4pdny-Acrx7f9xuTungnAhLDi76v43MVUJcgru9KQOCXiBJJJUY68VtigvjhJSNZCiP_Iv_g1HhGxiw1wm34Lu3HiQ7kzIou7-EjTCfPtksII7ZWatnybB4ePNAI0YhhdmvgG8RgaLkv04ITM1ij0uX8pS0gdi3j-uE1qgKiLyLreXVjGyEs93oLBteeUFSlbG0AkHfaG42NGJfpL-MmxjKp5TRuHymioZH8X4h3mKzA";
  
        const response = await fetch("https://jsonplaceholder.typicode.com/photos/1", {
          method: "GET",
          //headers: {
            //Authorization: `Bearer ${token}`,
          //},
        })
        .then(response => response.json())
    .then(data => {
      this.image = data.url
    })
    .catch(error => {
      console.error(error);
    });
    
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


        calcTotal() {
            let tota = 0;
            for (let x in this.favs) {
                tota = tota + this.favs[x].precio * this.favs[x].quantity
            }
            console.log("tota",tota)
            this.total = tota
        }
    },
    created() {
        this.favs = JSON.parse(localStorage.getItem('cart'))
        this.calcTotal()
        this.callProducts()
        console.log(this.$router)
    },

    updated() {
        
    let listaNombres = this.favs.map(p => p.nombre);
    let names = listaNombres.join(', ');
        this.description = `La compra es de ${names}`
    }

}
</script>

<style lang="scss" scoped>

*:not(.fa-solid){
    font-family: 'WorkSans'
}

</style>


<style lang="scss" scoped>
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
