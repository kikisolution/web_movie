<?php $v->layout(__DIR__ . "/../../_masterDashboard");?>

<div id="barSearch">

    <div class="formContent">

        <form name="searchMovies" id="searchMovies" action="" method="post" enctype="multipart/form-data">
            <input type="text" name="search" id="search" placeholder="Digite sua pesquisa..." required>
            <div id="buttons">
                <button type="submit" id="btnSubmit" class="btn btn_success">Pesquisar</button>
                <button type="reset" id="btnClear" class="btn btn_secondary">Limpar</button>
            </div>
            <div id="load" style="display: none">
                <img src="<?= url("assets/images/loading.gif"); ?>" width="100">
            </div>
            <div id="msg" style="display: none"></div>
        </form>

    </div>
    <div id="custom-pagination">
        <details class="custom-select">
            <summary class="radios" id="summaryList">
                <input type="radio" name="item" id="default" title="Paginaçao..." checked>
            </summary>
            <ul class="list" id="ulList"></ul>
        </details>
    </div>
    <div id="result"></div>

</div>

<section class="cards" id="cards"></section>

<div class="oops" id="oops"></div>

<?php $v->start("scripts"); ?>

<?php $v->end(); ?>





