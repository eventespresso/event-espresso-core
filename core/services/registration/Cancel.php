<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\EntityNotFoundException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Cancel
 * handles cancelling a registration and updating all of it's related entities
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class Cancel {


	/**
	 * @throws \EE_Error
	 * @param \EE_Registration $registration
	 * @throws EntityNotFoundException
	 */
	public static function registrationTicketAndLineItem( \EE_Registration $registration ) {
		$transaction = $registration->transaction();
		$ticket = $registration->ticket();
		// get line item for original ticket
		$ticket_line_item = Cancel::getTicketLineItem( $transaction, $ticket );
		// get event line item for ticket and decrement quantity
		\EEH_Line_Item::decrement_quantity(
			\EEH_Line_Item::get_event_line_item_for_ticket(
				$transaction->total_line_item(),
				$ticket
			)
		);
		// then cancel original line item for ticket
		\EEH_Line_Item::cancel_line_item( $ticket_line_item );
		// cancel original registration
		$registration->set_status( \EEM_Registration::status_id_cancelled );
		$registration->save();
	}



	/**
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @return \EE_Line_Item
	 * @throws EntityNotFoundException
	 * @throws \EE_Error
	 */
	protected static function getTicketLineItem( \EE_Transaction $transaction, \EE_Ticket $ticket ) {
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
// End of file Cancel.php
// Location: /Cancel.php