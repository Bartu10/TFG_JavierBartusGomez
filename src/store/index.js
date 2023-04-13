import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    logged: false, 
    username: '',
  },
  plugins: [createPersistedState()],
  getters: {
    getLogged(state){
      return state.logged
    },

    getUser(state){
      return state.username
    }
  },
  mutations: {
    setLogged(state, value){
      state.logged = value
    },

    setUser(state, value){
      state.username = value
    }

  
  },
  actions: {
  },
  modules: {
  }
})
