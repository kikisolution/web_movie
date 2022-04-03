<?php $v->layout(__DIR__ . "/../../_masterPublic");?>

<div class="banner_home">
    <video autoplay muted loop>
        <source src="<?=url('assets/movies/videBanner.mp4');?>" type="video/mp4">
    </video>
    <div class="content_home">
        <img src="<?= url("assets/images/logo.png"); ?>" alt="">
        <h1>Oooops erro <?= $error; ?>!</h1>
        <p>Algo deu errado...</p>
        <a href="<?=url('');?>" class="btn btn_success" >Voltar</a>
    </div>
</div>

<?php $v->start("scripts"); ?>

<?php $v->end(); ?>