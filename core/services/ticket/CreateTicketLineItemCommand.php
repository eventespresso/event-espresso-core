<?php
namespace EventEspresso\core\services\ticket;

use EventEspresso\core\services\commands\AbstractCommand;
use EventEspresso\core\services\commands\CommandBusInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateTicketLineItemCommand
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateTicketLineItemCommand extends AbstractCommand
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
	 * CreateTicketLineItemCommand constructor.
	 *
	 * @param \EE_Transaction     $transaction
	 * @param \EE_Ticket          $ticket
	 * @param int                 $quantity
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		$quantity,
		CommandBusInterface $command_bus
	) {
		$this->transaction = $transaction;
		$this->ticket = $ticket;
		$this->quantity = $quantity;
		parent::__construct( $command_bus );
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


}
// End of file CreateTicketLineItemCommand.php
// Location: /CreateTicketLineItemCommand.php