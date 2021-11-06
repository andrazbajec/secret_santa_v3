<?php

namespace Controller;

use Carbon\Carbon;
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
        $room->createRoom($title, $userID, $password, $isPrivate, $maxAmount, $dateOfExchange, $rules, $shouldJoin);

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
        $roomData['PickedUser'] = $roomUser->getPickedUser($room->RoomID, $userID);

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

    /**
     * @return array
     * @throws InvalidDataException
     * @throws UnauthorizedException
     * @throws \Exception
     */
    public function generateRoom(): array
    {
        $userID = $_COOKIE['user-id'] ?? null;
        $roomID = $_POST['room-id'] ?? null;

        if (!$roomID) {
            throw new InvalidDataException('Room ID was not provided!');
        }

        if (!$userID) {
            throw new InvalidDataException('User ID was not provided!');
        }

        $roomData = (new RoomModel())->load($roomID);

        if ($roomData['UserID'] != $userID) {
            throw new UnauthorizedException("You don't have permission to generate for this room!");
        }

        $roomUsers = (new RoomUserModel())->getRoomUsers($roomID);
        $pickedUsers = [];

        foreach ($roomUsers as $idx => $user) {
            $currentUserID = $user['UserID'];
            do {
                $pickedUserIndex = random_int(1, count($roomUsers)) - 1;
                $pickedUserID = $roomUsers[$pickedUserIndex]['UserID'];
                $continue = $currentUserID == $pickedUserID;
                $nextUserID = $roomUsers[$idx + 1]['UserID'] ?? null;

                if (count($pickedUsers) == count($roomUsers) - 2
                    && $pickedUserID != $nextUserID
                    && !in_array($nextUserID, array_values($pickedUsers))
                ) {
                    $continue = true;
                }
            } while ($continue);

            $pickedUsers[$currentUserID] = $pickedUserID;
        }

        $db = new DatabaseController();

        $db->update(
            'Room',
            ['Status' => 'in progress', 'DateUpdated' => Carbon::now()->toDateTimeString()],
            ['RoomID' => $roomID]
        );

        foreach ($pickedUsers as $userID => $pickedUserID) {
            $db->update(
                'RoomUser',
                ['PickedUserID' => $pickedUserID],
                ['RoomID' => $roomID, 'UserID' => $userID]
            );
        }

        return [];
    }
}