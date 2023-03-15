<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees\line_items;

use DomainException;
use EE_Error;
use EEI_Line_Item;
use EventEspresso\core\domain\services\checkout\extra_txn_fees\ExtraTxnFeesHandler;

/**
 * Class ExtraTxnFeesHandler
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\extra_txn_fees\extra_fees
 * @since   $VID:$
 */
class ExtraTxnFeesForLineItemsHandler extends ExtraTxnFeesHandler
{


    /**
     * @var ExtraTxnFeesDistributionStrategyInterface
     */
    protected $extra_fees_strategy;


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
                    $extra_fees_strategy = new ApplyExtraFeesToAllRegistrationsEvenly();
                    break;
                default:
                    $extra_fees_strategy = new ApplyExtraFeesToPrimaryRegistrantOnly();
            }
            $this->validateExtraTxnFeesDistributionStrategy(
                $extra_fees_strategy,
                ExtraTxnFeesDistributionStrategyInterface::class
            );
            $this->extra_fees_strategy = $extra_fees_strategy;
        }
        return $this->extra_fees_strategy;
    }


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @param float         $original_li_total
     * @param float         $running_total_for_all_tickets
     * @param float         $running_total_for_specific_ticket
     * @param bool          $is_primary_registrant
     * @throws EE_Error
     */
    public function adjustUnitPriceForNonTicketLineItem(
        EEI_Line_Item $line_item,
        EEI_Line_Item $child_line_item,
        $original_li_total,
        $running_total_for_all_tickets,
        $running_total_for_specific_ticket,
        $is_primary_registrant
    ) {
        $extra_fees_strategy = $this->getExtraTxnFeesDistributionStrategy();
        $extra_fees_strategy->adjustUnitPriceForNonTicketLineItem(
            $line_item,
            $child_line_item,
            $original_li_total,
            $running_total_for_all_tickets,
            $running_total_for_specific_ticket,
            $is_primary_registrant,
            $this->total_reg_count,
            $this->context
        );
    }


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @param bool          $is_primary_registrant
     */
    public function adjustUnitPriceAndQtyForTicketLineItem(
        EEI_Line_Item $line_item,
        EEI_Line_Item $child_line_item,
        $is_primary_registrant
    ) {
        $extra_fees_strategy = $this->getExtraTxnFeesDistributionStrategy();
        $extra_fees_strategy->adjustUnitPriceAndQtyForTicketLineItem(
            $line_item,
            $child_line_item,
            $is_primary_registrant,
            $this->total_reg_count,
            $this->context
        );
    }
}
