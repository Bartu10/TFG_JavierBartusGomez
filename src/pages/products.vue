<template>
  <div class="grid">
  <div v-for="producto in product" :key="producto.nombre" class="cell" @click="this.$router.push(`/product/${producto.id}`)">
    <img :src=producto.img class="icon">
    <h3>{{ producto.name }}</h3>
    <p>Precio: {{ producto.price }}</p>
    <p>{{ producto.team }}</p>
    <p>{{ producto.yr }}</p>
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
        product: ''
      };
    },
  
   created() {
      this.callProducts();
     },
  
    methods: {

      
      async callProducts() {

        const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYmFydHUiLCJleHAiOjE2ODM3OTU0NDEsImlhdCI6MTY4Mzc5MTg0MSwic2NvcGUiOiIifQ.PKuu7MQEUT_q7O27QkkHHN5IzgUOn5XrvnMwjeLRsCZwOoEJL34aeR7uwXL5rrcLnabMXdd7cqSGCg1oCD_l-oFl2wH3ePA-tmDkuj8viuUKh3LendmfF8wrMFyLKFNhkeD8RDRTi28iKND5hoFdzUhaQ4CEwPeM33nrsmdjxpOLjmLndR8yoDDkeMqqczHtTzZkd4LHu0GKkxcZcdbB9sam-SrL06nc_OGZaHL71n5hDW5Y7XK2VNxFC00MwJRPADGkJ9fE9HeU2vnImwAU40v_n27ckEaQGI9pJLE3eAK6eBBwQAmoqWfWXDkyuLDW7kHbKEmc-uiP7Pu-U90WyA"
        /*        
          const user = 'javi@gmail.com'
          const password = '123'
          const token = await fetch("http://localhost:8080/token", {
          method: "POST",
          headers: {
    'Authorization': 'Basic ' + window.btoa(user + ':' + password),
    'Content-Type': 'application/json'
  },
          })
          .then(token => console.log(token))
          */
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