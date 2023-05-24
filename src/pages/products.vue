<template>
  <div class="all">
  <div :class="filters">
    <input v-model="this.filterPrueba" type="number"><button @click="callFilter">Filtrar</button>
  </div>
  <div class="openerDiv" @click="openFilters">
  </div>
  <div class="grid">
  <div v-for="producto in product" :key="producto.nombre" class="cell" @click="this.$router.push(`/product/${producto.id}`)">
    <div class="product">
  <img class="product-image" :src="producto.img" alt="Imagen del Producto 1">
  <div class="product-info">
    <h3 class="product-name">{{producto.name}}</h3>
    <p class="product-price">{{producto.price}}€</p>
  </div>
</div>
  </div>
</div>
</div>

</template>
  
  <script>

  export default {
    data() {
      return {
        value: 100,
        image:'',
        description: "Juanjo",
        product: '',
        isOpen: false,
        filterPrueba: '',
      };
    },

   created() {
      this.callProducts();
     },

    computed: {
      filters() {
        return this.isOpen ? 'filtersOpen' : 'filters'
      }
    },
  
    methods: {

      async callFilter(){
        const token = this.$store.state.token
        let year = this.filterPrueba.toString()

        const response = await fetch(`http://localhost:8080/products/year/${year}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        .catch(error => {
          console.error(error); 
        });
        console.log(response)
        this.product = response
        
        
      },

      openFilters(){
        this.isOpen = !this.isOpen
      },
      
      async callProducts() {

        const token = this.$store.state.token
        const response = await fetch("http://localhost:8080/products/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
    .catch(error => {
      console.error(error); 
    });
    this.product = response 
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>

@import '../scss/global.scss';

.product {
  cursor: pointer;
  margin: 2rem;
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
  }
}

.product-image {
  width: 120px;
  height: 120px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  margin-left: 20px;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  font-size: 18px;
  color: #888;
  margin-bottom: 15px;
}

.product-button {
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

.openerDiv{
  border: 10px;
  width: 50px;
  background-color: $secondaryGreen;
  animation: colorChange 5s infinite alternate;
}

.fa-futbol{
    font-size: 30px;
  }
.all{
  display: flex;
}
.filtersOpen{
  background-color: $principalGreen ;
  width: 300px;
}

      @keyframes colorChange {
  0% {
    background-color: $secondaryGreen;
  }
  50% {
    background-color: $principalGreen;
  }
  100% {
    background-color: $secondaryGreen;
  }
}

.filters{
  background-color: $principalGreen;

  display: none;
}

.grid {
        width: 70%;
        font-family: 'WorkSans';
        margin-top:2% ;
        display: grid;
        grid-template-columns: auto auto auto;
        width: 100%;
        .icon{
          width: 20%;
        }
      }
      .cell {
        text-align: center;
      }

@media (max-width: 1000px) {
  .product{
    flex-direction: column;
  }
  .grid {
    grid-template-columns: auto auto;
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: auto;
    width: 300px;
  }
  .filtersOpen{
    width: 100%;
  }
  .openerDiv{
    width: 100px;
  }



}





  </style>