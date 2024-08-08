<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use DomainException;
use EE_Error;
use EE_Payment;
use EE_Transaction;
use EE_Transaction_Processor;
use EEM_Payment;
use EEM_Transaction;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\domain\services\cron\CronUtilities;
use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\payments\PaymentProcessor;
use ReflectionException;
use RuntimeException;

class UpdateTransactionsWithPayment extends CronJob
{
    /**
     * WordPress doesn't allow duplicate crons within 10 minutes of the original,
     * so we'll set our retry time for just over 10 minutes to avoid that
     */
    public const RESCHEDULE_TIMEOUT = 605;


    /**
     * array of TXN IDs and the payment
     *
     * @var array
     */
    protected array $update_transactions_with_payment = [];


    public function setHooks(): void
    {
        add_action(
            'AHEE__EE_Cron_Tasks__update_transaction_with_payment_2',
            [$this, 'setupUpdateForTransactionWithPayment'],
            10,
            2
        );
    }


    /**
     * schedule_update_transaction_with_payment
     * sets a wp_schedule_single_event() for updating any TXNs that may
     * require updating due to recently received payments
     *
     * @param int $timestamp
     * @param int $TXN_ID
     * @param int $PAY_ID
     */
    public static function scheduleUpdateTransactionWithPayment(
        int $timestamp,
        int $TXN_ID,
        int $PAY_ID
    ): void {
        // validate $TXN_ID and $timestamp
        $TXN_ID    = absint($TXN_ID);
        $timestamp = absint($timestamp);
        if ($TXN_ID && $timestamp) {
            wp_schedule_single_event(
                $timestamp,
                'AHEE__EE_Cron_Tasks__update_transaction_with_payment_2',
                [$TXN_ID, $PAY_ID]
            );
        }
    }


    /**
     * setup_update_for_transaction_with_payment
     * this is the callback for the action hook:
     * 'AHEE__EE_Cron_Tasks__update_transaction_with_payment'
     * which is set up by EE_Cron_Tasks::schedule_update_transaction_with_payment().
     * The passed TXN_ID and associated payment gets added to an array, and then
     * the EE_Cron_Tasks::update_transaction_with_payment() function is hooked into
     * 'shutdown' which will actually handle the processing of any
     * transactions requiring updating, because doing so now would be too early
     * and the required resources may not be available
     *
     * @param int $TXN_ID
     * @param int $PAY_ID
     */
    public function setupUpdateForTransactionWithPayment(int $TXN_ID = 0, int $PAY_ID = 0): void
    {
        if (absint($TXN_ID)) {
            $this->update_transactions_with_payment[ $TXN_ID ] = $PAY_ID;
            add_action(
                'shutdown',
                [$this, 'updateTransactionWithPayment'],
                5
            );
        }
    }


    /**
     * update_transaction_with_payment
     * loops through the self::$_abandoned_transactions array
     * and attempts to finalize any TXNs that have not been completed
     * but have had their sessions expired, most likely due to a user not
     * returning from an off-site payment gateway
     *
     * @throws EE_Error
     * @throws DomainException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function updateTransactionWithPayment(): void
    {
        if (
            // are there any TXNs that need cleaning up ?
            empty($this->update_transactions_with_payment)
            // reschedule the cron if we can't hit the db right now
            || CronUtilities::rescheduleCronForTransactions(
                [UpdateTransactionsWithPayment::class, 'scheduleUpdateTransactionWithPayment'],
                $this->update_transactions_with_payment
            )
        ) {
            return;
        }
        /** @var EE_Transaction_Processor $transaction_processor */
        $transaction_processor = LoaderFactory::getShared(EE_Transaction_Processor::class);
        if ($transaction_processor instanceof EE_Transaction_Processor) {
            // set revisit flag for payment processor
            $transaction_processor->set_revisit();
        }
        foreach ($this->update_transactions_with_payment as $TXN_ID => $PAY_ID) {
            // reschedule the cron if we can't hit the db right now
            if (DbStatus::isOffline()) {
                // reset cron job for updating the TXN
                UpdateTransactionsWithPayment::scheduleUpdateTransactionWithPayment(
                    time() + UpdateTransactionsWithPayment::RESCHEDULE_TIMEOUT,
                    $TXN_ID,
                    $PAY_ID
                );
                continue;
            }
            $transaction = EEM_Transaction::instance()->get_one_by_ID($TXN_ID);
            $payment     = EEM_Payment::instance()->get_one_by_ID($PAY_ID);
            // verify transaction
            if ($transaction instanceof EE_Transaction && $payment instanceof EE_Payment) {
                // now try to update the TXN with any payments
                /** @var PaymentProcessor $payment_processor */
                $payment_processor = LoaderFactory::getShared(PaymentProcessor::class);
                $payment_processor->updateTransactionBasedOnPayment($transaction, $payment, true, true);
            }
            unset($this->update_transactions_with_payment[ $TXN_ID ]);
        }
    }
}
