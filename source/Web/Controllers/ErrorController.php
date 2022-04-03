<?php

namespace Source\Web\Controllers;

use League\Plates\Engine;

class ErrorController
{
    private $view;

    public function __construct()
    {
        $this->view = Engine::create(__DIR__ . "/../Views/pages/public", "php");
    }

    public function error(array $data): void
    {
        echo $this->view->render("error", [
            "title" => "Error {$data['errcode']} | " . SITE,
            "error" => $data["errcode"]
        ]);
    }
}