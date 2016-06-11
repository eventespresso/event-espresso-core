<?php
namespace EventEspresso\core\services\commands\ticket;

use EventEspresso\core\services\commands\Command;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateTicketLineItemCommand
 * DTO for passing data to CreateTicketLineItemCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateTicketLineItemCommand extends Command
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
	 * @var int $quantity
	 */
	private $quantity = 1;

	/**
	 * @var \EE_Line_Item $ticket_line_item
	 */
	protected $ticket_line_item;



	/**
	 * CreateTicketLineItemCommand constructor.
	 *
	 * @param \EE_Transaction     $transaction
	 * @param \EE_Ticket          $ticket
	 * @param int                 $quantity
	 */
	public function __construct(
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		$quantity = 1
	) {
		$this->transaction = $transaction;
		$this->ticket = $ticket;
		$this->quantity = $quantity;
	}



	/**
	 * @return \EE_Transaction
	 */
	public function transaction() {
		return $this->transaction;
	}



	/**
	 * @return \EE_Ticket
	 */
	public function ticket() {
		return $this->ticket;
	}



	/**
	 * @return int
	 */
	public function quantity() {
		return $this->quantity;
	}



	/**
	 * @return \EE_Line_Item
	 */
	public function ticketLineItem() {
		return $this->ticket_line_item;
	}


}
// End of file CreateTicketLineItemCommand.php
// Location: /CreateTicketLineItemCommand.php