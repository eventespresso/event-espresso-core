<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees;

use DomainException;
use EE_Error;
use EE_Registration;
use EE_Transaction;
use ReflectionException;

/**
 * Class ExtraTxnFeesHandler
 * abstract parent class for ExtraTxnFeesForLineItemsHandler and ExtraTxnFeesForRegistrantsHandler
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\extra_txn_fees
 * @since   $VID:$
 */
abstract class ExtraTxnFeesHandler
{

    const CONTEXT_ALL_REGISTRATIONS = 'all-registrations';

    const CONTEXT_ONE_REGISTRATION  = 'one-registration';

    const STRATEGY_DISTRIBUTE_EVENLY       = 'distribute-evenly';

    const STRATEGY_PRIMARY_REGISTRANT_ONLY = 'primary-registrant-only';


    /**
     * @var string
     */
    protected $context = '';

    /**
     * one of the STRATEGY_* constants above
     *
     * @var string
     */
    protected $distribution_strategy;

    /**
     * @var float
     */
    protected $extra_fees = 0.00;

    /**
     * @var int
     */
    protected $reg_count = 0;

    /**
     * @var int
     */
    protected $total_reg_count = 0;

    /*
     * ALL of the registrations for the transaction
     *
     * @var EE_Registration[]
     */
    protected $all_registrations;

    /*
     * just the registration being currently processed
     *
     * @var EE_Registration[]
     */
    protected $registrations;

    /*
     * @var EE_Transaction
     */
    protected $transaction;


    /**
     * ExtraTxnFeesHandler constructor.
     *
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(array $registrations)
    {
        $this->setDistributionStrategy(
            apply_filters(
                'FHEE__EventEspresso_core_domain_services_checkout__ExtraTxnFeesHandler__distribution_strategy',
                // STRATEGY_DISTRIBUTE_EVENLY or STRATEGY_PRIMARY_REGISTRANT_ONLY
                ExtraTxnFeesHandler::STRATEGY_DISTRIBUTE_EVENLY
            )
        );
        $this->setRegistrationsAndTransactions($registrations);
        $this->setContext();
    }


    /**
     * @param EE_Transaction    $transaction
     * @param EE_Registration[] $registrations
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
        $this->extra_fees = $extra_fees;
    }


    /**
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function calculateExtraFeesForRegistrations(array $registrations)
    {
        $this->setRegistrationsAndTransactions($registrations);
        $this->calculateExtraFees($this->transaction, $this->registrations);
    }


    /**
     * @return void
     */
    public function setContext()
    {
        $reg_count             = count($this->registrations);
        $this->total_reg_count = count($this->all_registrations);
        $this->context         = $reg_count === 1 && $reg_count !== $this->total_reg_count
            ? ExtraTxnFeesHandler::CONTEXT_ONE_REGISTRATION
            : ExtraTxnFeesHandler::CONTEXT_ALL_REGISTRATIONS;
    }


    /**
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function setRegistrationsAndTransactions(array $registrations)
    {
        $registration = reset($registrations);
        if (! $registration instanceof EE_Registration) {
            throw new DomainException(
                esc_html__(
                    'Invalid Registrations supplied to ExtraTxnFeesForLineItemsHandler::applyExtraFeesToLineItems()',
                    'event_espresso'
                )
            );
        }
        $this->registrations = $registrations;
        $this->transaction   = $registration->transaction();
        $this->all_registrations   = $this->transaction->registrations();
    }


    /**
     * @param string $distribution_strategy
     */
    private function setDistributionStrategy($distribution_strategy)
    {
        $valid_distribution_strategies = [
            ExtraTxnFeesHandler::STRATEGY_DISTRIBUTE_EVENLY,
            ExtraTxnFeesHandler::STRATEGY_PRIMARY_REGISTRANT_ONLY,
        ];
        $this->distribution_strategy   = in_array($distribution_strategy, $valid_distribution_strategies)
            ? $distribution_strategy
            : ExtraTxnFeesHandler::STRATEGY_DISTRIBUTE_EVENLY;
    }


    /**
     * @param object $extra_fees_strategy
     * @param string $required_interface
     */
    protected function validateExtraTxnFeesDistributionStrategy($extra_fees_strategy, $required_interface)
    {
        if (! is_subclass_of($extra_fees_strategy, $required_interface)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Invalid Extra Txn Fees Distribution Strategy. Expected: [%1$s] Received: [%2$s]',
                        'event_espresso'
                    ),
                    $required_interface,
                    is_object($extra_fees_strategy) ? get_class($extra_fees_strategy) : 'Unknown'
                )
            );
        }
    }


    /**
     * @return string
     */
    public function getDistributionStrategy()
    {
        return $this->distribution_strategy;
    }
}
