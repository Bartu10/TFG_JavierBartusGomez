<template>
  <div class="grid">
  <div v-for="producto in product" :key="producto.nombre" class="cell" @click="this.$router.push(`/product/${producto.id}`)">
    <img :src=this.image class="icon">
    <h3>{{ producto.nombre }}</h3>
    <p>Precio: {{ producto.precio }}</p>
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
        product: [{
            "id" : 1,
            "nombre": "Zapatillas Nike Air Max 270",
            "precio": 150,
            "descripcion": "Las zapatillas Nike Air Max 270 cuentan con una unidad Max Air en el talón y una parte superior de malla transpirable para ofrecer una comodidad excelente durante todo el día."
          },
        {
            "id" : 2,
            "nombre": "Camiseta Adidas Originals",
            "precio": 35,
            "descripcion": "La camiseta Adidas Originals cuenta con el icónico logotipo de Adidas en el pecho y está confeccionada con algodón suave y cómodo para una mayor comodidad."
        },
        {
            "id" : 3,
            "nombre": "Pantalones Levi's 501",
            "precio": 80,
            "descripcion": "Los pantalones Levi's 501 son unos pantalones vaqueros clásicos de corte recto que se ajustan perfectamente a la cintura y las caderas. Están confeccionados con algodón resistente para una mayor durabilidad."
        },
        {
            "id" : 4,
            "nombre": "Jersey de lana merina",
            "precio": 120,
            "descripcion": "Este jersey de lana merina es suave al tacto y cuenta con una excelente capacidad térmica, lo que lo hace ideal para los días más fríos del año."
        },
        {
            "id" : 5,
            "nombre": "Bolso de cuero",
            "precio": 200,
            "descripcion": "Este elegante bolso de cuero cuenta con múltiples compartimentos y está hecho con cuero de alta calidad para una mayor durabilidad y resistencia."
        },
        {   "id" : 6,
            "nombre": "Chaqueta de cuero",
            "precio": 250,
            "descripcion": "La chaqueta de cuero es una prenda de vestir atemporal que nunca pasa de moda. Esta chaqueta en particular está confeccionada con cuero de alta calidad y cuenta con un forro suave para una mayor comodidad."
        },
        {
            "id" : 6,
            "nombre": "Gorra New Era",
            "precio": 30,
            "descripcion": "La gorra New Era es un accesorio imprescindible para cualquier amante de los deportes. Está confeccionada con materiales de alta calidad y cuenta con el logotipo de tu equipo favorito en el frente."
        },
        {
            "id" : 7,
            "nombre": "Reloj de pulsera Casio",
            "precio": 50,
            "descripcion": "Este reloj de pulsera Casio es resistente al agua y cuenta con una pantalla digital fácil de leer. Es ideal para aquellos que buscan un reloj duradero y funcional."
        },
        {  "id" : 8,
            "nombre": "Pulsera de plata",
            "precio": 75,
            "descripcion": "Esta pulsera de plata es elegante y sofisticada, y es perfecta para cualquier ocasión. Está hecha con plata de ley de alta calidad para una mayor durabilidad."
        },
        {  "id" : 9,
            "nombre": "Pulsera de plata",
            "precio": 75,
            "descripcion": "Esta pulsera de plata es elegante y sofisticada, y es perfecta para cualquier ocasión. Está hecha con plata de ley de alta calidad para una mayor durabilidad."
        }]
      };
    },
  
   created() {
      this.callProducts();
     },
  
    methods: {

      
      async callProducts() {
        //const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYmFydHUiLCJleHAiOjE2ODI3NzM1MTMsImlhdCI6MTY4Mjc2OTkxMywic2NvcGUiOiIifQ.ZV6pCnljBOzcs26P6ELMpWbCOYzACFbdxA8XBvmyWDiCFblEq_oW26RZwk8Pob94a5f_sr_YcOh6o_UJmZYz-XL5nyvhFTrG49KrYgVnbu4pdny-Acrx7f9xuTungnAhLDi76v43MVUJcgru9KQOCXiBJJJUY68VtigvjhJSNZCiP_Iv_g1HhGxiw1wm34Lu3HiQ7kzIou7-EjTCfPtksII7ZWatnybB4ePNAI0YhhdmvgG8RgaLkv04ITM1ij0uX8pS0gdi3j-uE1qgKiLyLreXVjGyEs93oLBteeUFSlbG0AkHfaG42NGJfpL-MmxjKp5TRuHymioZH8X4h3mKzA";
  
        const response = await fetch("https://jsonplaceholder.typicode.com/photos/1", {
          method: "GET",
          //headers: {
            //Authorization: `Bearer ${token}`,
          //},
        })
        .then(response => response.json())
    .then(data => {
      // Handle the response data here

      this.image = data.url
      
      // Display the response data in the console
      // Do other things with the data as needed
    })
    .catch(error => {
      console.error(error); // Log any errors to the console
      // Handle any errors that may have occurred
    });
    
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>

.grid {
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