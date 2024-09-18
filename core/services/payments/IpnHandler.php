<?php

namespace EventEspresso\core\services\payments;

use EE_Base_Class;
use EE_Change_Log;
use EE_Core_Config;
use EE_Error;
use EE_Organization_Config;
use EE_Payment;
use EE_Payment_Method;
use EE_PMT_Base;
use EE_Processor_Base;
use EE_Registration;
use EE_Transaction;
use EEH_URL;
use EEM_Change_Log;
use EEM_Payment;
use EEM_Payment_Method;
use EEM_Transaction;
use EventEspresso\core\exceptions\IpnException;
use Exception;
use ReflectionException;

/**
 * IpnHandler
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payments
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class IpnHandler
{
    private EEM_Payment_Method $payment_method_model;

    private EEM_Transaction $transaction_model;

    private EE_Core_Config $core_config;

    private EE_Organization_Config $organization;

    private PaymentProcessor $payment_processor;


    /**
     * @param EEM_Payment_Method $payment_method_model
     * @param EEM_Transaction $transaction_model
     * @param EE_Core_Config $core_config
     * @param EE_Organization_Config $organization
     * @param PaymentProcessor $payment_processor
     */
    public function __construct(
        EEM_Payment_Method $payment_method_model,
        EEM_Transaction $transaction_model,
        EE_Core_Config $core_config,
        EE_Organization_Config $organization,
        PaymentProcessor $payment_processor
    ) {
        $this->payment_method_model = $payment_method_model;
        $this->transaction_model    = $transaction_model;
        $this->core_config          = $core_config;
        $this->organization         = $organization;
        $this->payment_processor    = $payment_processor;
    }


    /**
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $payment_method
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getIpnUrlForPaymentMethod(EE_Transaction $transaction, EE_Payment_Method $payment_method): string
    {
        $primary_reg = $transaction->primary_registration();
        if (! $primary_reg instanceof EE_Registration) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'Cannot get IPN URL for transaction with ID %d because it has no primary registration',
                        'event_espresso'
                    ),
                    $transaction->ID()
                )
            );
        }
        $payment_method = $this->payment_method_model->ensure_is_obj(
            $payment_method,
            true
        );
        return add_query_arg(
            [
                'e_reg_url_link'    => $primary_reg->reg_url_link(),
                'ee_payment_method' => $payment_method->slug(),
            ],
            $this->core_config->txn_page_url()
        );
    }


    /**
     * Process the IPN. Firstly, we'll hope we put the standard args into the IPN URL so
     * we can easily find what registration the IPN is for and what payment method.
     * However, if not, we'll give all payment methods a chance to claim it and process it.
     * If a payment is found for the IPN info, it is saved.
     *
     * @param array                             $request_data         form post data
     * @param EE_Transaction|int|null           $transaction          optional (or a transaction's id)
     * @param EE_Payment_Method|int|string|null $payment_method       optional (or a slug or id of PM)
     * @param bool                              $update_txn           whether to call
     *                                                                EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
     * @param bool                              $separate_IPN_request whether the IPN uses a separate request (true,
     *                                                                like PayPal) or is processed manually (false,
     *                                                                like Authorize.net)
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processIPN(
        array $request_data,
        $transaction = null,
        $payment_method = null,
        bool $update_txn = true,
        bool $separate_IPN_request = true
    ): EE_Payment {
        $request_data = $this->removeUnusableCharactersFromArray($request_data);
        EE_Processor_Base::set_IPN($separate_IPN_request);
        ['log' => $log, 'object' => $log_object] = $this->logIPN($request_data, $transaction, $payment_method);

        try {
            if ($transaction && $payment_method) {
                $payment = $this->processStandardIPN($request_data, $log, $log_object, $transaction, $payment_method);
            } else {
                ['payment' => $payment, 'payment_method' => $payment_method] = $this->processWaywardIPN(
                    $request_data,
                    $log_object
                );
            }
            return $this->postIpnProcessing(
                $payment,
                $request_data,
                $update_txn,
                $separate_IPN_request,
                $transaction,
                $payment_method
            );
        } catch (EE_Error $exception) {
            $this->invalidIpnException($exception, $transaction, $request_data);
        }
    }


    /**
     * @param array                             $request_data
     * @param EE_Change_Log                     $log
     * @param EE_Base_Class|null                $log_object
     * @param EE_Transaction|int|null           $transaction    optional (model object or a transaction's id)
     * @param EE_Payment_Method|int|string|null $payment_method optional (model object or a slug or id of PM)
     * @return EE_Payment|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processStandardIPN(
        array $request_data,
        EE_Change_Log $log,
        ?EE_Base_Class $log_object,
        $transaction = null,
        $payment_method = null
    ): ?EE_Payment {
        /** @type EE_Transaction $transaction */
        $transaction = $this->transaction_model->ensure_is_obj($transaction);
        /** @type EE_Payment_Method $payment_method */
        $payment_method = $this->payment_method_model->ensure_is_obj($payment_method);
        if (! $payment_method->type_obj() instanceof EE_PMT_Base) {
            // not a payment
            $this->invalidPaymentError();
            return null;
        }
        try {
            $payment = $payment_method->type_obj()->handle_ipn($request_data, $transaction);
            $log->set_object($payment);
            return $payment;
        } catch (IpnException $exception) {
            $payment = $this->logIpnException($exception, $log_object);
        }
        return $payment;
    }


    /**
     * @param array              $request_data
     * @param EE_Base_Class|null $log_object
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processWaywardIPN(
        array $request_data,
        ?EE_Base_Class $log_object
    ): array {
        $payment        = null;
        $payment_method = null;
        // that's actually pretty ok. The IPN just wasn't able
        // to identify which transaction or payment method this was for
        // give all active payment methods a chance to claim it
        $active_payment_methods = $this->payment_method_model->get_all_active();
        foreach ($active_payment_methods as $payment_method) {
            try {
                $pm_type = $payment_method->type_obj();
                $payment = $pm_type instanceof EE_PMT_Base ? $pm_type->handle_unclaimed_ipn($request_data) : $payment;
                $this->logIpnData(['IPN data' => $request_data], $payment);
                break;
            } catch (IpnException $exception) {
                $payment = $this->logIpnException($exception, $log_object);
            } catch (EE_Error $e) {
                // that's fine- it apparently couldn't handle the IPN
            }
        }
        return [$payment, $payment_method];
    }


    /**
     * @param EE_Payment|null                   $payment
     * @param array                             $request_data
     * @param bool                              $update_txn
     * @param bool                              $separate_IPN_request
     * @param EE_Transaction|int|null           $transaction    optional (model object or a transaction's id)
     * @param EE_Payment_Method|int|string|null $payment_method optional (model object or a slug or id of PM)
     * @return EE_Payment|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function postIpnProcessing(
        ?EE_Payment $payment,
        array $request_data,
        bool $update_txn,
        bool $separate_IPN_request,
        $transaction = null,
        $payment_method = null
    ): ?EE_Payment {
        if ($payment instanceof EE_Payment) {
            $payment->save();
            $this->payment_processor->updateTransactionBasedOnPayment(
                $transaction,
                $payment,
                $update_txn,
                $separate_IPN_request
            );
        } else {
            // we couldn't find the payment for this IPN... let's try and log at least SOMETHING
            if ($payment_method) {
                $this->logIpnData(['IPN data' => $request_data], $payment_method);
            } elseif ($transaction) {
                $this->logIpnData(['IPN data' => $request_data], $transaction);
            }
        }
        return $payment;
    }


    /**
     * @param array                             $request_data
     * @param EE_Transaction|int|null           $transaction    optional (model object or a transaction's id)
     * @param EE_Payment_Method|int|string|null $payment_method optional (model object or a slug or id of PM)
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function logIPN(
        array $request_data,
        $transaction = null,
        $payment_method = null
    ): array {
        $log_object = null;
        if ($transaction instanceof EE_Transaction) {
            $log_object = $transaction;
            if ($payment_method instanceof EE_Payment_Method) {
                $log_object = EEM_Payment::instance()->get_one(
                    [
                        ['TXN_ID' => $transaction->ID(), 'PMD_ID' => $payment_method->ID()],
                        'order_by' => ['PAY_timestamp' => 'desc'],
                    ]
                );
            }
        }
        $log = $this->logIpnData(['IPN data received' => $request_data], $log_object);
        return [
            'log'    => $log,
            'object' => $log_object,
        ];
    }


    /**
     * @param array              $data
     * @param EE_Base_Class|null $log_object
     * @return EE_Change_Log
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function logIpnData(array $data, ?EE_Base_Class $log_object): EE_Change_Log
    {
        return EEM_Change_Log::instance()->log(EEM_Change_Log::type_gateway, $data, $log_object);
    }


    /**
     * @param IpnException       $exception
     * @param EE_Base_Class|null $log_object
     * @return EE_Payment|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function logIpnException(IpnException $exception, ?EE_Base_Class $log_object): ?EE_Payment
    {
        $this->logIpnData(
            [
                'message'     => 'IPN Exception: ' . $exception->getMessage(),
                'current_url' => EEH_URL::current_url(),
                'payment'     => $exception->getPaymentProperties(),
                'IPN_data'    => $exception->getIpnData(),
            ],
            $log_object
        );
        return $exception->getPayment();
    }


    /**
     * @return void
     * @throws EE_Error
     */
    private function invalidPaymentError()
    {
        EE_Error::add_error(
            sprintf(
                esc_html__(
                    'A valid payment method could not be determined due to a technical issue.%1$sPlease refresh your browser and try again or contact %2$s for assistance.',
                    'event_espresso'
                ),
                '<br/>',
                $this->organization->get_pretty('email')
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
    }


    /**
     * @param Exception $exception
     * @param           $transaction
     * @param           $request_data
     * @return mixed
     * @throws Exception
     */
    private function invalidIpnException(Exception $exception, $transaction, $request_data)
    {
        do_action(
            'AHEE__log',
            __FILE__,
            __FUNCTION__,
            sprintf(
                esc_html__(
                    'Error occurred while receiving IPN. Transaction: %1$s, req data: %2$s. The error was "%3$s"',
                    'event_espresso'
                ),
                print_r($transaction, true),
                print_r($request_data, true),
                $exception->getMessage()
            )
        );
        throw $exception;
    }


    /**
     * Removes any non-printable illegal characters from the input,
     * which might cause a raucous when trying to insert into the database
     *
     * @param array $request_data
     * @return array
     */
    private function removeUnusableCharactersFromArray(array $request_data): array
    {
        $return_data = [];
        foreach ($request_data as $key => $value) {
            $return_data[ $this->removeUnusableCharacters($key) ] = $this->removeUnusableCharacters($value);
        }
        return $return_data;
    }


    /**
     * Removes any non-printable illegal characters from the input,
     * which might cause a raucous when trying to insert into the database
     *
     * @param string $request_data
     * @return string
     */
    private function removeUnusableCharacters(string $request_data): string
    {
        return preg_replace('/[^[:print:]]/', '', $request_data);
    }
}
