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
        <span>
            third
        </span>
        </div>
    </div>
</template>



<style scoped>
.first{grid-area: first;
background-color: rgba(255, 255, 255, 0.5);
margin-top:20rem;
margin-left:15rem;
margin-right: 15rem;
}
.second{grid-area: second;
    background-color: rgba(255, 255, 255, 0.5);
margin-top:20rem;
margin-left:15rem;
margin-right: 15rem;}

.third{grid-area: third;
    background-color: grey;}
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