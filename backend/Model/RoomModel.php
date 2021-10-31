<?php

namespace Model;

use Exception\InvalidDataException;
use Exception\UnauthorizedException;

/**
 * @property int     RoomID
 * @property int     UserID
 * @property int     MaxAmount
 * @property string  Title
 * @property string  DateOfExchange
 * @property string  Rules
 * @property string  RoomUrl
 * @property boolean ShouldJoin
 * @property boolean IsPrivate
 */
class RoomModel extends AbstractModel
{
    /** @var string $title */
    public string $title;
    /** @var string $password */
    private string $password;
    /** @var int $userId */
    private int $userId;
    /** @var string $roomUrl */
    private string $roomUrl;
    /** @var int $roomID */
    private int $roomID;
    /** @var string $name */
    private string $name;
    /** @var bool|null $shouldJoin */
    private ?bool $shouldJoin;
    /** @var bool|null $isPrivate */
    private ?bool $isPrivate;
    /** @var int|null $maxAmount */
    private ?int $maxAmount;
    /** @var string|null $dateOfExchange */
    private ?string $dateOfExchange;
    /** @var string|null $rules */
    private ?string $rules;

    /** @var array $fields */
    public array $fillable = [
        'Title',
        'DateCreated',
        'RoomUrl',
        'RoomID',
        'Rules',
        'MaxAmount',
        'DateOfExchange'
    ];

    /**
     * @param string      $title
     * @param int         $userID
     * @param bool        $roomJoin
     * @param string|null $password
     * @param bool|null   $shouldJoin
     * @param bool|null   $isPrivate
     * @param int|null    $maxAmount
     * @param string|null $dateOfExchange
     * @param string|null $rules
     * @return $this
     * @throws InvalidDataException
     */
    public function createRoom(
        string  $title,
        int     $userID,
        ?string $password,
        ?bool   $shouldJoin,
        ?bool   $isPrivate,
        ?int    $maxAmount,
        ?string $dateOfExchange,
        ?string $rules,
        bool    $roomJoin = false
    ): RoomModel
    {
        do {
            $roomUrl = rand(100000, 999999);

            $foundRoomUrl = $this->databaseController
                ->select('Room', ['*'], ['RoomUrl' => $roomUrl]);

            $roomUrlIsNotUnique = count($foundRoomUrl);
        } while ($roomUrlIsNotUnique);

        $this->title = $title;
        $this->shouldJoin = $shouldJoin;
        $this->isPrivate = $isPrivate;
        $this->maxAmount = $maxAmount;
        $this->dateOfExchange = $dateOfExchange;
        $this->rules = $rules;
        $this->userId = $userID;
        if ($password) {
            $this->password = password_hash($password, PASSWORD_DEFAULT);
        }
        $this->roomUrl = $roomUrl;
        $this->save();

        if ($roomJoin) {
            $this->joinRoom($this->roomUrl, $userID, $password);
        }

        return $this;
    }

    /**
     * @param string      $roomUrl
     * @param int         $userID
     * @param string|null $password
     * @return $this
     * @throws InvalidDataException
     */
    public function joinRoom(string $roomUrl, int $userID, ?string $password): RoomModel
    {
        if (!$roomUrl) {
            throw new InvalidDataException('RoomUrl was not provided');
        }

        $room = $this->databaseController
                ->select('Room', ['*'], ['RoomUrl' => $roomUrl])[0] ?? null;

        if (!count($room)) {
            throw new InvalidDataException('Room does not exist!');
        }

        $hashedPassword = $room['Password'] ?? null;

        if ($hashedPassword && !password_verify($password, $hashedPassword)) {
            throw new InvalidDataException('Incorrect password!');
        }

        $roomUserData = [
            'RoomID' => $room['RoomID'],
            'UserID' => $userID
        ];

        $this->databaseController
            ->insert('RoomUser', $roomUserData);

        $this->roomID = $room['RoomID'];

        $this->loadData();

        return $this;
    }

    /**
     * @return $this
     */
    public function save(): RoomModel
    {
        $roomData = [
            'Title' => $this->title,
            'Password' => $this->password ?? null,
            'ShouldJoin' => $this->shouldJoin ?? null,
            'IsPrivate' => $this->isPrivate ?? null,
            'MaxAmount' => $this->maxAmount ?? null,
            'DateOfExchange' => $this->dateOfExchange ?? null,
            'Rules' => $this->rules ?? null,
            'UserID' => $this->userId ?? null,
            'RoomUrl' => $this->roomUrl ?? null,
        ];

        $this->databaseController
            ->insert('Room', $roomData);

        $this->roomID = $this->databaseController->lastInsertID();

        return $this->loadData();
    }

    /**
     * @param string $roomUrl
     * @param int    $userID
     * @return $this
     * @throws InvalidDataException
     */
    public function getData(string $roomUrl, int $userID): RoomModel
    {
        $this->roomUrl = $roomUrl;
        $this->userId = $userID;

        $room = $this->databaseController
                ->select('Room', ['*'], ['RoomUrl' => $roomUrl])[0] ?? [];

        if (!$room) {
            throw new InvalidDataException('Room does not exist');
        }

        foreach ($room as $key => $value) {
            $this->$key = $value;
        }

        return $this;
    }

    /**
     * @return $this
     */
    private function loadData(): RoomModel
    {
        $room = $this->databaseController
                ->select('Room', ['*'], ['RoomID' => $this->roomID])[0] ?? [];

        if (!count($room)) {
            return $this;
        }

        foreach ($room as $key => $value) {
            $this->$key = $value;
        }

        return $this;
    }
}