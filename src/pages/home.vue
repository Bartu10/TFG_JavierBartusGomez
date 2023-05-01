<template>
    <div class="main">
        <div class="first">
        <img src="../img/young.jpg">
        </div>
        <div class="second">
        <span>
            <img src="../img/Liverpool.png">
        </span>
    </div>
        <div class="third">
            <div class="Question">
        <span>
            ¿Quiénes somos?
        </span>
            </div>
            <span class="text">
            Somos una empresa especializada en la venta de camisetas de fútbol retro. 
            Nos apasiona el fútbol y creemos que la moda y la historia del deporte son esenciales para mantener vivo su legado.
            Ofrecemos una amplia variedad de camisetas de fútbol de décadas pasadas con diseños auténticos y únicos.
            Nos esforzamos por brindarte una experiencia de compra fácil, segura y rápida para que puedas disfrutar de tus camisetas de fútbol retro lo antes posible.
            En resumen, somos expertos en moda deportiva, apasionados por la historia del fútbol y comprometidos en ofrecerte lo mejor en estilo y calidad.
        </span>    
        </div>
    </div>
</template>



<style lang="scss" scoped>
@import '../scss/global.scss';



.first{grid-area: first;
background-color: rgba(255, 255, 255, 0.9);
margin-top:5rem;
margin-left:5rem;
margin-right: 1rem;
margin-bottom:5rem;
text-align: center;
overflow: hidden;

img{
text-align: center;
width: 90%;
}

}
.second{
grid-area: second;
background-color: rgba(255, 255, 255, 0.9);
margin-top:5rem;
margin-left:1rem;
margin-right: 5rem;
margin-bottom: 5rem;
align-items: center;
justify-content: center;
display: flex;

img{
text-align: center;
width: 90%;
}
span{
color: green;
}
}


.third{
font-family: 'WorkSans';
grid-area: third;
height: 30rem;
margin-bottom: 10%;
background-color: $principalGreen;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .text{
        padding-left: 10em;
        padding-right: 10em;
        padding-top:3em ;  
    }


.Question{
text-align: center;
justify-content: center;
font-size:4em ;    

}
}
.main{
    display: grid;
    grid-template: 
    'first second'
    'third third';
    background-color:$grey ;
   
}

span{
    color: white;
}




</style>