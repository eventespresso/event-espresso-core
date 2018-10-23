<?php

namespace EventEspresso\core\services\validators;

use EE_Error;

/**
 * Class JsonValidator
 * Tools for validating JSON data and handling errors
 *
 * @package EventEspresso\core\services\validators
 * @author  Brent Christensen
 * @since   $VID:$
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
     * @since $VID:$
     */
    public function isValid($file, $func, $line)
    {
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                return true;
            case JSON_ERROR_DEPTH:
                $error = ': Maximum stack depth exceeded';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $error = ': Underflow or the modes mismatch';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $error = ': Unexpected control character found';
                break;
            case JSON_ERROR_SYNTAX:
                $error = ': Syntax error, malformed JSON';
                break;
            case JSON_ERROR_UTF8:
                $error = ': Malformed UTF-8 characters, possibly incorrectly encoded';
                break;
            default:
                $error = ': Unknown error';
                break;
        }
        EE_Error::add_error('JSON decoding error' . $error, $file, $func, $line);
        return false;
    }
}
