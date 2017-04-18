<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Windows1252
 * Converts from utf8 encoding to windows 1252 (aka cp1252, aka ISO-8859-1,
 * see https://en.wikipedia.org/wiki/Windows-1252).
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
        if (function_exists('iconv')) {
            $input = iconv('utf-8', 'cp1252//TRANSLIT', $input);
        } elseif ( WP_DEBUG) {
            trigger_error(
                sprintf(
                    // @codingStandardsIgnoreStart
                    esc_html__('%1$s could not format the string "%2$s" because the function "%3$s" does not exist. Please verify PHP is installed with this function, see %4$s', 'event_espresso'),
                    // @codingStandardsIgnoreEnd
                    get_class($this),
                    $input,
                    'iconv',
                    '<a href="http://php.net/manual/en/iconv.installation.php">http://php.net/manual/en/iconv.installation.php</a>'
                )
            );
        }
        return $input;
    }
}
// End of file EmojiRemoval.php
// Location: core\services\formatters/EmojiRemoval.php
