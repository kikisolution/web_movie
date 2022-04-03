<?php $v->layout(__DIR__ . "/../../_masterPublic");?>

<?php $v->start("sidebar"); ?>
    <div class="banner_default">
        <video autoplay muted loop>
            <source src="<?=url('assets/movies/videBanner.mp4');?>" type="video/mp4">
        </video>
        <img class="logo" src="<?= url("assets/images/logo.png"); ?>" alt="">
        <div class="title_banner">
            <h1>Faça Login!</h1>
            <p>Tenha acesso agora ao nosso sistema!</p>
            <a href="<?=url('');?>" class="btn btn_success" >Voltar</a>
        </div>
    </div>
<?php $v->end(); ?>

    <div class="formContent section_gap_min">

        <form name="login" id="login" action="<?=url('/login');?>" method="post" enctype="multipart/form-data">
            <input type="email" name="email" id="email" placeholder="Seu email:" required>
            <input type="password" name="password" id="password" placeholder="Senha: " required>
            <div id="buttons">
                <button type="submit" id="btnSubmit" class="btn btn_success">Enviar</button>
                <button type="reset" class="btn btn_secondary">Limpar</button>
            </div>
            <div id="load" style="display: none">
                <img src="<?= url("assets/images/loading.gif"); ?>" width="100">
            </div>
            <div id="msg" style="display: none"></div>
        </form>

    </div>

<?php $v->start("scripts"); ?>

<?php $v->end(); ?>