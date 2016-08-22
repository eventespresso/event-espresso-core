<?php
namespace EventEspresso\core\domain\services\capabilities;

defined('EVENT_ESPRESSO_VERSION') || exit;

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
 * @since         $VID:$
 *
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
// End of file PublicCapabilities.php
// Location: EventEspresso\core\domain\services\capabilities/PublicCapabilities.php