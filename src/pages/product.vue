<template>
    <div class="product-detail">
  <div class="product-image">
    <img :src=this.productComplete.img alt="Product Image">
  </div>
  <div class="product-info">
    <h2>{{ this.productComplete.name }}</h2>
    <h2>{{ this.productComplete.description }}</h2>
    <h2>{{ this.productComplete.team }}</h2>
    <h2>{{ this.productComplete.state }}</h2>
    <h2>{{ this.productComplete.year }}</h2>
    <h2>{{ this.productComplete.price }}€ </h2>
    <div class="product-size">
      <label for="size-select">Talla:</label>
      <select name="size" id="size-select" v-model="this.talla">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>
    <button class="add-to-cart" @click="addToCart">Añadir al carrito</button>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            talla:'S',
            image: '',
            productComplete: '',
            id: '',
            product: ''
        }
    },

    methods:{

async callProduct(){
  const token = this.$store.state.token
  console.log("dw",this.$route.params.id)
  const url = `http://localhost:8080/products/${this.$route.params.id}/`
  console.log("url",url)       
  const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        console.log("response",response)
        this.productComplete = response 
},

addToCart() {
  
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let isProductAlreadyInCart = false
    this.productComplete.talla = this.talla

    for (let x in cart) {
        if (cart[x].id === this.productComplete.id && cart[x].talla === this.talla) {
            cart[x].quantity++
            isProductAlreadyInCart = true
            break
        }
    }

    if (!isProductAlreadyInCart) {
        let product = this.productComplete
        product.quantity = 1
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    location.reload()
}
    },
    created() {
        this.callProduct()
    }
}


</script>

<style lang="scss" scoped>
@import '../scss/global.scss';
*{
    font-family: 'WorkSans';
}
.product-detail {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .product-image {
    width: 40%;
    img {
      max-width: 100%;
    }
  }
  .product-info {
    width: 60%;
    padding: 10px;
    .product-name {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .product-description {
      margin-bottom: 10px;
    }
    .product-price {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .product-size {
      margin-bottom: 10px;
      label {
        margin-right: 10px;
      }
      select {
        padding: 5px;
        font-size: 16px;
      }
    }
    .add-to-cart {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      background-color: $principalGreen;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #4CA686;
      }
    }
  }
}
</style>