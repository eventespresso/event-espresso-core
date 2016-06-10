<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CopyRegistrationPaymentsCommandHandler
 * Given two EE_Registrations supplied via a CopyRegistrationDetailsCommand object,
 * will copy payment details from one registration to the target,
 * and then remove the original copied payment details from the registration
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CopyRegistrationPaymentsCommandHandler extends CommandHandler
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return boolean
	 */
	public function handle( CommandInterface $command ) {
		/** @var CopyRegistrationPaymentsCommand $command */
		if ( ! $command instanceof CopyRegistrationPaymentsCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CopyRegistrationPaymentsCommand' );
		}
		$target_registration = $command->targetRegistration();
		$registration_to_copy = $command->registrationToCopy();
		$previous_payments = $registration_to_copy->registration_payments();
		foreach ( $previous_payments as $previous_payment ) {
			if (
				$previous_payment instanceof \EE_Registration_Payment
				&& $previous_payment->payment() instanceof \EE_Payment
				&& $previous_payment->payment()->is_approved()
			) {
				$new_registration_payment = \EE_Registration_Payment::new_instance(
					array(
						'REG_ID'     => $target_registration->ID(),
						'PAY_ID'     => $previous_payment->ID(),
						'RPY_amount' => $previous_payment->amount(),
					)
				);
				if ( ! $new_registration_payment instanceof \EE_Registration_Payment ) {
					throw new UnexpectedEntityException( $new_registration_payment, 'EE_Registration_Payment' );
				}
				$new_registration_payment->save();
				$target_registration->set_paid( $previous_payment->amount() );
				$target_registration->save();
				// if new reg payment is good, then set old reg payment amount to zero
				$previous_payment->set_amount( 0 );
				$previous_payment->save();
				$registration_to_copy->set_paid( 0 );
				$registration_to_copy->save();
			}
		}
		return true;
	}



}
// End of file CopyRegistrationPaymentsCommandHandler.php
// Location: /CopyRegistrationPaymentsCommandHandler.php