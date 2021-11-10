<?php

namespace Controller;

use Carbon\Carbon;
use Enum\UserEnum;
use Exception;
use Exception\InvalidDataException;
use Model\ResetPasswordTokenModel;
use Model\UserModel;

class UserController extends AbstractController
{
    /** @var UserModel */
    protected UserModel $userModel;

    public function __construct()
    {
        parent::__construct();

        $this->userModel = new UserModel();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function registerUser(): array
    {
        $name = $this->getData('name');
        $email = $this->getData('email');
        $username = $this->getData('username');
        $password = $this->getData('password');

        if (!$name) {
            throw new InvalidDataException('Name was not provided!');
        }

        if (!$email) {
            throw new InvalidDataException('Email was not provided');
        }

        if (!preg_match(UserEnum::EMAIL_REGEX, $email)) {
            throw new InvalidDataException('Email is not valid');
        }

        if ($this->emailExists($email)) {
            throw new InvalidDataException('Email is already taken!');
        }

        if (!$username) {
            throw new InvalidDataException('Username was not provided!');
        }

        if (!$password) {
            throw new InvalidDataException('Password was not provided!');
        }


        return $this->userModel
            ->createUser($name, $email, $username, $password, true)
            ->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function loginUser(): array
    {
        $username = $this->getData('username');
        $password = $this->getData('password');

        if (!$username && !$password) {
            throw new InvalidDataException('Invalid username or password');
        }

        return $this->userModel
            ->loginUser($username, $password)
            ->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function authenticate(): array
    {
        $userID = $_COOKIE['user-id'] ?? null;
        $token = $_COOKIE['user-token'] ?? null;

        setcookie('user-id', null, -1);
        setcookie('user-token', null, -1);

        if (!$userID || !$token) {
            throw new InvalidDataException('UserID or token not provided!');
        }

        return $this->userModel
            ->validateToken($userID, $token);
    }

    /**
     * @throws InvalidDataException
     * @throws Exception
     */
    public function sendResetPasswordEmail(): array
    {
        $email = $this->getData('email');

        if (!$email) {
            throw new InvalidDataException('Email was not provided!');
        }

        if (!preg_match(UserEnum::EMAIL_REGEX, $email)) {
            throw new InvalidDataException('Email is not valid');
        }

        $user = $this->userModel
                ->getUserByWildCard(['Email' => $email])[0] ?? null;

        if (!$user) {
            throw new InvalidDataException('Email is not tied to any account!');
        }

        $userID = $user['UserID'];

        $token = (new ResetPasswordTokenModel())->getValidToken($userID);

        if ($token) {
            throw new InvalidDataException('An email was already sent in the last 10 minutes!');
        }

        do {
            $newToken = random_int(1000000000, 9999999999);
            $tokenIsUsed = (new ResetPasswordTokenModel())->tokenIsUsed($newToken);
        } while ($tokenIsUsed);

        (new ResetPasswordTokenModel())->addToken($userID, $newToken);

        $frontendUrl = $this->getEnv('FRONTEND_HOST');
        if (!$frontendUrl) {
            throw new InvalidDataException('Frontend host is invalid!');
        }

        $url = sprintf('%s/reset-password/%d', $frontendUrl, $newToken);

        $message = sprintf(
            "Pozdravljeni, \n svoje geslo lahko ponastavite na naslednji povezavi: %s",
            $url
        );

        MailController::sendMail($email, 'Pozabljeno geslo', $message);

        return [];
    }

    /**
     * @throws InvalidDataException
     */
    public function resetPassword(): array
    {
        $token = $this->getData('token');
        $password = $this->getData('password');

        if (!$token) {
            throw new InvalidDataException('Token was not provided!');
        }

        if (!$password) {
            throw new InvalidDataException('Password was not provided!');
        }

        $tokenData = (new ResetPasswordTokenModel())->getTokenData($token);

        $userID = $tokenData['UserID'] ?? null;

        if (!$userID) {
            throw new InvalidDataException('Token is not valid!');
        }

        $user = $this->userModel
            ->updatePassword($password, $userID);
        $user->loginUser($user->Username, $password);

        (new ResetPasswordTokenModel())->invalidateToken($token);

        return [];
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function getUserData(): array
    {
        $userID = $this->getCookie('user-id');

        if (!$userID) {
            throw new InvalidDataException('UserID was not provided!');
        }

        return $this->userModel
            ->load($userID)
            ->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function saveUserData(): array
    {
        $field = $this->getData('field');
        $value = $this->getData('value');
        $userID = $this->getCookie('user-id');

        if (!$value) {
            throw new InvalidDataException('New value was not provided!');
        }

        if (!$field) {
            throw new InvalidDataException('Field was not provided!');
        }

        if (!in_array($field, UserEnum::EDITABLE_FIELDS)) {
            throw new InvalidDataException('Field is not valid!');
        }

        if ($field == UserEnum::EMAIL_KEY) {
            if (!preg_match(UserEnum::EMAIL_REGEX, $value)) {
                throw new InvalidDataException('Email is not valid');
            }

            if ($this->emailExists($value)) {
                throw new InvalidDataException('This email is already taken!');
            }
        }

        $this->userModel
            ->updateUserByWildcard([
                $field => $value
            ], [
                'UserID' => $userID
            ]);

        return [];
    }

    /**
     * @param string $email
     * @return bool
     */
    private function emailExists(string $email): bool
    {
        return !!count($this->userModel
            ->getUserByWildCard(['Email' => $email]));
    }
}