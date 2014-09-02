<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_Init class
 *
 * This class is loaded on every page load and its sole purpose is to add the various hooks/filters required for EE_messages system so loading impact is minimal.  Whenever a new message type is added, the corresponding hook/filter that triggers that messenger can be either added in here (ideal method) or the EE_messages controller would have to be called directly wherever a trigger should be.  The ideal method means that if there is ever a place where a message notification needs to be triggered, a do_action() should be added in that location and the corresponding add_action() added in here.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_Init extends EE_Base {

	/**
	 * This holds the EE_messages controller object when instantiated
	 * @var object
	 */
	private $_EEMSG = NULL;


	public function __construct() {
		$this->_do_actions();
		$this->_do_filters();
	}



	public static function set_autoloaders() {
		spl_autoload_register( 'EE_Messages_Init::autoload_messages' );
	}




	/**
	 * 		autoload_messages
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public static function autoload_messages( $className ) {
		//let's just work with EE_ files!
		if ( !preg_match( '/EE_/', $className ) )
			return;
		//todo:  more subsystems could be added in this array OR even better this array can be defined somewhere else!
		$dir_ref = array(
			'messages/' => 'lib',
			'messages/message_type/' => 'class',
			'messages/messenger/' => 'class',
			'messages/defaults/' => array('class', 'core'),
			'messages/defaults/email/' => 'class',
			'messages/data_class/' => array('core','class'),
			'messages/validators/' => array('core', 'class'),
			'messages/validators/email/' => 'class',
			'shortcodes/' => 'lib'
		);

		//prepend EE_LIBRARIES TO EACH OF THE PATHS (this is so we can filter the paths)
		foreach ( $dir_ref as $dir => $types ) {
			$dir = EE_LIBRARIES . $dir;
			$dir_ref[$dir] = $types;
		}

		//let's allow hooking into the autoloader to add additional paths
		$dir_ref = apply_filters( 'FHEE__EE_Messages_Init__autoload_messages__dir_ref', $dir_ref );

		//assemble a list of filenames
		foreach ( $dir_ref as $dir => $types ) {
			if ( is_array( $types )) {
				foreach ( $types as $type ) {
					$filenames[] = $dir . $className . '.' . $type . '.php';
				}
			} else {
				$filenames[] = $dir . $className . '.' . $types . '.php';
			}
		}
		//now loop through assembled filenames and require as available
		foreach ( $filenames as $filename ) {
			if ( is_readable( $filename )) {
				require_once( $filename );
			}
		}
	}



	/**
	 * The purpose of this method is to load the EE_MSG controller and assign it to the $_EEMSG property.  We only need to load it on demand.
	 *
	 * @access private
	 * @return void
	 */
	private function _load_controller() {
		self::set_autoloaders();
		$this->_EEMSG = new EE_messages();
	}



	/**
	 * This is just for adding all the actions.
	 *
	 * @access private
	 * @return void
	 */
	private function _do_actions() {
		add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__done', array( $this, 'payment' ), 10, 2 );
		//add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__no_payment', array( $this, 'payment_reminder'), 10 );
		add_action( 'AHEE__Transactions_Admin_Page___send_payment_reminder__process_admin_payment_reminder', array( $this, 'payment_reminder'), 10 );/**/
		add_action( 'AHEE__EE_Transaction__finalize__all_transaction', array( $this, 'maybe_registration' ), 10, 3 );
		add_action( 'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send', array( $this, 'send_newsletter_message'), 10, 2 );
		add_action( 'AHEE__EES_Espresso_Cancelled__process_shortcode__transaction', array( $this, 'cancelled_registration' ), 10 );
	}



	/**
	 * This is just for adding all the filters (if any!)
	 *
	 * @access private
	 * @return void
	 */
	private function _do_filters() {
		//EE_Admin filters
		add_filter( 'FHEE__EE_Admin_Page___process_resend_registration__success', array( $this, 'process_resend' ), 10, 2 );
		add_filter( 'FHEE__EE_Admin_Page___process_admin_payment_notification__success', array( $this, 'process_admin_payment'), 10, 2 );/**/
	}





	public function payment_reminder( EE_Transaction $transaction ) {
		$this->_load_controller();
		$data = array( $transaction, null );
		$active_mts = $this->_EEMSG->get_active_message_types();
		if ( in_array( 'payment_reminder', $active_mts ) ) {
			$this->_EEMSG->send_message( 'payment_reminder', $data );
		}
	}



	/**
	 * Any messages triggers for after successful gateway payments should go in here.
	 * @param  EE_Transaction object
	 * @param  EE_Payment object
	 * @return void
	 */
	public function payment( EE_Transaction $transaction, EE_Payment $payment ) {
		$this->_load_controller();
		$data = array( $transaction, $payment );

		//let's set up the message type depending on the status
		$message_type = 'payment' . '_' . strtolower( $payment->pretty_status() );

		//verify this message type is present and active.  If it isn't then we use the default payment message type.
		$active_mts = $this->_EEMSG->get_active_message_types();

		$default_message_type = $payment->amount() < 0  ? 'payment_refund' : 'payment';

		$message_type = in_array( $message_type, $active_mts ) ? $message_type : $default_message_type;

		//one final check
		if ( in_array( $message_type, $active_mts ) ) {
			$this->_EEMSG->send_message( $message_type, $data);
		}
	}




	public function cancelled_registration( EE_Transaction $transaction ) {
		$this->_load_controller();

		$data = array( $transaction, NULL );

		$active_mts = $this->_EEMSG->get_active_message_types();

		if ( in_array( 'cancelled_registration', $active_mts ) ) {
			$this->_EEMSG->send_message( 'cancelled_registration', $data );
		}
		return;
	}




	/**
	 * Trigger for Registration messages
	 * Note that what registration message type is sent depends on what the reg status is for the registrations on the incoming transaction.
	 * @param  EE_Transaction $transaction
	 * @return void
	 */
	public function maybe_registration( EE_Transaction $transaction, $reg_msg, $from_admin ) {
		$this->_load_controller();

		//for now we're ONLY doing this from frontend UNLESS we have the toggle to send.
		if ( $from_admin ) {
			$messages_toggle = !empty( $_REQUEST['txn_reg_status_change']['send_notifications'] ) && $_REQUEST['txn_reg_status_change']['send_notifications'] ? TRUE : FALSE;
			if ( ! $messages_toggle )
				return; //no messages sent please.
		}
		//next let's only send out notifications if a registration was created OR if the registration status was updated to approved
		if ( ! $reg_msg['new_reg'] && ! $reg_msg['to_approved'] )
			return;

		$data = array( $transaction, NULL );

		//let's get the first related reg on the transaction since we can use its status to determine what message type gets sent.
		$registration = $transaction->get_first_related('Registration');
		$reg_status = $registration->status_ID();

		//send the message type matching the status if that message type is active.
		//first an array to match for class name
		$status_match_array = $this->_get_reg_status_array();

		$active_mts = $this->_EEMSG->get_active_message_types();

		if ( in_array( $status_match_array[$reg_status], $active_mts ) )
			$this->_EEMSG->send_message( $status_match_array[$reg_status], $data );

		return; //if we get here then there is no active message type for this status.
	}



	/**
	 * Simply returns an array indexed by Registration Status ID and the related message_type name assoicated with that status id.
	 * @return array
	 */
	private function _get_reg_status_array() {

		$status_match_array = array(
			EEM_Registration::status_id_approved => 'registration',
			EEM_Registration::status_id_pending_payment => 'pending_approval',
			EEM_Registration::status_id_not_approved => 'not_approved_registration',
			EEM_Registration::status_id_cancelled => 'cancelled_registration',
			EEM_Registration::status_id_declined => 'declined_registration'
			);
		return $status_match_array;
	}




	/**
	 * Message triggers for a resend registration confirmation (in admin)
	 *
	 * @access public
	 * @param  bool $success incoming success value (we return true or false on success/fail)
	 * @param array $req_data This is the $_POST & $_GET data sent from EE_Admin Pages
	 * @return bool          success/fail
	 */
	public function process_resend( $success, $req_data ) {
		$success = TRUE;
		//first let's make sure we have the reg id (needed for resending!);
		if ( !isset( $req_data['_REG_ID'] ) ) {
			EE_Error::add_error( __('Something went wrong because we\'re missing the registration ID', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		//get reg object from reg_id
		$reg = EE_Registry::instance()->load_model('Registration')->get_one_by_ID($req_data['_REG_ID'] );

		//if no reg object then send error
		if ( empty( $reg ) ) {
			EE_Error::add_error( sprintf( __('Unable to retrieve a registration object for the given reg id (%s)', 'event_espresso'), $req_data['_REG_ID'] ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}


		if ( $success ) {
			$this->_load_controller();

			//get status_match_array
			$status_match_array = $this->_get_reg_status_array();
			$active_mts = $this->_EEMSG->get_active_message_types();

			if ( ! in_array( $status_match_array[$reg->status_ID()], $active_mts ) ) {
				$success = FALSE;
				EE_Error::add_error( sprintf( __('Cannot resend the message for this registration because the corresponding message type (%s) is not active.  If you wish to send messages for this message type then please activate it by %sgoing here%s.', 'event_espresso'), $status_match_array[$reg->status_ID()], '<a href="' . admin_url('admin.php?page=espresso_messages&action=settings') . '">', '</a>' ), __FILE__, __FUNCTION__, __LINE__ );
				return $success;
			}

			$success = $this->_EEMSG->send_message( $status_match_array[$reg->status_ID()], $reg );
		}

		if ( $success ) {
			EE_Error::overwrite_success();
			EE_Error::add_success( __('The message for this registration has been re-sent', 'event_espresso') );
		} else {
			EE_Error::add_error( __('Something went wrong and the message for this registration was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		return $success;
	}





	/**
	 * Message triggers for manual payment applied by admin
	 * @param  bool     $success incoming success value
	 * @param  EE_Payment $payment EE_payment object
	 * @return bool              success/fail
	 */
	public function process_admin_payment( $success, EE_Payment $payment ) {
		$success = TRUE;

		//we need to get the transaction object
		$transaction = $payment->transaction();

		$data = array( $transaction, $payment );

		$message_type_name = $payment->amount() < 0 ? 'payment_refund' : 'payment';

		$this->_load_controller();
		$success = $this->_EEMSG->send_message( $message_type_name, $data );

		if ( ! $success ) {
			EE_Error::add_error( __('Something went wrong and the payment confirmation was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		return $success;
	}



	/**
	 * Callback for AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send trigger
	 *
	 * @since   4.3.0
	 *
	 * @param  EE_Attendee[]  $contacts   an array of EE_Attendee objects
	 * @param  int      	      $mtp_id     a specific message template group id.
	 * @return void
	 */
	public function send_newsletter_message( $contacts, $mtp_id ) {
		//make sure mtp is id and set it in the $_POST global for later messages setup.
		$_POST['MTP_ID'] = (int) $mtp_id;

		$this->_load_controller();
		$active_mts = $this->_EEMSG->get_active_message_types();
		if ( in_array( 'newsletter', $active_mts ) ) {
			$this->_EEMSG->send_message('newsletter', $contacts);
		}
	}



} //end EE_Messages_Init
