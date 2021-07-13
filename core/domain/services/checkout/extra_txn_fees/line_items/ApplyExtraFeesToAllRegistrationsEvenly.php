<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees\line_items;

use EE_Error;
use EEI_Line_Item;
use EventEspresso\core\domain\services\checkout\extra_txn_fees\ExtraTxnFeesHandler;

/**
 * Class ApplyExtraFeesToAllRegistrationsEvenly
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\checkout\extra_txn_fees\payments
 * @since   $VID:$
 */
class ApplyExtraFeesToAllRegistrationsEvenly implements ExtraTxnFeesDistributionStrategyInterface
{


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @param float         $original_li_total
     * @param float         $running_total_for_all_tickets
     * @param float         $running_total_for_specific_ticket
     * @param bool          $is_primary_registrant
     * @param int           $total_reg_count
     * @param string        $context
     * @throws EE_Error
     */
    public function adjustUnitPriceForNonTicketLineItem(
        EEI_Line_Item $line_item,
        EEI_Line_Item $child_line_item,
        $original_li_total,
        $running_total_for_all_tickets,
        $running_total_for_specific_ticket,
        $is_primary_registrant,
        $total_reg_count,
        $context
    ) {
        $percent_of_running_total = $running_total_for_all_tickets
            ? $original_li_total / $running_total_for_all_tickets
            : 0;
        $line_item->set_total($running_total_for_specific_ticket * $percent_of_running_total);
        $line_item->set_total($running_total_for_specific_ticket);

        if ($context === ExtraTxnFeesHandler::CONTEXT_ONE_REGISTRATION) {
            $new_unit_price = $original_li_total / $total_reg_count;
            $child_line_item->set_unit_price($new_unit_price);
            $child_line_item->set_quantity(1);
            $child_line_item->set_total($new_unit_price);
        }

        if (! $line_item->is_percent()) {
            $line_item->set_unit_price($line_item->total() / $line_item->quantity());
        }
    }


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @param bool          $is_primary_registrant
     * @param int           $total_reg_count
     * @param string        $context
     * @since   $VID:$
     */
    public function adjustUnitPriceAndQtyForTicketLineItem(
        EEI_Line_Item $line_item,
        EEI_Line_Item $child_line_item,
        $is_primary_registrant,
        $total_reg_count,
        $context
    ) {
        $child_line_item->set_quantity($line_item->quantity());
        $child_line_item->set_total($child_line_item->unit_price() * $child_line_item->quantity());
    }
}
