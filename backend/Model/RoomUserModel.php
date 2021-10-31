<?php

namespace Model;

use Exception\InvalidDataException;
use Exception\UnauthorizedException;

class RoomUserModel extends AbstractModel
{
    /**
     * @param int $roomID
     * @return array
     * @throws UnauthorizedException
     */
    public function getData(int $roomID): array
    {
        $roomUsers = $this->databaseController
            ->select('RoomUser', ['*'], ['RoomID' => $roomID]);

        if (!count($roomUsers)) {
            throw new UnauthorizedException('User does not exist');
        }

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
}