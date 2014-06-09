<?php
/**
 * This file contains the module for the messages system
 *
 * @since 4.5.0
 * @package  Event Espresso
 * @subpackage modules, messages
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Messages module.  Takes care of registering all the triggers for messages.
 *
 * @since 4.5.0
 *
 * @package		Event Espresso
 * @subpackage	modules, messages
 * @author 		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EED_Messages  extends EED_Module {

	/**
	 * This holds the EE_Messages controller
	 *
	 * @var EE_Messages
	 */
	private  static $_EEMSG;


	/**
	 * holds all the paths for various messages components.
	 * Utilized by autoloader registry
	 *
	 * @var array
	 */
	private static $_MSG_PATHS;

	/**
	 *  set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @since 4.5.0
	 *
	 *  @return 	void
	 */
	public static function set_hooks() {
		//actions
		add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__done', array( 'EED_Messages', 'payment' ), 10, 2 );
		add_action( 'AHEE__EE_Transaction__finalize__all_transaction', array( 'EED_Messages', 'maybe_registration' ), 10, 3 );

		//filters
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		//actions
		add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__done', array( 'EED_Messages', 'payment' ), 10, 2 );
		add_action( 'AHEE__Transactions_Admin_Page___send_payment_reminder__process_admin_payment_reminder', array( 'EED_Messages', 'payment_reminder'), 10 );
		add_action( 'AHEE__EE_Transaction__finalize__all_transaction', array( 'EED_Messages', 'maybe_registration' ), 10, 3 );
		add_action( 'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send', array( 'EED_Messages', 'send_newsletter_message'), 10, 2 );

		//filters
		add_filter( 'FHEE__EE_Admin_Page___process_resend_registration__success', array( 'EED_Messages', 'process_resend' ), 10, 2 );
		add_filter( 'FHEE__EE_Admin_Page___process_admin_payment_notification__success', array( 'EED_Messages', 'process_admin_payment'), 10, 2 );
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
		//currently nothing happens
		return;
	}



	/**
	 * This simply makes sure the autoloaders are registered for the EE_Messages system.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	public static function set_autoloaders() {
		if ( empty( self::$_MSG_PATHS ) ) {
			self::_set_messages_paths();
			EE_Registry::instance()->load_helper('Autoloader');
			foreach ( self::$_MSG_PATHS as $path ) {
				EEH_Autoloader::register_autoloaders_for_each_file_in_folder( $path );
			}
		}
	}




	/**
	 * Take care of adding all the paths for the messages components to the $_MSG_PATHS property
	 * for use by the Messages Autoloaders
	 *
	 * @since 4.5.0
	 *
	 * @return void.
	 */
	private static function _set_messages_paths() {
		$dir_ref = array(
			'messages',
			'messages/message_type',
			'messages/messenger',
			'messages/defaults',
			'messages/defaults/email',
			'messages/data_class',
			'messages/validators',
			'messages/validators/email',
			'shortcodes'
			);

		foreach ( $dir_ref as $index => $dir ) {
			$dir_ref[$index] = EE_LIBRARIES . $dir;
		}
		self::$_MSG_PATHS = apply_filters( 'FHEE__EED_Messages___set_messages_paths___MSG_PATHS', $dir_ref );
	}


	/**
	 * Takes care of loading the Messages system controller into the $_EEMSG property
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	private static function _load_controller() {
		if ( ! self::$_EEMSG instanceof EE_Messages ) {
			self::set_autoloaders();
			self::$_EEMSG = new EE_Messages();
		}
	}



	public static function payment_reminder( EE_Transaction $transaction ) {
		self::_load_controller();
		$data = array( $transaction, null );
		self::$_EEMSG->send_message( 'payment_reminder', $data );
	}



	/**
	 * Any messages triggers for after successful gateway payments should go in here.
	 * @param  EE_Transaction object
	 * @param  EE_Payment object
	 * @return void
	 */
	public static function payment( EE_Transaction $transaction, EE_Payment $payment ) {
		self::_load_controller();
		$data = array( $transaction, $payment );

		//let's set up the message type depending on the status
		$message_type = 'payment' . '_' . strtolower( $payment->pretty_status() );

		$default_message_type = $payment->amount() < 0 ? 'payment_refund' : 'payment';

		//verify this message type is present and active.  If it isn't then we use the default payment message type.
		$active_mts = self::$_EEMSG->get_active_message_types();

		$message_type = in_array( $message_type, $active_mts ) ? $message_type : $default_message_type;


		self::$_EEMSG->send_message( $message_type, $data);
	}




	/**
	 * Trigger for Registration messages
	 * Note that what registration message type is sent depends on what the reg status is for the registrations on the incoming transaction.
	 * @param  EE_Transaction $transaction
	 * @return void
	 */
	public static function maybe_registration( EE_Transaction $transaction, $reg_msg, $from_admin ) {
		self::_load_controller();

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
		$status_match_array = self::_get_reg_status_array();

		$active_mts = self::$_EEMSG->get_active_message_types();

		if ( in_array( $status_match_array[$reg_status], $active_mts ) )
			self::$_EEMSG->send_message( $status_match_array[$reg_status], $data );

		return; //if we get here then there is no active message type for this status.
	}



	/**
	 * Simply returns an array indexed by Registration Status ID and the related message_type name assoicated with that status id.
	 * @return array
	 */
	private static function _get_reg_status_array() {

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
	public static function process_resend( $success, $req_data ) {
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
			EE_Error::add_error( sprintf( __('Unable to retrieve a registration object for the given reg id (%s)', 'event_espresso'), $req_data['_REG_ID'] ) );
			$success = FALSE;
		}


		if ( $success ) {
			self::_load_controller();

			//get status_match_array
			$status_match_array = self::_get_reg_status_array();
			$active_mts = self::$_EEMSG->get_active_message_types();

			if ( ! in_array( $status_match_array[$reg->status_ID()], $active_mts ) ) {
				$success = FALSE;
				EE_Error::add_error( sprintf( __('Cannot resend the message for this registration because the corresponding message type (%s) is not active.  If you wish to send messages for this message type then please activate it by %sgoing here%s.', 'event_espresso'), $status_match_array[$reg->status_ID()], '<a href="' . admin_url('admin.php?page=espresso_messages&action=settings') . '">', '</a>' ) );
				return $success;
			}

			$success = self::$_EEMSG->send_message( $status_match_array[$reg->status_ID()], $reg );
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
	public static function process_admin_payment( $success, EE_Payment $payment ) {
		$success = TRUE;

		//we need to get the transaction object
		$transaction = $payment->transaction();

		$data = array( $transaction, $payment );

		$message_type_name = $payment->amount() < 0 ? 'payment_refund' : 'payment';

		self::_load_controller();
		$success = self::$_EEMSG->send_message( $message_type_name, $data );

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
	 * @param  int      	      $grp_id     a specific message template group id.
	 * @return void
	 */
	public static function send_newsletter_message( $contacts, $grp_id ) {
		//make sure mtp is id and set it in the $_POST global for later messages setup.
		$_POST['GRP_ID'] = (int) $grp_id;

		self::_load_controller();
		self::$_EEMSG->send_message('newsletter', $contacts);
	}

}
// End of file EED_Messages.module.php
// Location: /modules/messages/EED_Messages.module.php
