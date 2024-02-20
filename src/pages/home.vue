<template>
    <div class="main">
        <div class="first">
            <div class="img-container" @click="navigateToProducts('false')">
            <img src="../img/young.png">
            <span class="img-text">Últimas temporadas</span>
                    </div>
        </div>
        <div class="second">
            <div class="img-container" @click="navigateToProducts('true')">
                <img src="../img/Liverpool.png">
                <span class="img-text">Retro</span>
            </div>
        </div>
        <div class="third">
            <div class="Question">
                <span>
                    ¿Quiénes somos?
                </span>
            </div>
            <span class="text">
        Somos una empresa especializada en la venta de camisetas de fútbol retro. 
        Nos apasiona el fútbol y creemos que la moda y la historia del deporte son esenciales para mantener vivo su legado.
        Ofrecemos una amplia variedad de camisetas de fútbol de décadas pasadas con diseños auténticos y únicos.
        Nos esforzamos por brindarte una experiencia de compra fácil, segura y rápida para que puedas disfrutar de tus camisetas de fútbol retro lo antes posible.
        En resumen, somos expertos en moda deportiva, apasionados por la historia del fútbol y comprometidos en ofrecerte lo mejor en estilo y calidad.
            </span>    
        </div>
        <div class="fourth">
          
          <p class="titleProducts">PRODUCTOS MAS VENDIDOS</p>
          <div class="products">
          <div v-for="producto in this.products" :key="producto.nombre" class="cell" @click="navigateToProduct(producto.id)">
            <div class="product">
      <img class="product-image" :src="producto.imageUrl" alt="Imagen del Producto">
      <div class="product-info">
        <h3 class="product-name">{{ producto.name }}</h3>
        <p class="product-price">{{ producto.price }}€</p>
      </div>
      </div>
  </div>
</div>
</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [], // Array vacío para almacenar los productos
    }
  },
  mounted: async function() {
    await this.getProducts(); // Llama al método para obtener los productos al montar el componente
  },
  methods: {
    navigateToProduct(productId) {
      // Navega a la página de un producto específico
      this.$router.push(`/product/${productId}`);
    },
    navigateToProducts(retro) {
      this.$router.push({
        path: '/products',
        query: { retro: retro }
      });
    },
    async getProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products/lowestSum/low');
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }
  },
};
</script>



<style lang="scss" scoped>
  @import '../scss/global.scss';

  *{
    font-family: 'WorkSans';
  }

  /* Estilos para la sección "titleProducts" */
  .titleProducts{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;


  }
  /* Estilos para la sección de cada producto */
  .cell{
    width: 19%;
    display: flex;
  }

  .products{
    display: flex;
    justify-content: center;
  }

  .product {
    /* Estilos para cada producto */
  flex-direction: column;
  cursor: pointer;
  margin: 1.25rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: whitesmoke;
  }
}

.product-image {
  /* Estilos para la imagen del producto */
  width: 90%;
  height: 60%;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  /* Estilos para la información del producto */
  flex: 1;
  margin-left: 20px;
}

.product-name {
  /* Estilos para el nombre del producto */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  /* Estilos para el precio del producto */
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-bottom: 15px;
}

.product-button {
   /* Estilos para el botón del producto */
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e96060;
  }
}



  .name {
    backdrop-filter: blur(5px);
  }

  .first {
    grid-area: first;
    background-color: rgba(255, 255, 255, 0.9);
    background-color: $grey;
    margin-top: 5rem;
    margin-left: 5vh;
    margin-right: 5vh;
    margin-bottom: 5rem;
    text-align: center;
    overflow: hidden;
  }

  .first:hover .img-container img,
  .second:hover .img-container img {
    opacity: 0.5;
    cursor: pointer;
  }

  .first:hover .img-text,
  .second:hover .img-text {
    opacity: 1;
    cursor: pointer;
  }

  .first img,
  .second img {
    text-align: center;
    width: 100%;
    transition: opacity 0.3s ease-in-out;
  }

  .second {
    background-color: $grey;
    grid-area: second;
    margin-top: 5rem;
    margin-left: 5vh;
    margin-right: 5vh;
    margin-bottom: 5rem;
    align-items: center;
    justify-content: center;
    display: flex;
    overflow: hidden;
  }

  .img-container {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .img-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 1;
  }

    .third {
        font-family: 'WorkSans';
        grid-area: third;
        height: 30rem;
        margin-bottom: 5%;
        background-color: $principalGreen;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .fourth {
        grid-area: fourth;
        background-color: $grey;
        justify-content: center;
        align-items: center;
    }

    .text {
        padding-left:10%;
        padding-right: 10%;
        padding-top: 3em;
    }

    .Question {
        text-align: center;
        justify-content: center;
        font-size: 2rem;
    }

    .main {
        display: grid;
        grid-template: 
            'first second'
            'third third'
            'fourth fourth';
        background-color: $grey;
    }

    span {
        color: white;
    }


    @media(max-width: 1520px) {
        .main {
            display: grid;
            grid-template: 
                'first first'
                'second second'
                'third third'
                'fourth fourth';
        }
    }


    @media(max-width: 850px) {
      .products{
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .cell{
        width: 100%;
      }
      .first {
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
      }

      .second {
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 4rem;
      }

      .third {
        .Question{
          font-size: 1.5rem;
        }
        .text{
          padding-left:10vw;
          padding-right:10vw;
          font-size: 0.8rem;
        }
      }
    }


</style>