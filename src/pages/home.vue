<template>
    <div class="main">
        <div class="first">
        <img src="../img/i.jpg" class="worldCup">
        </div>
        <div class="second">
        <span>
            second
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
padding-top: 5rem;
margin-top:5rem;
margin-left:10rem;
margin-right: 5rem;
margin-bottom:10rem;
padding-bottom: 7%;
text-align: center;
overflow: hidden;

.worldCup{
text-align: center;
width: 120%;
    
}

}
.second{
grid-area: second;
background-color: rgba(255, 255, 255, 0.9);
padding-top: 5rem;
margin-top:5rem;
margin-left:5rem;
margin-right: 10rem;
margin-bottom:10rem;
padding-bottom: 7%;
align-items: center;
justify-content: center;
display: flex;


span{
color: green;
}
}


.third{
font-family: 'WorkSans';
grid-area: third;

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
    height: 1693px;
    background-image: url("../img/Rectangle1.png")
}

span{
    color: white;
}

img{
    height: 100%;
}



</style>