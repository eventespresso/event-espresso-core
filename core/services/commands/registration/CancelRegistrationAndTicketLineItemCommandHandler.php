<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
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
class CancelRegistrationAndTicketLineItemCommandHandler extends CommandHandler
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
		$this->executeSubCommand(
			'EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommand',
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