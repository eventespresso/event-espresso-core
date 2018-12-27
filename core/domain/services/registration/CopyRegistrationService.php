<?php

namespace EventEspresso\core\domain\services\registration;

use EE_Answer;
use EE_Error;
use EE_Payment;
use EE_Question;
use EE_Registration;
use EE_Registration_Payment;
use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use RuntimeException;

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
     * @param EE_Registration $target_registration
     * @param EE_Registration $registration_to_copy
     * @return bool
     * @throws UnexpectedEntityException
     * @throws EntityNotFoundException
     * @throws RuntimeException
     * @throws EE_Error
     */
    public function copyRegistrationDetails(
        EE_Registration $target_registration,
        EE_Registration $registration_to_copy
    ) {
        // copy attendee
        $target_registration->set_attendee_id($registration_to_copy->attendee_ID());
        $target_registration->updateStatusBasedOnTotalPaid(false);
        $target_registration->save();
        // get answers to previous reg questions
        $answers = $this->reindexAnswersByQuestionId($registration_to_copy->answers());
        // get questions to new event reg form
        $new_event = $target_registration->event();
        $question_groups = $new_event->question_groups(
            array(
                array(
                    'Event.EVT_ID'                     => $new_event->ID(),
                    'Event_Question_Group.EQG_primary' => $registration_to_copy->is_primary_registrant(),
                ),
                'order_by' => array('QSG_order' => 'ASC'),
            )
        );
        foreach ($question_groups as $question_group) {
            if ($question_group instanceof \EE_Question_Group) {
                foreach ($question_group->questions() as $question) {
                    if ($question instanceof EE_Question) {
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
     * @param EE_Answer[] $answers
     * @return array
     * @throws EE_Error
     */
    protected function reindexAnswersByQuestionId(array $answers)
    {
        $reindexed_answers = array();
        foreach ($answers as $answer) {
            if ($answer instanceof EE_Answer) {
                $reindexed_answers[ $answer->question_ID() ] = $answer->value();
            }
        }
        return $reindexed_answers;
    }


    /**
     * @param EE_Question      $question
     * @param EE_Registration  $registration
     * @param                  $previous_answers
     * @return EE_Answer
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function generateNewAnswer(
        EE_Question $question,
        EE_Registration $registration,
        $previous_answers
    ) {
        $old_answer_value = isset($previous_answers[ $question->ID() ])
            ? $previous_answers[ $question->ID() ]
            : '';
        $new_answer = EE_Answer::new_instance(
            array(
                'QST_ID'    => $question->ID(),
                'REG_ID'    => $registration->ID(),
                'ANS_value' => $old_answer_value,
            )
        );
        if (! $new_answer instanceof EE_Answer) {
            throw new UnexpectedEntityException($new_answer, 'EE_Answer');
        }
        $new_answer->save();
        return $new_answer;
    }


    /**
     * @param EE_Registration $target_registration
     * @param EE_Registration $registration_to_copy
     * @return bool
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    public function copyPaymentDetails(
        EE_Registration $target_registration,
        EE_Registration $registration_to_copy
    ) {
        $save = false;
        $previous_registration_payments = $registration_to_copy->registration_payments();
        $new_registration_payment_total = 0;
        $registration_to_copy_total = $registration_to_copy->paid();
        foreach ($previous_registration_payments as $previous_registration_payment) {
            if ($previous_registration_payment instanceof EE_Registration_Payment
                && $previous_registration_payment->payment() instanceof EE_Payment
                && $previous_registration_payment->payment()->is_approved()
            ) {
                $payment_amount = $previous_registration_payment->amount();
                $new_registration_payment = EE_Registration_Payment::new_instance(
                    array(
                        'REG_ID'     => $target_registration->ID(),
                        'PAY_ID'     => $previous_registration_payment->payment()->ID(),
                        'RPY_amount' => $payment_amount,
                    )
                );
                if (! $new_registration_payment instanceof EE_Registration_Payment) {
                    throw new UnexpectedEntityException($new_registration_payment, 'EE_Registration_Payment');
                }
                $new_registration_payment->save();
                // if new reg payment is good, then set old reg payment amount to zero
                $previous_registration_payment->set_amount(0);
                $previous_registration_payment->save();
                // now  increment/decrement payment amounts
                $new_registration_payment_total += $payment_amount;
                $registration_to_copy_total -= $payment_amount;
                $save = true;
            }
        }
        if ($save) {
            $target_registration->set_paid($new_registration_payment_total);
            $target_registration->save();
            $registration_to_copy->set_paid($registration_to_copy_total);
            $registration_to_copy->save();
        }
        return true;
    }
}
