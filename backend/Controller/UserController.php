<?php

namespace Controller;

use Exception;
use Controller;
use Exception\ExceptionHelper;
use Controller\DatabaseController;
use Model\User;

class UserController
{
    /** @var ExceptionHelper $exceptionHelper */
    protected ExceptionHelper $exceptionHelper;
    /** @var DatabaseController $databaseController */
    protected DatabaseController $databaseController;

    public function __construct()
    {
        $this->databaseController = new DatabaseController();
        $this->exceptionHelper = new ExceptionHelper();
    }

    /**
     * @return array
     * @throws Exception
     */
    public function registerUser(): array
    {
        $name = $_POST['name'] ?? null;
        $email = $_POST['email'] ?? null;
        $username = $_POST['username'] ?? null;
        $password = $_POST['password'] ?? null;

        if (!$name) {
            $this->exceptionHelper
                ->generateException(403, 'Name param not provided!');
        }

        $user = new User();
        $hashPassword = password_hash($password, PASSWORD_DEFAULT);
        $userData = $user->createUser($name, $email, $username, $hashPassword);
        return (array)$userData;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function loginUser(): array
    {
        $username = $_POST['username'] ?? null;
        $password = $_POST['password'] ?? null;

        if (!$username && !$password) {
            $this->exceptionHelper
                ->generateException(403, 'You are not allowed to log in');
        }
        $user = new User();
        return $user->loginUser($username, $password);
    }
}