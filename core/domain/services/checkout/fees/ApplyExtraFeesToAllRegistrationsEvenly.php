<?php

namespace EventEspresso\core\domain\services\checkout\fees;

use EE_Error;
use EE_Registration;
use ReflectionException;

/**
 * Class ApplyExtraFeesToAllRegistrationsEvenly
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\payments
 * @since   $VID:$
 */
class ApplyExtraFeesToAllRegistrationsEvenly implements ExtraTxnFeesDistributionStrategyInterface
{
    /**
     * @param float             $extra_fees
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function applyExtraFeesToRegistrants(float $extra_fees, array $registrations)
    {
        // divide remaining fees by number of registrations and apply to each
        $extra_payment = $extra_fees / count($registrations);
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $new_registration_total = $registration->final_price() + $extra_payment;
                $registration->set_final_price($new_registration_total);
                $registration->save();
            }
        }
    }
}
