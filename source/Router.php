<?php

use CoffeeCode\Router\Router;

$router = new Router($_ENV['URL_BASE']);

/*
 * Routers Web
 */

/*
 * Controllers
 */
$router->namespace("Source\Web\Controllers");

/*
 * new account
 * login
 */
$router->group(null);
$router->get("/", "PublicController:homePage");
$router->get("/criar-conta", "PublicController:createAnAccountPage");
$router->post("/criar-conta", "PublicController:createAnAccountRequest");
$router->get("/login", "PublicController:loginPage");
$router->post("/login", "PublicController:loginAuthorizationRequest");
$router->post("/setSession", "PublicController:setSessionPhp");

/*
 * dashboard
 */
$router->group("dashboard")->namespace("Source\Web\Controllers");
$router->get("/", "DashboardController:homePage", "dashboard.homepage");
$router->get("/favoritos", "DashboardController:listFavoritePage", "dashboard.favorits");
$router->get("/pesquisar", "DashboardController:searchMoviesPage", "dashboard.search_movies");
$router->get("/logout", "DashboardController:loggedOut", "dashboard.logout");

/*
 * proxy API
 */
$router->group("proxy")->namespace("Source\Web\Controllers");
$router->get("/{uri}", "ProxyController:get");
$router->post("/{uri}", "ProxyController:post");
$router->delete("/{uri}", "ProxyController:delete");

/*
 * ERROS
 */
$router->group("ooops")->namespace("Source\Web\Controllers");
$router->get("/{errcode}", "ErrorController:error");

/*
 * PROCESS
 */
$router->dispatch();
if($router->error()){
    $router->redirect("/ooops/{$router->error()}");
}