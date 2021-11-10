<?php

namespace Enum;

class UserEnum
{
    const EMAIL_REGEX = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

    const EMAIL_KEY = 'Email';
    const EDITABLE_FIELDS = [
        self::EMAIL_KEY,
        'Password',
        'Name'
    ];
}