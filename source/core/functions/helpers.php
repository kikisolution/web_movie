<?php

    use Source\core\classes\Redirect;

    function dd($dump) {
        echo "<pre>"; var_dump($dump); echo "</pre>";
        die();
    }

    function toJson($data) {
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
        exit();
    }

    function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }

    function url(string $uri = null): string
    {
        if($uri) {
            return $_ENV['URL_BASE'] . "/{$uri}";
        }

        return $_ENV['URL_BASE'];
    }

    function urlApi(string $uri = null): string
    {
        if($uri) {
            return $_ENV['API_URL'] . "/{$uri}";
        }

        return $_ENV['API_URL'];
    }

    function urlApiTMDB(string $uri = null): string
    {
        return $_ENV['API_TMDB_ENDPOINT'];
    }

    function urlTMDBPatchImages(string $uri = null): string
    {
        return $_ENV['API_TMDB_PATH_IMAGES'];
    }

    function redirect($target) {
        return Redirect::redirect($target);
    }

    function back() {
        return Redirect::back();
    }

    function http_referer($param = null) {
        return Redirect::http_referer($param = null);
    }


