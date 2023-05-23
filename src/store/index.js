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
    setLogged(state, value){
      state.logged = value
    },

    setUser(state, value){
      state.user = value
    },

    setToken(state, value){
      state.token = value
    }

  
  },
  actions: {
  },
  modules: {
  }
})
