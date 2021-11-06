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
     * @param bool   $login
     * @return $this
     * @throws InvalidDataException
     */
    public function createUser(string $name, string $email, string $username, string $password, bool $login = false): UserModel
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
        $this->save();

        if ($login) {
            $this->loginUser($username, $password);
        }

        return $this;
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
                ->select('User', ['UserID', 'Password'], ['Username' => $username])[0] ?? null;

        if (!$user) {
            throw new InvalidDataException('User does not exist!');
        }

        $this->UserID = $user['UserID'];
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
            'Password' => $this->password,
            'RoleID' => 2
        ];

        $this->databaseController
            ->insert('User', $data);

        $this->UserID = $this->getLastID();

        $this->loadData();

        return $this;
    }

    /**
     * @return void
     */
    private function loadData(): void
    {
        $user = $this->databaseController
                ->select('User', ['*'], ['UserID' => $this->UserID])[0] ?? [];

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

        if ($tokenData['DateDeleted'] ?? null || !$dateExpiration->isValid() || $dateExpiration < Carbon::now('CET')) {
            throw new InvalidDataException('Token has expired!');
        }

        return (new UserTokenModel())->createToken($userID)
            ->toArray();
    }

    /**
     * @param array $data
     * @return array
     */
    public function getUserByWildCard(array $data): array
    {
        return $this->databaseController
            ->select('User', ['UserID'], $data) ?? [];
    }

    /**
     * @param string   $password
     * @param int|null $userID
     * @return $this
     * @throws InvalidDataException
     */
    public function updatePassword(string $password, int $userID = null): UserModel
    {
        $userID = $userID ?? $this->UserID ?? null;

        if (!$userID) {
            throw new InvalidDataException('UserID is not valid!');
        }

        if (!$password) {
            throw new InvalidDataException('Password is not valid!');
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);;

        $this->databaseController
            ->update(
                'User',
                ['Password' => $hashedPassword],
                ['UserID' => $userID]
            );

        $this->UserID = $userID;
        $this->loadData();

        return $this;
    }
}