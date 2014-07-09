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
	 * This holds the EE_messages controller
	 *
	 * @var EE_messages
	 */
	protected  static $_EEMSG;


	/**
	 * holds all the paths for various messages components.
	 * Utilized by autoloader registry
	 *
	 * @var array
	 */
	protected static $_MSG_PATHS;


	/**
	 * @return EED_Module
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



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

		//register routes
		self::_register_routes();
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
	 * All the message triggers done by route go in here.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	protected static function _register_routes() {
		EE_Config::register_route( __('msg_url_trigger', 'event_espresso'), 'Messages', 'run' );
		do_action( 'AHEE__EED_Messages___register_routes' );
	}




	/**
	 *  This runs when the msg_url_trigger route has initiated.
	 *
	 *  @since 4.5.0
	 *  @throws EE_Error
	 *
	 *  @return 	void
	 */
	public function run( $WP ) {
		$sending_messenger = EE_Registry::instance()->REQ->is_set('snd_msgr') ? EE_Registry::instance()->REQ->get('snd_msgr') : '';
		$generating_messenger = EE_Registry::instance()->REQ->is_set('gen_msgr') ? EE_Registry::instance()->REQ->get('gen_msgr') : '';
		$message_type = EE_Registry::instance()->REQ->is_set('message_type') ? EE_Registry::instance()->REQ->get('message_type') : '';
		$context = EE_Registry::instance()->REQ->is_set('context') ? EE_Registry::instance()->REQ->get('context') : '';
		$token = EE_Registry::instance()->REQ->is_set('token') ? EE_Registry::instance()->REQ->get('token') : '';
		$data_id = EE_Registry::instance()->REQ->is_set('id') ? (int) EE_Registry::instance()->REQ->get('id') : 0;

		//verify the needed params are present.
		if ( empty( $sending_messenger ) || empty( $generating_messenger ) || empty( $message_type ) || empty( $context ) || empty( $token ) ) {
			throw new EE_Error( __('The request for the "msg_url_trigger" route has a malformed url.', 'event_espresso') );
		}

		//ensure controller is loaded
		self::_load_controller();

		//retrieve the data via the handler
		//How we do this is the token will always be the unique REG_url_link saved with a registration.  We use that to make sure we retrieve the correct data for the given registration.  Depending on the context and the message type data handler, the data_id will correspond to the specific data handler item we need to retrieve for specific messages (i.e. a specific payment or specific refund).

		$data = $this->_get_messages_data_from_url( $generating_messenger, $message_type, $token, $data_id, $context );

		//make sure we drop generating messenger if both sending and generating are the same.
		$generating_messenger = $sending_messenger != $generating_messenger ? $generating_messenger : NULL;

		//now we can trigger the actual sending of the message via the message type.
		self::$_EEMSG->send_message( $message_type, $data, $sending_messenger, $generating_messenger, $context );
	}






	/**
	 * Given the token (reg_url_link) and (optionally) the $data_id, this returns the appropriate data object(s) for the given message_type.
	 *
	 * @since 4.5.0
	 * @throws EE_Error
	 *
	 * @param string $generating_messenger The messenger that is used for generating templates for this message type.
	 * @param string $message_type Used to figure out what data handler is used (which in turn enables us to know what data type is required)
	 * @param string $token   the REG_url_link - this is the base for retrieving the related data.
	 * @param int      $data_id Some data handlers require a specific object.  The id is used to provide that specific object.
	 * @param string $context what context is being requested.
	 *
	 * @return mixed  (EE_Base_Class||EE_Base_Class[])
	 */
	protected function _get_messages_data_from_url( $generating_messenger, $message_type, $token, $data_id, $context ) {

		//get the registration.
		$registration = EEM_Registration::instance()->get_one( array( array( 'REG_url_link' => $token ) ) );

		//if no registration then bail early.
		if ( ! $registration instanceof EE_Registration ) {
			throw new EE_Error( __('Unable to complete the request because the token is invalid.', 'event_espresso' ) );
		}

		//get message type object then get the correct data setup for that message type.
		$message_type = self::$_EEMSG->get_active_message_type( $generating_messenger, $message_type );


		//if no message type then it likely isn't active for this messenger.
		if ( ! $message_type instanceof EE_message_type ) {
			throw new EE_Error( sprintf( __('Unable to get data for the %s message type, likely because it is not active for the %s messenger.', 'event_espresso') ) );
		}

		//get data according to data handler requirements
		return $message_type->get_data_for_context( $context, $registration, $data_id );
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
	protected static function _set_messages_paths() {
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
		$paths = array();
		foreach ( $dir_ref as $index => $dir ) {
			$paths[$index] = EE_LIBRARIES . $dir;
		}
		self::$_MSG_PATHS = apply_filters( 'FHEE__EED_Messages___set_messages_paths___MSG_PATHS', $paths );
	}


	/**
	 * Takes care of loading the Messages system controller into the $_EEMSG property
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	protected static function _load_controller() {
		if ( ! self::$_EEMSG instanceof EE_messages ) {
			self::set_autoloaders();
			self::$_EEMSG = new EE_messages();
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
	protected static function _get_reg_status_array() {

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
