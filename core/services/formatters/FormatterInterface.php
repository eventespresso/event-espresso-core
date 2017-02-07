<?php
namespace core\services\formatters;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FormatterInterface
 * Interface for all
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface FormatterInterface
{

    /**
     * Applies the formatting to all items in the array
     * @param array $input
     * @return array
     */
    public function format_array($input);
    /**
     * Formats the string
     * @param string $input
     * @return string
     */
    public function format($input);
}
// End of file FormatterInterface.php
// Location: core\services\formatters/FormatterInterface.php