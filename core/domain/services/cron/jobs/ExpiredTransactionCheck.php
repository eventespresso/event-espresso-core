<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use DomainException;
use EE_Error;
use EE_Registration;
use EE_Transaction;
use EE_Transaction_Processor;
use EEM_Transaction;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\domain\services\cron\CronUtilities;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\services\payments\PaymentProcessor;
use ReflectionException;
use RuntimeException;

class ExpiredTransactionCheck extends CronJob
{
    private ?PaymentProcessor $payment_processor = null;

    private ?EE_Transaction_Processor $transaction_processor = null;

    /**
     * array of TXN IDs
     *
     * @var array
     */
    protected array $expired_transactions = [];


    private function loadTransactionProcessor()
    {
        $this->transaction_processor = $this->loader->getShared(EE_Transaction_Processor::class);
    }


    private function loadPaymentProcessor()
    {
        $this->payment_processor = $this->loader->getShared(PaymentProcessor::class);
    }


    public function setHooks(): void
    {
        add_action(
            'AHEE__EE_Cron_Tasks__expired_transaction_check',
            [$this, 'expiredTransactionCheck']
        );
    }


    /**
     * schedule_expired_transaction_check
     * sets a wp_schedule_single_event() for following up on TXNs after their session has expired
     *
     * @param int $timestamp
     * @param int $TXN_ID
     */
    public static function scheduleExpiredTransactionCheck(
        int $timestamp,
        int $TXN_ID
    ): void {
        // validate $TXN_ID and $timestamp
        $TXN_ID    = absint($TXN_ID);
        $timestamp = absint($timestamp);
        if ($TXN_ID && $timestamp) {
            wp_schedule_single_event(
                $timestamp,
                'AHEE__EE_Cron_Tasks__expired_transaction_check',
                [$TXN_ID]
            );
        }
    }


    /**
     * this is the callback for the action hook:
     * 'AHEE__EE_Cron_Tasks__transaction_session_expiration_check'
     * which is utilized by wp_schedule_single_event()
     * in \EED_Single_Page_Checkout::_initialize_transaction().
     * The passed TXN_ID gets added to an array, and then the
     * process_expired_transactions() function is hooked into
     * 'AHEE__EE_System__core_loaded_and_ready' which will actually handle the
     * processing of any failed transactions, because doing so now would be
     * too early and the required resources may not be available
     *
     * @param int $TXN_ID
     */
    public function expiredTransactionCheck(int $TXN_ID = 0): void
    {
        if (absint($TXN_ID)) {
            $this->expired_transactions[ $TXN_ID ] = $TXN_ID;
            add_action(
                'shutdown',
                [$this, 'processExpiredTransactions'],
                5
            );
        }
    }


    /**
     * loops through the $this->expired_transactions array and processes any failed TXNs
     *
     * @throws EE_Error
     * @throws ReflectionException
     * @throws DomainException
     * @throws RuntimeException
     */
    public function processExpiredTransactions(): void
    {
        if (
            // are there any TXNs that need cleaning up ?
            empty($this->expired_transactions)
            // reschedule the cron if we can't hit the db right now
            || CronUtilities::rescheduleCronForTransactions(
                [ExpiredTransactionCheck::class, 'scheduleExpiredTransactionCheck'],
                $this->expired_transactions
            )
        ) {
            return;
        }
        $this->loadTransactionProcessor();
        // set revisit flag for txn processor
        $this->transaction_processor->set_revisit();
        foreach ($this->expired_transactions as $TXN_ID) {
            $transaction = EEM_Transaction::instance()->get_one_by_ID($TXN_ID);
            // verify transaction and whether it is failed or not
            if ($transaction instanceof EE_Transaction) {
                switch ($transaction->status_ID()) {
                    case EEM_Transaction::complete_status_code:
                        $this->processCompletedTransaction($transaction);
                        break;

                    case EEM_Transaction::overpaid_status_code:
                        $this->processOverpaidTransaction($transaction);
                        break;

                    case EEM_Transaction::incomplete_status_code:
                        $this->processIncompletedTransaction($transaction);
                        break;

                    case EEM_Transaction::abandoned_status_code:
                        $this->processAbandonedTransaction($transaction);
                        break;

                    case EEM_Transaction::failed_status_code:
                        $this->processFailedTransaction($transaction);
                        break;
                }
            }
            unset($this->expired_transactions[ $TXN_ID ]);
        }
    }


    /**
     * @param EE_Transaction $transaction
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processCompletedTransaction(EE_Transaction $transaction)
    {
        // Don't update the transaction/registrations if the Primary Registration is Not Approved.
        $primary_registration = $transaction->primary_registration();
        if (
            $primary_registration instanceof EE_Registration
            && $primary_registration->status_ID() !== RegStatus::AWAITING_REVIEW
        ) {
            $this->transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
                $transaction,
                $transaction->last_payment()
            );
            do_action(
                'AHEE__EE_Cron_Tasks__process_expired_transactions__completed_transaction',
                $transaction
            );
        }
    }


    /**
     * @param EE_Transaction $transaction
     * @return void
     */
    private function processOverpaidTransaction(EE_Transaction $transaction)
    {
        do_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__overpaid_transaction',
            $transaction
        );
    }


    /**
     * @param EE_Transaction $transaction
     * @return void
     */
    private function processIncompletedTransaction(EE_Transaction $transaction)
    {
        do_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__incomplete_transaction',
            $transaction
        );
        // todo : move business logic into EE_Transaction_Processor for finalizing abandoned transactions
    }


    /**
     * @param EE_Transaction $transaction
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processAbandonedTransaction(EE_Transaction $transaction)
    {
        // run hook before updating transaction, primarily so
        // EED_Ticket_Sales_Monitor::process_abandoned_transactions() can release reserved tickets
        do_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__abandoned_transaction',
            $transaction
        );
        // don't finalize the TXN if it has already been completed
        if ($transaction->all_reg_steps_completed() !== true) {
            $this->loadPaymentProcessor();
            // let's simulate an IPN here which will trigger any notifications that need to go out
            $this->payment_processor->updateTransactionBasedOnPayment(
                $transaction,
                $transaction->last_payment(),
                true,
                true
            );
        }
    }


    /**
     * @param EE_Transaction $transaction
     * @return void
     */
    private function processFailedTransaction(EE_Transaction $transaction)
    {
        do_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__failed_transaction',
            $transaction
        );
        // todo :
        // perform garbage collection here and remove clean_out_junk_transactions()
        // $registrations = $transaction->registrations();
        // if (! empty($registrations)) {
        //     foreach ($registrations as $registration) {
        //         if ($registration instanceof EE_Registration) {
        //             $delete_registration = true;
        //             if ($registration->attendee() instanceof EE_Attendee) {
        //                 $delete_registration = false;
        //             }
        //             if ($delete_registration) {
        //                 $registration->delete_permanently();
        //                 $registration->delete_related_permanently();
        //             }
        //         }
        //     }
        // }
    }
}
