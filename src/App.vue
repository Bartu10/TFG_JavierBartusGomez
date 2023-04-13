<template>
  <navbar />
  <router-view/>
</template>


<script>
import Navbar from './shared/navbar.vue';
export default {components: {Navbar}}
</script>


<style>
body{
  margin: 0;
}
</style>
