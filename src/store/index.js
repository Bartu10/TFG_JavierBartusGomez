import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    logged: false, 
    user: '',
    colorPrimary: 'green',
  },
  plugins: [createPersistedState()],
  getters: {
    getLogged(state){
      return state.logged
    },

    getUser(state){
      return state.user
    },

    getColor(state){
      return state.colorPrimary
    }


  },
  mutations: {
    setLogged(state, value){
      state.logged = value
    },

    setUser(state, value){
      
      //TODO: GET ALL DATA FROM USER FROM DATABASE
      
      state.user = value
    },


    setColorPrimary(state, value){
      state.colorPrimary = value
    }

  
  },
  actions: {
  },
  modules: {
  }
})
