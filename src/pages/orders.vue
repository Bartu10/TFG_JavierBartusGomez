<template>
  <div class="order-history">
    <!-- Itera sobre cada pedido en la lista de pedidos -->
    <div v-for="order in orders" :key="order.id" class="order-item">
      <!-- Encabezado del pedido -->
      <div class="order-header">
        <h3>Pedido #{{ order.id }}</h3>
        <p>Fecha: {{ order.fecha }}</p>
      </div>
      <!-- Detalles del pedido -->
      <div class="order-details">
        <!-- Itera sobre cada producto en los pedidos de productos -->
        <div v-for="productOrder in order.productOrders" :key="productOrder.id" class="product-order">
          <!-- Imagen del producto -->
          <div class="product-image">
            <img :src="productOrder.product.imageUrl" alt="Product Image">
          </div>
          <!-- Información del producto -->
          <div class="product-info">
            <h4>{{ productOrder.product.name }}</h4>
            <p>Cantidad: {{ productOrder.cantidad }}</p>
            <p>Precio: ${{ productOrder.product.price }}</p>
          </div>
        </div>
      </div>
      <!-- Total del pedido -->
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
      orders: [], // Lista de pedidos
      productOrders: [], // Lista de pedidos de productos
    }
  },

  created() {
    this.GetAllOrders(); // Llama a la función para obtener todos los pedidos
  },

  methods: {
    async GetAllOrders() {
      const user = this.$store.state.user.user;
      let orders = await fetch('https://backendnodetfg.onrender.com/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      orders = await orders.json();

      let productOrders = await fetch('https://backendnodetfg.onrender.com/productOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      productOrders = await productOrders.json();

      let products = await fetch('https://backendnodetfg.onrender.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      products = await products.json();


      
      this.productOrders = productOrders;

      orders = orders.filter((order) => order.user === user.id);

      for (let od of orders) {
        let lista = [];
        for (let pdOrder of this.productOrders) {
          if (od.id == pdOrder.order) {
            pdOrder.product = products.find((p) => p.id == pdOrder.product);
            lista.push(pdOrder);
          }
        }
        od.productOrders = lista;
      }

      this.orders = orders;
      console.log(this.orders);
    },
  },
}
</script>


<style lang="scss">
@import '../scss/global.scss';

/* Estilos para la historia de pedidos */
.order-history {
  font-family: WorkSans;

  /* Estilos para cada elemento de pedido */
  .order-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;

    /* Estilos para el encabezado del pedido */
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      /* Estilos para el título del pedido */
      h3 {
        margin: 0;
        font-size: 20px;
      }

      /* Estilos para la fecha del pedido */
      p {
        margin: 0;
        font-size: 14px;
        color: #999;
      }
    }

    /* Estilos para los detalles del pedido */
    .order-details {
      display: flex;
      flex-wrap: wrap;

      /* Estilos para cada elemento de producto del pedido */
      .product-order {
        display: flex;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 10px;

        /* Estilos para la imagen del producto */
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

        /* Estilos para la información del producto */
        .product-info {
          margin-left: 10px;

          /* Estilos para el nombre del producto */
          h4 {
            margin: 0;
            font-size: 16px;
          }

          /* Estilos para la cantidad del producto */
          p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }

    /* Estilos para el total del pedido */
    .order-total {
      text-align: right;
      margin-top: 10px;

      /* Estilos para el precio total */
      p {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>