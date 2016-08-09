<?php
namespace EventEspresso\core\services\commands\ticket;

use EventEspresso\core\domain\services\ticket\CancelTicketLineItemService;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CancelTicketLineItemCommandHandler
 * Decrements the quantity for the provided ticket line item,
 * then if it's new quantity is zero,
 * either cancels it altogether (by setting its type to EEM_Line_Item::type_cancellation)
 * or inserts a new line item with a type of EEM_Line_Item::type_cancellation
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelTicketLineItemCommandHandler extends CommandHandler
{


    /**
     * @var CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    private $cancel_ticket_line_item_service;



    /**
     * Command constructor
     *
     * @param CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    public function __construct(CancelTicketLineItemService $cancel_ticket_line_item_service)
    {
        $this->cancel_ticket_line_item_service = $cancel_ticket_line_item_service;
    }



    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command)
    {
        /** @var CancelTicketLineItemCommand $command */
        if ( ! $command instanceof CancelTicketLineItemCommand) {
            throw new InvalidEntityException(get_class($command), 'CancelTicketLineItemCommand');
        }
        return $this->cancel_ticket_line_item_service->cancel(
            $command->transaction(),
            $command->ticket(),
            $command->quantity(),
            $command->ticketLineItem()
        );
    }


}
// End of file CancelTicketLineItemCommandHandler.php
// Location: /CancelTicketLineItemCommandHandler.php