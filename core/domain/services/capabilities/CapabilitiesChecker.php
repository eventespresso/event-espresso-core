<?php

namespace EventEspresso\core\domain\services\capabilities;

use EE_Capabilities;
use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class CapabilitiesChecker
 * Processes CapCheck objects to determine if the current user has the required capabilities or not
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CapabilitiesChecker implements CapabilitiesCheckerInterface
{
    /**
     * @type EE_Capabilities $capabilities
     */
    private $capabilities;


    /**
     * CapabilitiesChecker constructor
     *
     * @param EE_Capabilities $capabilities
     */
    public function __construct(EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
    }


    /**
     * @return EE_Capabilities
     */
    protected function capabilities(): EE_Capabilities
    {
        return $this->capabilities;
    }


    /**
     * Verifies that the current user has ALL of the capabilities listed in the CapCheck DTO.
     * If any of the individual capability checks fails, then the command will NOT be executed.
     *
     * @param CapCheckInterface|CapCheckInterface[] $cap_check
     * @param bool                                  $suppress_exceptions
     * @return bool
     * @throws InvalidClassException
     * @throws InsufficientPermissionsException
     */
    public function processCapCheck($cap_check, bool $suppress_exceptions = false): bool
    {
        if (is_array($cap_check)) {
            $passed = true;
            foreach ($cap_check as $check) {
                $passed = $this->processCapCheck($check) ? $passed : false;
            }
            return $passed;
        }
        // at this point, $cap_check should be an individual instance of CapCheck
        if (! $cap_check instanceof CapCheckInterface) {
            if ($suppress_exceptions) {
                return false;
            }
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
                if ($suppress_exceptions) {
                    return false;
                }
                throw new InsufficientPermissionsException($cap_check->context());
            }
        }
        return true;
    }


    /**
     * @param array|string $capability - the capability to be checked, like: 'ee_edit_registrations'
     * @param string       $context    - what the user is attempting to do, like: 'Edit Registration'
     * @param int|string   $ID         - (optional) ID for item where current_user_can is being called from
     * @return bool
     * @throws InvalidDataTypeException
     * @throws InsufficientPermissionsException
     * @throws InvalidClassException
     */
    public function process($capability, string $context, $ID = 0): bool
    {
        return $this->processCapCheck(new CapCheck($capability, $context, $ID));
    }
}
