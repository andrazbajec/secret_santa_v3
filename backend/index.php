<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/vendor/autoload.php';

use Controller\UserController;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$method = $_SERVER['REQUEST_METHOD'] ?? null;
$uri = $_SERVER['REQUEST_URI'] ?? null;

switch ($method) {
    case 'POST':
        switch ($uri) {
            case '/register':
                echo json_encode((new UserController())->registerUser());
                break;
            case '/login':
                echo json_encode((new UserController())->loginUser());
                break;
        }
        break;
}