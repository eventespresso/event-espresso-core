<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\services\commands\CommandBusInterface;
use EventEspresso\core\services\commands\SelfExecutingCommand;

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
abstract class SingleRegistrationCommand extends SelfExecutingCommand
{


	/**
	 * @var \EE_Registration $registration
	 */
	private $registration;



	/**
	 * CancelRegistrationAndTicketLineItemCommand constructor.
	 *
	 * @param \EE_Registration    $registration
	 * @param string              $property
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		\EE_Registration $registration,
		$property = '',
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		$this->registration = $registration;
		parent::__construct( $registry, $command_bus, $property );
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