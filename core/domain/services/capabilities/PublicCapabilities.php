<?php
namespace EventEspresso\core\domain\services\capabilities;

/**
 * Class PublicCapabilities
 *
 * sometimes cap checks are conditional, and no capabilities are required,
 * but the \EventEspresso\core\domain\services\capabilities\CapabilitiesChecker class
 * always requires an instance of CapCheck.
 * this class allows commands to be processed by anyone
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class PublicCapabilities extends CapCheck
{


    /**
     * @return string
     */
    public function capability()
    {
        return '';
    }
}
