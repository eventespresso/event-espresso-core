<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EmojiRemoval
 * Removes emojis from the input
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
class EmojiRemoval extends FormatterBase
{

    /**
     * Removes the emojis from the inputted string
     *
     * @param string|int|float $input anything easily cast into a string
     * @return string
     * @throws InvalidDataTypeException if $input is not a string
     */
    public function format($input)
    {
        //in case an int or float etc was passed in
        $input = (string)$input;
        // Match Emoticons
        $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
        $input = preg_replace($regexEmoticons, '', $input);
        // Match Miscellaneous Symbols and Pictographs
        $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
        $input = preg_replace($regexSymbols, '', $input);
        // Match Transport And Map Symbols
        $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
        $input = preg_replace($regexTransport, '', $input);
        // Match Miscellaneous Symbols
        $regexMisc = '/[\x{2600}-\x{26FF}]/u';
        $input = preg_replace($regexMisc, '', $input);
        // Match Dingbats
        $regexDingbats = '/[\x{2700}-\x{27BF}]/u';
        $input = preg_replace($regexDingbats, '', $input);
        return $input;
    }
}
// End of file EmojiRemoval.php
// Location: core\services\formatters/EmojiRemoval.php