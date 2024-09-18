<?php

namespace EventEspresso\core\services\payments;

use EE_Error;
use EE_Payment;
use EE_Registration;
use EE_Transaction;
use EEH_Money;
use EEH_Template;
use EEM_Payment;
use EEM_Registration;
use ReflectionException;

/**
 * RegistrationPayments
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payments
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class RegistrationPayments
{
    /**
     * update registrations REG_paid field after successful payment and link registrations with payment
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment        $payment
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processRegistrationPayments(
        EE_Transaction $transaction,
        EE_Payment $payment,
        array $registrations = []
    ) {
        // only process if payment was successful
        if ($payment->status() !== EEM_Payment::status_id_approved) {
            return;
        }
        $registrations = $this->loadRegistrationsIfMissing($transaction, $registrations);
        // still nothing ??!??
        if (empty($registrations)) {
            return;
        }
        // todo: break out the following logic into a separate strategy class
        // todo: named something like "Sequential_Reg_Payment_Strategy"
        // todo: which would apply payments using the capitalist "first come first paid" approach
        // todo: then have another strategy class like "Distributed_Reg_Payment_Strategy"
        // todo: which would be the socialist "everybody gets a piece of pie" approach,
        // todo: which would be better for deposits, where you want a bit of the payment applied to each registration
        $available_payment_amount = $this->sequentialRegPaymentStrategy($payment, $registrations);
        $this->remainderNotice($payment, $available_payment_amount, $registrations);
    }


    /**
     * @param EE_Transaction $transaction
     * @param array          $registrations
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function loadRegistrationsIfMissing(EE_Transaction $transaction, array $registrations = []): array
    {
        if (empty($registrations)) {
            // find registrations with monies owing that can receive a payment
            $registrations = $transaction->registrations(
                [
                    [
                        // only these reg statuses can receive payments
                        'STS_ID'           => ['IN', EEM_Registration::reg_statuses_that_allow_payment()],
                        'REG_final_price'  => ['!=', 0],
                        'REG_final_price*' => ['!=', 'REG_paid', true],
                    ],
                ]
            );
        }
        return $registrations;
    }


    /**
     * @param EE_Payment $payment
     * @param array      $registrations
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function sequentialRegPaymentStrategy(EE_Payment $payment, array $registrations): float
    {
        $refund = $payment->is_a_refund();
        // how much is available to apply to registrations?
        $available_payment_amount = (float) abs($payment->amount());
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                // nothing left?
                if ($available_payment_amount <= 0) {
                    break;
                }
                if ($refund) {
                    $available_payment_amount = $this->processRegistrationRefund(
                        $registration,
                        $payment,
                        $available_payment_amount
                    );
                } else {
                    $available_payment_amount = $this->processRegistrationPayment(
                        $registration,
                        $payment,
                        $available_payment_amount
                    );
                }
            }
        }
        return $available_payment_amount;
    }


    /**
     * @throws EE_Error
     */
    private function remainderNotice(EE_Payment $payment, float $available_payment_amount, array $registrations)
    {
        if (
            $available_payment_amount > 0
            && apply_filters(
                'FHEE__EE_Payment_Processor__process_registration_payments__display_notifications',
                false
            )
        ) {
            EE_Error::add_attention(
                sprintf(
                    esc_html__(
                        'A remainder of %1$s exists after applying this payment to Registration(s) %2$s.%3$sPlease verify that the original payment amount of %4$s is correct. If so, you should edit this payment and select at least one additional registration in the "Registrations to Apply Payment to" section, so that the remainder of this payment can be applied to the additional registration(s).',
                        'event_espresso'
                    ),
                    EEH_Template::format_currency($available_payment_amount),
                    implode(', ', array_keys($registrations)),
                    '<br/>',
                    EEH_Template::format_currency($payment->amount())
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * update registration REG_paid field after successful payment and link registration with payment
     *
     * @param EE_Registration  $registration
     * @param EE_Payment       $payment
     * @param float            $available_payment_amount
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @throws ReflectionException
     */
    public function processRegistrationPayment(
        EE_Registration $registration,
        EE_Payment $payment,
        float $available_payment_amount = 0.00
    ): float {
        // update $available_payment_amount
        $available_payment_amount -= $registration->applyPayment($payment, $available_payment_amount);
        return $available_payment_amount;
    }


    /**
     * update registration REG_paid field after refund and link registration with payment
     *
     * @param EE_Registration $registration
     * @param EE_Payment      $payment
     * @param float           $available_refund_amount - IMPORTANT !!! SEND AVAILABLE REFUND AMOUNT AS A POSITIVE NUMBER
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @throws ReflectionException
     */
    public function processRegistrationRefund(
        EE_Registration $registration,
        EE_Payment $payment,
        float $available_refund_amount = 0.00
    ): float {
        // update $available_payment_amount
        $available_refund_amount -= $registration->applyPayment($payment, $available_refund_amount);
        return $available_refund_amount;
    }
}
