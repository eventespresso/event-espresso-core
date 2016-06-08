<?php
namespace EventEspresso\core\services\ticket;

use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\services\commands\CommandBusInterface;
use EventEspresso\core\services\commands\SelfExecutingCommand;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CancelTicketLineItemCommand
 * DTO for passing data to CancelTicketLineItemCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelTicketLineItemCommand extends SelfExecutingCommand
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
	 * @param \EE_Line_Item       $ticket_line_item
	 * @param int                 $quantity
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public static function fromTicketLineItem(
		\EE_Line_Item $ticket_line_item,
		$quantity = 1,
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		new self(
			$ticket_line_item->transaction(),
			$ticket_line_item->ticket(),
			$quantity,
			$ticket_line_item,
			$registry,
			$command_bus

		);
	}



	/**
	 * CancelTicketLineItemCommand constructor.
	 *
	 * @param \EE_Transaction     $transaction
	 * @param \EE_Ticket          $ticket
	 * @param int                 $quantity
	 * @param \EE_Line_Item       $ticket_line_item
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		$quantity = 1,
		\EE_Line_Item $ticket_line_item = null,
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		$this->transaction = $transaction;
		$this->ticket = $ticket;
		$this->ticket_line_item = $ticket_line_item instanceof \EE_Line_Item
			? $ticket_line_item
			: $this->getTicketLineItem( $transaction, $ticket );
		parent::__construct( $registry, $command_bus );
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
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @return \EE_Line_Item
	 * @throws EntityNotFoundException
	 * @throws \EE_Error
	 */
	protected static function getTicketLineItem( \EE_Transaction $transaction, \EE_Ticket $ticket )
	{
		$line_item = null;
		$ticket_line_items = \EEH_Line_Item::get_line_items_by_object_type_and_IDs(
			$transaction->total_line_item(),
			'Ticket',
			array( $ticket->ID() )
		);
		foreach ( $ticket_line_items as $ticket_line_item ) {
			if (
				$ticket_line_item instanceof \EE_Line_Item
				&& $ticket_line_item->OBJ_type() === 'Ticket'
				&& $ticket_line_item->OBJ_ID() === $ticket->ID()
			) {
				$line_item = $ticket_line_item;
				break;
			}
		}
		if ( ! ( $line_item instanceof \EE_Line_Item && $line_item->OBJ_type() === 'Ticket' ) ) {
			throw new EntityNotFoundException( 'Line Item Ticket ID', $ticket->ID() );
		}
		return $line_item;
	}


}
// End of file CancelTicketLineItemCommand.php
// Location: /CancelTicketLineItemCommand.php