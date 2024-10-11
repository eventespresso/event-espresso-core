<?php

namespace EventEspresso\core\domain\services\cron\jobs;

use DateTime;
use DomainException;
use EE_Error;
use EE_Registration_Config;
use EED_Ticket_Sales_Monitor;
use EEM_Change_Log;
use EEM_Line_Item;
use EEM_Registration;
use EEM_Transaction;
use EventEspresso\core\domain\services\cron\CronJob;
use EventEspresso\core\domain\services\database\DbStatus;
use Exception;
use ReflectionException;

class GarbageCollection extends CronJob
{
    public function setHooks(): void
    {
        add_action(
            'AHEE__EE_Cron_Tasks__clean_up_junk_transactions',
            [$this, 'cleanUpJunkTransactions']
        );
        add_action(
            'AHEE_EE_Cron_Tasks__clean_out_old_gateway_logs',
            [$this, 'cleanUpOldGatewayLogs']
        );
    }


    /**
     * callback for 'AHEE__EE_Cron_Tasks__clean_up_junk_transactions'
     * which is set up during activation to run on an hourly cron
     *
     * @throws EE_Error
     * @throws DomainException
     * @throws ReflectionException
     */
    public function cleanUpJunkTransactions(): void
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
     * @throws ReflectionException
     * @throws Exception
     */
    public function cleanUpOldGatewayLogs(): void
    {
        if (DbStatus::isOnline()) {
            $reg_config               = $this->loader->getShared(EE_Registration_Config::class);
            $time_diff_for_comparison = apply_filters(
                'FHEE__EE_Cron_Tasks__clean_out_old_gateway_logs__time_diff_for_comparison',
                '-' . $reg_config->gateway_log_lifespan
            );
            EEM_Change_Log::instance()->delete_gateway_logs_older_than(new DateTime($time_diff_for_comparison));
        }
    }
}
