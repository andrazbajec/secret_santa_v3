<?php

namespace Helper;

use Controller\UserController;
use Exception;
use Exception\NotFoundException;

class RouteHelper
{
    /** @var UserController */
    protected UserController $userController;

    public function __construct()
    {
        $this->userController = new UserController();
    }

    /**
     * @return array
     * @throws Exception
     */
    public function index(): array
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? null;
        $uri = $_SERVER['REQUEST_URI'] ?? null;

        switch ($method) {
            case 'POST':
                switch ($uri) {
                    case '/register':
                        return $this->userController->registerUser();
                    case '/login':
                        return $this->userController->loginUser();
                }
        }

        throw new NotFoundException('Route not found!');
    }
}