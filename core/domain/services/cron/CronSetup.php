<?php

namespace EventEspresso\core\domain\services\cron;

use DomainException;
use EE_Network_Config;

class CronSetup
{
    /**
     * constant used to indicate a cron task is no longer in use
     */
    private const DEPRECATED = 'DEPRECATED';

    /**
     * Number of seconds between batch sends/generates on the cron job.
     * Defaults to 5 minutes in seconds.  If you want to change this interval, you can use the native WordPress
     * `cron_schedules` filter and modify the existing custom `ee_message_cron` schedule interval added.
     *
     * @type int
     */
    private const MESSAGE_CRON_SCHEDULE = 300;


    public static function initialize()
    {
        CronSetup::removeCronTasks();
        CronSetup::createCronTasks();
        CronSetup::disabledCronCheck();
    }

    /**
     * Returns an array of cron tasks. Array values are the actions fired by the cron tasks (the "hooks"),
     * values are the frequency (the "recurrence"). See http://codex.wordpress.org/Function_Reference/wp_schedule_event
     * If the cron task should NO longer be used, it should have a value of InitialCronSetup::DEPRECATED
     * (null)
     *
     * @param string $which_to_include can be 'current' (ones that are currently in use),
     *                                 'old' (only returns ones that should no longer be used),or 'all',
     * @return array
     * @throws DomainException
     */
    public static function getCronTasks(string $which_to_include): array
    {
        $cron_tasks =  (array) apply_filters(
            'FHEE__EEH_Activation__get_cron_tasks',
            [
                'AHEE__EE_Cron_Tasks__clean_up_junk_transactions'      => 'hourly',
                'AHEE__EE_Cron_Tasks__update_transaction_with_payment' => CronSetup::DEPRECATED,
                'AHEE_EE_Cron_Tasks__clean_out_old_gateway_logs'       => 'daily',
            ]
        );
        if ($which_to_include === 'old') {
            return array_filter(
                $cron_tasks,
                function ($value) {
                    return $value === CronSetup::DEPRECATED;
                }
            );
        }
        if ($which_to_include === 'current') {
            return array_filter($cron_tasks);
        }
        if (WP_DEBUG && $which_to_include !== 'all') {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Invalid argument of "%1$s" passed to EEH_Activation::get_cron_tasks. Valid values are "all", "old" and "current".',
                        'event_espresso'
                    ),
                    $which_to_include
                )
            );
        }
        return $cron_tasks;
    }


    /**
     * Ensure cron tasks are set up (the removal of crons should be done by remove_crons())
     *
     * @throws DomainException
     */
    public static function createCronTasks()
    {
        $tasks = CronSetup::getCronTasks('current');
        foreach ($tasks as $hook_name => $frequency) {
            if (! wp_next_scheduled($hook_name)) {
                /**
                 * This allows client code to define the initial start timestamp for this schedule.
                 */
                if (
                    is_array($frequency)
                    && count($frequency) === 2
                    && isset($frequency[0], $frequency[1])
                ) {
                    $start_timestamp = $frequency[0];
                    $frequency       = $frequency[1];
                } else {
                    $start_timestamp = time();
                }
                wp_schedule_event($start_timestamp, $frequency, $hook_name);
            }
        }
        // also setup messages scheduler
        add_filter('cron_schedules', [CronSetup::class, 'espressoMessageSchedules']);
    }


    /**
     * Remove the currently-existing and now-removed cron tasks.
     *
     * @param bool $remove_all whether to only remove the old ones, or remove absolutely ALL the EE ones
     * @throws DomainException
     */
    public static function removeCronTasks(bool $remove_all = true)
    {
        $cron_tasks_to_remove = $remove_all ? 'all' : 'old';
        $crons                = _get_cron_array();
        /* reminder of what $crons look like:
         * Top-level keys are timestamps, and their values are arrays.
         * The 2nd level arrays have keys with each of the cron task hook names to run at that time
         * and their values are arrays.
         * The 3rd level arrays are keys which are hashes of the cron task's arguments,
         *  and their values are the UN-hashed arguments
         * eg
         * array (size=13)
         *      1429903276 =>
         *        array (size=1)
         *          'AHEE__EE_Cron_Tasks__update_transaction_with_payment' =>
         *            array (size=1)
         *              '561299d6e42c8e079285870ade0e47e6' =>
         *                array (size=2)
         *                  ...
         *      ...
         */
        $ee_cron_tasks_to_remove = CronSetup::getCronTasks($cron_tasks_to_remove);
        foreach ($crons as $timestamp => $hooks_to_fire_at_time) {
            if (is_array($hooks_to_fire_at_time)) {
                foreach ($hooks_to_fire_at_time as $hook_name => $hook_actions) {
                    if (
                        isset($ee_cron_tasks_to_remove[ $hook_name ])
                        && is_array($ee_cron_tasks_to_remove[ $hook_name ])
                    ) {
                        unset($crons[ $timestamp ][ $hook_name ]);
                    }
                }
                // also take care of any empty cron timestamps.
                if (empty($hooks_to_fire_at_time)) {
                    unset($crons[ $timestamp ]);
                }
            }
        }
        _set_cron_array($crons);
    }


    /**
     * @noinspection PhpUndefinedConstantInspection
     */
    public static function disabledCronCheck()
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
             * This is intentionally using an anonymous function so that it's not easily de-registered.  Client code
             * wanting to not have this functionality can just register its own action at a priority after this one to
             * reverse any changes.
             */
            add_action(
                'AHEE__EE_System__load_core_configuration__complete',
                function () {
                    EE_Network_Config::instance()->core->do_messages_on_same_request = true;
                    EE_Network_Config::instance()->update_config(true, false);
                    add_option('ee_disabled_wp_cron_check', 1, '', false);
                }
            );
        }
    }


    /**
     * Add custom schedules for wp_cron
     *
     * @param array $schedules
     * @return array
     */
    public static function espressoMessageSchedules(array $schedules): array
    {
        $schedules['ee_message_cron'] = [
            'interval' => CronSetup::MESSAGE_CRON_SCHEDULE,
            'display'  => esc_html__(
                'This is the cron time interval for EE Message schedules (defaults to once every 5 minutes)',
                'event_espresso'
            ),
        ];
        return $schedules;
    }
}
