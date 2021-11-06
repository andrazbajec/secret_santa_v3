<?php

namespace Model;

use Exception\InvalidDataException;
use Exception\UnauthorizedException;

class RoomUserModel extends AbstractModel
{
    /**
     * @param int $roomID
     * @return array
     */
    public function getData(int $roomID): array
    {
        $roomUsers = $this->databaseController
            ->select('RoomUser', ['*'], ['RoomID' => $roomID]);

        $users = [];

        foreach ($roomUsers as $roomUser) {
            $userData = $this->databaseController
                    ->select('User', ['Name'], ['UserID' => $roomUser['UserID']])[0] ?? [];
            if (count($userData)) {
                $users[] = $userData;
            }
        }
        return $users;
    }

    /**
     * @param int $roomID
     * @return array
     */
    public function getRoomUsers(int $roomID): array
    {
        if (!$roomID) {
            return [];
        }

        return $this->databaseController
            ->select('RoomUser', ['*'], ['RoomID' => $roomID]);
    }

    /**
     * @param int $roomID
     * @param int $userID
     * @return array|null
     */
    public function getPickedUser(int $roomID, int $userID): ?array
    {
        if (!$roomID || !$userID) {
            return [];
        }

        $sql = '
            SELECT U.UserID, U.Username, U.Name
            FROM User U
                     INNER JOIN RoomUser RU ON U.UserID = RU.PickedUserID
            WHERE RU.RoomID = :roomID
              AND RU.UserID = :userID;
        ';

        $params = [
            'userID' => $userID,
            'roomID' => $roomID
        ];

        return $this->databaseController
            ->raw($sql, $params)[0] ?? null;
    }
}