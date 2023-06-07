<template>
    <form @submit.prevent="agregarProducto">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre">
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="descripcion"></textarea>
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input type="number" id="precio" v-model="precio">
      </div>
      <div>
        <label for="estado">Estado:</label>
        <select id="estado" v-model="estado">
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
      </div>
      <div>
        <label for="anio">Año:</label>
        <input type="text" id="yr" v-model="yr">
      </div>
      <div>
        <label for="equipo">Equipo:</label>
        <input type="text" id="equipo" v-model="equipo">
      </div>
      <div>
        <label for="imagen">Imagen (URL):</label>
        <input type="text" id="imagen" v-model="imagen">
      </div>
      <div>
        <label for="tallas-xl">Tallas XL:</label>
        <input type="number" id="tallas-xl" v-model="xl">
      </div>
      <div>
        <label for="tallas-l">Tallas L:</label>
        <input type="number" id="tallas-l" v-model="l">
      </div>
      <div>
        <label for="tallas-m">Tallas M:</label>
        <input type="number" id="tallas-m" v-model="m">
      </div>
      <div>
        <label for="tallas-s">Tallas S:</label>
        <input type="number" id="tallas-s" v-model="s">
      </div>
      <button type="submit">Agregar producto</button>
    </form>
  </template>

<script>
export default {
    data(){
        return{
            nombre:'',
            descripcion:'',
            precio:'',
            estado:'',
            yr:'',
            retro:true,
            equipo:'',
            imagen:'',
            xl:'',
            l:'',
            m:'',
            s:'',
    }
        
    },
    methods:{
        async agregarProducto(){
            const product = {
            name:this.nombre,
            description:this.descripcion,
            price:this.descripcion,
            state:this.estado,
            yr:this.yr,
            team:this.equipo,
            retro:this.retro,
            img:this.imagen,
            xl:this.xl,
            l:this.l,
            m:this.m,
            s:this.s,
            }
            const token = this.$store.state.token
            console.log(product)
            const response = await fetch("http://localhost:8080/products/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        })
        .then(response => response.json())
        console.log(response)
        }

        
    }
}
</script>