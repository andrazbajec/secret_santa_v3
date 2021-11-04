<?php

namespace Controller;

use Exception\InvalidDataException;
use Exception\UnauthorizedException;
use Model\RoomModel;
use Model\RoomUserModel;

class RoomController
{
    /**
     * @return array
     * @throws InvalidDataException
     */
    public function createRoom(): array
    {
        $title = $_POST['title'] ?? null;
        $password = $_POST['password'] ?? null;
        $shouldJoin = $_POST['shouldJoin'] ?? null;
        $isPrivate = $_POST['isPrivate'] ?? null;
        $maxAmount = ($_POST['maxAmount'] ?? null) ?: null;
        $dateOfExchange = ($_POST['dateOfExchange'] ?? null) ?: null;
        $rules = $_POST['rules'] ?? null;
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$title) {
            throw new InvalidDataException('Title was not provided!');
        }

        $room = new RoomModel();
        $room->createRoom($title, $userID, $password, $shouldJoin, $isPrivate, $maxAmount, $dateOfExchange, $rules, true);

        return $room->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function joinRoom(): array
    {
        $roomUrl = $_POST['roomUrl'] ?? null;
        $password = $_POST['password'] ?? null;
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$roomUrl && !$password) {
            throw new InvalidDataException('Invalid room url or password');
        }

        $room = new RoomModel();
        $room->joinRoom($roomUrl, $userID, $password);

        return $room->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     * @throws UnauthorizedException
     */
    public function getData(): array
    {
        $roomUrl = $_POST['roomUrl'] ?? null;
        $userID = $_COOKIE['user-id'] ?? null;

        $room = new RoomModel();
        $room->getData($roomUrl, $userID);
        $roomData = $room->toArray();

        $roomUser = new RoomUserModel();
        $roomData['RoomUsers'] = $roomUser->getData($room->RoomID);

        return $roomData;
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function getRoomList(): array
    {
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$userID) {
            throw new InvalidDataException('User ID was not provided!');
        }

        return (new RoomModel())->getRoomList();
    }
}