<?php

use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\payments\IpnHandler;
use EventEspresso\core\services\payments\PaymentProcessor;
use EventEspresso\core\services\payments\PostPaymentProcessor;
use EventEspresso\core\services\payments\RegistrationPayments;

EE_Registry::instance()->load_class('Processor_Base');


/**
 * EE_Payment_Processor
 * Class for handling processing of payments for transactions.
 *
 * @package            Event Espresso
 * @subpackage         core/libraries/payment_methods
 * @author             Mike Nelson
 */
class EE_Payment_Processor extends EE_Processor_Base implements ResettableInterface
{
    private static ?EE_Payment_Processor $_instance = null;

    private IpnHandler $ipn_handler;

    private PaymentProcessor $payment_processor;

    private PostPaymentProcessor $post_payment_processor;

    private RegistrationPayments $registration_payments;


    /**
     * @singleton method used to instantiate class object
     * @param PaymentProcessor|null     $payment_processor
     * @param PostPaymentProcessor|null $post_payment_processor
     * @param RegistrationPayments|null $registration_payments
     * @param IpnHandler|null           $ipn_handler
     * @return EE_Payment_Processor instance
     */
    public static function instance(
        ?PaymentProcessor $payment_processor = null,
        ?PostPaymentProcessor $post_payment_processor = null,
        ?RegistrationPayments $registration_payments = null,
        ?IpnHandler $ipn_handler = null
    ): EE_Payment_Processor {
        // check if class object is instantiated
        if (! EE_Payment_Processor::$_instance instanceof EE_Payment_Processor) {
            EE_Payment_Processor::$_instance = new EE_Payment_Processor(
                $payment_processor,
                $post_payment_processor,
                $registration_payments,
                $ipn_handler
            );
        }
        return EE_Payment_Processor::$_instance;
    }


    /**
     * @return EE_Payment_Processor
     */
    public static function reset(): EE_Payment_Processor
    {
        EE_Payment_Processor::$_instance = null;
        return EE_Payment_Processor::instance();
    }


    /**
     * @param PaymentProcessor|null     $payment_processor
     * @param PostPaymentProcessor|null $post_payment_processor
     * @param RegistrationPayments|null $registration_payments
     * @param IpnHandler|null           $ipn_handler
     */
    private function __construct(
        ?PaymentProcessor $payment_processor,
        ?PostPaymentProcessor $post_payment_processor,
        ?RegistrationPayments $registration_payments,
        ?IpnHandler $ipn_handler
    ) {
        $this->payment_processor      = $payment_processor instanceof PaymentProcessor
            ? $payment_processor
            : LoaderFactory::getShared(PaymentProcessor::class);
        $this->post_payment_processor = $post_payment_processor instanceof PostPaymentProcessor
            ? $post_payment_processor
            : LoaderFactory::getShared(PostPaymentProcessor::class);
        $this->registration_payments  = $registration_payments instanceof RegistrationPayments
            ? $registration_payments
            : LoaderFactory::getShared(RegistrationPayments::class);
        $this->ipn_handler            = $ipn_handler instanceof IpnHandler
            ? $ipn_handler
            : LoaderFactory::getShared(IpnHandler::class);
        do_action('AHEE__EE_Payment_Processor__construct');
    }


    /**
     * Using the selected gateway, processes the payment for that transaction, and updates the transaction
     * appropriately. Saves the payment that is generated
     *
     * @param EE_Payment_Method         $payment_method
     * @param EE_Transaction            $transaction
     * @param float|null                $amount       if only part of the transaction is to be paid for, how much.
     *                                                Leave null if payment is for the full amount owing
     * @param EE_Billing_Info_Form|null $billing_form (or probably null, if it's an offline or offsite payment method).
     *                                                Receive_form_submission() should have
     *                                                already been called on the billing form
     *                                                (ie, its inputs should have their normalized values set).
     * @param string|null               $return_url   string used mostly by offsite gateways to specify
     *                                                where to go AFTER the offsite gateway
     * @param string                    $method       like 'CART', indicates who the client who called this was
     * @param bool                      $by_admin     TRUE if payment is being attempted from the admin
     * @param bool                      $update_txn   whether to call
     *                                                EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
     * @param string                    $cancel_url   URL to return to if off-site payments are cancelled
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function process_payment(
        EE_Payment_Method $payment_method,
        EE_Transaction $transaction,
        ?float $amount = null,
        ?EE_Billing_Info_Form $billing_form = null,
        ?string $return_url = null,
        string $method = 'CART',
        bool $by_admin = false,
        bool $update_txn = true,
        string $cancel_url = ''
    ): ?EE_Payment {
        return $this->payment_processor->processPayment(
            $payment_method,
            $transaction,
            $billing_form,
            (float) $amount,
            $by_admin,
            $update_txn,
            (string) $return_url,
            $cancel_url,
            $method
        );
    }


    /**
     * @param EE_Transaction|int $transaction
     * @param EE_Payment_Method  $payment_method
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_ipn_url_for_payment_method($transaction, $payment_method): string
    {
        /** @type EE_Transaction $transaction */
        $transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
        return $this->ipn_handler->getIpnUrlForPaymentMethod($transaction, $payment_method);
    }


    /**
     * Process the IPN. Firstly, we'll hope we put the standard args into the IPN URL so
     * we can easily find what registration the IPN is for and what payment method.
     * However, if not, we'll give all payment methods a chance to claim it and process it.
     * If a payment is found for the IPN info, it is saved.
     *
     * @param array              $_req_data            form post data
     * @param EE_Transaction|int $transaction          optional (or a transactions id)
     * @param EE_Payment_Method  $payment_method       (or a slug or id of one)
     * @param boolean            $update_txn           whether to call
     *                                                 EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
     * @param bool               $separate_IPN_request whether the IPN uses a separate request (true, like PayPal)
     *                                                 or is processed manually (false, like Authorize.net)
     * @return EE_Payment
     * @throws EE_Error
     * @throws Exception
     * @throws ReflectionException
     */
    public function process_ipn(
        $_req_data,
        $transaction = null,
        $payment_method = null,
        $update_txn = true,
        $separate_IPN_request = true
    ) {
        return $this->ipn_handler->processIPN(
            (array) $_req_data,
            $transaction,
            $payment_method,
            $update_txn,
            $separate_IPN_request
        );
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
    public function process_refund(
        ?EE_Payment_Method $payment_method,
        EE_Payment $payment_to_refund,
        array $refund_info = []
    ): EE_Payment {
        return $this->payment_processor->processRefund($payment_method, $payment_to_refund, $refund_info);
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
     * @param EE_Transaction|int $transaction
     * @param EE_Payment         $payment
     * @param bool               $update_txn whether to call
     *                                       EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
     *                                       (you can save 1 DB query if you know you're going to save it later
     *                                       instead)
     * @param bool               $IPN        if processing IPNs or other similar payment related activities that occur
     *                                       in alternate requests than the main one that is processing the TXN,
     *                                       then set this to true to check whether the TXN is locked before updating
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_txn_based_on_payment($transaction, $payment, $update_txn = true, $IPN = false)
    {
        $this->payment_processor->updateTransactionBasedOnPayment(
            $transaction,
            $payment,
            (bool) $update_txn,
            (bool) $IPN
        );
    }


    /**
     * update registrations REG_paid field after successful payment and link registrations with payment
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment        $payment
     * @param EE_Registration[] $registrations
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function process_registration_payments(
        EE_Transaction $transaction,
        EE_Payment $payment,
        array $registrations = []
    ) {
        $this->registration_payments->processRegistrationPayments($transaction, $payment, $registrations);
    }


    /**
     * update registration REG_paid field after successful payment and link registration with payment
     *
     * @param EE_Registration  $registration
     * @param EE_Payment       $payment
     * @param float|int|string $available_payment_amount
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function process_registration_payment(
        EE_Registration $registration,
        EE_Payment $payment,
        $available_payment_amount = 0.00
    ) {
        return $this->registration_payments->processRegistrationPayment(
            $registration,
            $payment,
            (float) $available_payment_amount
        );
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
     */
    public function process_registration_refund(
        EE_Registration $registration,
        EE_Payment $payment,
        float $available_refund_amount = 0.00
    ): float {
        return $this->registration_payments->processRegistrationRefund(
            $registration,
            $payment,
            $available_refund_amount
        );
    }


    /**
     * Force posts to PayPal to use TLS v1.2. See:
     * https://core.trac.wordpress.org/ticket/36320
     * https://core.trac.wordpress.org/ticket/34924#comment:15
     * https://www.paypal-knowledge.com/infocenter/index?page=content&widgetview=true&id=FAQ1914&viewlocale=en_US
     * This will affect PayPal standard, pro, express, and Payflow.
     *
     * @param $handle
     * @param $r
     * @param $url
     */
    public static function _curl_requests_to_paypal_use_tls($handle, $r, $url)
    {
        if (strpos($url, 'https://') !== false && strpos($url, '.paypal.com') !== false) {
            // Use the value of the constant CURL_SSLVERSION_TLSv1 = 1
            // instead of the constant because it might not be defined
            curl_setopt($handle, CURLOPT_SSLVERSION, 6);
        }
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
     * @depecated 5.0.22.p
     */
    protected function _post_payment_processing(EE_Transaction $transaction, EE_Payment $payment, $IPN = false)
    {
        $this->post_payment_processor->updateTransactionAndPayment($transaction, $payment, (bool) $IPN);
    }


    /**
     * update registration REG_paid field after successful payment and link registration with payment
     *
     * @param EE_Registration $registration
     * @param EE_Payment      $payment
     * @param float           $payment_amount
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.22.p
     */
    protected function _apply_registration_payment(
        EE_Registration $registration,
        EE_Payment $payment,
        $payment_amount = 0.00
    ) {
        // find any existing reg payment records for this registration and payment
        $existing_reg_payment = EEM_Registration_Payment::instance()->get_one(
            [['REG_ID' => $registration->ID(), 'PAY_ID' => $payment->ID()]]
        );
        // if existing registration payment exists
        if ($existing_reg_payment instanceof EE_Registration_Payment) {
            // then update that record
            $existing_reg_payment->set_amount($payment_amount);
            $existing_reg_payment->save();
        } else {
            // or add new relation between registration and payment and set amount
            $registration->_add_relation_to(
                $payment,
                'Payment',
                ['RPY_amount' => $payment_amount]
            );
            // make it stick
            $registration->save();
        }
    }


    /**
     * Removes any non-printable illegal characters from the input,
     * which might cause a raucous when trying to insert into the database
     *
     * @param array $request_data
     * @return array
     * @depecated 5.0.22.p
     */
    protected function _remove_unusable_characters_from_array(array $request_data)
    {
        $return_data = [];
        foreach ($request_data as $key => $value) {
            $return_data[ $this->_remove_unusable_characters($key) ] = $this->_remove_unusable_characters(
                $value
            );
        }
        return $return_data;
    }


    /**
     * Removes any non-printable illegal characters from the input,
     * which might cause a raucous when trying to insert into the database
     *
     * @param string $request_data
     * @return string
     * @depecated 5.0.22.p
     */
    protected function _remove_unusable_characters($request_data)
    {
        return preg_replace('/[^[:print:]]/', '', $request_data);
    }
}
