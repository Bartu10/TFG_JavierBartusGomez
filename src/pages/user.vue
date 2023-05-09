<template>

  <label>
    <input type="radio" name="opcion" v-model="DesignOption" value="Default"/>
    <span class="button">Default Color</span>
  </label>
  
  
  <label>
    <input type="radio" name="opcion" v-model="DesignOption" value="ClubPick"/>
    <span class="button">Club Color</span>
  </label>
  
  </template>
  
  <script>
    export default {
      data() {
        return {
          color: '#ff0000',
          DesignOption: ''
  
        }
      },
      methods:{
          saveColor(){
              this.$store.commit('setColorPrimary', this.color);
          }
  
  
      },
      computed: {
          primaryColor() {
              return this.$store.state.colorPrimary   
          }
      }
  
    }
  </script>
  
  <style lang="scss" scoped>
  
    .button {
      display: inline-block;
      padding: 10px;
      background-color: #6699cc;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .button:hover {
      background-color: #5577aa;
    }
    
    input[type="radio"] {
      display: none;
    }
    
    input[type="radio"]:checked + .button {
      background-color: #446699;
    }
  
    
  
  </style>
  
  