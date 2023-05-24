<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="productComplete.img" alt="Product Image">
    </div>
    <div class="product-info">
      <h2 class="product-name">{{ productComplete.name }}</h2>
      <p class="product-description">{{ productComplete.description }}</p>
      <div class="product-details">
        <div class="detail">
          <span class="detail-label">Equipo:</span>
          <span class="detail-value">{{ productComplete.team }}</span>
        </div>
        <div class="detail">
          <span class="detail-label">Estado:</span>
          <span class="detail-value">{{ productComplete.state }}</span>
        </div>
        <div class="detail">
          <span class="detail-label">Año:</span>
          <span class="detail-value">{{ productComplete.yr }}</span>
        </div>
      </div>
      <p class="product-price">{{ productComplete.price }}€</p>
      <div class="product-size">
        <label for="size-select">Talla:</label>
        <select name="size" id="size-select" v-model="talla">
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
      talla: 'S',
      productComplete: {},
    }
  },
  methods: {
    async callProduct() {
      const token = this.$store.state.token
      const url = `http://localhost:8080/products/${this.$route.params.id}/`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json())
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
      border-radius: 8px;
    }
  }

  .product-info {
    width: 60%;
    padding: 10px;

    .product-name {
      font-size: 24px;
      margin-bottom: 10px;
      color: #333;
    }

    .product-description {
      margin-bottom: 15px;
      color: #777;
      font-size: 16px;
    }

    .product-details {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;

      .detail {
        display: flex;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 5px;

        .detail-label {
          font-weight: bold;
          color: #555;
          margin-right: 5px;
        }

        .detail-value {
          color: #333;
        }
      }
    }

    .product-price {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
    }

    .product-size {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      label {
        margin-right: 10px;
        color: #555;
      }

      select {
        padding: 8px;
        font-size: 16px;
      }
    }

    .add-to-cart {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      background-color: #4CA686;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #3F875D;
      }
    }
  }
}
</style>
