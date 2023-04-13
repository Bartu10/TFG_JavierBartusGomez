<template>
<ul>
  <li><a @click="this.$router.push('/')">Home</a></li>
  <li><a @click="this.$router.push('/login')">Login</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
</ul>

</template>

<style lang="scss" scoped>
@import '../scss/global.scss';


ul {
  
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: $principalGreen;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 20px 18px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}

</style>