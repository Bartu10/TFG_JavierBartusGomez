<template>
    <div class="completed">
    <p>¡Felicidades! Has completado con éxito el pedido número {{ this.buy.id }}. Agradecemos tu preferencia y esperamos que disfrutes de tu compra. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos. ¡Esperamos verte nuevamente pronto!</p>
    
    <div class="buttons">
        <button class="btn" @click="this.$router.push('/')">Volver a la tienda</button>
        <button class="btn" @click="this.$router.push('/orders')">Ver historial de pedidos</button>
    </div>
</div>



    
</template>

<script lang="js">
export default {
    
  data() {
    return {
      buy:'',
      delCartOpt: false, 
    };
  },

  created() {
    localStorage.removeItem("cart");
    this.GetLastOrder();
    
  },

  methods: {

    async GetLastOrder() {
      const token = this.$store.state.token;
      const response = await fetch(`http://localhost:8080/users/mail/${this.$store.state.user}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = await response.json();
      let highest = orders.orders[0];
      console.log("highest",highest)

// Itera sobre los elementos restantes y compara los IDs
for (let i = 1; i < orders.orders.length; i++) {
  if (orders.orders[i].id > highest.id) {
    highest = orders.orders[i];
  }
}
      console.log("orders",highest)
      this.buy = highest;

    }}}


</script>

<style lang="scss">
@import '../scss/global.scss';

*{
font-family: WorkSans;
}
.buttons{
    display: flex;
    justify-content:space-around;
    margin-top: 20px;
}

.completed{
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 100px;
    text-align: center;
    font-size: 20px;
    color: #000000;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.btn {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
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

</style>