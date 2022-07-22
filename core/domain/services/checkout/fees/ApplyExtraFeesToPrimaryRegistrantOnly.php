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
class ApplyExtraFeesToPrimaryRegistrantOnly implements ExtraTxnFeesDistributionStrategyInterface
{
    /**
     * @param float             $extra_fees
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function applyExtraFeesToRegistrants(float $extra_fees, array $registrations)
    {
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration && $registration->is_primary_registrant()) {
                $primary_registrant_total = $registration->final_price() + $extra_fees;
                $registration->set_final_price($primary_registrant_total);
                $registration->save();
            }
        }
    }
}
