<template>

</template>

<script>
import axios from 'axios';
export default {
    
  data() {
    return {
      cart: [],
      total: 0,
      fechaTexto: '',
      orders: [],
      buy:'' 
    };
  },

  created() {
    this.getDate();
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cart)
    this.calcTotal();
    this.createOrderAndProduct();
    this.$router.push('/ordercompleted')
  },

  methods: {
    getDate() {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
      const anio = fechaActual.getFullYear();

      // Construye la cadena de texto en el formato deseado (por ejemplo, "dd/mm/aaaa")
      this.fechaTexto = `${dia}/${mes}/${anio}`;
    },

    calcTotal() {
        console.log(this.cart)
      this.total = 0; // Reinicia el total antes de calcularlo
      this.cart.forEach((element) => {
        this.total += element.price * element.quantity;
      });
    },

    async createOrderAndProduct() {
      try {
        const orderResponse = await axios.post('https://backendnodetfg.onrender.com/orders/', {
          fecha: this.fechaTexto, // Fecha de la Order
          price: this.total, // Precio de la Order
          userid: this.$store.state.user.user.id, // Objeto user
        }, { 'Content-Type': 'application/json' });
        
        
        const orderId = orderResponse.data.id; // Obtiene el ID de la Order creada
        for (let i = 0; i < this.cart.length; i++) {
          const element = this.cart[i];
          const productOrderResponse = await axios.post('https://backendnodetfg.onrender.com/productsOrder/create', {
            orderid: orderId , // Objeto Order con el ID de la Order creada anteriormente
            productid: element.id, // Objeto Product con el ID del producto asociado al ProductOrder
            cantidad: element.quantity, // Cantidad del producto
            // Otros datos necesarios para crear el ProductOrder
          }, { 'Content-Type': 'application/json' });
          console.log(productOrderResponse.data);
          console.log(this.orders)
        }
// Elimina el carrito del localStorage
        
        // Realiza acciones adicionales después de crear la Order y el ProductOrder
      } catch (error) {
        console.error('Error al crear la Order y el ProductOrder:', error);
      }
    },
  },
};


</script>


<style lang="scss" scoped>
@import '../scss/global.scss';







</style>