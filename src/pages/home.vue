<template>
    <div class="main">
        <div class="first">
        <span>
            first
        </span>
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
        </div>
    </div>
</template>



<style lang="scss" scoped>
@import '../scss/global.scss';



.first{grid-area: first;
background-color: rgba(255, 255, 255, 0.7);
margin-top:20rem;
margin-left:15rem;
margin-right: 15rem;

}
.second{
grid-area: second;
background-color: rgba(255, 255, 255, 0.5);
margin-top:20rem;
margin-left:15rem;
margin-right: 15rem;
align-items: center;
justify-content: center;
display: flex;


span{
color: green;
}
}


.third{
font-family: 'WorkSans';
font-size:4em ;
grid-area: third;
margin-top:10%;
margin-bottom: 10%;
background-color: $principalGreen;
  display: flex;
  justify-content: center;
  align-items: center;


.Question{
text-align: center;
justify-content: center;    

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