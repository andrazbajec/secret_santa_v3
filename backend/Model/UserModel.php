<?php

namespace Model;

use Carbon\Carbon;
use Exception\InvalidDataException;

/**
 * @property int    IsDeleted
 * @property int    RoleID
 * @property int    UserID
 * @property string DateCreated
 * @property string DateDeleted
 * @property string DateUpdated
 * @property string Email
 * @property string Name
 * @property string Password
 * @property string Token
 * @property string Username
 */
class UserModel extends AbstractModel
{
    /** @var string $name */
    public string $name;
    /** @var string $email */
    public string $email;
    /** @var string $username */
    public string $username;
    /** @var string $password */
    private string $password;

    /** @var array $fields */
    public array $fillable = [
        'UserID',
        'Username',
        'Name',
        'Email',
        'Token',
        'Time',
        'RoleID',
        'DateCreated',
        'DateUpdated',
        'DateDeleted'
    ];

    /**
     * @param string $name
     * @param string $email
     * @param string $username
     * @param string $password
     * @return $this
     * @throws InvalidDataException
     */
    public function createUser(string $name, string $email, string $username, string $password): UserModel
    {
        $user = $this->databaseController
            ->select('User', ['*'], ['username' => $username]);

        if (count($user)) {
            throw new InvalidDataException('Username is already taken!');
        }

        $this->name = $name;
        $this->email = $email;
        $this->username = $username;

        // Hash password before saving it
        $this->password = password_hash($password, PASSWORD_DEFAULT);

        return $this->save();
    }

    /**
     * @param string $username
     * @param string $password
     * @return $this
     * @throws InvalidDataException
     */
    public function loginUser(string $username, string $password): UserModel
    {
        if (!$username || !$password) {
            throw new InvalidDataException('Username or password was not provided');
        }

        $user = $this->databaseController
                ->select('User', ['*'], ['Username' => $username])[0] ?? null;

        if (!$user) {
            throw new InvalidDataException('User does not exist!');
        }

        $hashedPassword = $user['Password'] ?? '';

        if (!password_verify($password, $hashedPassword)) {
            throw new InvalidDataException('Incorrect password!');
        }

        $this->loadData();

        return $this;
    }

    /**
     * @return $this
     */
    public function save(): UserModel
    {
        $data = [
            'Name' => $this->name,
            'Email' => $this->email,
            'Username' => $this->username,
            'Password' => $this->password
        ];

        $this->databaseController
            ->insert('User', $data);

        $this->loadData();

        return $this;
    }

    /**
     * @return void
     */
    private function loadData(): void
    {
        $user = $this->databaseController
                ->select('User', ['*'], ['Username' => $this->username])[0] ?? [];

        if (!count($user)) {
            return;
        }

        foreach ($user as $key => $value) {
            $this->$key = $value;
        }

        $token = new UserTokenModel();
        $token->createToken($this->UserID);

        $this->Token = $token->Token;
    }

    /**
     * @param int    $userID
     * @param string $token
     * @return array
     * @throws InvalidDataException
     */
    public function validateToken(int $userID, string $token): array
    {
        $tokenData = $this->databaseController
                ->select(
                    'UserToken',
                    ['*'],
                    ['UserID' => $userID, 'Token' => $token]
                )[0] ?? [];

        $dateExpiration = $tokenData['DateExpiration'] ?? null;

        if (!count($tokenData) || !$dateExpiration) {
            throw new InvalidDataException('Invalid userID or token!');
        }

        $dateExpiration = Carbon::parse($dateExpiration);

        if ($tokenData['DateDeleted'] ?? null || !$dateExpiration->isValid() || $dateExpiration < Carbon::now()) {
            throw new InvalidDataException('Token has expired!');
        }

        return (new UserTokenModel())->createToken($userID)
            ->toArray();
    }
}