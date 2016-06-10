<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class UpdateRegistrationAndTransactionAfterChangeCommandHandler
 * performs final status updates and triggers notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class UpdateRegistrationAndTransactionAfterChangeCommandHandler extends CommandHandler
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return boolean
	 */
	public function handle( CommandInterface $command )
	{
		/** @var UpdateRegistrationAndTransactionAfterChangeCommand $command */
		if ( ! $command instanceof UpdateRegistrationAndTransactionAfterChangeCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'UpdateRegistrationAndTransactionAfterChangeCommand' );
		}
		// reset transaction status back to incomplete
		$command->registration()->transaction()->set_status( \EEM_Transaction::incomplete_status_code );
		// update transaction and all line item totals and subtotals
		$command->registration()->transaction()->total_line_item()->recalculate_total_including_taxes();
		/** @type \EE_Registration_Processor $registration_processor */
		$registration_processor = \EE_Registry::instance()->load_class( 'Registration_Processor' );
		$registration_processor->update_registration_status_and_trigger_notifications( $command->registration() );
		return true;
	}
}
// End of file UpdateRegistrationAndTransactionAfterChangeCommandHandler.php
// Location: /UpdateRegistrationAndTransactionAfterChangeCommandHandler.php