<?php

use EventEspresso\core\domain\services\cron\CronUtilities;
use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\payments\PaymentProcessor;

/**
 * Class EE_Cron_Tasks
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 */
class EE_Cron_Tasks extends EE_Base
{
    /**
     * WordPress doesn't allow duplicate crons within 10 minutes of the original,
     * so we'll set our retry time for just over 10 minutes to avoid that
     */
    const reschedule_timeout = 605;


    private static ?EE_Cron_Tasks $_instance = null;


    public static function instance(): ?EE_Cron_Tasks
    {
        if (! self::$_instance instanceof EE_Cron_Tasks) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function __construct()
    {
        // verify that WP Cron is enabled
        if (
            defined('DISABLE_WP_CRON')
            && DISABLE_WP_CRON
            && is_admin()
            && ! get_option('ee_disabled_wp_cron_check')
        ) {
            /**
             * This needs to be delayed until after the config is loaded because EE_Cron_Tasks is constructed before
             * config is loaded.
             * This is intentionally using a anonymous function so that its not easily de-registered.  Client code
             * wanting to not have this functionality can just register its own action at a priority after this one to
             * reverse any changes.
             */
            add_action(
                'AHEE__EE_System__load_core_configuration__complete',
                function () {
                    EE_Registry::instance()->NET_CFG->core->do_messages_on_same_request = true;
                    EE_Registry::instance()->NET_CFG->update_config(true, false);
                    add_option('ee_disabled_wp_cron_check', 1, '', false);
                }
            );
        }
        // UPDATE TRANSACTION WITH PAYMENT
        add_action(
            'AHEE__EE_Cron_Tasks__update_transaction_with_payment_2',
            ['EE_Cron_Tasks', 'setup_update_for_transaction_with_payment'],
            10,
            2
        );
        // ABANDONED / EXPIRED TRANSACTION CHECK
        add_action(
            'AHEE__EE_Cron_Tasks__expired_transaction_check',
            ['EE_Cron_Tasks', 'expired_transaction_check']
        );
        // CLEAN OUT JUNK TRANSACTIONS AND RELATED DATA
        add_action(
            'AHEE__EE_Cron_Tasks__clean_up_junk_transactions',
            ['EE_Cron_Tasks', 'clean_out_junk_transactions']
        );
        // logging
        add_action(
            'AHEE__EE_System__load_core_configuration__complete',
            [CronUtilities::class, 'logScheduledEspressoCrons']
        );
        EE_Registry::instance()->load_lib('Messages_Scheduler');
        // clean out old gateway logs
        add_action(
            'AHEE_EE_Cron_Tasks__clean_out_old_gateway_logs',
            ['EE_Cron_Tasks', 'clean_out_old_gateway_logs']
        );
    }


    /**
     * @return void
     * @deprecated 5.0.40.p
     */
    public static function log_scheduled_ee_crons(): void
    {
        CronUtilities::logScheduledEspressoCrons();
    }


    /**
     * reschedule_cron_for_transactions_if_maintenance_mode
     * if Maintenance Mode is active, this will reschedule a cron to run again in 10 minutes
     *
     * @param string $cron_task
     * @param array  $TXN_IDs
     * @return bool
     * @throws DomainException
     */
    public static function reschedule_cron_for_transactions_if_maintenance_mode(string $cron_task, array $TXN_IDs): bool
    {
        if (! method_exists('EE_Cron_Tasks', $cron_task)) {
            throw new DomainException(
                sprintf(
                    esc_html__('"%1$s" is not valid method on EE_Cron_Tasks.', 'event_espresso'),
                    $cron_task
                )
            );
        }
        // reschedule the cron if we can't hit the db right now
        if (DbStatus::isOffline()) {
            foreach ($TXN_IDs as $TXN_ID => $additional_vars) {
                // ensure $additional_vars is an array
                $additional_vars = is_array($additional_vars) ? $additional_vars : [$additional_vars];
                // reset cron job for the TXN
                call_user_func_array(
                    ['EE_Cron_Tasks', $cron_task],
                    array_merge(
                        [
                            time() + (10 * MINUTE_IN_SECONDS),
                            $TXN_ID,
                        ],
                        $additional_vars
                    )
                );
            }
            return true;
        }
        return false;
    }




    /****************  UPDATE TRANSACTION WITH PAYMENT ****************/


    /**
     * array of TXN IDs and the payment
     *
     * @var array
     */
    protected static array $_update_transactions_with_payment = [];


    /**
     * schedule_update_transaction_with_payment
     * sets a wp_schedule_single_event() for updating any TXNs that may
     * require updating due to recently received payments
     *
     * @param int $timestamp
     * @param int $TXN_ID
     * @param int $PAY_ID
     */
    public static function schedule_update_transaction_with_payment(
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
     * which is setup by EE_Cron_Tasks::schedule_update_transaction_with_payment().
     * The passed TXN_ID and associated payment gets added to an array, and then
     * the EE_Cron_Tasks::update_transaction_with_payment() function is hooked into
     * 'shutdown' which will actually handle the processing of any
     * transactions requiring updating, because doing so now would be too early
     * and the required resources may not be available
     *
     * @param int $TXN_ID
     * @param int $PAY_ID
     */
    public static function setup_update_for_transaction_with_payment(int $TXN_ID = 0, int $PAY_ID = 0): void
    {
        do_action('AHEE_log', __CLASS__, __FUNCTION__, $TXN_ID, '$TXN_ID');
        if (absint($TXN_ID)) {
            self::$_update_transactions_with_payment[ $TXN_ID ] = $PAY_ID;
            add_action(
                'shutdown',
                ['EE_Cron_Tasks', 'update_transaction_with_payment'],
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
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public static function update_transaction_with_payment(): void
    {
        if (
// are there any TXNs that need cleaning up ?
            empty(self::$_update_transactions_with_payment)
            // reschedule the cron if we can't hit the db right now
            || EE_Cron_Tasks::reschedule_cron_for_transactions_if_maintenance_mode(
                'schedule_update_transaction_with_payment',
                self::$_update_transactions_with_payment
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
        // load EEM_Transaction
        EE_Registry::instance()->load_model('Transaction');
        foreach (self::$_update_transactions_with_payment as $TXN_ID => $PAY_ID) {
            // reschedule the cron if we can't hit the db right now
            if (DbStatus::isOffline()) {
                // reset cron job for updating the TXN
                EE_Cron_Tasks::schedule_update_transaction_with_payment(
                    time() + EE_Cron_Tasks::reschedule_timeout,
                    $TXN_ID,
                    $PAY_ID
                );
                continue;
            }
            $transaction = EEM_Transaction::instance()->get_one_by_ID($TXN_ID);
            $payment     = EEM_Payment::instance()->get_one_by_ID($PAY_ID);
            // verify transaction && try to update the TXN with any payments
            if ($transaction instanceof EE_Transaction && $payment instanceof EE_Payment) {
                /** @var PaymentProcessor $payment_processor */
                $payment_processor = LoaderFactory::getShared(PaymentProcessor::class);
                $payment_processor->updateTransactionBasedOnPayment($transaction, $payment, true, true);
            }
            unset(self::$_update_transactions_with_payment[ $TXN_ID ]);
        }
    }



    /************  END OF UPDATE TRANSACTION WITH PAYMENT  ************/


    /*****************  EXPIRED TRANSACTION CHECK *****************/


    /**
     * array of TXN IDs
     *
     * @var array
     */
    protected static array $_expired_transactions = [];


    /**
     * schedule_expired_transaction_check
     * sets a wp_schedule_single_event() for following up on TXNs after their session has expired
     *
     * @param int $timestamp
     * @param int $TXN_ID
     */
    public static function schedule_expired_transaction_check(
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
     * expired_transaction_check
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
    public static function expired_transaction_check(int $TXN_ID = 0): void
    {
        if (absint($TXN_ID)) {
            self::$_expired_transactions[ $TXN_ID ] = $TXN_ID;
            add_action(
                'shutdown',
                ['EE_Cron_Tasks', 'process_expired_transactions'],
                5
            );
        }
    }


    /**
     * process_expired_transactions
     * loops through the self::$_expired_transactions array and processes any failed TXNs
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DomainException
     * @throws RuntimeException
     */
    public static function process_expired_transactions(): void
    {
        if (
// are there any TXNs that need cleaning up ?
            empty(self::$_expired_transactions)
            // reschedule the cron if we can't hit the db right now
            || EE_Cron_Tasks::reschedule_cron_for_transactions_if_maintenance_mode(
                'schedule_expired_transaction_check',
                self::$_expired_transactions
            )
        ) {
            return;
        }
        /** @type EE_Transaction_Processor $transaction_processor */
        $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
        // set revisit flag for txn processor
        $transaction_processor->set_revisit();
        // load EEM_Transaction
        EE_Registry::instance()->load_model('Transaction');
        foreach (self::$_expired_transactions as $TXN_ID) {
            $transaction = EEM_Transaction::instance()->get_one_by_ID($TXN_ID);
            // verify transaction and whether it is failed or not
            if ($transaction instanceof EE_Transaction) {
                switch ($transaction->status_ID()) {
                    // Completed TXNs
                    case EEM_Transaction::complete_status_code:
                        // Don't update the transaction/registrations if the Primary Registration is Not Approved.
                        $primary_registration = $transaction->primary_registration();
                        if (
                            $primary_registration instanceof EE_Registration
                            && $primary_registration->status_ID() !== RegStatus::AWAITING_REVIEW
                        ) {
                            /** @type EE_Transaction_Processor $transaction_processor */
                            $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
                            $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
                                $transaction,
                                $transaction->last_payment()
                            );
                            do_action(
                                'AHEE__EE_Cron_Tasks__process_expired_transactions__completed_transaction',
                                $transaction
                            );
                        }
                        break;
                    // Overpaid TXNs
                    case EEM_Transaction::overpaid_status_code:
                        do_action(
                            'AHEE__EE_Cron_Tasks__process_expired_transactions__overpaid_transaction',
                            $transaction
                        );
                        break;
                    // Incomplete TXNs
                    case EEM_Transaction::incomplete_status_code:
                        do_action(
                            'AHEE__EE_Cron_Tasks__process_expired_transactions__incomplete_transaction',
                            $transaction
                        );
                        // todo : move business logic into EE_Transaction_Processor for finalizing abandoned transactions
                        break;
                    // Abandoned TXNs
                    case EEM_Transaction::abandoned_status_code:
                        // run hook before updating transaction, primarily so
                        // EED_Ticket_Sales_Monitor::process_abandoned_transactions() can release reserved tickets
                        do_action(
                            'AHEE__EE_Cron_Tasks__process_expired_transactions__abandoned_transaction',
                            $transaction
                        );
                        // don't finalize the TXN if it has already been completed
                        if ($transaction->all_reg_steps_completed() !== true) {
                            /** @var PaymentProcessor $payment_processor */
                            $payment_processor = LoaderFactory::getShared(PaymentProcessor::class);
                            // let's simulate an IPN here which will trigger any notifications that need to go out
                            $payment_processor->updateTransactionBasedOnPayment(
                                $transaction,
                                $transaction->last_payment(),
                                true,
                                true
                            );
                        }
                        break;
                    // Failed TXNs
                    case EEM_Transaction::failed_status_code:
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
                        break;
                }
            }
            unset(self::$_expired_transactions[ $TXN_ID ]);
        }
    }



    /*************  END OF EXPIRED TRANSACTION CHECK  *************/


    /************* START CLEAN UP BOT TRANSACTIONS **********************/


    /**
     * callback for 'AHEE__EE_Cron_Tasks__clean_up_junk_transactions'
     * which is setup during activation to run on an hourly cron
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DomainException
     * @throws ReflectionException
     */
    public static function clean_out_junk_transactions(): void
    {
        if (DbStatus::isOnline()) {
            EED_Ticket_Sales_Monitor::reset_reservation_counts();
            EEM_Transaction::instance()->delete_junk_transactions();
            EEM_Registration::instance()->delete_registrations_with_no_transaction();
            EEM_Line_Item::instance()->delete_line_items_with_no_transaction();
        }
    }


    /**
     * Deletes old gateway logs. After about a week we usually don't need them for debugging. But folks can filter that.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws Exception
     */
    public static function clean_out_old_gateway_logs(): void
    {
        if (DbStatus::isOnline()) {
            $reg_config               = LoaderFactory::getLoader()->load('EE_Registration_Config');
            $time_diff_for_comparison = apply_filters(
                'FHEE__EE_Cron_Tasks__clean_out_old_gateway_logs__time_diff_for_comparison',
                '-' . $reg_config->gateway_log_lifespan
            );
            EEM_Change_Log::instance()->delete_gateway_logs_older_than(new DateTime($time_diff_for_comparison));
        }
    }


    /*****************  FINALIZE ABANDONED TRANSACTIONS *****************/


    /**
     * @var array
     */
    protected static array $_abandoned_transactions = [];


    /**
     * @param int $timestamp
     * @param int $TXN_ID
     * @deprecated
     */
    public static function schedule_finalize_abandoned_transactions_check(int $timestamp, int $TXN_ID): void
    {
        EE_Cron_Tasks::schedule_expired_transaction_check($timestamp, $TXN_ID);
    }


    /**
     * @param int $TXN_ID
     * @deprecated
     */
    public static function check_for_abandoned_transactions(int $TXN_ID = 0): void
    {
        EE_Cron_Tasks::expired_transaction_check($TXN_ID);
    }


    /**
     * @throws EE_Error
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @deprecated
     */
    public static function finalize_abandoned_transactions(): void
    {
        if (
            // are there any TXNs that need cleaning up ?
            empty(self::$_abandoned_transactions)
            // reschedule the cron if we can't hit the db right now
            || EE_Cron_Tasks::reschedule_cron_for_transactions_if_maintenance_mode(
                'schedule_expired_transaction_check',
                self::$_abandoned_transactions
            )
        ) {
            return;
        }
        // combine our arrays of transaction IDs
        self::$_expired_transactions = self::$_abandoned_transactions + self::$_expired_transactions;
        // and deal with abandoned transactions here now...
        EE_Cron_Tasks::process_expired_transactions();
    }


    /*************  END OF FINALIZE ABANDONED TRANSACTIONS  *************/
}
