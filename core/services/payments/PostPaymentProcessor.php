<?php

namespace EventEspresso\core\services\payments;

use EE_Error;
use EE_Gateway;
use EE_Payment;
use EE_Payment_Method;
use EE_PMT_Base;
use EE_Transaction;
use EE_Transaction_Processor;
use ReflectionException;

/**
 * PostPaymentProcessor
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payments
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class PostPaymentProcessor
{
    private EE_Transaction_Processor $transaction_processor;


    /**
     * @param EE_Transaction_Processor $transaction_processor
     */
    public function __construct(EE_Transaction_Processor $transaction_processor)
    {
        $this->transaction_processor = $transaction_processor;
    }


    /**
     * Process payments and transaction after payment process completed.
     * ultimately this will send the TXN and payment details off so that notifications can be sent out.
     * if this request happens to be processing an IPN,
     * then we will also set the Payment Options Reg Step to completed,
     * and attempt to completely finalize the TXN if all the other Reg Steps are completed as well.
     *
     * @param EE_Transaction $transaction
     * @param EE_Payment     $payment
     * @param bool           $IPN
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function updateTransactionAndPayment(EE_Transaction $transaction, EE_Payment $payment, bool $IPN = false)
    {
        // is the Payment Options Reg Step completed ?
        $payment_options_step_completed = $transaction->reg_step_completed('payment_options');
        // if the Payment Options Reg Step is completed...
        // then this is kinda sorta a revisit with regard to payments at least
        $this->transaction_processor->set_revisit($payment_options_step_completed === true);
        // if this is an IPN, let's consider the Payment Options Reg Step completed if not already
        if (
            $IPN
            && $payment_options_step_completed !== true
            && ($payment->is_approved() || $payment->is_pending())
        ) {
            $payment_options_step_completed = $transaction->set_reg_step_completed(
                'payment_options'
            );
        }
        // maybe update status, but don't save transaction just yet
        $transaction->update_status_based_on_total_paid(false);
        // check if 'finalize_registration' step has been completed...
        $finalized = $transaction->reg_step_completed('finalize_registration');
        //  if this is an IPN and the final step has not been initiated
        if ($IPN && $payment_options_step_completed && $finalized === false) {
            // and if it hasn't already been set as being started...
            $finalized = $transaction->set_reg_step_initiated('finalize_registration');
        }
        $transaction->save();
        // because the above will return false if the final step was not fully completed, we need to check again...
        if ($IPN && $finalized !== false) {
            // and if we are all good to go, then send out notifications
            add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true');
            // ok, now process the transaction according to the payment
            $this->transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
                $transaction,
                $payment
            );
        }
        // DEBUG LOG
        $this->debugLog($transaction, $payment, $IPN, $finalized);
    }


    /**
     * @param EE_Transaction $transaction
     * @param EE_Payment     $payment
     * @param bool           $IPN
     * @param bool           $finalized
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function debugLog(EE_Transaction $transaction, EE_Payment $payment, bool $IPN, bool $finalized)
    {
        $payment_method = $payment->payment_method();
        if ($payment_method instanceof EE_Payment_Method) {
            $payment_method_type_obj = $payment_method->type_obj();
            if ($payment_method_type_obj instanceof EE_PMT_Base) {
                $gateway = $payment_method_type_obj->get_gateway();
                if ($gateway instanceof EE_Gateway) {
                    $gateway->log(
                        [
                            'message'               => esc_html__(
                                'Post Payment Transaction Details',
                                'event_espresso'
                            ),
                            'transaction'           => $transaction->model_field_array(),
                            'finalized'             => $finalized,
                            'IPN'                   => $IPN,
                            'deliver_notifications' => has_filter(
                                'FHEE__EED_Messages___maybe_registration__deliver_notifications'
                            ),
                        ],
                        $payment
                    );
                }
            }
        }
    }
}
