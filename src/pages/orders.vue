<template>
  <div class="order-history">
    <!-- Itera sobre cada pedido en la lista de pedidos -->
    <div v-for="order in orders" :key="order" class="order-item">
      <!-- Encabezado del pedido -->
      <div class="order-header">
        <h3>Pedido #{{ order.id }}</h3>
        <p>Fecha: {{ order.fecha }}</p>
      </div>
      <!-- Detalles del pedido -->
      <div class="order-details">
        <!-- Itera sobre cada producto en los pedidos de productos -->
        <div v-for="productOrder in productOrders" :key="productOrder.id" class="product-order">
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
      console.log(user)
      let orders = await fetch('https://backendnodetfg.onrender.com/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      orders = await orders.json();
      
      let productOrders = await fetch('https://backendnodetfg.onrender.com/productOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      productOrders = await productOrders.json();
      this.productOrders = productOrders;

      
      orders = orders.filter((order) => order.user === user.id);
      console.log("orders tras filter", orders)
      for (let od in orders){
        let lista = []
        console.log("Solo 1 order",orders[od])
        console.log("first orders", orders)
        for (let pdOrder in this.productOrders){
        if (orders[od].id == pdOrder.order){
          lista.push(this.productOrders[pdOrder])
          console.log("Nuevo producto", this.productOrders[pdOrder])
        }
        orders[od].productOrders = lista
      
      }
    }
      console.log("orders", orders)
      //this.orders = ordersList; // Asigna los pedidos obtenidos a la lista de pedidos
      this.orders.sort((a, b) => b.id - a.id); // Ordena los pedidos por ID de forma descendente

      

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