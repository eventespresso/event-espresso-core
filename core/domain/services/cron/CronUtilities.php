<?php

namespace EventEspresso\core\domain\services\cron;

use EventEspresso\core\domain\services\database\DbStatus;

class CronUtilities
{
    public static function logScheduledEspressoCrons(): void
    {
        $ee_crons = [
            'AHEE__EE_Cron_Tasks__update_transaction_with_payment',
            'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions',
            'AHEE__EE_Cron_Tasks__clean_up_junk_transactions',
        ];
        $crons    = (array) get_option('cron');
        foreach ($crons as $cron) {
            /** @var array[] $cron */
            foreach ($ee_crons as $ee_cron) {
                if (isset($cron[ $ee_cron ]) && is_array($cron[ $ee_cron ])) {
                    do_action('AHEE_log', __CLASS__, __FUNCTION__, $ee_cron, 'scheduled EE cron');
                    foreach ($cron[ $ee_cron ] as $ee_cron_details) {
                        if (! empty($ee_cron_details['args'])) {
                            do_action(
                                'AHEE_log',
                                __CLASS__,
                                __FUNCTION__,
                                print_r($ee_cron_details['args'], true),
                                "$ee_cron args"
                            );
                        }
                    }
                }
            }
        }
    }


    /**
     * reschedule_cron_for_transactions_if_maintenance_mode
     * if Maintenance Mode is active, this will reschedule a cron to run again in 10 minutes
     *
     * @param callable $cron_job
     * @param array    $TXN_IDs
     * @return bool
     */
    public static function rescheduleCronForTransactions(callable $cron_job, array $TXN_IDs): bool
    {
        // if database is accessible then return false so cron can run now
        if (DbStatus::isOnline()) {
            return false;
        }
        // reschedule the cron because we can't hit the db right now
        foreach ($TXN_IDs as $TXN_ID => $additional_vars) {
            // reset cron job for the TXN
            call_user_func_array(
                $cron_job,
                array_merge(
                    [
                        time() + (10 * MINUTE_IN_SECONDS),
                        $TXN_ID,
                    ],
                    (array) $additional_vars
                )
            );
        }
        return true;
    }
}
