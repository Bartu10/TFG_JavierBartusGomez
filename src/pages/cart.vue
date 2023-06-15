<template>
  <div class="grid">
    <!-- Bucle para mostrar cada producto favorito en el carrito -->
    <div v-for="(fav, index) in favs" :key="fav.nombre" class="cell">
      <img :src=fav.img class="icon">
      <div>
        <h3>{{ fav.name }}</h3>
        <p>Precio: {{ fav.price }}</p>
        <p>Cantidad: <button class="btn" @click="Decrease(index, 1)">-</button>{{fav.quantity}}<button class="btn" @click="Increase(index, 1)">+</button></p>
        <p>Talla: {{fav.talla}}</p>
        <a @click="deleteProductCart(index)"><i class="fa-solid fa-xmark"></i></a>
      </div>
    </div>
    <!-- Mostrar el precio total y los botones de comprar y limpiar carrito -->
    <h2 v-if="total !== 0">Precio Total: {{' ' + total}}€</h2>
    <button class="btn" v-if="total !== 0" @click="callOrder">Comprar</button>
    <button class="btn" v-if="total !== 0" @click="clearCart">Limpiar Carrito</button>
  </div>
  <!-- Mostrar un mensaje cuando el carrito está vacío -->
  <div class="emptyCart" v-if="total === 0">
    <img class="imgCart" src="../img/carro-vacio.png">
    <span>No hay productos en el carrito.</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '', // Descripción de la compra
      quantity: '', // Variable no utilizada, se puede eliminar
      image: '', // Variable no utilizada, se puede eliminar
      favs: '', // Lista de productos favoritos en el carrito
      total: 0, // Precio total del carrito
      isRegistred: false
    }
  },


  methods: {
    async callOrder() {
      try {
        // Crear objeto con los datos de la compra
        let dato = {
          value: this.total,
          description: this.description,
          objects: this.favs,
        };
        // Enviar la solicitud de compra al servidor
        const response = await fetch("https://paypalmailnode.onrender.com/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dato),
        });

        // Obtener la respuesta del servidor
        const data = await response.json();
        // Redirigir al enlace de pago proporcionado por el servidor
        window.location.href = data.links[1].href;
      } catch (error) {
        console.error(error);
      }
    },

    clearCart() {
      // Limpiar el carrito eliminando el elemento "cart" del almacenamiento local
      localStorage.removeItem("cart");
      // Recargar la página para reflejar los cambios
      location.reload();
    },

    deleteProductCart(index) {
      // Eliminar un producto del carrito en la posición dada por el índice
      this.favs.splice(index, 1);
      // Actualizar el carrito en el almacenamiento local
      localStorage.setItem('cart', JSON.stringify(this.favs));
      // Recargar la página para reflejar los cambios
      location.reload();
    },

    Decrease(index, number) {
      // Reducir la cantidad de un producto en el carrito
      this.favs[index].quantity -= number;
      // Recalcular el precio total del carrito
      this.calcTotal();
      // Si la cantidad llega a cero, eliminar el producto del carrito
      if (this.favs[index].quantity === 0) {
        this.deleteProductCart(index);
      }
    },

    Increase(index, number) {
      // Aumentar la cantidad de un producto en el carrito
      this.favs[index].quantity += number;
      // Recalcular el precio total del carrito
      this.calcTotal();
    },

    calcTotal() {
      // Calcular el precio total del carrito sumando el precio de cada producto multiplicado por su cantidad
      let tota = 0;
      for (let x in this.favs) {
        tota = tota + this.favs[x].price * this.favs[x].quantity;
      }
      // Actualizar el precio total del carrito
      this.total = tota;
    }
  },
  created() {
    // Obtener los productos favoritos del carrito desde el almacenamiento local
    this.favs = JSON.parse(localStorage.getItem('cart'));
    // Calcular el precio total del carrito
    this.calcTotal();
  },

  updated() {
    // Obtener una lista de los nombres de los productos en el carrito
    let listaNombres = this.favs.map(p => p.name);
    // Unir los nombres en un solo string separados por comas
    let names = listaNombres.join(', ');
    // Establecer la descripción de la compra
    this.description = `La compra es de ${names}`;
  }
}
</script>
  
<style lang="scss" scoped>
@import "../scss/global.scss";

/* Estilos para el ícono */
.fa-solid {
  cursor: pointer;
}

/* Estilos para el contenedor de pagos */
.payment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5%;
  margin-bottom: 4rem;
}

/* Estilos para el botón */
.btn {
  font-size: 1.2rem;
  margin: 2px;
  background-color: $principalGreen; /* Color de fondo del botón */
  color: #fff; /* Color del texto del botón */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4CA686; /* Color de fondo del botón al pasar el cursor */
    cursor: pointer;
  }
}

.quantity {
  flex: none;
}

/* Estilos para el título h3 */
h3 {
  margin-right: 2vw;
}

/* Estilos para el párrafo p */
p {
  margin-right: 12vw;
}

.p-titles {
  display: flex;
  margin-bottom: 2%;
}

/* Animación pulsante para el carrito vacío */
@keyframes pulse {
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

.emptyCart {
  animation: pulse 4s infinite;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  span {
    text-align: center;
    margin-left: 47px;
  }
}

/* Estilos para la imagen del carrito vacío */
.imgCart {
  padding-bottom: 20px;
  width: 200px;
  align-self: center;
  padding-top: 20px;
}

/* Estilos de fuente para todos los elementos excepto el ícono */
*:not(.fa-solid) {
  font-family: 'WorkSans';
}

/* Estilos para las imágenes */
img {
  height: 200px;
  max-width: 100%;
}

/* Estilos para la cuadrícula de productos */
.grid {
  padding-left: 5%;
  .cell {
    width: 85%;
    display: flex;
    margin-top: 1%;
    border-bottom: 1px solid lightgrey;

    div {
      display: flex;
      margin-left: 2%;
      align-items: center;
    }
  }
}

/* Estilos para la cuadrícula de productos en pantallas pequeñas */
@media (max-width: 900px) {
  .grid {
    .cell {
      width: 100%;
      display: flex;
      margin-top: 1%;
      border-bottom: 1px solid lightgrey;

      div {
        display: flex;
        flex-direction: column;
        margin-left: 2%;
        align-items: center;
      }
    }
  }
}
</style>