<template>
    <div class="product-detail">
  <div class="product-image">
    <img :src=this.image alt="Product Image">
  </div>
  <div class="product-info">
    <h2>{{ this.productComplete.nombre }}</h2>
    <h2>{{ this.productComplete.descripcion }}</h2>
    <h2>{{ this.productComplete.precio }}€ </h2>
    <div class="product-size">
      <label for="size-select">Talla:</label>
      <select name="size" id="size-select" v-model="this.talla">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>
    <button class="add-to-cart" @click="addToCart">Añadir al carrito</button>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            talla:'S',
            image: '',
            productComplete: '',
            id: '',
            product: [{
            "id" : 1,
            "nombre": "Zapatillas Nike Air Max 270",
            "precio": 150,
            "descripcion": "Las zapatillas Nike Air Max 270 cuentan con una unidad Max Air en el talón y una parte superior de malla transpirable para ofrecer una comodidad excelente durante todo el día.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
          },
        {
            "id" : 2,
            "nombre": "Camiseta Adidas Originals",
            "precio": 35,
            "descripcion": "La camiseta Adidas Originals cuenta con el icónico logotipo de Adidas en el pecho y está confeccionada con algodón suave y cómodo para una mayor comodidad.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        
        },
        {
            "id" : 3,
            "nombre": "Pantalones Levi's 501",
            "precio": 80,
            "descripcion": "Los pantalones Levi's 501 son unos pantalones vaqueros clásicos de corte recto que se ajustan perfectamente a la cintura y las caderas. Están confeccionados con algodón resistente para una mayor durabilidad.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {
            "id" : 4,
            "nombre": "Jersey de lana merina",
            "precio": 120,
            "descripcion": "Este jersey de lana merina es suave al tacto y cuenta con una excelente capacidad térmica, lo que lo hace ideal para los días más fríos del año.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {
            "id" : 5,
            "nombre": "Bolso de cuero",
            "precio": 200,
            "descripcion": "Este elegante bolso de cuero cuenta con múltiples compartimentos y está hecho con cuero de alta calidad para una mayor durabilidad y resistencia.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {   "id" : 6,
            "nombre": "Chaqueta de cuero",
            "precio": 250,
            "descripcion": "La chaqueta de cuero es una prenda de vestir atemporal que nunca pasa de moda. Esta chaqueta en particular está confeccionada con cuero de alta calidad y cuenta con un forro suave para una mayor comodidad.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {
            "id" : 6,
            "nombre": "Gorra New Era",
            "precio": 30,
            "descripcion": "La gorra New Era es un accesorio imprescindible para cualquier amante de los deportes. Está confeccionada con materiales de alta calidad y cuenta con el logotipo de tu equipo favorito en el frente.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {
            "id" : 7,
            "nombre": "Reloj de pulsera Casio",
            "precio": 50,
            "descripcion": "Este reloj de pulsera Casio es resistente al agua y cuenta con una pantalla digital fácil de leer. Es ideal para aquellos que buscan un reloj duradero y funcional.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {  "id" : 8,
            "nombre": "Pulsera de plata",
            "precio": 75,
            "descripcion": "Esta pulsera de plata es elegante y sofisticada, y es perfecta para cualquier ocasión. Está hecha con plata de ley de alta calidad para una mayor durabilidad.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        },
        {  "id" : 9,
            "nombre": "Pulsera de plata",
            "precio": 75,
            "descripcion": "Esta pulsera de plata es elegante y sofisticada, y es perfecta para cualquier ocasión. Está hecha con plata de ley de alta calidad para una mayor durabilidad.",
            "XL": 0,
            "L": 0,
            "M": 0,
            "S": 0,
        }]
        }
    },

    methods:{
addToCart() {
  
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let isProductAlreadyInCart = false
    this.productComplete.talla = this.talla

    for (let x in cart) {
        if (cart[x].id === this.productComplete.id && cart[x].talla === this.talla) {
            cart[x].quantity++
            isProductAlreadyInCart = true
            break
        }
    }

    if (!isProductAlreadyInCart) {
        let product = this.productComplete
        product.quantity = 1
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    location.reload()
}
    },
    created() {
        
        this.id = this.$route.params.id;
        for (let x in this.product){
            if(this.product[x]["id"] == this.id){
                this.productComplete = this.product[x]        

            }
        }
        const response = fetch("https://jsonplaceholder.typicode.com/photos/1", {
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

        
    }
}


</script>

<style lang="scss" scoped>
@import '../scss/global.scss';
*{
    font-family: 'WorkSans';
}
.product-detail {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .product-image {
    width: 40%;
    img {
      max-width: 100%;
    }
  }
  .product-info {
    width: 60%;
    padding: 10px;
    .product-name {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .product-description {
      margin-bottom: 10px;
    }
    .product-price {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .product-size {
      margin-bottom: 10px;
      label {
        margin-right: 10px;
      }
      select {
        padding: 5px;
        font-size: 16px;
      }
    }
    .add-to-cart {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      background-color: $principalGreen;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #4CA686;
      }
    }
  }
}
</style>