<?php

namespace EventEspresso\core\domain\values;

class DateFormat extends BaseFormat
{
    protected const DEFAULT_FORMAT = 'Y-m-d';
    protected const WORDPRESS_FORMAT_OPTION_NAME = 'date_format';


    protected static array $allowed_chars = [
        'd',
        'D',
        'j',
        'l',
        'N',
        'S',
        'w',
        'z',
        'W',
        'F',
        'm',
        'M',
        'n',
        't',
        'L',
        'o',
        'Y',
        'y',
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
        '/',
        '-',
        ',',
        '.',
        ' ',
        ':',
        'c',
        'r',
        'U'
    ];

    protected static ?string $wordpress_format = null;
}
