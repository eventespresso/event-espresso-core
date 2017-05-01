<?php

namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CapabilitiesChecker
 * Public contract for CapabilitiesChecker
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
interface CapabilitiesCheckerInterface
{

    /**
     * Verifies that the current user has ALL of the capabilities listed in the CapCheck DTO.
     * If any of the individual capability checks fails, then the command will NOT be executed.
     *
     * @param CapCheckInterface|CapCheckInterface[] $cap_check
     * @return bool
     * @throws InvalidClassException
     * @throws InsufficientPermissionsException
     */
    public function processCapCheck($cap_check);



    /**
     * @param string $capability - the capability to be checked, like: 'ee_edit_registrations'
     * @param string $context    - what the user is attempting to do, like: 'Edit Registration'
     * @param int    $ID         - (optional) ID for item where current_user_can is being called from
     * @return bool
     * @throws InsufficientPermissionsException
     * @throws InvalidClassException
     */
    public function process($capability, $context, $ID = 0);
}
