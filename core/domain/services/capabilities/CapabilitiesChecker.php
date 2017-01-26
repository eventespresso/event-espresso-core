<?php
namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CapabilitiesChecker
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CapabilitiesChecker
{

    /**
     * @type \EE_Capabilities $capabilities
     */
    private $capabilities;



    /**
     * CapabilitiesChecker constructor
     *
     * @param \EE_Capabilities $capabilities
     */
    public function __construct(\EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
    }



    /**
     * @return \EE_Capabilities
     */
    protected function capabilities()
    {
        return $this->capabilities;
    }



    /**
     * Verifies that the current user has ALL of the capabilities listed in the CapCheck DTO.
     * If any of the individual capability checks fails, then the command will NOT be executed.
     *
     * @param CapCheckInterface|CapCheckInterface[] $cap_check
     * @return bool
     * @throws InvalidClassException
     * @throws InsufficientPermissionsException
     */
    public function processCapCheck($cap_check)
    {
        if (is_array($cap_check)){
            foreach ($cap_check as $check) {
                $this->processCapCheck($check);
            }
            return true;
        }
        // at this point, $cap_check should be an individual instance of CapCheck
        if ( ! $cap_check instanceof CapCheckInterface) {
            throw new InvalidClassException(
                '\EventEspresso\core\domain\services\capabilities\CapCheckInterface'
            );
        }
        // sometimes cap checks are conditional, and no capabilities are required
        if ($cap_check instanceof PublicCapabilities) {
            return true;
        }
        $capabilities = (array) $cap_check->capability();
        foreach ($capabilities as $capability) {
            if (
                ! $this->capabilities()->current_user_can(
                    $capability,
                    $cap_check->context(),
                    $cap_check->ID()
                )
            ) {
                throw new InsufficientPermissionsException($cap_check->context());
            }
        }
        return true;
    }



    /**
     * @param string $capability - the capability to be checked, like: 'ee_edit_registrations'
     * @param string $context    - what the user is attempting to do, like: 'Edit Registration'
     * @param int    $ID         - (optional) ID for item where current_user_can is being called from
     * @return bool
     */
    public function process($capability, $context, $ID = 0)
    {
        return $this->processCapCheck(new CapCheck($capability, $context, $ID));
    }



}
// End of file CapabilitiesChecker.php
// Location: /CapabilitiesChecker.php