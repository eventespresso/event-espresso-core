<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );
/**
 * 		event_espresso_txn
 *
 * 		@access 		public
 * 		@return 		void
 */
function event_espresso_txn() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	add_shortcode('ESPRESSO_TXN_PAGE', 'return_espresso_content');

	ob_start();
	global $wpdb, $org_options, $espresso_wp_user, $payment_settings, $espresso_content;
	
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	// check gateways
	if ( empty( $active_gateways )) {
		$subject = __('Website Payment IPN Not Setup', 'event_espresso');
		$body = sprintf(__('The IPN for %s at %s has not been properly setup and is not working. Date/time %s', 'event_espresso'), $org_options['organization'], home_url(), date('g:i A'));
		wp_mail( $org_options['contact_email'], $subject, $body );
		return;
	}
	// load active gateways
	foreach ( $active_gateways as $gateway => $path ) {
		require_once( $path . "/init.php" );
	}
	
	$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
	
	if ( empty( $payment_data['attendee_id'] )) {
		echo __( 'An error occured. Required identification information was not supplied.', 'event_espresso' );
	} else {
	
		$payment_data = apply_filters('filter_hook_espresso_pretransaction_data_processing', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_process_transaction', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_get_total_cost', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_prepare_event_link', $payment_data);
		do_action('action_hook_espresso_update_attendee_payment_data_in_db', $payment_data);
		do_action('action_hook_espresso_email_after_payment', $payment_data);
		extract($payment_data);

		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
		}
	}
	
	$_REQUEST['page_id'] = $org_options['return_url'];
	$espresso_content = ob_get_clean();

	espresso_clear_session();
	
	//$espresso_content = 'WHY HALLLOOO THAR!!!';
//	return $espresso_content;
		
}





/**
 * 		deal_with_ideal
 *
 * 		@access 		public
 * 		@return 		void
 */
function deal_with_ideal() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (!empty($_POST['bank_id'])) {
		$active_gateways = get_option('event_espresso_active_gateways', array());
		if (!empty($active_gateways['ideal'])) {
			$path = $active_gateways['ideal'];
			require_once($path . '/init.php');
			$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
			espresso_process_ideal($payment_data);
		}
	}
}
add_action('wp_loaded', 'deal_with_ideal');





/**
 * 		espresso_email_after_payment
 *
 * 		@access 		public
 * 		@param 		array		$payment_data
 * 		@return 		void
 */
function espresso_email_after_payment($payment_data) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $org_options;
	if ($payment_data->payment_status == 'Completed') {
		event_espresso_send_payment_notification(array('attendee_id' => $payment_data->attendee_id));
		if (!$org_options['email_before_payment']) {
			event_espresso_email_confirmations(array('session_id' => $payment_data->attendees[0]->attendee_session, 'send_admin_email' => true, 'send_attendee_email' => true));
		}
	}
}





/**
 * 		espresso_mail_successful_transaction_debugging_output
 *
 * 		@access 		public
 * 		@param 		array		$payment_data
 * 		@return 		void
 */
function espresso_mail_successful_transaction_debugging_output() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $EE_Session, $org_options;
	$session_data = $EE_Session->get_session_data();

	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification was successfully recieved\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	$body .= unserialize($session_data['txn_results']['raw_response']);
	wp_mail($org_options['contact_email'], $subject, $body);
}
add_action('action_hook_espresso_mail_successful_transaction_debugging_output', 'espresso_mail_successful_transaction_debugging_output');





/**
 * 		espresso_mail_failed_transaction_debugging_output
 *
 * 		@access 		public
 * 		@param 		array		$payment_data
 * 		@return 		void
 */
function espresso_mail_failed_transaction_debugging_output() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $EE_Session, $org_options;
	$session_data = $EE_Session->get_session_data();
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification failed\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	$body .= unserialize($session_data['txn_results']['raw_response']);
	wp_mail($org_options['contact_email'], $subject, $body);
}
add_action('action_hook_espresso_mail_failed_transaction_debugging_output', 'espresso_mail_failed_transaction_debugging_output');

