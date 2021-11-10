<?php

namespace Controller;

use Carbon\Carbon;
use Exception;
use Exception\InvalidDataException;
use Exception\UnauthorizedException;
use Model\RoomModel;
use Model\RoomUserModel;

class RoomController extends AbstractController
{

    /**
     * @var RoomModel
     */
    protected RoomModel $roomModel;

    public function __construct()
    {
        parent::__construct();

        $this->roomModel = new RoomModel();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function createRoom(): array
    {
        $title = $this->getData('title');
        $password = $this->getData('password');
        $shouldJoin = $this->getData('shouldJoin');
        $isPrivate = (int)$this->getData('isPrivate');
        $maxAmount = $this->getData('maxAmount') ?: null;
        $dateOfExchange = $this->getData('dateOfExchange');
        $rules = $this->getData('rules');
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$title) {
            throw new InvalidDataException('Title was not provided!');
        }

        if (strlen($title) > 20) {
            throw new InvalidDataException('Title is too long. Maximum title length is 20 characters.');
        }

        if ($dateOfExchange) {
            try {
                Carbon::createFromFormat('Y-m-d', $dateOfExchange);
            } catch (\Exception $e) {
                throw new InvalidDataException('Date is not valid!');
            }
        } else {
            $dateOfExchange = null;
        }

        return $this->roomModel
            ->createRoom($title, $userID, $password, $isPrivate, $maxAmount, $dateOfExchange, $rules, $shouldJoin)
            ->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function joinRoom(): array
    {
        $roomUrl = $this->getData('roomUrl');
        $password = $this->getData('password');
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$roomUrl && !$password) {
            throw new InvalidDataException('Invalid room url or password');
        }

        return $this->roomModel
            ->joinRoom($roomUrl, $userID, $password)
            ->toArray();
    }

    /**
     * @return array
     * @throws InvalidDataException
     */
    public function getRoomData(): array
    {
        $roomUrl = $this->getData('roomUrl');
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
     */
    public function getUserRooms(): array
    {
        $userID = $_COOKIE['user-id'] ?? null;

        if (!$userID) {
            throw new InvalidDataException('User ID was not provided!');
        }

        return (new RoomModel())->getUserRooms($userID);
    }

    /**
     * @return array
     * @throws InvalidDataException
     * @throws UnauthorizedException
     * @throws Exception
     */
    public function generateRoom(): array
    {
        $userID = $_COOKIE['user-id'] ?? null;
        $roomID = $this->getData('room-id');

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
            ['Status' => 'in progress', 'DateUpdated' => Carbon::now('CET')->toDateTimeString()],
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