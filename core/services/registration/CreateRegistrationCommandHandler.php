<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegistrationCommandHandler
 * generates and validates a Registration
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegistrationCommandHandler implements CommandHandlerInterface
{



	/**
	 * @param  CommandInterface $command
	 * @return mixed
	 */
	public function handle( CommandInterface $command ) {
		/** @var CreateRegistrationCommand $command */
		if ( ! $command instanceof CreateRegistrationCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CreateRegistrationCommand' );
		}
		// get vars from command
		$ticket = $command->ticket();
		$reg_count = $command->regCount();
		$ticket_line_item = $command->ticketLineItem();
		$transaction = $command->transaction();
		$reg_group_size = $command->regGroupSize();
		// generate a REG_url_link
		$reg_url_link = $command->registry()
			->create(
				'CreateRegUrlLinkCommand',
				array( $reg_count, $ticket_line_item )
			)
			->regUrlLink();
		// and a REG_code
		$reg_code = $command->registry()
			->create(
				'CreateRegCodeCommand',
				array(
					$reg_url_link,
					$transaction->ID(),
					$ticket->ID()
				)
			)
			->regCode();
		$final_price = \EEH_Line_Item::calculate_final_price_for_ticket_line_item(
			$transaction->total_line_item(),
			$ticket_line_item
		);
		$final_price = $final_price !== null ? $final_price : $ticket->get_ticket_total_with_taxes();
		$registrations = $transaction->registrations();
		$reg_count = $reg_count ? $reg_count : count( $registrations ) + 1;
		$reg_group_size = $reg_group_size ? $reg_group_size : $this->incrementRegCount( $registrations );
		// now create a new registration for the ticket
		return $this->createRegistration(
			$this->getTicketEvent( $ticket ),
			$transaction,
			$ticket,
			$ticket_line_item,
			$final_price,
			$reg_count,
			$reg_group_size,
			$reg_url_link,
			$reg_code
		);
	}



	/**
	 * getTicketEvent
	 *
	 * @param \EE_Ticket $ticket
	 * @return \EE_Event
	 * @throws \EE_Error
	 * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
	 */
	protected function getTicketEvent( \EE_Ticket $ticket ) {
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
	 * @param  \EE_Registration[] $registrations
	 * @param  boolean            $update_existing_registrations
	 * @return int
	 * @throws \EE_Error
	 */
	protected function incrementRegCount( array $registrations, $update_existing_registrations = true ) {
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



	/**
	 * @param \EE_Event       $event
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @param \EE_Line_Item   $ticket_line_item
	 * @param                 $final_price
	 * @param                 $reg_count
	 * @param                 $reg_group_size
	 * @param                 $reg_url_link
	 * @param                 $reg_code
	 * @return \EE_Registration
	 * @throws \EE_Error
	 */
	protected function createRegistration(
		\EE_Event $event,
		\EE_Transaction $transaction,
		\EE_Ticket $ticket,
		\EE_Line_Item $ticket_line_item,
		$final_price,
		$reg_count,
		$reg_group_size,
		$reg_url_link,
		$reg_code
	) {
		$registration = \EE_Registration::new_instance(
			array(
				'EVT_ID'          => $event->ID(),
				'TXN_ID'          => $transaction->ID(),
				'TKT_ID'          => $ticket->ID(),
				'STS_ID'          => \EEM_Registration::status_id_incomplete,
				'REG_date'        => time(),
				'REG_final_price' => $final_price,
				'REG_session'     => \EE_Registry::instance()->SSN->id(),
				'REG_count'       => $reg_count,
				'REG_group_size'  => $reg_group_size,
				'REG_url_link'    => $reg_url_link,
				'REG_code'        => $reg_code,
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


}
// End of file CreateRegistrationCommandHandler.php
// Location: /CreateRegistrationCommandHandler.php