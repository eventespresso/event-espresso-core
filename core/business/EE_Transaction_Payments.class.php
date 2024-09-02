<?php

/**
 * Class EE_Transaction_Payments
 *
 * This class contains business logic pertaining specifically to the interaction of EE_Transaction and EE_Payment model
 * objects
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.6.0
 *
 */
class EE_Transaction_Payments
{
    private static ?EE_Transaction_Payments $_instance = null;


    /**
     * @singleton method used to instantiate class object
     * @return EE_Transaction_Payments instance
     */
    public static function instance(): EE_Transaction_Payments
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Transaction_Payments) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * @param EE_Transaction $transaction
     * @param bool           $update_txn
     * @return bool true if TXN total was updated, false if not
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculate_transaction_total(EE_Transaction $transaction, bool $update_txn = true): bool
    {
        $total_line_item = $transaction->total_line_item();
        if (! $total_line_item instanceof EE_Line_Item) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The Total Line Item for Transaction %1$d\'s was not found or is invalid.',
                        'event_espresso'
                    ),
                    $transaction->ID()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $new_total = $total_line_item->recalculate_total_including_taxes();
        $transaction->set_total($new_total);
        if ($update_txn) {
            return (bool) $transaction->save();
        }
        return false;
    }


    /**
     * Updates the provided EE_Transaction with all the applicable payments
     * returns a boolean for whether the TXN was saved to the db
     * (meaning a status change occurred)
     * or not saved (which could **still** mean that
     * the TXN status changed, but just was not yet saved).
     * So if passing a value of false for the $update_txn param,
     * then client code needs to take responsibility for saving the TXN
     * regardless of what happens within EE_Transaction_Payments;
     *
     * @param EE_Transaction $transaction
     * @param boolean        $update_txn whether to save the TXN
     * @return    boolean        whether the TXN was saved
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function calculate_total_payments_and_update_status(
        EE_Transaction $transaction,
        bool $update_txn = true
    ): bool {
        // calculate total paid
        $total_paid = $this->recalculate_total_payments_for_transaction($transaction);
        // if total paid has changed
        if (EEH_Money::compare_floats($total_paid, $transaction->paid(), '!==')) {
            $transaction->set_paid($total_paid);
            // maybe update status, and make sure to save transaction if not done already
            if (! $transaction->update_status_based_on_total_paid($update_txn)) {
                if ($update_txn) {
                    return (bool) $transaction->save();
                }
            } else {
                // the status got updated and was saved by
                // update_transaction_status_based_on_total_paid()
                return true;
            }
        }
        return false;
    }


    /**
     * @param EE_Transaction $transaction
     * @param string         $payment_status One of EEM_Payment's statuses, like 'PAP' (Approved).
     *                                       By default, searches for approved payments
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculate_total_payments_for_transaction(
        EE_Transaction $transaction,
        string $payment_status = EEM_Payment::status_id_approved
    ): float {
        // ensure Payment model is loaded
        EE_Registry::instance()->load_model('Payment');
        // calls EEM_Base::sum()
        return EEM_Payment::instance()->sum(
        // query params
            [['TXN_ID' => $transaction->ID(), 'STS_ID' => $payment_status]],
            // field to sum
            'PAY_amount'
        );
    }


    /**
     * Before deleting the selected payment, we fetch its transaction,
     * then delete the payment, and update the transactions' amount paid.
     *
     * @param EE_Payment $payment
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_payment_and_update_transaction(EE_Payment $payment): bool
    {
        if (! $this->delete_registration_payments_and_update_registrations($payment)) {
            return false;
        }
        if (! $payment->delete()) {
            EE_Error::add_error(
                esc_html__('The payment could not be deleted.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }

        $transaction = $payment->transaction();
        $TXN_status  = $transaction->status_ID();
        if (
            $TXN_status === EEM_Transaction::abandoned_status_code
            || $TXN_status === EEM_Transaction::failed_status_code
            || $payment->amount() == 0.0
        ) {
            EE_Error::add_success(esc_html__('The Payment was successfully deleted.', 'event_espresso'));
            return true;
        }


        // if this fails, that just means that the transaction didn't get its status changed and/or updated.
        // however the payment was still deleted.
        if (! $this->calculate_total_payments_and_update_status($transaction)) {
            EE_Error::add_attention(
                esc_html__(
                    'It appears that the Payment was deleted but no change was recorded for the Transaction for an unknown reason. Please verify that all data for this Transaction looks correct..',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return true;
        }

        EE_Error::add_success(
            esc_html__(
                'The Payment was successfully deleted, and the Transaction has been updated accordingly.',
                'event_espresso'
            )
        );
        return true;
    }


    /**
     * removes all registration payment records associated with a payment
     * and subtracts their amounts from the corresponding registrations REG_paid field
     *
     * @param EE_Payment $payment
     * @param array      $reg_payment_query_params
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_registration_payments_and_update_registrations(
        EE_Payment $payment,
        array $reg_payment_query_params = []
    ): bool {
        $save_payment             = false;
        $reg_payment_query_params = ! empty($reg_payment_query_params)
            ? $reg_payment_query_params
            : [['PAY_ID' => $payment->ID()]];
        $registration_payments    = EEM_Registration_Payment::instance()->get_all($reg_payment_query_params);
        if (! empty($registration_payments)) {
            foreach ($registration_payments as $registration_payment) {
                if ($registration_payment instanceof EE_Registration_Payment) {
                    $amount_paid  = $registration_payment->amount();
                    $registration = $registration_payment->registration();
                    if ($registration instanceof EE_Registration) {
                        $registration->set_paid($registration->paid() - $amount_paid);
                        if ($registration->save() !== false) {
                            $registration_payment->delete_permanently();
                            $save_payment = true;
                        }
                    } else {
                        EE_Error::add_error(
                            sprintf(
                                esc_html__(
                                    'An invalid Registration object was associated with Registration Payment ID# %1$d.',
                                    'event_espresso'
                                ),
                                $registration_payment->ID()
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                        return false;
                    }
                } else {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'An invalid Registration Payment object was associated with payment ID# %1$d.',
                                'event_espresso'
                            ),
                            $payment->ID()
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                }
            }
        }
        if ($save_payment) {
            $payment->save();
        }
        return true;
    }


    /********************************** DEPRECATED METHODS **********************************/
}
