<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\UnexpectedEntityException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Create
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class Create {



	/**
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @param int             $attendee_number
	 * @param int             $reg_group_size
	 * @return \EE_Registration
	 * @throws \OutOfRangeException
	 * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
	 * @throws \EE_Error
	 */
	public static function registrationAndLineItemForTransaction(
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		$attendee_number = 1,
		$reg_group_size = 0
	) {
		// create new line item for ticket
		$ticket_line_item = \EEH_Line_Item::add_ticket_purchase(
			$transaction->total_line_item(),
			$ticket,
			1
		);
		if ( ! $ticket_line_item instanceof \EE_Line_Item ) {
			throw new UnexpectedEntityException( $ticket_line_item, 'EE_Line_Item' );
		}
		// apply any applicable promotions that were initially used during registration to new line items
		do_action(
			'AHEE__Create__registrationAndLineItemForTransaction__new_ticket_line_item_added',
			$ticket_line_item,
			$ticket,
			$transaction
		);
		// create new registration from new ticket line item
		return Create::registrationForTransaction(
			$transaction,
			$ticket,
			$ticket_line_item,
			$attendee_number,
			$reg_group_size
		);
	}



	/**
	 * generate_ONE_registration_from_line_item
	 * Although a ticket line item may have a quantity greater than 1,
	 * this method will ONLY CREATE ONE REGISTRATION !!!
	 * Regardless of the ticket line item quantity.
	 * This means that any code calling this method is responsible for ensuring
	 * that the final registration count matches the ticket line item quantity.
	 * This was done to make it easier to match the number of registrations
	 * to the number of tickets in the cart, when the cart has been edited
	 * after SPCO has already been initialized. So if an additional ticket was added to the cart, you can simply pass
	 * the line item to this method to add a second ticket, and in this case, you would not want to add 2 tickets.
	 *
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @param \EE_Line_Item   $ticket_line_item
	 * @param int             $attendee_number
	 * @param int             $reg_group_size
	 * @return \EE_Registration
	 * @throws \OutOfRangeException
	 * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
	 * @throws \EE_Error
	 */
	public static function registrationForTransaction(
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		\EE_Line_Item $ticket_line_item,
		$attendee_number = 1,
		$reg_group_size = 0
	) {
		$event = Create::getTicketEvent( $ticket );
		$reg_url_link = Create::regUrlLink( $attendee_number, $ticket_line_item );
		$final_price = \EEH_Line_Item::calculate_final_price_for_ticket_line_item(
			$transaction->total_line_item(),
			$ticket_line_item
		);
		$final_price = $final_price !== null ? $final_price : $ticket->get_ticket_total_with_taxes();
		$registrations = $transaction->registrations();
		$attendee_number = absint( $attendee_number );
		$attendee_number = $attendee_number ? $attendee_number : count( $registrations ) + 1;
		$reg_group_size = absint( $reg_group_size );
		$reg_group_size = $reg_group_size ? $reg_group_size : Create::incrementRegCount( $registrations );
		// now create a new registration for the ticket
		$registration = \EE_Registration::new_instance(
			array(
				'EVT_ID'          => $event->ID(),
				'TXN_ID'          => $transaction->ID(),
				'TKT_ID'          => $ticket->ID(),
				'STS_ID'          => \EEM_Registration::status_id_incomplete,
				'REG_date'        => time(),
				'REG_final_price' => $final_price,
				'REG_session'     => \EE_Registry::instance()->SSN->id(),
				'REG_count'       => $attendee_number,
				'REG_group_size'  => $reg_group_size,
				'REG_url_link'    => $reg_url_link,
				'REG_code'        => Create::regCodeFromRegUrlLink( $reg_url_link, $transaction->ID(), $ticket->ID() ),
			)
		);
		if ( ! $registration instanceof \EE_Registration ) {
			throw new UnexpectedEntityException( $registration, 'EE_Registration' );
		}
		$registration->save();
		$registration->_add_relation_to( $event, 'Event', array(), $event->ID() );
		$registration->_add_relation_to(
			$ticket_line_item->ticket(),
			'Ticket',
			array(),
			$ticket_line_item->ticket()->ID()
		);
		$transaction->_add_relation_to( $registration, 'Registration' );
		return $registration;
	}



	/**
	 * getTicketEvent
	 *
	 * @param \EE_Ticket $ticket
	 * @return \EE_Event
	 * @throws \EE_Error
	 * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
	 */
	protected static function getTicketEvent( \EE_Ticket $ticket ) {
		$first_datetime = $ticket->get_first_related( 'Datetime' );
		if ( ! $first_datetime instanceof \EE_Datetime ) {
			throw new UnexpectedEntityException(
				$first_datetime,
				'EE_Datetime',
				sprintf(
					__( "The ticket (%s) is not associated with any valid datetimes.", "event_espresso" ),
					$ticket->name()
				)
			);
		}
		$event = $first_datetime->get_first_related( 'Event' );
		if ( ! $event instanceof \EE_Event ) {
			throw new UnexpectedEntityException(
				$event,
				'EE_Event',
				sprintf(
					__( "The ticket (%s) is not associated with a valid event.", "event_espresso" ),
					$ticket->name()
				)
			);
		}
		return $event;
	}



	/**
	 * generates reg_url_link
	 *
	 * @param int                   $att_nmbr
	 * @param \EE_Line_Item | string $item
	 * @return string
	 */
	public static function regUrlLink( $att_nmbr, $item ) {
		$reg_url_link = $item instanceof \EE_Line_Item ? $item->code() : $item;
		$reg_url_link = $att_nmbr . '-' . md5( $reg_url_link . microtime() );
		return $reg_url_link;
	}



	/**
	 * generates reg code
	 *
	 * @param \EE_Registration $registration
	 * @return string
	 * @throws \EE_Error
	 */
	public static function regCodeFromRegistration( \EE_Registration $registration ) {
		return Create::regCodeFromRegUrlLink(
			$registration->reg_url_link(),
			$registration->transaction_ID(),
			$registration->ticket_ID()
		);
	}



	/**
	 * generates reg code
	 *
	 * @param string $reg_url_link
	 * @param int    $TXN_ID
	 * @param int    $TKT_ID
	 * @return string
	 */
	public static function regCodeFromRegUrlLink( $reg_url_link, $TXN_ID = 0, $TKT_ID = 0 ) {
		// figure out where to start parsing the reg code
		$chars = strpos( $reg_url_link, '-' ) + 5;
		// TXN_ID + TKT_ID + first 3 and last 3 chars of reg_url_link
		$new_reg_code = array(
			$reg_url_link,
			$TKT_ID,
			substr( $reg_url_link, 0, $chars )
		);
		// now put it all together
		$new_reg_code = implode( '-', $new_reg_code );
		return apply_filters(
			'FHEE__Create__regCode__new_reg_code',
			$new_reg_code,
			$TXN_ID,
			$TKT_ID
		);
	}



	/**
	 * @param  \EE_Registration[] $registrations
	 * @param  boolean            $update_existing_registrations
	 * @return int
	 * @throws \EE_Error
	 */
	public static function incrementRegCount( array $registrations, $update_existing_registrations = true ) {
		$new_reg_count = count( $registrations ) + 1;
		if ( $update_existing_registrations ) {
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof \EE_Registration ) {
					$registration->set_count( $new_reg_count );
					$registration->save();
				}
			}
		}
		return $new_reg_count;
	}


}
// End of file Create.php
// Location: /Create.php