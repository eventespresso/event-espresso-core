<?php

namespace EventEspresso\core\services\payments;

use EE_Billing_Info_Form;
use EE_Cron_Tasks;
use EE_Error;
use EE_Organization_Config;
use EE_Payment;
use EE_Payment_Method;
use EE_PMT_Base;
use EE_Registry;
use EE_Transaction;
use EE_Transaction_Payments;
use EEM_Payment;
use EEM_Payment_Method;
use EEM_Transaction;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use Exception;
use ReflectionException;

/**
 * PaymentProcessor
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payments
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class PaymentProcessor
{
    private EEM_Payment_Method $payment_method_model;

    private EEM_Transaction $transaction_model;

    private EE_Organization_Config $organization;

    private FeatureFlags $feature;

    private PaymentProcessorFees $payment_processor_fees;

    private PostPaymentProcessor $post_payment_processor;

    private RegistrationPayments $registration_payments;


    /**
     * @param EEM_Payment_Method     $payment_method_model
     * @param EEM_Transaction        $transaction_model
     * @param EE_Organization_Config $organization
     * @param FeatureFlags           $feature
     * @param PaymentProcessorFees   $payment_processor_fees
     * @param PostPaymentProcessor   $post_payment_processor
     * @param RegistrationPayments   $registration_payments
     */
    public function __construct(
        EEM_Payment_Method $payment_method_model,
        EEM_Transaction $transaction_model,
        EE_Organization_Config $organization,
        FeatureFlags $feature,
        PaymentProcessorFees $payment_processor_fees,
        PostPaymentProcessor $post_payment_processor,
        RegistrationPayments $registration_payments
    ) {
        $this->payment_method_model   = $payment_method_model;
        $this->transaction_model      = $transaction_model;
        $this->organization           = $organization;
        $this->feature                = $feature;
        $this->payment_processor_fees = $payment_processor_fees;
        $this->post_payment_processor = $post_payment_processor;
        $this->registration_payments  = $registration_payments;
    }


    /**
     * Using the selected gateway, processes the payment for that transaction, and updates the transaction
     * appropriately. Saves the payment that is generated
     *
     * @param EE_Payment_Method         $payment_method
     * @param EE_Transaction            $transaction
     * @param EE_Billing_Info_Form|null $billing_form  (or probably null, if it's an offline or offsite payment
     *                                                 method).
     *                                                 Receive_form_submission() should have
     *                                                 already been called on the billing form
     *                                                 (ie, its inputs should have their normalized values set).
     * @param float                     $amount        if only part of the transaction is to be paid for, how much.
     *                                                 Leave null if payment is for the full amount owing
     * @param bool                      $by_admin      TRUE if payment is being attempted from the admin
     * @param bool                      $update_txn    whether to call EE_Transaction_Processor
     *                                                 ::update_transaction_and_registrations_after_checkout_or_payment()
     * @param string                    $return_url    string used mostly by offsite gateways to specify
     *                                                 where to go AFTER the offsite gateway
     * @param string                    $cancel_url    URL to return to if off-site payments are cancelled
     * @param string                    $method        like 'CART', indicates who the client who called this was
     * @return EE_Payment|null
     * @throws EE_Error
     * @throws Exception
     * @throws ReflectionException
     */
    public function processPayment(
        EE_Payment_Method $payment_method,
        EE_Transaction $transaction,
        ?EE_Billing_Info_Form $billing_form = null,
        float $amount = 0.00,
        bool $by_admin = false,
        bool $update_txn = true,
        string $return_url = '',
        string $cancel_url = '',
        string $method = 'CART'
    ): ?EE_Payment {
        $this->validatePaymentAmount($transaction, $amount);
        // verify payment method
        $payment_method = $this->payment_method_model->ensure_is_obj(
            $payment_method,
            true
        );
        // verify transaction
        $this->transaction_model->ensure_is_obj($transaction);
        $transaction->set_payment_method_ID($payment_method->ID());
        // make sure we don't overcharge
        $amount = min($amount, $transaction->remaining());
        // TODO: add some extra logic to PaymentProcessorFees to designate where/when partner fees are applied based on the PM being used.
        // if (
        //     $this->feature->allowed(FeatureFlag::USE_PAYMENT_PROCESSOR_FEES)
        //     && apply_filters(
        //         'FHEE__EE_Payment_Processor__apply_gateway_partner_fees',
        //         true,
        //         $transaction,
        //         $payment_method,
        //         $amount
        //     )
        // ) {
        //     $amount = $this->payment_processor_fees->applyGatewayPartnerFees(
        //         $transaction,
        //         $payment_method->name(),
        //         $amount
        //     );
        // }
        // verify payment method type
        if ($payment_method->type_obj() instanceof EE_PMT_Base) {
            $payment = $payment_method->type_obj()->process_payment(
                $transaction,
                $amount,
                $billing_form,
                $return_url,
                add_query_arg(['ee_cancel_payment' => true], $cancel_url),
                $method,
                $by_admin
            );
            // check if payment method uses an off-site gateway
            if ($payment_method->type_obj()->payment_occurs() !== EE_PMT_Base::offsite) {
                // don't process payments for off-site gateways yet because no payment has occurred yet
                $this->updateTransactionBasedOnPayment($transaction, $payment, $update_txn);
            }
            return $payment;
        }
        EE_Error::add_error(
            sprintf(
                esc_html__(
                    'A valid payment method could not be determined due to a technical issue.%1$sPlease try again or contact %2$s for assistance.',
                    'event_espresso'
                ),
                '<br/>',
                $this->organization->get_pretty('email')
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        return null;
    }


    /**
     * Processes a direct refund request, saves the payment, and updates the transaction appropriately.
     *
     * @param EE_Payment_Method|null $payment_method
     * @param EE_Payment             $payment_to_refund
     * @param array                  $refund_info
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processRefund(
        ?EE_Payment_Method $payment_method,
        EE_Payment $payment_to_refund,
        array $refund_info = []
    ): EE_Payment {
        if ($payment_method instanceof EE_Payment_Method && $payment_method->type_obj()->supports_sending_refunds()) {
            $payment_method->type_obj()->process_refund($payment_to_refund, $refund_info);
            $this->updateTransactionBasedOnPayment(
                $payment_to_refund->transaction(),
                $payment_to_refund
            );
        }
        return $payment_to_refund;
    }


    /**
     * This should be called each time there may have been an update to a
     * payment on a transaction (ie, we asked for a payment to process a
     * payment for a transaction, or we told a payment method about an IPN, or
     * we told a payment method to
     * "finalize_payment_for" (a transaction), or we told a payment method to
     * process a refund. This should handle firing the correct hooks to
     * indicate
     * what exactly happened and updating the transaction appropriately). This
     * could be integrated directly into EE_Transaction upon save, but we want
     * this logic to be separate from 'normal' plain-jane saving and updating
     * of transactions and payments, and to be tied to payment processing.
     * Note: this method DOES NOT save the payment passed into it. It is the responsibility
     * of previous code to decide whether to save (because the payment passed into
     * this method might be a temporary, never-to-be-saved payment from an offline gateway,
     * in which case we only want that payment object for some temporary usage during this request,
     * but we don't want it to be saved).
     *
     * @param EE_Transaction  $transaction
     * @param EE_Payment|null $payment
     * @param bool            $update_txn whether to call EE_Transaction_Processor::
     *                                    update_transaction_and_registrations_after_checkout_or_payment()
     *                                    (you can save 1 DB query if you know you're going
     *                                    to save it later instead)
     * @param bool            $IPN
     *                                    if processing IPNs or other similar payment
     *                                    related activities that occur in alternate
     *                                    requests than the main one that is processing the
     *                                    TXN, then set this to true to check whether the
     *                                    TXN is locked before updating
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function updateTransactionBasedOnPayment(
        EE_Transaction $transaction,
        ?EE_Payment $payment,
        bool $update_txn = true,
        bool $IPN = false
    ) {
        $do_action = 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__not_successful';
        /** @type EE_Transaction $transaction */
        $transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
        // can we freely update the TXN at this moment?
        if ($IPN && $transaction->is_locked()) {
            // don't update the transaction at this exact moment
            // because the TXN is active in another request
            EE_Cron_Tasks::schedule_update_transaction_with_payment(
                time(),
                $transaction->ID(),
                $payment->ID()
            );
        } else {
            // verify payment and that it has been saved
            if ($payment instanceof EE_Payment) {
                $do_action = $this->processRegistrationPayments($transaction, $payment, $do_action);
                $this->updateTransactionAndPayment($transaction, $payment, $update_txn, $IPN);
            }
            // granular hook for others to use.
            do_action($do_action, $transaction, $payment);
            do_action('AHEE_log', __CLASS__, __FUNCTION__, $do_action, '$do_action');
            // global hook for others to use.
            do_action('AHEE__EE_Payment_Processor__update_txn_based_on_payment', $transaction, $payment);
        }
    }


    /**
     * @param EE_Transaction  $transaction
     * @param EE_Payment $payment
     * @param string          $do_action
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processRegistrationPayments(
        EE_Transaction $transaction,
        EE_Payment $payment,
        string $do_action
    ): string {
        if ($payment->ID()) {
            if (
                $payment->payment_method() instanceof EE_Payment_Method
                && $payment->payment_method()->type_obj() instanceof EE_PMT_Base
            ) {
                $payment->payment_method()->type_obj()->update_txn_based_on_payment($payment);
                // update TXN registrations with payment info
                $this->registration_payments->processRegistrationPayments($transaction, $payment);
            }
            return $payment->just_approved()
                ? 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful'
                : $do_action;
        }
        // send out notifications
        add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true');
        return 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__no_payment_made';
    }


    /**
     * @param EE_Transaction $transaction
     * @param EE_Payment     $payment
     * @param bool           $update_txn
     * @param bool           $IPN
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateTransactionAndPayment(
        EE_Transaction $transaction,
        EE_Payment $payment,
        bool $update_txn,
        bool $IPN
    ) {
        if ($payment->status() !== EEM_Payment::status_id_failed) {
            /** @type EE_Transaction_Payments $transaction_payments */
            $transaction_payments = EE_Registry::instance()->load_class('Transaction_Payments');
            // set new value for total paid
            $transaction_payments->calculate_total_payments_and_update_status($transaction);
            if ($update_txn) {
                $this->post_payment_processor->updateTransactionAndPayment($transaction, $payment, $IPN);
            }
        }
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function validatePaymentAmount(EE_Transaction $transaction, float $amount)
    {
        if ($amount < 0) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'Attempting to make a payment for a negative amount of %1$d for transaction %2$d. That should be a refund',
                        'event_espresso'
                    ),
                    $amount,
                    $transaction->ID()
                )
            );
        }
    }
}
