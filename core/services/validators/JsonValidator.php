<?php

namespace EventEspresso\core\services\validators;

use EE_Error;

// phpcs:disable PHPCompatibility.PHP.NewConstants.json_error_invalid_property_nameFound
// phpcs:disable PHPCompatibility.PHP.NewConstants.json_error_utf16Found

/**
 * Class JsonValidator
 * Tools for validating JSON data and handling errors
 *
 * @package EventEspresso\core\services\validators
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class JsonValidator
{

    /**
     * Call this method IMMEDIATELY after json_decode() and
     * it will will return true if the decoded JSON was valid,
     * or return false after adding an error if not valid.
     * The actual JSON file does not need to be supplied,
     * but details re: code execution location are required.
     * ex:
     * JsonValidator::isValid(__FILE__, __METHOD__, __LINE__)
     *
     * @param string $file
     * @param string $func
     * @param string $line
     * @return boolean
     * @since 4.9.70.p
     */
    public function isValid($file, $func, $line)
    {
        if (! defined('JSON_ERROR_RECURSION')) {
            define('JSON_ERROR_RECURSION', 6);
        }
        if (! defined('JSON_ERROR_INF_OR_NAN')) {
            define('JSON_ERROR_INF_OR_NAN', 7);
        }
        if (! defined('JSON_ERROR_UNSUPPORTED_TYPE')) {
            define('JSON_ERROR_UNSUPPORTED_TYPE', 8);
        }
        if (! defined('JSON_ERROR_INVALID_PROPERTY_NAME')) {
            define('JSON_ERROR_INVALID_PROPERTY_NAME', 9);
        }
        if (! defined('JSON_ERROR_UTF16')) {
            define('JSON_ERROR_UTF16', 10);
        }
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                return true;
            case JSON_ERROR_DEPTH:
                $error = ': Maximum stack depth exceeded';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $error = ': Invalid or malformed JSON';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $error = ': Control character error, possible malformed JSON';
                break;
            case JSON_ERROR_SYNTAX:
                $error = ': Syntax error, malformed JSON';
                break;
            case JSON_ERROR_UTF8:
                $error = ': Malformed UTF-8 characters, possible malformed JSON';
                break;
            case JSON_ERROR_RECURSION:
                $error = ': One or more recursive references in the value to be encoded';
                break;
            case JSON_ERROR_INF_OR_NAN:
                $error = ': One or more NAN or INF values in the value to be encoded';
                break;
            case JSON_ERROR_UNSUPPORTED_TYPE:
                $error = ': A value of a type that cannot be encoded was given';
                break;
            case JSON_ERROR_INVALID_PROPERTY_NAME:
                $error = ': A property name that cannot be encoded was given';
                break;
            case JSON_ERROR_UTF16:
                $error = ': Malformed UTF-16 characters, possibly incorrectly encoded';
                break;
            default:
                $error = ': Unknown error';
                break;
        }
        EE_Error::add_error('JSON decoding failed' . $error, $file, $func, $line);
        return false;
    }
}
