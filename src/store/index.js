import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    logged: false, 
    user: '',
    token:''
  },
  plugins: [createPersistedState()],
  getters: {
    getLogged(state){
      return state.logged
    },

    getUser(state){
      return state.user
    },

    getToken(state){
      return state.token
    }


  },
  mutations: {
    setLogged(state, value) {
      state.logged = value;
      // Sobrescribe el estado en el almacenamiento persistente
      this.$store.replaceState(this.state);
    },

    setUser(state, value) {
      state.user = value;
      // Sobrescribe el estado en el almacenamiento persistente
      this.$store.replaceState(this.state);
    },

    setToken(state, value) {
      state.token = value;
      // Sobrescribe el estado en el almacenamiento persistente
      this.$store.replaceState(this.state);
    }
  },
  actions: {
  },
  modules: {
  }
})
