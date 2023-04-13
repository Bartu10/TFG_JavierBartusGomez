<template>
    <h2>Buenas</h2>
    <button @click="callOrder">Click</button>
</template>

<script>
export default {
 methods: {
    async callOrder(){
    try{
        let dato = {value : 100,
            description: "uigfuifgew"
        }
        const response = await fetch('http://localhost:3000/create',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dato)
        });
        
        const data = await response.json();
        window.location.href = data.links[1].href
    }
    catch (error) {
        console.error(error)
    }
}
}
}
</script>