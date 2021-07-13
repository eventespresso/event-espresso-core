<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees\spco;

use DomainException;
use EE_Error;
use EventEspresso\core\domain\services\checkout\extra_txn_fees\ExtraTxnFeesHandler;
use ReflectionException;

/**
 * Class ExtraTxnFeesForRegistrantsHandler
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\extra_txn_fees\extra_fees
 * @since   $VID:$
 */
class ExtraTxnFeesForRegistrantsHandler extends ExtraTxnFeesHandler
{

    /**
     * @var ExtraTxnFeesDistributionStrategyInterface
     */
    protected $extra_fees_strategy;


    /**
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function applyExtraFeesToRegistrants()
    {
        $this->calculateExtraFeesForRegistrations($this->registrations);
        // if there's money owing after all the individual registration fees have been subtracted
        if ($this->extra_fees > 0) {
            // then first decide whether to spread extra fees across all registrations,
            // or assign everything to the primary registrant
            $extra_fees_strategy = $this->getExtraTxnFeesDistributionStrategy();
            $extra_fees_strategy->applyExtraFeesToRegistrants($this->extra_fees, $this->registrations);
        }
    }

    /**
     * @return ExtraTxnFeesDistributionStrategyInterface
     * @throws DomainException
     */
    private function getExtraTxnFeesDistributionStrategy()
    {
        if (! $this->extra_fees_strategy instanceof ExtraTxnFeesDistributionStrategyInterface) {
            switch ($this->getDistributionStrategy()) {
                case ExtraTxnFeesHandler::STRATEGY_PRIMARY_REGISTRANT_ONLY:
                    $extra_fees_strategy = new ApplyExtraFeesToPrimaryRegistrantOnly();
                    break;
                case ExtraTxnFeesHandler::STRATEGY_DISTRIBUTE_EVENLY:
                default:
                    $extra_fees_strategy = new ApplyExtraFeesToAllRegistrationsEvenly();
            }
            $this->validateExtraTxnFeesDistributionStrategy(
                $extra_fees_strategy,
                ExtraTxnFeesDistributionStrategyInterface::class
            );
            $this->extra_fees_strategy = $extra_fees_strategy;
        }
        return $this->extra_fees_strategy;
    }
}
