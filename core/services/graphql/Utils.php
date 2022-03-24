<?php

namespace EventEspresso\core\services\graphql;

/**
 * Class Utils
 * GraphQL Utils
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class Utils
{
    /**
     * Given a string, formats it as GraphQL ENUM value
     *
     * @param string $str The string to format
     *
     * @return string
     */
    public static function formatEnumKey($str)
    {
        // Replace any non-alph-anumeric by underscore
        $str = preg_replace('/[^a-zA-Z0-9]/', '_', $str);
        // Convert to uppercase.
        return strtoupper($str);
    }
}
