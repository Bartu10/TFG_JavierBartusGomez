<template>
  <div class="all">
  <div :class="filters">
    <input v-model="this.filterPrueba" type="number"><button @click="callFilter">Filtrar</button>
  </div>
  <div class="openerDiv" @click="openFilters">
  </div>
  <div class="grid">
  <div v-for="producto in product" :key="producto.nombre" class="cell" @click="this.$router.push(`/product/${producto.id}`)">
    <img :src=producto.img class="icon">
    <h3>{{ producto.name }}</h3>
    <p>Precio: {{ producto.price }}</p>
    <p>{{ producto.team }}</p>
    <p>{{ producto.yr }}</p>
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
        grid-template-columns: auto auto auto auto;
        width: 100%;
        .icon{
          width: 20%;
        }
      }
      .cell {
        text-align: center;
      }



  </style>