<template>
  <div class="all">
    <!-- Sección de filtros -->
    <div :class="filters">
      <span class="Filtitle">Filtros</span>
      <!-- Filtro por año -->
      <div>
        <label>Filtrar por año</label>
        <select id="year" v-model="selectedYear" @change="applyYearFilter">
          <option value="">Todos</option>
          <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
        </select>
      </div>
      <!-- Filtro por Retro -->
      <div>
        <label>Filtrar por Retro</label>
        <select id="retro" v-model="selectedRetro" @change="applyFilters">
          <option value="">Todos</option>
          <option value="true">Retro</option>
          <option value="false">No Retro</option>
        </select>
      </div>
      <!-- Filtro por Equipo -->
      <div>
        <label>Filtrar por Equipo</label>
        <select id="team" v-model="selectedTeam" @change="applyTeamFilter">
          <option value="">Todos</option>
          <option v-for="team in teams" :value="team" :key="team">{{ team }}</option>
        </select>
      </div>
      <!-- Filtro por Estado -->
      <div>
        <label>Filtrar por Estado</label>
        <select id="state" v-model="selectedState" @change="applyStateFilter">
          <option value="">Todos</option>
          <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
        </select>
      </div>
      <!-- Ordenar por precio -->
      <div>
        <label>Ordenar por precio</label>
        <select id="price" v-model="selectedSort" @change="applyFilters">
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
    </div>

    <!-- Botón para abrir/cerrar los filtros -->
    <div :class="opener" @click="openFilters"></div>

    <!-- Grid de productos -->
    <div class="grid">
      <div v-for="producto in paginatedProducts" :key="producto.nombre" class="cell" @click="navigateToProduct(producto.id)">
        <div class="product">
          <img class="product-image" :src="producto.img" alt="Imagen del Producto">
          <div class="product-info">
            <h3 class="product-name">{{ producto.name }}</h3>
            <p class="product-price">{{ producto.price }}€</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <button class="btn" :disabled="currentPage === 1" @click="previousPage">Anterior</button>
      <span>{{ currentPage }}</span>
      <button class="btn" :disabled="currentPage === totalPages" @click="nextPage">Siguiente</button>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      isOpen: false,
      selectedYear: "", // Año seleccionado en los filtros
      years: [],
      retro: false,
      selectedTeam: "", // Equipo seleccionado en los filtros
      teams: [],
      selectedState: "", // Estado seleccionado en los filtros
      states: [],
      products: [], // Lista de productos
      selectedSort: "asc", // Orden seleccionado en los filtros
      selectedRetro: "",
      currentPage: 1, // Página actual
      pageSize: 12, // Cantidad de productos por página
    };
  },

  created() {
    this.callProducts();
  },

  


  computed: {
  paginatedProducts() {
    // Devuelve los productos paginados según la página actual y el tamaño de página
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProducts.slice(startIndex, endIndex);
  },

  totalPages() {
    // Devuelve el número total de páginas basado en la cantidad de productos y el tamaño de página
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  },

  opener() {
    // Determina la clase CSS para el componente openerDiv o cOpenerDiv según el estado de isOpen
    return this.isOpen ? "openerDiv" : "cOpenerDiv";
  },

  filters() {
    // Determina la clase CSS para el componente filtersOpen o filters según el estado de isOpen
    return this.isOpen ? "filtersOpen" : "filters";
  },

  filteredProducts() {
    let filtered = this.products;

    if (this.selectedYear) {
      // Filtra los productos por el año seleccionado
      filtered = filtered.filter((producto) => producto.yr === this.selectedYear);
    }

    if (this.selectedRetro !== "") {
      // Filtra los productos por la opción retro seleccionada
      filtered = filtered.filter((producto) => producto.retro === (this.selectedRetro === "true"));
    }

    if (this.selectedTeam) {
      // Filtra los productos por el equipo seleccionado
      filtered = filtered.filter((producto) => producto.team === this.selectedTeam);
    }

    if (this.selectedState) {
      // Filtra los productos por el estado seleccionado
      filtered = filtered.filter((producto) => producto.state === this.selectedState);
    }

    if (this.selectedSort === "asc") {
      // Ordena los productos en orden ascendente según el precio
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === "desc") {
      // Ordena los productos en orden descendente según el precio
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  },
},

  methods: {
    sortYears() {
      // Ordena los años en orden ascendente
      this.years.sort((a, b) => a - b);
    },

    previousPage() {
      // Navega a la página anterior
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      // Navega a la siguiente página
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    openFilters() {
      // Abre o cierra los filtros
      this.isOpen = !this.isOpen;
    },

    navigateToProduct(productId) {
      // Navega a la página de un producto específico
      this.$router.push(`/product/${productId}`);
    },

    async callProducts() {
  // Obtiene la lista de productos desde el servidor
  const token = this.$store.state.token;
  try {
    const response = await axios.get("http://localhost:8080/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Asigna los productos obtenidos a la variable products
    this.products = response.data;

    // Ordena los productos en orden descendente según el precio
    this.products.sort((a, b) => b.price - a.price);

    // Obtiene los años únicos de los productos y los asigna a la variable years
    this.years = [...new Set(this.products.map((product) => product.yr))];

    // Ordena los años en orden ascendente
    this.sortYears();

    // Obtiene los equipos únicos de los productos y los asigna a la variable teams
    this.teams = [...new Set(this.products.map((product) => product.team))];

    // Obtiene los estados únicos de los productos y los asigna a la variable states
    this.states = [...new Set(this.products.map((product) => product.state))];
  } catch (error) {
    console.error(error);
  }
},

    async applyYearFilter() {
      // Aplica el filtro por año seleccionado
      const token = this.$store.state.token;
      try {
        let response;
        if (this.selectedYear === "") {
          response = await axios.get("http://localhost:8080/products/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get(
            `http://localhost:8080/products/year/${this.selectedYear}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async applyRetroFilter() {
      // Aplica el filtro por opción retro seleccionada
      const token = this.$store.state.token;
      try {
        const response = await axios.get(
          `http://localhost:8080/products/retro/${this.retro}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async applyTeamFilter() {
      // Aplica el filtro por equipo seleccionado
      const token = this.$store.state.token;
      try {
        let response;
        if (this.selectedTeam === "") {
          response = await axios.get("http://localhost:8080/products/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get(
            `http://localhost:8080/products/team/${this.selectedTeam}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async applyStateFilter() {
      // Aplica el filtro por estado seleccionado
      const token = this.$store.state.token;
      try {
        const response = await axios.get(
          `http://localhost:8080/products/state/${this.selectedState}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>

@import '../scss/global.scss';

// Estilos para la paginación
.pagination{
  position: fixed;
  top: 94%;
  left: 43vw;

  // Estilos para los botones de la paginación
  button{
    margin-left: 20px;
    margin-right: 20px;
  }

  // Estilos para los números de página
  span{
    font-size: 130%;
  }
}
 // Diseño botón
.btn {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: $principalGreen;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: $secondaryGreen;
        cursor: pointer;
      }
      &:disabled {
        background-color: #888;
        cursor: not-allowed;
      }
    }

// Estilos para el título de los filtros
.Filtitle{
  margin-right:10% ;
  margin-left:10% ;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
}

// Estilos para el contenedor de cada producto
.product {
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

// Estilos para la imagen del producto
.product-image {
  width: 120px;
  height: 120px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// Estilos para la información del producto
.product-info {
  flex: 1;
  margin-left: 20px;
}

// Estilos para el nombre del producto
.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

// Estilos para el precio del producto
.product-price {
  font-size: 18px;
  color: #888;
  margin-bottom: 15px;
}

// Estilos para el botón del producto
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

// Estilos para el div de apertura de los filtros
.openerDiv{
  border: 10px;
  width: 50px;
  background-color: $secondaryGreen;
  animation: colorChange 5s infinite alternate;
  height: 770px;
  border-bottom-right-radius: 20px;
  margin-top: 3%;
  border-top-right-radius: 20px;
  position: fixed;
  left: 300px;
  z-index: 50;
}

// Estilos para el div de cierre de los filtros
.cOpenerDiv{
  border: 10px;
  width: 50px;
  background-color: $secondaryGreen;
  animation: colorChange 5s infinite alternate;
  height: 770px;
  border-bottom-right-radius: 20px;
  margin-top: 3%;
  border-top-right-radius: 20px;
  position: fixed;
  z-index: 50;
}

// Estilos para el icono de fútbol
.fa-futbol{
  font-size: 30px;
}

// Estilos para el contenedor principal
.all{
  position: relative;
  display: flex;
}

// Estilos para el contenedor de los filtros abiertos
.filtersOpen{
  div{
    margin-top: 5%;
  }
  position: fixed;
  margin-top:3%;
  background-color: $principalGreen ;
  width: 300px;
  height: 770px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  font-family: 'WorkSans';
  label{
    font-size: 20px;
    margin-left: 10px;
  }
  select{
    margin-left: 10px;
    margin-bottom: 10px;
    width: 280px;
    height: 30px;
    border-radius: 5px;
  }
}

// Estilos para la animación de cambio de color
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

// Estilos para los filtros cerrados
.filters{
  background-color: $principalGreen;
  display: none;
  z-index: 50;
}

// Estilos para la cuadrícula de productos
.grid {
  margin-left: 5%;
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

// Estilos para las celdas de la cuadrícula
.cell {
  text-align: center;
}

// Estilos responsivos para pantallas de tamaño máximo de 1150px
@media (max-width: 1150px) {

  .pagination{
    left: 36.5vw;
  }

  .product{
    flex-direction: column;
  }

  .grid {
    grid-template-columns: auto auto;
  }
}

// Estilos responsivos para pantallas de tamaño máximo de 600px
@media (max-width: 600px) {
  .pagination{
    .btn {
      font-size: 0.9rem;
    }
  }

  .pagination{
    left: 20vw;
  }

  .grid {
    grid-template-columns: auto;
    width: 300px;
    margin-left: 20%;
  }

  .filtersOpen{
    width: 90%;
  }

  .openerDiv{
    left: 75%;
    width: 100px;
  }
}
</style>