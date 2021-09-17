<?php

namespace Exception;

use Exception;

class ExceptionHelper
{
    /**
     * @param int $errorCode
     * @param string $errorMessage
     * @throws Exception
     */
    public function generateException(int $errorCode, string $errorMessage)
    {
        http_response_code($errorCode);
        throw new Exception($errorMessage);
    }
}