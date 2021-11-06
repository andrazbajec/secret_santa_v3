<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}

header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . '/vendor/autoload.php';

use Carbon\Carbon;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$routeHelper = new Helper\RouteHelper();

try {
    $response = $routeHelper->index();
} catch (Exception $e) {
    $errMessage = $e->getMessage();
    
    $now = Carbon::now('CET');
    $message = sprintf("[%s] %s\n", $now->toDateTimeString(), $errMessage);
    file_put_contents('error.log', $message, FILE_APPEND);
    
    $response = [$errMessage];
}

echo json_encode($response);