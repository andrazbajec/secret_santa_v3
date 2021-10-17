<?php

namespace Exception;

class InvalidDataException extends AbstractException
{
    /** @var int */
    public $code = 400;
}