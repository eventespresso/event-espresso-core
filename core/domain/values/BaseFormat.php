<?php

namespace EventEspresso\core\domain\values;

abstract class BaseFormat
{
    protected string $format;

    public function __construct(?string $format)
    {
        if (static::$wordpress_format === null) {
            static::$wordpress_format = get_option(static::WORDPRESS_FORMAT_OPTION_NAME, static::DEFAULT_FORMAT);
        }
        $this->format = $this->sanitizeDateFormat($format ?: static::$wordpress_format);
    }


    protected function sanitizeDateFormat(string $format): string
    {
        $sanitized_format = '';
        for ($i = 0; $i < strlen($format); $i++) {
            $char = substr($format, $i, 1);
            // first check if the previous character was a backslash
            if (substr($format, $i - 1, 1) === '\\') {
                // escaped characters are allowed
                $sanitized_format .= "\\$char";
                continue;
            }
            if (in_array($char, static::$allowed_chars)) {
                $sanitized_format .= $char;
            }
        }
        return $sanitized_format;
    }


    public function format(): string
    {
        return $this->format;
    }


    public function __toString(): string
    {
        return $this->format();
    }
}
