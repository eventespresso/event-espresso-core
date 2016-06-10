<?php
namespace EventEspresso\core\services\commands\ticket;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CancelTicketLineItemCommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelTicketLineItemCommandHandler extends CommandHandler
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function handle( CommandInterface $command )
	{
		/** @var CancelTicketLineItemCommand $command */
		if ( ! $command instanceof CancelTicketLineItemCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CancelTicketLineItemCommand' );
		}
		$ticket_line_item = $command->ticketLineItem();
		// first we need to decrement the ticket quantity
		\EEH_Line_Item::decrement_quantity( $ticket_line_item, 1 );
		// no tickets left for this line item ?
		if ( (int) $ticket_line_item->quantity() === 0 ) {
			// then just set this line item as cancelled, save, and get out
			$ticket_line_item->set_type( \EEM_Line_Item::type_cancellation );
			$success = $ticket_line_item->save();
		} else {
			$transaction = $command->transaction();
			$ticket = $command->ticket();
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
						__( '%1$s Cancelled: %2$s', 'event_espresso' ),
						$ticket_line_item->desc(),
						date( 'Y-m-d h:i a' )
					),
					'LIN_unit_price' => (float) $ticket_line_item->unit_price(),
					'LIN_quantity'   => 1,
					'LIN_percent'    => null,
					'LIN_is_taxable' => false,
					'LIN_order'      => $items_subtotal instanceof \EE_Line_Item
						? count( $items_subtotal->children() )
						: 0,
					'LIN_total'      => (float) $ticket_line_item->unit_price(),
					'LIN_type'       => \EEM_Line_Item::type_cancellation
				)
			);
			$success = \EEH_Line_Item::add_item( $transaction->total_line_item(), $cancelled_line_item );
		}
		if ( ! $success ) {
			throw new \RuntimeException(
				sprintf(
					__( 'An error occurred while attempting to cancel ticket line item %1$s', 'event_espresso' ),
					$ticket_line_item->ID()
				)
			);
		}
		return $success;
	}


}
// End of file CancelTicketLineItemCommandHandler.php
// Location: /CancelTicketLineItemCommandHandler.php