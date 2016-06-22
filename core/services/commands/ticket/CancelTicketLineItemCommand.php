<?php
namespace EventEspresso\core\services\commands\ticket;

use EventEspresso\core\services\commands\Command;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CancelTicketLineItemCommand
 * DTO for passing data to CancelTicketLineItemCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelTicketLineItemCommand extends Command
{


    /**
     * @var \EE_Transaction $transaction
     */
    private $transaction;

    /**
     * @var \EE_Ticket $ticket
     */
    private $ticket;

    /**
     * @var \EE_Line_Item $ticket_line_item
     */
    protected $ticket_line_item;

    /**
     * @var int $quantity
     */
    protected $quantity;



    /**
     * @param \EE_Registration $registration
     * @param int              $quantity
     */
    public static function fromRegistration(\EE_Registration $registration, $quantity = 1)
    {
        new self(
            $registration->transaction(),
            $registration->ticket(),
            1,
            $registration->ticket_line_item()
        );
    }



    /**
     * @param \EE_Line_Item $ticket_line_item
     * @param int           $quantity
     */
    public static function fromTicketLineItem(
        \EE_Line_Item $ticket_line_item,
        $quantity = 1
    ) {
        new self(
            $ticket_line_item->transaction(),
            $ticket_line_item->ticket(),
            $quantity,
            $ticket_line_item
        );
    }



    /**
     * CancelTicketLineItemCommand constructor.
     *
     * @param \EE_Transaction $transaction
     * @param \EE_Ticket      $ticket
     * @param int             $quantity
     * @param \EE_Line_Item   $ticket_line_item
     */
    public function __construct(
        \EE_Transaction $transaction,
        \EE_Ticket $ticket,
        $quantity = 1,
        \EE_Line_Item $ticket_line_item = null
    ) {
        $this->transaction = $transaction;
        $this->ticket = $ticket;
        $this->quantity = min(1, absint($quantity));
        $this->ticket_line_item = $ticket_line_item;
    }



    /**
     * @return \EE_Transaction
     */
    public function transaction()
    {
        return $this->transaction;
    }



    /**
     * @return \EE_Ticket
     */
    public function ticket()
    {
        return $this->ticket;
    }



    /**
     * @return \EE_Line_Item
     */
    public function ticketLineItem()
    {
        return $this->ticket_line_item;
    }



    /**
     * @return int
     */
    public function quantity()
    {
        return $this->quantity;
    }


}
// End of file CancelTicketLineItemCommand.php
// Location: /CancelTicketLineItemCommand.php