<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is used for setting scheduled tasks related to the EE_Messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Scheduler extends EE_BASE {


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
		add_filter( 'cron_schedules', array( 'EE_Messages_Scheduler', 'custom_schedules' ) );
	}




	/**
	 * Add custom schedules for wp_cron
	 * @param $schedules
	 */
	public function custom_schedules( $schedules ) {
		$schedules['ten_minute'] = array(
				'interval' => 36000, //10 min in seconds
				'display' => __( 'Once every 10 minutes', 'event_espresso' )
		);
		return $schedules;
	}


	/**
	 * Callback for FHEE__EEH_Activation__get_cron_tasks that is used to retrieve scheduled Cron events to add and remove.
	 * @param array $tasks  already existing scheduled tasks
	 * @return array
	 */
	public function register_scheduled_tasks( $tasks ) {
		$tasks['AHEE__EE_Messages_Scheduler__generation'] = 'ten_minute';
		$tasks['AHEE__EE_Messages_Scheduler__sending'] = 'ten_minute';
		return $tasks;
	}


	/**
	 * This initiates a non-blocking separate request to execute on a scheduled task.
	 * Note: The EED_Messages module has the handlers for these requests.
	 * @param string $task  The task the request is being generated for.
	 */
	protected static function _initiate_scheduled_non_blocking_request( $task ) {
		//create nonce (this ensures that only valid requests are accepted)
		$nonce = wp_create_nonce( 'EE_Messages_Scheduler_' . $task );
		$request_url = add_query_arg(
			array(
				'ee' => 'msg_cron_trigger',
				'type' => $task,
				'_nonce' => $nonce
			),
			site_url()
		);
		$request_args = array(
				'timeout' => 300,
				'blocking' => false,
				'sslverify' => false
		);
		wp_remote_get( $request_url, $request_args );
	}





	/**
	 * Callback for scheduled AHEE__EE_Messages_Scheduler__generation wp cron event
	 */
	public static function batch_generation() {
		EE_Messages_Scheduler::_initiate_scheduled_non_blocking_request( 'generate' );
	}




	/**
	 * Callback for scheduled AHEE__EE_Messages_Scheduler__sending
	 */
	public static function batch_sending() {
		EE_Messages_Scheduler::_initiate_scheduled_non_blocking_request( 'send' );
	}

} //end EE_Messages_Scheduler