<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class AsciiOnly
 * Removes all non-ascii characters from the string
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
class AsciiOnly extends FormatterBase
{

    /**
     * Removes all non Ascii characters from string
     *
     * @param string|int|float $input anything easily cast into a string
     * @return string
     */
    public function format($input)
    {
        //in case an int or float etc was passed in
        $input = (string)$input;
        $input = $this->convertAscii($input);
        return $input;
    }



    /**
     * Taken from https://gist.github.com/jaywilliams/119517
     * @param $string
     * @return string
     */
    protected function convertAscii($string)
    {
        // Replace Single Curly Quotes
        $search[]  = chr(226).chr(128).chr(152);
        $replace[] = "'";
        $search[]  = chr(226).chr(128).chr(153);
        $replace[] = "'";
        // Replace Smart Double Curly Quotes
        $search[]  = chr(226).chr(128).chr(156);
        $replace[] = '"';
        $search[]  = chr(226).chr(128).chr(157);
        $replace[] = '"';
        // Replace En Dash
        $search[]  = chr(226).chr(128).chr(147);
        $replace[] = '--';
        // Replace Em Dash
        $search[]  = chr(226).chr(128).chr(148);
        $replace[] = '---';
        // Replace Bullet
        $search[]  = chr(226).chr(128).chr(162);
        $replace[] = '*';
        // Replace Middle Dot
        $search[]  = chr(194).chr(183);
        $replace[] = '*';
        // Replace Ellipsis with three consecutive dots
        $search[]  = chr(226).chr(128).chr(166);
        $replace[] = '...';
        // Apply Replacements
        $string = str_replace($search, $replace, $string);
        // Remove any non-ASCII Characters
        $string = preg_replace("/[^\x01-\x7F]/","", $string);
        return $string;
    }
}
// End of file EmojiRemoval.php
// Location: core\services\formatters/EmojiRemoval.php