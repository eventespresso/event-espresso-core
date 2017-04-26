<?php

namespace EventEspresso\tests\mocks\core\domain\services\capabilities;

use CapabilitiesCheckerInterface;
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

    protected $cap_check_passes = true;



    /**
     * @param bool $cap_check_passes
     */
    public function setCapCheckPasses($cap_check_passes)
    {
        $this->cap_check_passes = filter_var($cap_check_passes, FILTER_VALIDATE_BOOLEAN);
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
        return $this->cap_check_passes;
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
        return $this->cap_check_passes;
    }
}
// End of file CapabilitiesCheckerMock.php
// Location: EventEspresso\tests\mocks\core\domain\services\capabilities/CapabilitiesCheckerMock.php