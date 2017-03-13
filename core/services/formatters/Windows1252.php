<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Windows1252
 * Converts from utf8 encoding to windows 1252 (aka cp1252, aka ISO-8859-1, see https://en.wikipedia.org/wiki/Windows-1252).
 * This is useful if you need to send a string to a site using windows 1252 character encoding

 *
*@package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
class Windows1252 extends FormatterBase
{

    /**
     * Converts the string to windows-1252 encoding.
     *
     * @param string|int|float $input anything easily cast into a string
     * @return string
     */
    public function format($input)
    {
        //in case an int or float etc was passed in
        $input = (string)$input;
        $input = iconv('utf-8','cp1252//TRANSLIT', $input);
        return $input;
    }
}
// End of file EmojiRemoval.php
// Location: core\services\formatters/EmojiRemoval.php