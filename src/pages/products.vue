<template>

<div @click="callOrder()" class="product">

<img  src="https://m.media-amazon.com/images/I/51SkWDJBIQL._AC_UY550_.jpg">

</div>
</template>

<script>



export default {
  data() {
    return {
      value: 100,
      description: "Juanjo",
    };
  },
    methods: {
    async callOrder(){
    try{
        let dato = {value : this.value,
            description: this.description
        }
        const response = await fetch('http://localhost:3000/create',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dato)
        });
        
        const data = await response.json();
        window.location.href = data.links[1].href
    }
    catch (error) {
        console.error(error)
    }
}
}
}
</script>

<style lang="scss" scoped>

.product{
    

    img{
        height: 100px;
        border: 10px solid black;
    }
}



</style>