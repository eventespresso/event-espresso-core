<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * This class is used for setting scheduled tasks related to the EE_messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Scheduler extends EE_Base
{

    /**
     * Number of seconds between batch sends/generates on the cron job.
     * Defaults to 5 minutes in seconds.  If you want to change this interval, you can use the native WordPress
     * `cron_schedules` filter and modify the existing custom `ee_message_cron` schedule interval added.
     *
     * @type int
     */
    const message_cron_schedule = 300;

    /**
     * Constructor
     */
    public function __construct()
    {
        //register tasks (and make sure only registered once).
        if (! has_action('FHEE__EEH_Activation__get_cron_tasks', array($this, 'register_scheduled_tasks'))) {
            add_action('FHEE__EEH_Activation__get_cron_tasks', array($this, 'register_scheduled_tasks'), 10);
        }

        //register callbacks for scheduled events (but make sure they are set only once).
        if (! has_action(
            'AHEE__EE_Messages_Scheduler__generation',
            array('EE_Messages_Scheduler', 'batch_generation')
        )) {
            add_action('AHEE__EE_Messages_Scheduler__generation', array('EE_Messages_Scheduler', 'batch_generation'));
            add_action('AHEE__EE_Messages_Scheduler__sending', array('EE_Messages_Scheduler', 'batch_sending'));
            add_action('AHEE__EE_Messages_Scheduler__cleanup', array('EE_Messages_Scheduler', 'cleanup'));
        }

        //add custom schedules
        add_filter('cron_schedules', array($this, 'custom_schedules'));
    }


    /**
     * Add custom schedules for wp_cron
     *
     * @param $schedules
     */
    public function custom_schedules($schedules)
    {
        $schedules['ee_message_cron'] = array(
            'interval' => self::message_cron_schedule,
            'display'  => __(
                'This is the cron time interval for EE Message schedules (defaults to once every 5 minutes)',
                'event_espresso'
            ),
        );
        return $schedules;
    }


    /**
     * Callback for FHEE__EEH_Activation__get_cron_tasks that is used to retrieve scheduled Cron events to add and
     * remove.
     *
     * @param array $tasks already existing scheduled tasks
     * @return array
     */
    public function register_scheduled_tasks($tasks)
    {
        EE_Registry::instance()->load_helper('DTT_Helper');
        $tasks['AHEE__EE_Messages_Scheduler__generation'] = 'ee_message_cron';
        $tasks['AHEE__EE_Messages_Scheduler__sending']    = 'ee_message_cron';
        $tasks['AHEE__EE_Messages_Scheduler__cleanup'] = array( EEH_DTT_Helper::tomorrow(), 'daily');
        return $tasks;
    }


    /**
     * This initiates a non-blocking separate request to execute on a scheduled task.
     * Note: The EED_Messages module has the handlers for these requests.
     *
     * @param string $task The task the request is being generated for.
     */
    public static function initiate_scheduled_non_blocking_request($task)
    {
        if (apply_filters(
            'EE_Messages_Scheduler__initiate_scheduled_non_blocking_request__do_separate_request',
            true
        )) {
            $request_url  = add_query_arg(
                array_merge(
                    array('ee' => 'msg_cron_trigger'),
                    EE_Messages_Scheduler::get_request_params($task)
                ),
                site_url()
            );
            $request_args = array(
                'timeout'     => 300,
                'blocking'    => (defined('DOING_CRON') && DOING_CRON) || (defined('DOING_AJAX') && DOING_AJAX) ? true : false,
                'sslverify'   => false,
                'redirection' => 10,
            );
            $response     = wp_remote_get($request_url, $request_args);
            if (is_wp_error($response)) {
                trigger_error($response->get_error_message());
            }
        } else {
            EE_Messages_Scheduler::initiate_immediate_request_on_cron($task);
        }
    }


    /**
     * This returns
     * the request params used for a scheduled message task request.
     *
     * @param string $task The task the request is for.
     * @return array
     */
    public static function get_request_params($task)
    {
        //transient is used for flood control on msg_cron_trigger requests
        $transient_key = 'ee_trans_' . uniqid($task);
        set_transient($transient_key, 1, 5 * MINUTE_IN_SECONDS);
        return array(
            'type' => $task,
            'key'  => $transient_key,
        );
    }


    /**
     * This is used to execute an immediate call to the run_cron task performed by EED_Messages
     *
     * @param string $task The task the request is being generated for.
     */
    public static function initiate_immediate_request_on_cron($task)
    {
        $request_args = EE_Messages_Scheduler::get_request_params($task);
        //set those request args in the request so it gets picked up
        foreach ($request_args as $request_key => $request_value) {
            EE_Registry::instance()->REQ->set($request_key, $request_value);
        }
        EED_Messages::instance()->run_cron();
    }


    /**
     * Callback for scheduled AHEE__EE_Messages_Scheduler__generation wp cron event
     */
    public static function batch_generation()
    {
        /**
         * @see filter usage in EE_Messages_Queue::initiate_request_by_priority()
         */
        if (! apply_filters('FHEE__EE_Messages_Processor__initiate_request_by_priority__do_immediate_processing', false)
            || ! EE_Registry::instance()->NET_CFG->core->do_messages_on_same_request
        ) {
            EE_Messages_Scheduler::initiate_immediate_request_on_cron('generate');
        }
    }


    /**
     * Callback for scheduled AHEE__EE_Messages_Scheduler__sending
     */
    public static function batch_sending()
    {
        /**
         * @see filter usage in EE_Messages_Queue::initiate_request_by_priority()
         */
        if (! apply_filters('FHEE__EE_Messages_Processor__initiate_request_by_priority__do_immediate_processing', false)
            || ! EE_Registry::instance()->NET_CFG->core->do_messages_on_same_request
        ) {
            EE_Messages_Scheduler::initiate_immediate_request_on_cron('send');
        }
    }


    /**
     * This is the callback for the `AHEE__EE_Messages_Scheduler__cleanup` scheduled event action.
     * This runs once a day and if cleanup is active (set via messages settings), it will (by default) delete permanently
     * from the database messages that have a MSG_modified date older than 30 days.
     */
    public static function cleanup()
    {
        //first check if user has cleanup turned on or if we're in maintenance mode.  If in maintenance mode we'll wait
        //until the next scheduled event.
        if (! EE_Registry::instance()->CFG->messages->delete_threshold
            || ! EE_Maintenance_Mode::instance()->models_can_query()
        ) {
            return;
        }

        /**
         * This filter switch allows other code (such as the EE_Worker_Queue add-on) to replace this with its own handling
         * of deleting messages.
         */
        if (apply_filters('FHEE__EE_Messages_Scheduler__cleanup__handle_cleanup_on_cron', true)) {
            EEM_Message::instance()->delete_old_messages(EE_Registry::instance()->CFG->messages->delete_threshold);
        }
    }

} //end EE_Messages_Scheduler