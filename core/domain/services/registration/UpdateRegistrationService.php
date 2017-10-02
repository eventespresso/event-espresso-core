<?php
namespace EventEspresso\core\domain\services\registration;

use EventEspresso\core\domain\services\DomainService;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class UpdateRegistrationService
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class UpdateRegistrationService extends DomainService
{

    /**
     * @param \EE_Registration $registration
     * @return bool
     */
    public function updateRegistrationAndTransaction(\EE_Registration $registration)
    {
        $transaction = $registration->transaction();
        // reset transaction status back to incomplete
        $transaction->set_status(\EEM_Transaction::incomplete_status_code);
        // update transaction and all line item totals and subtotals
        $transaction->total_line_item()->recalculate_total_including_taxes();
        // maybe update status, but don't save transaction just yet
        $transaction->update_status_based_on_total_paid();
        /** @type \EE_Registration_Processor $registration_processor */
        $registration_processor = \EE_Registry::instance()->load_class('Registration_Processor');
        $registration_processor->update_registration_status_and_trigger_notifications($registration);
        return true;
    }

}
// End of file UpdateRegistrationService.php
// Location: /UpdateRegistrationService.php