<?php

namespace Model;

use Carbon\Carbon;

/**
 * @property int    UserID
 * @property int    UserTokenID
 * @property string DateCreated
 * @property string DateExpiration
 * @property string DateDeleted
 * @property string Token
 */
class UserTokenModel extends AbstractModel
{
    /**
     * @param int $userID
     * @param int $daysValid
     * @return $this
     */
    public function createToken(int $userID, int $daysValid = 7): UserTokenModel
    {
        if (!$userID || !$daysValid) {
            return $this;
        }

        $this->invalidateUserTokens($userID);

        $dateExpiration = Carbon::now()
            ->addDays($daysValid)
            ->toDateTimeString();

        do {
            $token = rand(100000, 999999);

            $foundToken = $this->databaseController
                ->select('UserToken', ['*'], ['Token' => $token, 'UserID' => $userID]);

            $tokenIsNotUnique = count($foundToken);
        } while ($tokenIsNotUnique);

        $this->databaseController
            ->insert(
                'UserToken',
                [
                    'UserID' => $userID,
                    'DateExpiration' => $dateExpiration,
                    'Token' => $token
                ]
            );

        $this->Token = $token;
        $this->UserID = $userID;

        return $this;
    }

    /**
     * @param int $userID
     */
    public function invalidateUserTokens(int $userID): void
    {
        $this->databaseController
            ->update(
                'UserToken',
                ['DateDeleted' => Carbon::now()->toDateTimeString()],
                ['UserID' => $userID]
            );
    }
}