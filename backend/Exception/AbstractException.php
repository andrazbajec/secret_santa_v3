<?php

namespace Exception;

use Exception;
use Throwable;

class AbstractException extends Exception
{
    /** @var int */
    public $code;
    /** @var string */
    public $message;

    /**
     * @param string $message
     * @param int $code
     * @param Throwable|null $previous
     * @throws Exception
     */
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        if (!$code) {
            $code = $this->code;
        }

        http_response_code($code);

        parent::__construct($message, $code, $previous);
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}