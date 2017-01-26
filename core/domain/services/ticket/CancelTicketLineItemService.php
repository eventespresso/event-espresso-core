<?php
namespace EventEspresso\core\domain\services\ticket;

use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\exceptions\EntityNotFoundException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CancelTicketLineItemService
 * Decrements the quantity for the provided ticket line item,
 * then if it's new quantity is zero,
 * either cancels it altogether (by setting its type to EEM_Line_Item::type_cancellation)
 * or inserts a new line item with a type of EEM_Line_Item::type_cancellation
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CancelTicketLineItemService extends DomainService
{


    /**
     * @param \EE_Registration $registration
     * @param int              $quantity
     * @return bool|int
     */
    public function forRegistration(\EE_Registration $registration,$quantity = 1) {
        return $this->cancel(
            $registration->transaction(),
            $registration->ticket(),
            $quantity,
            $registration->ticket_line_item()
        );
    }


    /**
     * @param \EE_Transaction $transaction
     * @param \EE_Ticket      $ticket
     * @param int             $quantity
     * @param \EE_Line_Item   $ticket_line_item
     * @return bool|int
     */
    public function cancel(
        \EE_Transaction $transaction,
        \EE_Ticket $ticket,
        $quantity = 1,
        \EE_Line_Item $ticket_line_item = null
    ) {
        $ticket_line_item = $ticket_line_item instanceof \EE_Line_Item
            ? $ticket_line_item
            : $this->getTicketLineItem($transaction, $ticket);
        // first we need to decrement the ticket quantity
        \EEH_Line_Item::decrement_quantity($ticket_line_item, $quantity);
        // no tickets left for this line item ?
        if ((int)$ticket_line_item->quantity() === 0) {
            // then just set this line item as cancelled, save, and get out
            $ticket_line_item->set_type(\EEM_Line_Item::type_cancellation);
            $success = $ticket_line_item->save();
        } else {
            // otherwise create a new cancelled line item, so that we have a record of the cancellation
            $items_subtotal = \EEH_Line_Item::get_pre_tax_subtotal(
                \EEH_Line_Item::get_event_line_item_for_ticket(
                    $transaction->total_line_item(),
                    $ticket
                )
            );
            $cancelled_line_item = \EE_Line_Item::new_instance(
                array(
                    'LIN_name'       => $ticket_line_item->name(),
                    'LIN_desc'       => sprintf(
                        __('%1$s Cancelled: %2$s', 'event_espresso'),
                        $ticket_line_item->desc(),
                        date('Y-m-d h:i a')
                    ),
                    'LIN_unit_price' => (float)$ticket_line_item->unit_price(),
                    'LIN_quantity'   => $quantity,
                    'LIN_percent'    => null,
                    'LIN_is_taxable' => false,
                    'LIN_order'      => $items_subtotal instanceof \EE_Line_Item
                        ? count($items_subtotal->children())
                        : 0,
                    'LIN_total'      => (float)$ticket_line_item->unit_price(),
                    'LIN_type'       => \EEM_Line_Item::type_cancellation
                )
            );
            $success = \EEH_Line_Item::add_item($transaction->total_line_item(), $cancelled_line_item);
        }
        if ( ! $success) {
            throw new \RuntimeException(
                sprintf(
                    __('An error occurred while attempting to cancel ticket line item %1$s', 'event_espresso'),
                    $ticket_line_item->ID()
                )
            );
        }
        return $success;
    }



    /**
     * @param \EE_Transaction $transaction
     * @param \EE_Ticket      $ticket
     * @return \EE_Line_Item
     * @throws EntityNotFoundException
     * @throws \EE_Error
     */
    protected static function getTicketLineItem(\EE_Transaction $transaction, \EE_Ticket $ticket)
    {
        $line_item = null;
        $ticket_line_items = \EEH_Line_Item::get_line_items_by_object_type_and_IDs(
            $transaction->total_line_item(),
            'Ticket',
            array($ticket->ID())
        );
        foreach ($ticket_line_items as $ticket_line_item) {
            if (
                $ticket_line_item instanceof \EE_Line_Item
                && $ticket_line_item->OBJ_type() === 'Ticket'
                && $ticket_line_item->OBJ_ID() === $ticket->ID()
            ) {
                $line_item = $ticket_line_item;
                break;
            }
        }
        if ( ! ($line_item instanceof \EE_Line_Item && $line_item->OBJ_type() === 'Ticket')) {
            throw new EntityNotFoundException('Line Item Ticket ID', $ticket->ID());
        }
        return $line_item;
    }


}
// End of file CancelTicketLineItemService.php
// Location: /CancelTicketLineItemService.php