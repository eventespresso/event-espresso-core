<?php
namespace EventEspresso\core\domain\services\capabilities;

defined('EVENT_ESPRESSO_VERSION') || exit;
/**
 * Class CapCheck
 * DTO for passing details regarding a required Capabilities Check
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
interface CapCheckInterface
{

    /**
     * @return string
     */
    public function capability();

    /**
     * @return string
     */
    public function context();

    /**
     * @return int|string
     */
    public function ID();

}
// End of file CapCheckInterface.php
// Location: core\domain\services\capabilities\CapCheckInterface.php
