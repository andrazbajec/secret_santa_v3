<?php

namespace Controller;

use Exception\InvalidDataException;

class MailController extends AbstractController
{
    /**
     * @param string $recipient
     * @param string $subject
     * @param string $message
     * @throws InvalidDataException
     */
    public static function sendMail(string $recipient, string $subject, string $message): void
    {
        $secret = self::getEnv_S('MAILER_SECRET');
        if (!$secret) {
            throw new InvalidDataException('Mailer secret is invalid!');
        }

        $url = self::getEnv_S('MAILER_HOST');
        if (!$url) {
            throw new InvalidDataException('Mailer host is invalid!');
        }

        $data = [
            'secret' => $secret,
            'email' => $recipient,
            'subject' => $subject,
            'message' => $message
        ];

        $dataString = http_build_query($data);

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $dataString);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_exec($curl);
    }
}