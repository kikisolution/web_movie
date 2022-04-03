<?php

namespace Source\Web\Controllers;

use GuzzleHttp\Client;
use Source\core\classes\DataUsers;
use Source\core\traits\Support;

class ProxyController
{
    use Support;

    public function __construct($router)
    {

        //Verify authentication User
        $http_header = apache_request_headers();
        if(!((new DataUsers())->userData()) || !(str_replace('Bearer ', '', $http_header['Authorization']) === $_SESSION["dataUser"]['_userTokenJwt'])){
            $arrResponse = ["status" => "error", "message" => "Proxy: Acesso Negado!"];
            toJson($arrResponse);
            die();
        }

    }

    public function get(array $data): void
    {
        $uri = str_replace("__", "/", $data['uri']);
        $url = $_ENV['API_URL'] . "/{$uri}";
        $responseApi = Support::cursRequest($url, $_ENV['API_PORT'], "GET", $_SESSION["dataUser"]['_userTokenJwt']);
        if($responseApi['status'] == "success"){
            toJson(json_decode($responseApi['response']));
        }elseif($responseApi['status'] == "error"){
            $arrResponse = ["status" => "error", "message" => $responseApi['response']];
            toJson($arrResponse);
        }
    }

    public function post(array $data): void
    {

        $uri = str_replace("__", "/", $data['uri']);
        $url = $_ENV['API_URL'] . "/{$uri}";
        $responseApi = Support::cursRequest($url, $_ENV['API_PORT'], "POST", $_SESSION["dataUser"]['_userTokenJwt'], $data);
        if($responseApi['status'] == "success"){
            toJson(json_decode($responseApi['response']));
        }elseif($responseApi['status'] == "error"){
            $arrResponse = ["status" => "error", "message" => $responseApi['response']];
            toJson($arrResponse);
        }
    }

    public function delete(array $data): void
    {

        $uri = str_replace("__", "/", $data['uri']);
        $url = $_ENV['API_URL'] . "/{$uri}";
        $responseApi = Support::cursRequest($url, $_ENV['API_PORT'], "DELETE", $_SESSION["dataUser"]['_userTokenJwt']);
        if($responseApi['status'] == "success"){
            toJson(json_decode($responseApi['response']));
        }elseif($responseApi['status'] == "error"){
            $arrResponse = ["status" => "error", "message" => $responseApi['response']];
            toJson($arrResponse);
        }
    }

}