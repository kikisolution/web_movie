<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="<?= url("assets/images/logo.png"); ?>">
    <link rel="stylesheet" href="<?= url("assets/css/style.min.css"); ?>">
    <title><?=$title?></title>
</head>
<body>

    <main class="main_content">

        <?php if($v->section("sidebar")):
            echo $v->section("sidebar");
        endif; ?>

        <?= $v->section("content"); ?>

    </main>

    <footer class="footer">
        <?=$_ENV['SITE'];?> - Todos os direitos reservados
    </footer>

    <script src="<?= url("assets/js/app.min.js"); ?>"></script>
    <?= $v->section("scripts"); ?>

</body>
</html>