<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CancelRegistrationAndTicketLineItemCommandHandler
 * sets registration status to cancelled and decrements the related ticket quantity
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelRegistrationAndTicketLineItemCommandHandler implements CommandHandlerInterface
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return boolean
	 */
	public function handle( CommandInterface $command )
	{
		/** @var CancelRegistrationAndTicketLineItemCommand $command */
		if ( ! $command instanceof CancelRegistrationAndTicketLineItemCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CancelRegistrationAndTicketLineItemCommand' );
		}
		$registration = $command->registration();
		$command->executeSubCommand(
			'CancelTicketLineItemCommand',
			array( $registration->transaction(), $registration->ticket() )
		);
		// cancel original registration
		$registration->set_status( \EEM_Registration::status_id_cancelled );
		$registration->save();
		return true;
	}




}
// End of file CancelRegistrationAndTicketLineItemCommandHandler.php
// Location: /CancelRegistrationAndTicketLineItemCommandHandler.php