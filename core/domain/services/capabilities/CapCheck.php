<?php
namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CapCheck
 * DTO for passing details regarding a required Capabilities Check
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CapCheck implements CapCheckInterface
{

    /**
     * @var string|array $capability
     */
    private $capability;

    /**
     * @var string $context
     */
    private $context;

    /**
     * @var int|string $ID
     */
    private $ID;



    /**
     * @param string|array $capability - the capability to be checked, like: 'ee_edit_registrations',
     *                                   or an array of capability strings
     * @param string       $context    - what the user is attempting to do, like: 'Edit Registration'
     * @param int          $ID         - (optional) ID for item where current_user_can is being called from
     */
    public function __construct($capability, $context, $ID = 0)
    {
        if ( ! is_string($capability)) {
            throw new InvalidDataTypeException('$capability', $capability, 'string');
        }
        if ( ! is_string($context)) {
            throw new InvalidDataTypeException('$context', $context, 'string');
        }
        $this->capability = $capability;
        $this->context = strtolower(str_replace(' ', '_', $context));
        $this->ID = $ID;
    }



    /**
     * @return string|array
     */
    public function capability()
    {
        return $this->capability;
    }



    /**
     * @return string
     */
    public function context()
    {
        return $this->context;
    }



    /**
     * @return int|string
     */
    public function ID()
    {
        return $this->ID;
    }


}
// End of file CapCheck.php
// Location: /CapCheck.php