<?php

namespace EventEspresso\core\domain\services\checkout\fees;

use DomainException;
use EE_Error;
use EE_Registration;
use EE_Transaction;
use ReflectionException;

/**
 * Class ExtraTxnFeesHandler
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\extra_fees
 * @since   $VID:$
 */
class ExtraTxnFeesHandler
{
    /**
     * @param EE_Transaction $transaction
     * @param EE_Registration[] $registrations
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function applyExtraFeesToRegistrants(EE_Transaction $transaction, array $registrations)
    {
        $extra_fees = $this->calculateExtraFees($transaction, $registrations);
        // if there's money owing after all the individual registration fees have been subtracted
        if ($extra_fees > 0) {
            // then first decide whether to spread extra fees across all registrations,
            // or assign everything to the primary registrant
            $distribution_strategy = $this->getExtraTxnFeesDistributionStrategy($transaction);
            $distribution_strategy->applyExtraFeesToRegistrants($extra_fees, $registrations);
        }
    }


    /**
     * @param EE_Transaction    $transaction
     * @param EE_Registration[] $registrations
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateExtraFees(EE_Transaction $transaction, array $registrations)
    {
        // we're going to calculate if there are any extra fees on the TXN, so start with the full amount
        $extra_fees = $transaction->total();
        // then subtract the total for each registration from what's owing for the entire txn
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $extra_fees -= $registration->final_price();
            }
        }
        return $extra_fees;
    }


    /**
     * @param EE_Transaction $transaction
     * @return ExtraTxnFeesDistributionStrategyInterface
     * @throws DomainException
     */
    private function getExtraTxnFeesDistributionStrategy(EE_Transaction $transaction)
    {
        $extra_fees_strategy_fqcn = apply_filters(
            'FHEE__EventEspresso_core_domain_services_checkout_fees_ExtraTxnFeesHandler__applyExtraFeesToRegistrants__extra_fees_strategy_fqcn',
            ApplyExtraFeesToAllRegistrationsEvenly::class,
            // or ApplyExtraFeesToPrimaryRegistrantOnly::class
            // or make one yourself that implements: ExtraTxnFeesDistributionStrategyInterface::class
            $transaction
        );
        $this->validateExtraTxnFeesDistributionStrategy($extra_fees_strategy_fqcn);
        return new $extra_fees_strategy_fqcn();
    }


    /**
     * @param string $extra_fees_strategy_fqcn
     * @throws DomainException
     */
    private function validateExtraTxnFeesDistributionStrategy($extra_fees_strategy_fqcn)
    {
        if (! is_subclass_of(
            $extra_fees_strategy_fqcn,
            ExtraTxnFeesDistributionStrategyInterface::class
        )) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'An invalid class name was supplied via the `%1$s` filter. It must implement `%2$s`',
                        'event_espresso'
                    ),
                    'EventEspresso_core_domain_services_checkout_fees_ExtraTxnFeesHandler__applyExtraFeesToRegistrants__extra_fees_strategy_fqcn',
                    ExtraTxnFeesDistributionStrategyInterface::class
                )
            );
        }
    }
}
