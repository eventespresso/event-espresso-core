<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\services\commands\Command;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CopyRegistrationDetailsCommand
 * DTO for passing data to a CopyRegistrationDetailsCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CopyRegistrationDetailsCommand extends Command
{


	/**
	 * @var \EE_Registration $target_registration
	 */
	private $target_registration;


	/**
	 * @var \EE_Registration $registration_to_copy
	 */
	private $registration_to_copy;



	/**
	 * CopyRegistrationDetailsCommand constructor.
	 *
	 * @param \EE_Registration    $target_registration
	 * @param \EE_Registration    $registration_to_copy
	v
	 */
	public function __construct(
		\EE_Registration $target_registration,
		\EE_Registration $registration_to_copy
	) {
		$this->target_registration = $target_registration;
		$this->registration_to_copy = $registration_to_copy;
	}



	/**
	 * @return \EE_Registration
	 */
	public function targetRegistration() {
		return $this->target_registration;
	}



	/**
	 * @return \EE_Registration
	 */
	public function registrationToCopy() {
		return $this->registration_to_copy;
	}



}
// End of file CopyRegistrationDetailsCommand.php
// Location: /CopyRegistrationDetailsCommand.php