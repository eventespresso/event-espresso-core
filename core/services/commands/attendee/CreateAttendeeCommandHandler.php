<?php
namespace EventEspresso\core\services\commands\attendee;

use EE_Attendee;
use EE_Error;
use EE_Registration;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

defined( 'EVENT_ESPRESSO_VERSION' ) || exit;



/**
 * Class CreateAttendeeCommandHandler
 * generates and validates an Attendee
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateAttendeeCommandHandler extends CommandHandler {

	/**
	 * @var EE_Registry $registry
	 */
	protected $registry;



	/**
	 * @param EE_Registry $registry
	 */
	public function __construct( EE_Registry $registry ) {
		$this->registry = $registry;
	}



	/**
	 * @param CommandInterface $command
	 * @return EE_Attendee
	 * @throws EE_Error
	 * @throws InvalidEntityException
	 */
	public function handle( CommandInterface $command ) {
		/** @var CreateAttendeeCommand $command */
		if ( ! $command instanceof CreateAttendeeCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CreateAttendeeCommand' );
		}
		// have we met before?
		$attendee = $this->findExistingAttendee(
			$command->registration(),
			$command->attendeeDetails()
		);
		// did we find an already existing record for this attendee ?
		if ( $attendee instanceof EE_Attendee ) {
			$attendee = $this->updateExistingAttendeeData(
				$attendee,
				$command->attendeeDetails()
			);
		} else {
			$attendee = $this->createNewAttendee(
				$command->registration(),
				$command->attendeeDetails()
			);
		}
		return $attendee;
	}



	/**
	 * find_existing_attendee
	 *
	 * @param EE_Registration $registration
	 * @param  array           $attendee_data
	 * @return EE_Attendee
	 */
	private function findExistingAttendee( EE_Registration $registration, array $attendee_data ) {
		$existing_attendee = null;
		// does this attendee already exist in the db ? we're searching using a combination of first name, last name, AND email address
		$ATT_fname = ! empty( $attendee_data['ATT_fname'] )
			? $attendee_data['ATT_fname']
			: '';
		$ATT_lname = ! empty( $attendee_data['ATT_lname'] )
			? $attendee_data['ATT_lname']
			: '';
		$ATT_email = ! empty( $attendee_data['ATT_email'] )
			? $attendee_data['ATT_email']
			: '';
		// but only if those have values
		if ( $ATT_fname && $ATT_lname && $ATT_email ) {
			$existing_attendee = $this->registry->LIB->EEM_Attendee->find_existing_attendee(
				array(
					'ATT_fname' => $ATT_fname,
					'ATT_lname' => $ATT_lname,
					'ATT_email' => $ATT_email
				)
			);
		}
		return apply_filters(
			'FHEE_EventEspresso_core_services_commands_attendee_CreateAttendeeCommandHandler__findExistingAttendee__existing_attendee',
			$existing_attendee,
			$registration,
			$attendee_data
		);
	}



	/**
	 * _update_existing_attendee_data
	 * in case it has changed since last time they registered for an event
	 *
	 * @param EE_Attendee $existing_attendee
	 * @param  array       $attendee_data
	 * @return EE_Attendee
	 * @throws EE_Error
	 */
	private function updateExistingAttendeeData( EE_Attendee $existing_attendee, array $attendee_data ) {
		// first remove fname, lname, and email from attendee data
        // because these properties will be exactly the same as the returned attendee object,
        // since they were used in the query to get the attendee object in the first place
		$dont_set = array( 'ATT_fname', 'ATT_lname', 'ATT_email' );
		// now loop thru what's left and add to attendee CPT
		foreach ( $attendee_data as $property_name => $property_value ) {
			if (
				! in_array( $property_name, $dont_set, true )
				&& $this->registry->LIB->EEM_Attendee->has_field( $property_name )
			) {
				$existing_attendee->set( $property_name, $property_value );
			}
		}
		// better save that now
		$existing_attendee->save();
		return $existing_attendee;
	}



	/**
	 * create_new_attendee
	 *
	 * @param EE_Registration $registration
	 * @param  array           $attendee_data
	 * @return EE_Attendee
	 * @throws EE_Error
	 */
	private function createNewAttendee( EE_Registration $registration, array $attendee_data ) {
		// create new attendee object
		$new_attendee = EE_Attendee::new_instance( $attendee_data );
		// set author to event creator
		$new_attendee->set( 'ATT_author', $registration->event()->wp_user() );
		$new_attendee->save();
		return $new_attendee;
	}



}
// End of file CreateAttendeeCommandHandler.php
// Location: EventEspresso\core\services\commands\attendee/CreateAttendeeCommandHandler.php