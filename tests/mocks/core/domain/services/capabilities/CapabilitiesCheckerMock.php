<?php

namespace EventEspresso\tests\mocks\core\domain\services\capabilities;

use EventEspresso\core\domain\services\capabilities\CapabilitiesCheckerInterface;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CapabilitiesCheckerMock
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CapabilitiesCheckerMock implements CapabilitiesCheckerInterface
{

    public $cap_check_passes = true;

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
        if(! $this->cap_check_passes) {
            throw new InsufficientPermissionsException($cap_check->context());
        }
        return true;
    }



    /**
     * @param string $capability - the capability to be checked, like: 'ee_edit_registrations'
     * @param string $context    - what the user is attempting to do, like: 'Edit Registration'
     * @param int    $ID         - (optional) ID for item where current_user_can is being called from
     * @return bool
     * @throws InsufficientPermissionsException
     * @throws InvalidClassException
     */
    public function process($capability, $context, $ID = 0)
    {
        return $this->processCapCheck(new CapCheckMock());
    }
}
// End of file CapabilitiesCheckerMock.php
// Location: EventEspresso\tests\mocks\core\domain\services\capabilities/CapabilitiesCheckerMock.php