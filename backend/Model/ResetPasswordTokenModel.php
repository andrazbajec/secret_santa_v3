<?php

namespace Model;


use Carbon\Carbon;

class ResetPasswordTokenModel extends AbstractModel
{
    /**
     * @param int $userID
     * @return string|null
     */
    public function getValidToken(int $userID): ?string
    {
        $sql = '
            SELECT Token
            FROM ResetPasswordToken
            WHERE CURDATE() <= DATE(DateExpires)
              AND CURTIME() < TIME(DateExpires)
              AND DateUsed IS NULL
              AND UserID = :userID;
        ';

        $params = [
            'userID' => $userID
        ];

        return $this->databaseController
                ->raw($sql, $params)[0]['Token'] ?? null;
    }

    /**
     * @param int $token
     * @return array
     */
    public function getTokenData(int $token): array
    {
        $sql = '
            SELECT UserID
            FROM ResetPasswordToken
            WHERE CURDATE() <= DATE(DateExpires)
              AND CURTIME() < TIME(DateExpires)
              AND DateUsed IS NULL
              AND Token = :token;
        ';

        $params = [
            'token' => $token
        ];

        return $this->databaseController
                ->raw($sql, $params)[0] ?? [];
    }

    /**
     * @param int $userID
     * @param int $token
     */
    public function addToken(int $userID, int $token): void
    {
        $timeExpires = Carbon::now('CET')
            ->addMinutes(10)
            ->toDateTimeString();

        $this->databaseController
            ->insert(
                'ResetPasswordToken',
                [
                    'UserID' => $userID,
                    'Token' => $token,
                    'DateExpires' => $timeExpires
                ]
            );
    }

    /**
     * @param int $token
     * @return bool
     */
    public function tokenIsUsed(int $token): bool
    {
        return !!count($this->databaseController
            ->select(
                'ResetPasswordToken',
                ['ResetPasswordTokenID'],
                ['Token' => $token]
            ) ?: []
        );
    }

    /**
     * @param int $token
     */
    public function invalidateToken(int $token): void
    {
        $this->databaseController
            ->update(
                'ResetPasswordToken',
                ['DateUsed' => Carbon::now('CET')->toDateTimeString()],
                ['Token' => $token]
            );
    }
}