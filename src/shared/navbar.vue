<template>
  <ul>
    <li>
      <button v-if="$store.state.logged" class="user-button" @click="toggleMenu">
        <i class="fas fa-user"></i>
      </button>
    </li>
    <li>
      <a v-if="$store.state.logged" @click="$router.push('/')">Home</a>
    </li>
    <li>
      <a v-if="$store.state.logged" @click="$router.push('/login')">Login</a>
    </li>
    <li>
      <a v-if="$store.state.logged" href="#contact">Contact</a>
    </li>
    <li>
      <a v-if="$store.state.logged" href="#about">About</a>
    </li>
  </ul>

  <div>
    <div
      class="menu"
      v-show="isMenuOpen"
      @clickaway="isMenuOpen = false"
      @click.stop
    >
      <ul>
        <li>Opción 1</li>
        <li>Opción 2</li>
        <li>Opción 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.classList.add('page--disabled');
      } else {
        document.body.classList.remove('page--disabled');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

.user-button {
  z-index: 12;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.user-button i {
  color: #333;
  font-size: 24px;
}

.user-button:hover i {
  color: #555;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: $principalGreen;
}

li {
  float: right;
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

.menu {
  position: absolute;
  top: 50px;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: white;
  z-index: 1000;
  filter: none;
  pointer-events: all;
  user-select: all;
  opacity: 1;
}

.page--disabled {
  filter: blur(2px);
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.page--disabled .menu {
  pointer-events: all;
  user-select: all;
  opacity: 1;
}
</style>