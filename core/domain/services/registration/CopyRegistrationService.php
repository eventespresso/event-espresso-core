<?php
namespace EventEspresso\core\domain\services\registration;

use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\exceptions\UnexpectedEntityException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CopyRegistrationService
 * Given two EE_Registrations,
 * will copy data from one registration to the target,
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CopyRegistrationService extends DomainService
{


    /**
     * @param \EE_Registration $target_registration
     * @param \EE_Registration $registration_to_copy
     * @return bool
     * @throws \EE_Error
     */
    public function copyRegistrationDetails(
        \EE_Registration $target_registration,
        \EE_Registration $registration_to_copy
    ) {
        // copy attendee
        $target_registration->set_attendee_id($registration_to_copy->attendee_ID());
        $target_registration->set_status( $registration_to_copy->status_ID() );
        $target_registration->save();
        // get answers to previous reg questions
        $answers = $this->reindexAnswersByQuestionId($registration_to_copy->answers());
        // get questions to new event reg form
        $new_event = $target_registration->event();
        $question_groups = $new_event->question_groups(
            array(
                array(
                    'Event.EVT_ID'                     => $new_event->ID(),
                    'Event_Question_Group.EQG_primary' => $registration_to_copy->is_primary_registrant()
                ),
                'order_by' => array('QSG_order' => 'ASC')
            )
        );
        foreach ($question_groups as $question_group) {
            if ($question_group instanceof \EE_Question_Group) {
                foreach ($question_group->questions() as $question) {
                    if ($question instanceof \EE_Question) {
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
     * @param \EE_Answer[] $answers
     * @return array
     * @throws \EE_Error
     */
    protected static function reindexAnswersByQuestionId(array $answers)
    {
        $reindexed_answers = array();
        foreach ($answers as $answer) {
            if ($answer instanceof \EE_Answer) {
                $reindexed_answers[$answer->question_ID()] = $answer->value();
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
        $old_answer_value = isset($previous_answers[$question->ID()])
            ? $previous_answers[$question->ID()]
            : '';
        $new_answer = \EE_Answer::new_instance(
            array(
                'QST_ID'    => $question->ID(),
                'REG_ID'    => $registration->ID(),
                'ANS_value' => $old_answer_value,
            )
        );
        if ( ! $new_answer instanceof \EE_Answer) {
            throw new UnexpectedEntityException($new_answer, 'EE_Answer');
        }
        $new_answer->save();
        return $new_answer;
    }



    /**
     * @param \EE_Registration $target_registration
     * @param \EE_Registration $registration_to_copy
     * @return bool
     * @throws \EE_Error
     */
    public function copyPaymentDetails(
        \EE_Registration $target_registration,
        \EE_Registration $registration_to_copy
    ) {
        $previous_payments = $registration_to_copy->registration_payments();
        foreach ($previous_payments as $previous_payment) {
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
                if ( ! $new_registration_payment instanceof \EE_Registration_Payment) {
                    throw new UnexpectedEntityException($new_registration_payment, 'EE_Registration_Payment');
                }
                $new_registration_payment->save();
                $target_registration->set_paid($previous_payment->amount());
                $target_registration->save();
                // if new reg payment is good, then set old reg payment amount to zero
                $previous_payment->set_amount(0);
                $previous_payment->save();
                $registration_to_copy->set_paid(0);
                $registration_to_copy->save();
            }
        }
        return true;
    }


}
// End of file CopyRegistrationService.php
// Location: /CopyRegistrationService.php