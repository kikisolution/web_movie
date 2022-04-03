<?php

namespace Source\Web\Controllers;

use Dotenv\Dotenv;
use League\Plates\Engine;
use Source\core\classes\DataUsers;
use Source\core\traits\Support;

class PublicController
{
    private $view;

    public function __construct()
    {
        $this->view = Engine::create(__DIR__ . "/../Views/pages/public", "php");
    }

    public function homePage(array $data): void
    {

        echo $this->view->render("home", [
            "title" => "Home | " . $_ENV['SITE'],
        ]);
    }

    public function createAnAccountPage(array $data): void
    {
        echo $this->view->render("createAnAccount", [
            "title" => "Criar Conta | " . $_ENV['SITE'],
        ]);
    }

    public function createAnAccountRequest(array $data): void
    {
        $url = $_ENV['API_URL'] . "/create-user";
        $responseApi = Support::cursRequest($url, $_ENV['API_PORT'], "POST", $_SESSION["dataUser"]['_userTokenJwt'], $data);
        if($responseApi['status'] == "success"){
            toJson(json_decode($responseApi['response']));
        }elseif($responseApi['status'] == "error"){
            $arrResponse = ["status" => "error", "message" => $responseApi['response']];
            toJson($arrResponse);
        }
    }

    public function loginPage(array $data): void
    {
        //Verify authentication User
        if((new DataUsers())->userData()){ redirect("/dashboard"); }

        echo $this->view->render("login", [
            "title" => "Login | " . $_ENV['SITE'],
        ]);
    }

    public function loginAuthorizationRequest(array $data): void
    {

        $url = $_ENV['API_URL'] . "/auth/login";
        $responseApi = Support::cursRequest($url, $_ENV['API_PORT'], "POST", $_SESSION["dataUser"]['_userTokenJwt'], $data);
        if($responseApi['status'] == "success"){
            toJson(json_decode($responseApi['response']));
        }elseif($responseApi['status'] == "error"){
            $arrResponse = ["status" => "error", "message" => $responseApi['response']];
            toJson($arrResponse);
        }
    }

    public function setSessionPhp(array $data): void
    {

        if((new DataUsers())->setSession($data)){
            $arrResponse = [
                "status" => "success",
                "redirect" => url("dashboard")
            ];
        }else{
            $arrResponse = [
                "status" => "error",
                "message" => "opss, algo deu errado..."
            ];
        }
        toJson($arrResponse);
    }

}