<?php

namespace Helper;

use Controller\RoomController;
use Controller\UserController;
use Exception;
use Exception\NotFoundException;

class RouteHelper
{
    /** @var UserController */
    protected UserController $userController;
    /** @var RoomController */
    protected RoomController $roomController;

    public function __construct()
    {
        $this->userController = new UserController();
        $this->roomController = new RoomController();
    }

    /**
     * @return array
     * @throws Exception\InvalidDataException
     * @throws Exception\UnauthorizedException
     * @throws NotFoundException
     */
    public function index(): array
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? null;
        $uri = $_SERVER['PATH_INFO'] ?? null;

        switch ($method) {
            case 'POST':
                switch ($uri) {
                    case '/register':
                        return $this->userController->registerUser();
                    case '/login':
                        return $this->userController->loginUser();
                    case '/authenticate':
                        return $this->userController->authenticate();
                    case '/create-room':
                        return $this->roomController->createRoom();
                    case '/join-room':
                        return $this->roomController->joinRoom();
                    case '/room':
                        return $this->roomController->getRoomData();
                    case '/generate-room':
                        return $this->roomController->generateRoom();
                    case '/send-reset-password-email':
                        return $this->userController->sendResetPasswordEmail();
                    case '/reset-password':
                        return $this->userController->resetPassword();
                }
                break;
            case 'GET':
                switch ($uri) {
                    case '/room-list':
                        return $this->roomController->getRoomList();
                    case '/user-rooms':
                        return $this->roomController->getUserRooms();
                }
        }

        throw new NotFoundException('Route not found!');
    }
}