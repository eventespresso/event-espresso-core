<?php
namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InsufficientPermissionsException;

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
     * @param \EventEspresso\core\domain\services\capabilities\CapCheck $cap_check
     * @return bool
     */
    public function processCapCheck(CapCheck $cap_check)
    {
        if (
            ! $this->capabilities()->current_user_can(
                $cap_check->capability(),
                $cap_check->context(),
                $cap_check->ID()
            )
        ) {
            throw new InsufficientPermissionsException($cap_check->context());
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