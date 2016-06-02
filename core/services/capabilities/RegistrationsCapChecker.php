<?php
namespace EventEspresso\core\services\capabilities;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InsufficientPermissionsException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class RegistrationsCapChecker
 * A class for centralizing capabilities checks for registrations.
 * Ideally this class should be injected into the constructors of any classes
 * that needs to do capabilities checks for registrations.
 * ie:
 *
 *      public function __construct( RegistrationsCapChecker $cap_checker ) {
 *          $this->cap_checker = $cap_checker;
 *      }
 *
 *  which then allows the class to easily perform cap checks
 *
 *      $this->cap_checker->editRegistrations( $registration, __( 'Edit Registration', 'event_espresso' ) );
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9..0
 */
class RegistrationsCapChecker extends CapabilitiesChecker
{

	/**
	 * @param \EE_Registration $registration
	 * @param string           $action_name - what the user is attempting to do, like: 'Edit Registration'
	 * @return bool
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\core\exceptions\InsufficientPermissionsException
	 */
	public function editRegistrations( \EE_Registration $registration, $action_name )
	{
		if ( ! is_string( $action_name ) ) {
			throw new InvalidDataTypeException( '$action_name', $action_name, 'string' );
		}
		$action_slug = strtolower( str_replace( ' ', '_', $action_name ) );
		if (
			! $this->capabilities()->current_user_can(
				'ee_edit_registrations',
				$action_slug,
				$registration->ID()
			)
		) {
			throw new InsufficientPermissionsException( $action_name );
		}

		return true;
	}

}
// End of file RegistrationsCapChecker.php
// Location: core/services/capabilities/registration/RegistrationsCapChecker.php