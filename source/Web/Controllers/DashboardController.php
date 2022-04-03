<?php

namespace Source\Web\Controllers;

use Source\core\classes\DataUsers;
use League\Plates\Engine;
use Source\core\traits\Support;
use Source\Web\Models\User;

class DashboardController
{
    use Support;

    private $view;

    public function __construct($router)
    {
        //Verify authentication User
        if(!(new DataUsers())->userData()){ redirect("/"); }

        $this->router = $router;

        $this->view = Engine::create(__DIR__ . "/../Views/pages/dashboard", "php");
    }

    /**
     * @param array $data
     */
    public function homePage(array $data): void
    {

        $dataUser = $_SESSION["dataUser"];
        echo $this->view->render("home", [
            "title" => "Dashboard Home | " . $_ENV['SITE'],
            "subtitle" => "Home",
            "dataUser" => (object) $dataUser,
            "router" => $this->router
        ]);
    }

    /**
     * @param array $data
     */
    public function listFavoritePage(array $data): void
    {

        echo $this->view->render("listFavorits", [
            "title" => "Dashboard Favoritos | " .$_ENV['SITE'],
            "subtitle" => "Meus Favoritos",
            "router" => $this->router
        ]);

    }

    /**
     * @param array $data
     */
    public function searchMoviesPage(array $data): void
    {

        echo $this->view->render("searchMovies", [
            "title" => "Dashboard Pesquisar | " . $_ENV['SITE'],
            "subtitle" => "Pesquisar",
            "router" => $this->router
        ]);

    }

    /**
     * @return void
     */
    public function loggedOut(): void
    {
        session_destroy();
        redirect("/");
    }

}