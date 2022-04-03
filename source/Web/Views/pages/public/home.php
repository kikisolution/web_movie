<?php $v->layout(__DIR__ . "/../../_masterPublic");?>

    <div class="banner_home">
        <video autoplay muted loop>
            <source src="<?=url('assets/movies/videBanner.mp4');?>" type="video/mp4">
        </video>
        <div class="content_home">
            <img src="<?= url("assets/images/logo.png"); ?>" alt="">
            <h1>Seja Bem vindo!</h1>
            <p>Aqui você gerencia seus filmes e séries favoritos!</p>
            <a href="<?=url('login');?>" class="btn btn_success" >Entrar!</a>
            <a href="<?=url('criar-conta');?>" class="btn btn_secondary" type="button">Criar Conta</a>
        </div>
    </div>

<?php $v->start("scripts"); ?>

<?php $v->end(); ?>