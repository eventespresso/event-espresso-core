<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CopyRegistrationDetailsCommandHandler
 * Given two EE_Registrations supplied via a CopyRegistrationDetailsCommand object,
 * will copy attendee and event details from the registration to copy to the target
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CopyRegistrationDetailsCommandHandler implements CommandHandlerInterface
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return boolean
	 */
	public function handle( CommandInterface $command ) {
		/** @var CopyRegistrationDetailsCommand $command */
		if ( ! $command instanceof CopyRegistrationDetailsCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CopyRegistrationDetailsCommand' );
		}
		$target_registration = $command->targetRegistration();
		$registration_to_copy = $command->registrationToCopy();
		// copy attendee
		$target_registration->set_attendee_id( $registration_to_copy->attendee_ID() );
		// $target_registration->set_status( $registration_to_copy->status_ID() );
		$target_registration->save();
		// get answers to previous reg questions
		$answers = $this->reindexAnswersByQuestionId( $registration_to_copy->answers() );
		// get questions to new event reg form
		$new_event = $this->getRegistrationEvent( $target_registration );
		$question_groups = $new_event->question_groups(
			array(
				array(
					'Event.EVT_ID'                     => $new_event->ID(),
					'Event_Question_Group.EQG_primary' => $registration_to_copy->is_primary_registrant()
				),
				'order_by' => array( 'QSG_order' => 'ASC' )
			)
		);
		foreach ( $question_groups as $question_group ) {
			if ( $question_group instanceof \EE_Question_Group ) {
				foreach ( $question_group->questions() as $question ) {
					if ( $question instanceof \EE_Question ) {
						$this->generateNewAnswer(
							$question,
							$target_registration,
							$answers
						);
					}
				}
			}
		}
		return true;
	}



	/**
	 * @param \EE_Registration $registration
	 * @return \EE_Event
	 * @throws \EventEspresso\core\exceptions\EntityNotFoundException
	 */
	protected static function getRegistrationEvent( \EE_Registration $registration ) {
		$event = $registration->event();
		if ( ! $event instanceof \EE_Event ) {
			throw new EntityNotFoundException( 'Event ID', $registration->event_ID() );
		}
		return $event;
	}



	/**
	 * @param \EE_Answer[] $answers
	 * @return array
	 * @throws \EE_Error
	 */
	protected static function reindexAnswersByQuestionId( array $answers ) {
		$reindexed_answers = array();
		foreach ( $answers as $answer ) {
			if ( $answer instanceof \EE_Answer ) {
				$reindexed_answers[ $answer->question_ID() ] = $answer->value();
			}
		}
		return $reindexed_answers;
	}



	/**
	 * @param \EE_Question     $question
	 * @param \EE_Registration $registration
	 * @param                  $previous_answers
	 * @return \EE_Answer
	 * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
	 * @throws \EE_Error
	 */
	protected static function generateNewAnswer(
		\EE_Question $question,
		\EE_Registration $registration,
		$previous_answers
	) {
		$old_answer_value = isset( $previous_answers[ $question->ID() ] )
			? $previous_answers[ $question->ID() ]
			: '';
		$new_answer = \EE_Answer::new_instance(
			array(
				'QST_ID'    => $question->ID(),
				'REG_ID'    => $registration->ID(),
				'ANS_value' => $old_answer_value,
			)
		);
		if ( ! $new_answer instanceof \EE_Answer ) {
			throw new UnexpectedEntityException( $new_answer, 'EE_Answer' );
		}
		$new_answer->save();
		return $new_answer;
	}



}
// End of file CopyRegistrationDetailsCommandHandler.php
// Location: /CopyRegistrationDetailsCommandHandler.php