<?php

use EventEspresso\core\domain\services\checkout\extra_txn_fees\line_items\ExtraTxnFeesForLineItemsHandler;

/**
 * EE_Specific_Registrations_Line_Item_Filter
 * Modifies the line item quantities to reflect only those items for the specified registrations.
 * Also, modifies NON-ticket regular line items (eg flat discounts and percent surcharges, etc)
 * to only show the share for the specified ticket quantities
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Specific_Registrations_Line_Item_Filter extends EE_Line_Item_Filter_Base
{
    /**
     * @var ExtraTxnFeesForLineItemsHandler
     */
    protected $extra_txn_fees_handler;

    /**
     * array of line item codes and their corresponding quantities for registrations
     *
     * @var array $_line_item_registrations
     */
    protected $_line_item_registrations = [];

    /**
     * Just kept in case we want it someday. Currently unused
     *
     * @var EE_Registration[]
     */
    protected $_registrations = [];

    /**
     * @var EE_Registration
     */
    protected $_current_registration;

    /**
     * these reg statuses should NOT increment the line item quantity
     *
     * @var array
     */
    protected $_closed_reg_statuses = [];

    /**
     * @var int
     */
    protected $total_reg_count = 0;


    /**
     * EE_Billable_Line_Item_Filter constructor.
     *
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($registrations)
    {
        $this->_registrations = $registrations;
        $this->total_reg_count = count($registrations);
        $this->extra_txn_fees_handler = new ExtraTxnFeesForLineItemsHandler($registrations);
        $this->calculateRegistrationsPerLineItemCode($registrations);
        // these reg statuses should NOT increment the line item quantity
        $this->_closed_reg_statuses = EEM_Registration::closed_reg_statuses();
    }


    /**
     * Adjusts quantities for ticket line items according to the registrations provided upon construction,
     * so if a TXN was for 2 of the same ticket, but we are only generating line items for a single registration,
     * then this will change the quantity to 1, and update the total accordingly
     *
     * @param EEI_Line_Item $line_item
     * @return EEI_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function adjustLineItemQuantity(EEI_Line_Item $line_item)
    {
        // is this a ticket ?
        if ($line_item->type() === EEM_Line_Item::type_line_item && $line_item->OBJ_type() === 'Ticket') {
            $this->_current_registration = null;
            $quantity                    = 0;
            // if this ticket is billable at this moment, then we should have a positive quantity
            if (isset($this->_line_item_registrations[ $line_item->code() ])
                && is_array($this->_line_item_registrations[ $line_item->code() ])
            ) {
                // set quantity based on number of open registrations for this ticket
                foreach ($this->_line_item_registrations[ $line_item->code() ] as $registration) {
                    if ($registration instanceof EE_Registration
                    ) {
                        $quantity++;
                        $this->_current_registration = $registration;
                    }
                }
            }

            $line_item->set_quantity($quantity);
            $line_item->set_total($line_item->unit_price() * $line_item->quantity());
        }
        return $line_item;
    }


    /**
     * @param EEI_Line_Item $line_item
     * @param int           $running_total_for_specific_ticket
     * @param int           $total_child_ticket_quantity
     * @since   $VID:$
     */
    private function adjustLineItemTotalAndQty(
        EEI_Line_Item $line_item,
        $running_total_for_specific_ticket,
        $total_child_ticket_quantity
    ) {
        $line_item->set_total($running_total_for_specific_ticket);
        $new_unit_price = $line_item->quantity()
            ? $running_total_for_specific_ticket / $line_item->quantity()
            : 0;

        $line_item->set_unit_price($new_unit_price);
        if ($line_item->OBJ_type() === 'Event') {
            $line_item->set_quantity($total_child_ticket_quantity);
        }
    }


    /**
     * sets the _line_item_registrations from the provided registrations
     *
     * @param EE_Registration[] $registrations
     * @return void
     * @throws EE_Error|ReflectionException
     */
    private function calculateRegistrationsPerLineItemCode($registrations)
    {
        foreach ($registrations as $registration) {
            $line_item_code = EEM_Line_Item::instance()->get_var(
                EEM_Line_Item::instance()->line_item_for_registration_query_params(
                    $registration,
                    ['limit' => 1]
                ),
                'LIN_code'
            );
            if ($line_item_code) {
                if (! isset($this->_line_item_registrations[ $line_item_code ])) {
                    $this->_line_item_registrations[ $line_item_code ] = [];
                }
                $this->_line_item_registrations[ $line_item_code ][ $registration->ID() ] = $registration;
            }
        }
    }


    /**
     * @param EEI_Line_Item $line_item
     * @param EEI_Line_Item $child_line_item
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function isNonCancelledTicketLineItem(EEI_Line_Item $line_item, EEI_Line_Item $child_line_item)
    {
        return // make sure this item's quantity and total matches its parent
            $line_item->type() === EEM_Line_Item::type_line_item
            && $line_item->OBJ_type() === 'Ticket'
            // but not if it's a percentage modifier
            && ! $child_line_item->is_percent()
            && ! (
                // or a cancellation
                $child_line_item->is_cancelled()
                && ! (
                    // unless it IS a cancellation and the current registration is cancelled
                    $child_line_item->is_cancelled()
                    && $this->_current_registration instanceof EE_Registration
                    && in_array($this->_current_registration->status_ID(), $this->_closed_reg_statuses, true)
                )
            );
    }


    /**
     * @param EEI_Line_Item $line_item
     * @return bool
     * @since   $VID:$
     */
    private function isNonTicketLineItem(EEI_Line_Item $line_item)
    {
        return $line_item->type() === EEM_Line_Item::type_line_item && $line_item->OBJ_type() !== 'Ticket';
    }


    /**
     * Creates a duplicate of the line item tree, except only includes billable items
     * and the portion of line items attributed to billable things
     *
     * @param EEI_Line_Item $line_item
     * @return EEI_Line_Item
     * @throws EE_Error|ReflectionException
     */
    public function process(EEI_Line_Item $line_item)
    {
        $this->adjustLineItemQuantity($line_item);
        if (! $line_item->children()) {
            return $line_item;
        }
        // the original running total (taking ALL tickets into account)
        $running_total_for_all_tickets = 0;
        // the new running total (only taking the specified ticket quantities into account)
        $running_total_for_specific_ticket = 0;
        // let's also track the quantity of tickets that pertain to the registrations
        $total_child_ticket_quantity = 0;
        foreach ($line_item->children() as $child_line_item) {
            $original_li_total = $child_line_item->is_percent()
                ? $running_total_for_all_tickets * $child_line_item->percent() / 100
                : $child_line_item->unit_price() * $child_line_item->quantity();

            $this->process($child_line_item);

            $applies_to_primary_registrant = $this->_current_registration instanceof EE_Registration
                                             && $this->_current_registration->is_primary_registrant();
            // If this line item is a normal line item that isn't for a ticket,
            // we want to modify its total (and unit price if not a percentage line item)
            // so it reflects only that portion of the surcharge/discount shared by these registrations
            if ($this->isNonTicketLineItem($child_line_item)) {
                $this->extra_txn_fees_handler->adjustUnitPriceForNonTicketLineItem(
                    $line_item,
                    $child_line_item,
                    $original_li_total,
                    $running_total_for_all_tickets,
                    $running_total_for_specific_ticket,
                    $applies_to_primary_registrant
                );
            } elseif ($this->isNonCancelledTicketLineItem($line_item, $child_line_item)) {
                $this->extra_txn_fees_handler->adjustUnitPriceAndQtyForTicketLineItem(
                    $line_item,
                    $child_line_item,
                    $applies_to_primary_registrant
                );
            }
            $running_total_for_all_tickets += $original_li_total;
            $running_total_for_specific_ticket += $child_line_item->total();

            if ($child_line_item->OBJ_type() === 'Ticket') {
                $total_child_ticket_quantity += $child_line_item->quantity();
            }
        }
        $this->adjustLineItemTotalAndQty($line_item, $running_total_for_specific_ticket, $total_child_ticket_quantity);
        return $line_item;
    }
}
