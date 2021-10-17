<?php

namespace Exception;

use Exception as ExceptionAlias;
use Throwable;

class NotFoundException extends AbstractException
{
    /** @var int */
    public $code = 404;

    /**
     * @param string          $message
     * @param int             $code
     * @param \Throwable|null $previous
     * @throws \Exception
     */
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}