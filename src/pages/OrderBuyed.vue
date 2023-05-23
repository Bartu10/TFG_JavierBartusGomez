<template>
    <h2></h2>
</template>

<script>
export default {
    data() {
        return{

        }
    },


    created(){
        this.GetAllOrders()
    },

    methods:{
        async GetAllOrders(){
            const token = this.$store.state.token
            const response = await fetch("http://localhost:8080/orders/", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => response.json())
            response.forEach(element => {
                console.log(element)
            });
        }
    }
}
</script>


<style lang="scss" scoped>

</style>