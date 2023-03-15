<?php

namespace EventEspresso\core\domain\services\checkout\extra_txn_fees\line_items;

use EEI_Line_Item;

interface ExtraTxnFeesDistributionStrategyInterface
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
    );


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @param bool          $is_primary_registrant
     * @param int           $total_reg_count
     * @param string        $context
     */
    public function adjustUnitPriceAndQtyForTicketLineItem(
        EEI_Line_Item $line_item,
        EEI_Line_Item $child_line_item,
        $is_primary_registrant,
        $total_reg_count,
        $context
    );
}
