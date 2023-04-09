<template>
    <h2>Buenas</h2>
    <button @click="callOrder">Click</button>
</template>

<script>
export default {
 methods: {
    async callOrder(){
    try{
        const response = await fetch('http://localhost:3000/create',{
            method:"POST"
        });
        const data = await response.json();
        console.log(data.links[1].href)
        window.location.href = data.links[1].href
    }
    catch (error) {
        console.error(error)
    }
}
}
}
</script>