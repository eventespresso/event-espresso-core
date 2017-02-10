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
     * @param array $input
     * @return array
     */
    public function formatArray($input);



    /**
     * Formats the string
     *
     * @param string $input
     * @return string
     */
    public function format($input);
}
// End of file FormatterInterface.php
// Location: core\services\formatters/FormatterInterface.php