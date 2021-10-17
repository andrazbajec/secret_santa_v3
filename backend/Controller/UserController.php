<?php

namespace Controller;

use Exception\InvalidDataException;
use Model\UserModel;

class UserController
{
    /**
     * @return array
     * @throws InvalidDataException
     */
    public function registerUser(): array
    {
        $name = $_POST['name'] ?? null;
        $email = $_POST['email'] ?? null;
        $username = $_POST['username'] ?? null;
        $password = $_POST['password'] ?? null;

        if (!$name) {
            throw new InvalidDataException('Name was not provided!');
        }

        // @TODO - Add email validation
        if (!$email) {
            throw new InvalidDataException('Email was not provided');
        }

        if (!$username) {
            throw new InvalidDataException('Username was not provided!');
        }

        if (!$password) {
            throw new InvalidDataException('Password was not provided!');
        }

        $user = new UserModel();
        $user->createUser($name, $email, $username, $password);

        return $user->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function loginUser(): array
    {
        $username = $_POST['username'] ?? null;
        $password = $_POST['password'] ?? null;

        if (!$username && !$password) {
            throw new InvalidDataException('Invalid username or password');
        }
        $user = new UserModel();
        $user->loginUser($username, $password);

        return $user->toArray();
    }
}