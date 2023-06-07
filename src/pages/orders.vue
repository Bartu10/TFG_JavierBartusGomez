<template>
  <div class="order-history">
    <div v-for="order in orders" :key="order" class="order-item">
      <div class="order-header">
        <h3>Pedido #{{ order.id }}</h3>
        <p>Fecha: {{ order.fecha }}</p>
      </div>
      <div class="order-details">
        <div v-for="productOrder in order.productOrders" :key="productOrder.id" class="product-order">
          <div class="product-image">
            <img :src="productOrder.product.img" alt="Product Image">
          </div>
          <div class="product-info">
            <h4>{{ productOrder.product.name }}</h4>
            <p>Cantidad: {{ productOrder.cantidad }}</p>
            <p>Precio: ${{ productOrder.product.price }}</p>
            <p>Talla: {{ productOrder.product.talla }}</p>
          </div>
        </div>
      </div>
      <div class="order-total">
        <p>Total: ${{ order.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [],
        }
    },

    created() {
        this.GetAllOrders();
    },

    methods:{
      async GetAllOrders() {
      const token = this.$store.state.token;
      const response = await fetch(`http://localhost:8080/users/mail/${this.$store.state.user}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = await response.json();
      this.orders = orders.orders;
      this.orders.sort((a, b) => b.id - a.id);
      console.log("orders",orders.orders)
      console.log("productOrder",this.orders)
    },
    }
}
</script>

<style lang="scss">

@import '../scss/global.scss';


.order-history {
  font-family: WorkSans;
  .order-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-size: 20px;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #999;
      }
    }

    .order-details {
      display: flex;
      flex-wrap: wrap;

      .product-order {
        display: flex;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 10px;

        .product-image {
          width: 100px;
          height: 100px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .product-info {
          margin-left: 10px;

          h4 {
            margin: 0;
            font-size: 16px;
          }

          p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }

    .order-total {
      text-align: right;
      margin-top: 10px;

      p {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>