<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class LeaveAlone
 * Leaves the string as-is
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
class LeaveAlone extends FormatterBase
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
        return $input;
    }

    /**
     * Just returns the inputted $input array
     *
     * @param array $input
     * @return array
     */
    public function formatArray($input)
    {
        return $input;
    }
}
// End of file LeaveAlonel.php
// Location: core\services\formatters/LeaveAlonel.php