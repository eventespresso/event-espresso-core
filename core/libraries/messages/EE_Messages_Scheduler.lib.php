<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is used for setting scheduled tasks related to the EE_messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Scheduler extends EE_BASE {

	/**
	 * Number of seconds between batch sends/generates on the cron job.
	 * Defaults to 5 minutes in seconds.  If you want to change this interval, you can use the native WordPress
	 * `cron_schedules` filter and modify the existing custom `ee_message_cron` schedule interval added.
	 * @type int
	 */
	const message_cron_schedule = 300;

	/**
	 * Constructor
	 */
	public function __construct() {
		//register tasks (and make sure only registered once).
		if ( ! has_action( 'FHEE__EEH_Activation__get_cron_tasks', array( $this, 'register_scheduled_tasks' ) ) ) {
			add_action( 'FHEE__EEH_Activation__get_cron_tasks', array( $this, 'register_scheduled_tasks' ), 10 );
		}

		//register callbacks for scheduled events (but make sure they are set only once).
		if ( ! has_action( 'AHEE__EE_Messages_Scheduler__generation', array( 'EE_Messages_Scheduler', 'batch_generation' ) ) ) {
			add_action( 'AHEE__EE_Messages_Scheduler__generation', array( 'EE_Messages_Scheduler', 'batch_generation') );
			add_action( 'AHEE__EE_Messages_Scheduler__sending', array( 'EE_Messages_Scheduler', 'batch_sending' ) );
		}

		//add custom schedules
		add_filter( 'cron_schedules', array( $this, 'custom_schedules' ) );
	}




	/**
	 * Add custom schedules for wp_cron
	 * @param $schedules
	 */
	public function custom_schedules( $schedules ) {
		$schedules['ee_message_cron'] = array(
			'interval' => self::message_cron_schedule,
			'display' => __( 'This is the cron time interval for EE Message schedules (defaults to once every 5 minutes)', 'event_espresso' )
		);
		return $schedules;
	}


	/**
	 * Callback for FHEE__EEH_Activation__get_cron_tasks that is used to retrieve scheduled Cron events to add and remove.
	 * @param array $tasks  already existing scheduled tasks
	 * @return array
	 */
	public function register_scheduled_tasks( $tasks ) {
		$tasks['AHEE__EE_Messages_Scheduler__generation'] = 'ee_message_cron';
		$tasks['AHEE__EE_Messages_Scheduler__sending'] = 'ee_message_cron';
		return $tasks;
	}


	/**
	 * This initiates a non-blocking separate request to execute on a scheduled task.
	 * Note: The EED_Messages module has the handlers for these requests.
	 * @param string $task  The task the request is being generated for.
	 */
	public static function initiate_scheduled_non_blocking_request( $task ) {
		//transient is used for flood control on msg_cron_trigger requests
		$transient_key = uniqid( $task );
		set_transient( $transient_key, 1, 5 * MINUTE_IN_SECONDS );
		$request_url = add_query_arg(
			array(
				'ee' => 'msg_cron_trigger',
				'type' => $task,
				'key' => $transient_key,
			),
			site_url()
		);
		$request_args = array(
			'timeout' => 300,
			'blocking' => ( defined( 'DOING_CRON' ) && DOING_CRON ) || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ? true : false,
			'sslverify' => false,
			'redirection' => 10,
		);
		$response = wp_remote_get( $request_url, $request_args );
		if ( is_wp_error( $response ) ) {
			trigger_error( $response->get_error_message() );
		}
	}





	/**
	 * Callback for scheduled AHEE__EE_Messages_Scheduler__generation wp cron event
	 */
	public static function batch_generation() {
		EE_Messages_Scheduler::initiate_scheduled_non_blocking_request( 'generate' );
	}




	/**
	 * Callback for scheduled AHEE__EE_Messages_Scheduler__sending
	 */
	public static function batch_sending() {
		EE_Messages_Scheduler::initiate_scheduled_non_blocking_request( 'send' );
	}

} //end EE_Messages_Scheduler