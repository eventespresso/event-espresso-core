<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\services\commands\Command;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SingleRegistrationCommand
 * DTO for passing data a single EE_Registration object to a CommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class SingleRegistrationCommand extends Command
{


	/**
	 * @var \EE_Registration $registration
	 */
	private $registration;



	/**
	 * CancelRegistrationAndTicketLineItemCommand constructor.
	 *
	 * @param \EE_Registration    $registration
	 */
	public function __construct(
		\EE_Registration $registration
	) {
		$this->registration = $registration;
	}



	/**
	 * @return \EE_Registration
	 */
	public function registration()
	{
		return $this->registration;
	}

}
// End of file SingleRegistrationCommand.php
// Location: /SingleRegistrationCommand.php