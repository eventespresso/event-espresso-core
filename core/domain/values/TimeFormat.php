<?php

namespace EventEspresso\core\domain\values;

class TimeFormat extends BaseFormat
{
    protected const DEFAULT_FORMAT = 'H:i:s';
    protected const WORDPRESS_FORMAT_OPTION_NAME = 'time_format';

    protected static array $allowed_chars  = [
        'a',
        'A',
        'B',
        'g',
        'G',
        'h',
        'H',
        'i',
        's',
        'u',
        'v',
        'e',
        'I',
        'O',
        'P',
        'T',
        'Z',
        ':',
        '-',
        ',',
        '.',
        ' ',
    ];

    protected static ?string $wordpress_format = null;
}
