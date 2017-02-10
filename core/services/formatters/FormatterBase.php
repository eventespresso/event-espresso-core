<?php
namespace EventEspresso\core\services\formatters;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FormatterBase
 * Class for funcitonality often common among FormatterInterface implementations
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
abstract class FormatterBase implements FormatterInterface
{

    /**
     * Recursively applies the formatting to all VALUES in this multi-dimensional array
     *
     * @param array $input
     * @return array
     * @throws InvalidDataTypeException if $input is not an array
     */
    public function formatArray($input)
    {
        if (! is_array($input)) {
            throw new InvalidDataTypeException('input', $input, 'array');
        }
        array_walk_recursive(
            $input,
            function (&$value, $key) {
                if (is_string($value)) {
                    $value = $this->format($value);
                }
            }
        );
        return $input;
    }


}
// End of file FormatterBase.php
// Location: core\services\formatters/FormatterBase.php