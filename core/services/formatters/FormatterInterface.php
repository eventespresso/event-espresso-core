<?php
namespace EventEspresso\core\services\formatters;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FormatterInterface
 * Interface for all formatter services which take care of formatting text or arrays of text.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
interface FormatterInterface
{

    /**
     * Applies the formatting to all items in the array
     *
     * @param array $input accepts a multi-dimensional array, but all "leaf nodes" are easily cast to a string
     * @return array
     */
    public function formatArray($input);



    /**
     * Formats the string
     *
     * @param string|int|float $input anything easily cast into a string
     * @return string
     */
    public function format($input);
}
// End of file FormatterInterface.php
// Location: core\services\formatters/FormatterInterface.php