<?php
namespace EventEspresso\core\domain\services\ticket;

use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\exceptions\UnexpectedEntityException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CreateTicketLineItemService
 * generates and validates a new ticket line item
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CreateTicketLineItemService extends DomainService
{

    /**
     * @param \EE_Transaction $transaction
     * @param \EE_Ticket      $ticket
     * @param int             $quantity
     * @return \EE_Line_Item
     * @throws \EE_Error
     * @throws UnexpectedEntityException
     */
    public function create(
        \EE_Transaction $transaction,
        \EE_Ticket $ticket,
        $quantity = 1
    )
    {
        // create new line item for ticket
        $ticket_line_item = \EEH_Line_Item::add_ticket_purchase(
            $transaction->total_line_item(),
            $ticket,
            $quantity
        );
        if ( ! $ticket_line_item instanceof \EE_Line_Item) {
            throw new UnexpectedEntityException($ticket_line_item, 'EE_Line_Item');
        }
        // apply any applicable promotions that were initially used during registration to new line items
        do_action(
            'AHEE__\EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommandHandler__handle__new_ticket_line_item_added',
            $transaction->total_line_item(),
            $ticket,
            $transaction,
            $quantity
        );
        return $ticket_line_item;
    }



}
// End of file CreateTicketLineItemService.php
// Location: /CreateTicketLineItemService.php