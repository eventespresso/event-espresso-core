<?php

namespace EventEspresso\core\services\request\sanitizers;

/**
 * Class MultipleAttributes
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\services\request\sanitizers
 * @since   4.10.31.p
 */
class AttributesSanitizer
{
    /**
     * @param string $attributes
     * @param array $allowed_tags
     * @param string $tag
     * @return mixed|string
     */
    public static function clean(string $attributes, array $allowed_tags, string $tag = 'div')
    {
        if (trim($attributes) === '') {
            return '';
        }
        $html = '<' . $tag . ' ' . $attributes . '>';
        $escaped = wp_kses($html, $allowed_tags);
        $start = strpos($escaped, ' ');
        $end = strpos($escaped, '>');
        if ($start === false || $end === false) {
            return '';
        }
        $length = $end - $start;
        return trim(substr($escaped, $start, $length));
    }
}
