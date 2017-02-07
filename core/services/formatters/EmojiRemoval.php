<?php
namespace EventEspresso\core\services\formatters;

defined('EVENT_ESPRESSO_VERSION') || exit;
use EventEspresso\core\exceptions\InvalidDataTypeException;


/**
 * Class EmojiRemoval
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EmojiRemoval
{
    /**
     * Removes the emojis from the inputted string
     * @param string $input
     * @return string
     */
    public function format($input)
    {
        if(!is_string($input)){
            throw new InvalidDataTypeException('input',$input,'string');
        }
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