<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$routeHelper = new Helper\RouteHelper();

try {
    $response = $routeHelper->index();
} catch (Exception $e) {
    $response = [$e->getMessage()];
}

echo json_encode($response);