<?php

namespace Model;

use Controller\DatabaseController;
use Exception;
use Exception\ExceptionHelper;

class User
{
    /** @var string $name */
    public string $name;
    /** @var string $email */
    public string $email;
    /** @var string $username */
    public string $username;
    /** @var string $password */
    private string $password;

    /** @var DatabaseController $databaseController */
    private DatabaseController $databaseController;
    /** @var ExceptionHelper $exceptionHelper */
    private ExceptionHelper $exceptionHelper;
    /** @var array $fields */

    private array $readable = [
        'name',
        'email',
        'username',
        'token',
        'time'
    ];

    /**
     *
     */
    public function __construct()
    {
        $this->databaseController = new DatabaseController();
        $this->exceptionHelper = new ExceptionHelper();
    }

    /**
     * @param string $name
     * @param string $email
     * @param string $username
     * @param string $password
     * @return $this
     * @throws Exception
     */
    public function createUser(string $name, string $email, string $username, string $password): User
    {
        $this->name = $name;
        $this->email = $email;
        $this->username = $username;
        $this->password = $password;

        $Columns = ['username'];
        $Table = 'users';
        $Data = [
            'username' => $username
        ];

        $result = $this->databaseController->select($Table, $Data, $Columns)[0] ?? null;
        if ($username == $result['username'] ?? null) {
            $this->exceptionHelper
                ->generateException(404, 'Username already exist');
        }
        $this->save($name, $email, $username, $password);
        $this->toArray($name);
        return $this;
    }

    /**
     * @param string $username
     * @param string $password
     * @return array
     * @throws Exception
     */
    public function loginUser(string $username, string $password): array
    {
        $this->username = $username;
        $this->password = $password;

        $Columns = ['username', 'password', 'name'];
        $Table = 'users';
        $Data = [
            'username' => $username
        ];

        $result = $this->databaseController->select($Table, $Data, $Columns)[0] ?? null;
        $hashPassword = $result['password'] ?? null;

        if (!$username || !$password) {
            $this->exceptionHelper->generateException(404, 'User doesnt exist');
        }
        if (!$hashPassword) {
            $this->exceptionHelper->generateException(404, 'User doesn\'t exist');
        }
        if (!password_verify($password, $hashPassword)) {
            $this->exceptionHelper->generateException(401, 'Wrong password');
        }

        $this->username = $result['username'];
        $this->name = $result['name'];

        $this->toArray($name);

        return (array)$this;
    }

    /**
     * @param string $name
     * @param string $email
     * @param string $username
     * @param string $password
     */
    public function save(string $name, string $email, string $username, string $password)
    {
        $table = 'users';
        $data = [
            'name' => $name,
            'email' => $email,
            'username' => $username,
            'password' => $password
        ];

        $this->databaseController->insert($table, $data);
    }

    public function toArray($name): array
    {
        $userData = [$name];
        return [$userData];
    }
}