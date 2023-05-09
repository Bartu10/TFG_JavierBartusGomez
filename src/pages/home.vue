<template>
    <div class="main">
        <div class="first">
            <div class="img-container">
            <img src="../img/young.png">
            <span class="img-text">Temporada Actual</span>
                    </div>
        </div>
        <div class="second">
            <div class="img-container">
                <img src="../img/Liverpool.png">
                <span class="img-text">Retro</span>
            </div>
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
  @media(max-width: 1000px) {
    .main {
      display: grid;
      grid-template: 'first first' 'second second' 'third third';
    }
  }

  .name {
    backdrop-filter: blur(5px);
  }

  .first {
    grid-area: first;
    background-color: rgba(255, 255, 255, 0.9);
    background-color: $grey;
    margin-top: 5rem;
    margin-left: 5rem;
    margin-right: 1rem;
    margin-bottom: 5rem;
    text-align: center;
    overflow: hidden;
  }

  .first:hover .img-container img,
  .second:hover .img-container img {
    opacity: 0.5;
  }

  .first:hover .img-text,
  .second:hover .img-text {
    opacity: 1;
  }

  .first img,
  .second img {
    text-align: center;
    width: 100%;
    transition: opacity 0.3s ease-in-out;
  }

  .second {
    background-color: $grey;
    grid-area: second;
    margin-top: 5rem;
    margin-left: 1rem;
    margin-right: 5rem;
    margin-bottom: 5rem;
    align-items: center;
    justify-content: center;
    display: flex;
    overflow: hidden;
  }

  .img-container {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .img-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 1;
  }

    .third {
        font-family: 'WorkSans';
        grid-area: third;
        height: 30rem;
        margin-bottom: 10%;
        background-color: $principalGreen;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .text {
        padding-left: 10em;
        padding-right: 10em;
        padding-top: 3em;
    }

    .Question {
        text-align: center;
        justify-content: center;
        font-size: 4em;
    }

    .main {
        display: grid;
        grid-template: 
            'first second'
            'third third';
        background-color: $grey;
    }

    span {
        color: white;
    }
</style>