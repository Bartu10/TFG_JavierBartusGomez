<template>
    <div class="completed">
    <p>¡Felicidades! Has completado con éxito el pedido número {{ this.buy }}. Agradecemos tu preferencia y esperamos que disfrutes de tu compra. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos. ¡Esperamos verte nuevamente pronto!</p>
    
    <div class="buttons">
        <button class="btn" @click="this.$router.push('/')">Volver a la tienda</button>
        <button class="btn" @click="this.$router.push('/orders')">Ver historial de pedidos</button>
    </div>
</div>



    
</template>

<script lang="js">
export default {
    data() {
        return {
            buy: '', // Variable para almacenar el pedido completado
            delCartOpt: false, // Variable de opción de eliminación de carrito (valor inicial: falso)
        };
    },
    created() {
        localStorage.removeItem("cart"); // Elimina el elemento "cart" del almacenamiento local
        this.GetLastOrder(); // Obtiene el último pedido del usuario
    },
    methods: {
        async GetLastOrder() {
            const user = this.$store.state.user.user; // Obtiene el usuario actual del almacenamiento local
            let orders = await fetch('https://backendnodetfg.onrender.com/orders', { // Realiza una solicitud GET a la API para obtener todos los pedidos
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Establece el tipo de contenido de la solicitud
                },
            });
            orders = await orders.json(); // Convierte la respuesta en formato JSON
            
            orders = orders.filter((order) => order.user === user.id); // Filtra los pedidos para obtener solo los del usuario actual
            

            const highestId = orders.reduce((maxId, order) => {
              return order.id > maxId ? order.id : maxId;
            }, 0);

            this.buy = highestId; // Establece el pedido más alto como el pedido completado
            console.log(this.buy)
        }
    }
}
</script>
<style lang="scss">
@import '../scss/global.scss';

* {
    font-family: WorkSans; // Establece la fuente global para todos los elementos
}

.buttons {
    display: flex;
    justify-content: space-around; // Alinea los botones horizontalmente con espacio alrededor
}

.completed {
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 100px;
    text-align: center; // Centra el texto dentro del contenedor
    font-size: 20px;
    color: #000000; // Establece el color del texto a negro
    background-color: #ffffff; // Establece el color de fondo a blanco
    border-radius: 10px; // Establece el radio de borde a 10px para hacer esquinas redondeadas
    padding: 20px; // Agrega un relleno interno de 20px al contenedor
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75); // Agrega una sombra al contenedor
}

.btn {
    font-size: 1.2rem; // Establece el tamaño de fuente del botón
    padding: 0.5rem 1rem; // Establece el relleno del botón
    background-color: $principalGreen; // Establece el color de fondo del botón usando una variable
    color: #fff; // Establece el color del texto del botón a blanco
    border: none; // Elimina el borde del botón
    border-radius: 4px; // Establece el radio de borde a 4px para hacer esquinas redondeadas
    cursor: pointer; // Cambia el cursor cuando se pasa sobre el botón
    
    &:hover {
        background-color: #4CA686; // Cambia el color de fondo del botón cuando se pasa el cursor sobre él
        cursor: pointer; // Cambia el cursor cuando se pasa sobre el botón
    }
}
</style>