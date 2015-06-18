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
	 * This will hold an array of messages template packs that are registered in the messages system.
	 * Format is:
	 * array(
	 * 	'template_pack_dbref' => EE_Messages_Template_Pack (instance)
	 * )
	 *
	 * @var EE_Messages_Template_Pack[]
	 */
	protected static $_TMP_PACKS = array();





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
		add_action( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment', array( 'EED_Messages', 'payment' ), 10, 2 );
		add_action( 'AHEE__EE_Registration_Processor__trigger_registration_update_notifications', array( 'EED_Messages', 'maybe_registration' ), 10, 2 );
		//filters
		add_filter( 'FHEE__EE_Registration__receipt_url__receipt_url', array( 'EED_Messages', 'registration_message_trigger_url' ), 10, 4 );
		add_filter( 'FHEE__EE_Registration__invoice_url__invoice_url', array( 'EED_Messages', 'registration_message_trigger_url' ), 10, 4 );
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
		add_action( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment', array( 'EED_Messages', 'payment' ), 10, 2 );
		add_action( 'AHEE__Transactions_Admin_Page___send_payment_reminder__process_admin_payment_reminder', array( 'EED_Messages', 'payment_reminder'), 10 );
		add_action( 'AHEE__EE_Registration_Processor__trigger_registration_update_notifications', array( 'EED_Messages', 'maybe_registration' ), 10, 3 );
		add_action( 'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send', array( 'EED_Messages', 'send_newsletter_message'), 10, 2 );
		add_action( 'AHEE__EES_Espresso_Cancelled__process_shortcode__transaction', array( 'EED_Messages', 'cancelled_registration' ), 10 );
		//filters
		add_filter( 'FHEE__EE_Admin_Page___process_resend_registration__success', array( 'EED_Messages', 'process_resend' ), 10, 2 );
		add_filter( 'FHEE__EE_Admin_Page___process_admin_payment_notification__success', array( 'EED_Messages', 'process_admin_payment'), 10, 2 );
		add_filter( 'FHEE__EE_Registration__receipt_url__receipt_url', array( 'EED_Messages', 'registration_message_trigger_url' ), 10, 4 );
		add_filter( 'FHEE__EE_Registration__invoice_url__invoice_url', array( 'EED_Messages', 'registration_message_trigger_url' ), 10, 4 );
	}




	/**
	 * All the message triggers done by route go in here.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	protected static function _register_routes() {
		EE_Config::register_route( 'msg_url_trigger', 'Messages', 'run' );
		do_action( 'AHEE__EED_Messages___register_routes' );
	}



	/**
	 *  This runs when the msg_url_trigger route has initiated.
	 *
	 * @since 4.5.0
	 * @param WP $WP
	 * @throws EE_Error
	 * @return    void
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
			EE_Error::add_error( __( 'The request for the "msg_url_trigger" route has a malformed url.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		//get the registration: the token will always be the unique REG_url_link saved with a registration.  We use that to make sure we retrieve the correct data for the given registration.
		$registration = EEM_Registration::instance()->get_one( array( array( 'REG_url_link' => $token ) ) );
		//if no registration then bail early.
		if ( ! $registration instanceof EE_Registration ) {
			EE_Error::add_error( __( 'Unable to complete the request because the token is invalid.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		//ensure controller is loaded
		self::_load_controller();
		// attempt to process message
		try {
			// retrieve the data via the handler
			//  Depending on the context and the message type data handler, the data_id will correspond to the specific data handler item we need to retrieve for specific messages
			// (i.e. a specific payment or specific refund).
			$data = $this->_get_messages_data_from_url( $generating_messenger, $message_type, $registration, $data_id, $context );
			//make sure we drop generating messenger if both sending and generating are the same.
			$generating_messenger = $sending_messenger != $generating_messenger ? $generating_messenger : NULL;
			//now we can trigger the actual sending of the message via the message type.
			self::$_EEMSG->send_message( $message_type, $data, $sending_messenger, $generating_messenger, $context );
		} catch ( EE_Error $e ) {
			$error_msg = __( 'Please note that a system message failed to send due to a technical issue.', 'event_espresso' );
			// add specific message for developers if WP_DEBUG in on
			$error_msg .= '||' . $e->getMessage();
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}




	/**
	 * This is used to retrieve the template pack for the given name.
	 * Retrieved packs are cached on the static $_TMP_PACKS array.  If there is no class matching the given name then the default template pack is returned.
	 *
	 * @param string $template_pack_name This should correspond to the dbref of the template pack (which is also used in generating the Pack class name).
	 *
	 * @return EE_Messages_Template_Pack
	 */
	public static function get_template_pack( $template_pack_name ) {
		if ( isset( self::$_TMP_PACKS[$template_pack_name] ) ) {
			return self::$_TMP_PACKS[$template_pack_name];
		}

		//not set yet so let's attempt to get it.
		$pack_class = 'EE_Messages_Template_Pack_' . str_replace( ' ', '_', ucwords( str_replace( '_' , ' ', $template_pack_name ) ) );

		if ( ! class_exists( $pack_class ) ) {
			$pack_class = 'EE_Messages_Template_Pack_Default';
			self::$_TMP_PACKS['default'] = empty( self::$_TMP_PACKS['default'] ) ? new $pack_class : self::$_TMP_PACKS['default'];
			return self::$_TMP_PACKS['default'];
		} else {
			$pack = new $pack_class;
			self::$_TMP_PACKS[$template_pack_name] = $pack;
			return self::$_TMP_PACKS[$template_pack_name];
		}
	}




	/**
	 * Retrieves an array of all template packs.
	 * Array is in the format array( 'dbref' => EE_Messages_Template_Pack )
	 *
	 * @return EE_Messages_Template_Pack[]
	 */
	public static function get_template_packs() {
		//glob the defaults directory for messages
		$templates = glob( EE_LIBRARIES . 'messages/defaults/*', GLOB_ONLYDIR );
		$template_packs = array();
		foreach( $templates as $template_path ) {
			//grab folder name
			$template = basename( $template_path );

			//is this already set?
			if ( isset( self::$_TMP_PACKS[$template] ) )
				continue;

			//setup classname.
			$pack_class = 'EE_Messages_Template_Pack_' . str_replace( ' ', '_', ucwords( str_replace( '_' , ' ', $template ) ) );

			if ( ! class_exists( $pack_class ) )
				continue;

			$template_packs[$template] = new $pack_class;
		}

		$template_packs = apply_filters( 'FHEE__EED_Messages__get_template_packs__template_packs', $template_packs );
		self::$_TMP_PACKS = array_merge( self::$_TMP_PACKS, $template_packs );
		return self::$_TMP_PACKS;
	}





	/**
	 * Given the token (reg_url_link) and (optionally) the $data_id, this returns the appropriate data object(s) for the given message_type.
	 *
	 * @since 4.5.0
	 * @throws EE_Error
	 *
	 * @param string $generating_messenger The messenger that is used for generating templates for this message type.
	 * @param string $message_type Used to figure out what data handler is used (which in turn enables us to know what data type is required)
	 * @param EE_Registration $registration
	 * @param int      $data_id Some data handlers require a specific object.  The id is used to provide that specific object.
	 * @param string $context what context is being requested.
	 *
	 * @return mixed  (EE_Base_Class||EE_Base_Class[])
	 */
	protected function _get_messages_data_from_url( $generating_messenger, $message_type, EE_Registration $registration, $data_id, $context ) {
		//get message type object then get the correct data setup for that message type.
		$message_type = self::$_EEMSG->get_active_message_type( $generating_messenger, $message_type );
		//if no message type then it likely isn't active for this messenger.
		if ( ! $message_type instanceof EE_message_type ) {
			throw new EE_Error( sprintf( __('Unable to get data for the %s message type, likely because it is not active for the %s messenger.', 'event_espresso'), $message_type->name, $generating_messenger ) );
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
			'messages/validators/html',
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



	/**
	 * @param EE_Transaction $transaction
	 */
	public static function payment_reminder( EE_Transaction $transaction ) {
		self::_load_controller();
		$data = array( $transaction, null );
		if ( self::$_EEMSG->send_message( 'payment_reminder', $data ) ) {
			//self::log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	$transaction,
			//	array(
			//		'delivered'  			=> current_time( 'mysql' ),
			//		'message_type' 	=> 'payment_reminder',
			//		'txn_status' 			=> $transaction->status_obj()->code( false, 'sentence' ),
			//	)
			//);
		}
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

		$message_type = self::_get_payment_message_type( $payment->STS_ID() );

		//if payment amount is less than 0 then switch to payment_refund message type.
		$message_type = $payment->amount() < 0 ? 'payment_refund' : $message_type;

		//verify this message type is present and active.  If it isn't then no message is sent.
		$active_mts = self::$_EEMSG->get_active_message_types();

		$message_type = in_array( $message_type, $active_mts ) ? $message_type : false;

		if ( $message_type ) {
			if ( self::$_EEMSG->send_message( $message_type, $data ) ) {
				//self::log(
				//	__CLASS__, __FUNCTION__, __LINE__,
				//	$transaction,
				//	array(
				//		'delivered' 			=>  current_time( 'mysql' ),
				//		'message_type' 	=> $message_type,
				//		'txn_status' 			=> $transaction->status_obj()->code( false, 'sentence' ),
				//		'pay_status' 		=> $payment->status_obj()->code( false, 'sentence' ),
				//	)
				//);
			}
		}
	}



	/**
	 * @param EE_Transaction $transaction
	 */
	public static function cancelled_registration( EE_Transaction $transaction ) {
		self::_load_controller();

		$data = array( $transaction, NULL );

		$active_mts = self::$_EEMSG->get_active_message_types();

		if ( in_array( 'cancelled_registration', $active_mts ) ) {
			self::$_EEMSG->send_message( 'cancelled_registration', $data );
		}
		return;
	}



	/**
	 * Trigger for Registration messages
	 * Note that what registration message type is sent depends on what the reg status is for the registrations on the incoming transaction.
	 *
	 * @param EE_Registration $registration
	 * @param array $extra_details
	 * @return void
	 */
	public static function maybe_registration( EE_Registration $registration, $extra_details = array() ) {

		if ( ! self::_verify_registration_notification_send( $registration, $extra_details ) ) {
			//no messages please
			return;
		}


		EE_Registry::instance()->load_helper( 'MSG_Template' );

		//get all registrations so we make sure we send messages for the right status.
		$all_registrations = $registration->transaction()->registrations();

		//cached array of statuses so we only trigger messages once per status.
		$statuses_sent = array();

		//loop through registrations and trigger messages once per status.
		foreach ( $all_registrations as $reg ) {

			//already triggered?
			if ( in_array( $reg->status_ID(), $statuses_sent ) ) {
				continue;
			}

			$message_type = self::_get_reg_status_array( $reg->status_ID() );
			if ( EEH_MSG_Template::is_mt_active( $message_type ) ) {
				self::_load_controller();

				//send away, send away, uhhuh
				if ( self::$_EEMSG->send_message( $message_type, array( $registration->transaction(), null, $reg->status_ID() ) ) ) {
					// DEBUG LOG
					// self::log(
					// 	__CLASS__, __FUNCTION__, __LINE__,
					// 	$registration->transaction(),
					// 	array(
					// 		'delivered'    => current_time( 'mysql' ),
					// 		'message_type' => $message_type,
					// 		'reg_status'   => $reg->status_obj()->code( false, 'sentence' ),
					// 		'context' => 'in all registrations loop'
					// 	)
					// );
				}
			}

			$statuses_sent[] = $reg->status_ID();
		}

		//now send summary (registration_summary) if active
		if ( EEH_MSG_Template::is_mt_active( 'registration_summary' ) ) {
			self::_load_controller();
			if ( self::$_EEMSG->send_message( 'registration_summary', array( $registration->transaction(), null ) ) ) {
					// DEBUG LOG
					// self::log(
					// 	__CLASS__, __FUNCTION__, __LINE__,
					// 	$registration->transaction(),
					// 	array(
					// 		'delivered'    => current_time( 'mysql' ),
					// 		'message_type' => 'registration_summary',
					// 		'reg_status'   => $registration->status_obj()->code( false, 'sentence' ),
					// 	)
					// );
				}
		}
	}



	/**
	 * This is a helper method used to very whether a registration notification should be sent or
	 * not.  Prevents duplicate notifications going out for registration context notifications.
	 *
	 * @param EE_Registration $registration  [description]
	 * @param array           $extra_details [description]
	 *
	 * @return bool          true = send away, false = nope halt the presses.
	 */
	protected static function _verify_registration_notification_send( EE_Registration $registration, $extra_details = array() ) {
		 //self::log(
		 //	__CLASS__, __FUNCTION__, __LINE__,
		 //	$registration->transaction(),
		 //	array( '$extra_details' => $extra_details )
		 //);
		// currently only using this to send messages for the primary registrant
		if ( ! $registration->is_primary_registrant() ) {
			return false;
		}
		// first we check if we're in admin and not doing front ajax
		if ( is_admin() && ! EE_FRONT_AJAX ) {
			//make sure appropriate admin params are set for sending messages
			if ( empty( $_REQUEST[ 'txn_reg_status_change' ][ 'send_notifications' ] ) || ! absint( $_REQUEST[ 'txn_reg_status_change' ][ 'send_notifications' ] ) ) {
				//no messages sent please.
				return false;
			}
		} else {
			// frontend request (either regular or via AJAX)
			// TXN is NOT finalized ?
			if ( ! isset( $extra_details[ 'finalized' ] ) || $extra_details[ 'finalized' ] === false ) {
				return false;
			}
			// return visit but nothing changed ???
			if (
				isset( $extra_details[ 'revisit' ], $extra_details[ 'status_updates' ] ) &&
				$extra_details[ 'revisit' ] && ! $extra_details[ 'status_updates' ]
			) {
				return false;
			}
			// NOT sending messages && reg status is something other than "Not-Approved"
			if (
				! apply_filters( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', false ) &&
				$registration->status_ID() !== EEM_Registration::status_id_not_approved
			) {
				return false;
			}
		}
		// release the kraken
		return true;
	}



	/**
	 * Simply returns an array indexed by Registration Status ID and the related message_type name associated with that status id.
	 *
	 * @param string $reg_status
	 * @return array
	 */
	protected static function _get_reg_status_array( $reg_status = '' ) {
		$reg_status_array = array(
			EEM_Registration::status_id_approved => 'registration',
			EEM_Registration::status_id_pending_payment => 'pending_approval',
			EEM_Registration::status_id_not_approved => 'not_approved_registration',
			EEM_Registration::status_id_cancelled => 'cancelled_registration',
			EEM_Registration::status_id_declined => 'declined_registration'
		);
		return isset( $reg_status_array[ $reg_status ] ) ? $reg_status_array[ $reg_status ] : $reg_status_array;
	}



	/**
	 * Simply returns the payment message type for the given payment status.
	 *
	 * @param string  $payment_status The payment status being matched.
	 *
	 * @return string|bool The payment message type slug matching the status or false if no match.
	 */
	protected static function _get_payment_message_type( $payment_status ) {
		$matches = array(
			EEM_Payment::status_id_approved => 'payment',
			EEM_Payment::status_id_pending => 'payment_pending',
			EEM_Payment::status_id_cancelled => 'payment_cancelled',
			EEM_Payment::status_id_declined => 'payment_declined',
			EEM_Payment::status_id_failed => 'payment_failed'
			);

		return isset( $matches[$payment_status] ) ? $matches[$payment_status] : false;
	}




	/**
	 * Message triggers for a resend registration confirmation (in admin)
	 *
	 * @access public
	 * @param array $req_data This is the $_POST & $_GET data sent from EE_Admin Pages
	 * @return bool          success/fail
	 */
	public static function process_resend( $req_data ) {
		$regs_to_send = array();

		//first let's make sure we have the reg id (needed for resending!);
		if ( ! isset( $req_data['_REG_ID'] ) ) {
			EE_Error::add_error( __('Something went wrong because we\'re missing the registration ID', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		//if $req_data['_REG_ID'] is an array then let's group the registrations by transaction and reg status
		// so we can only trigger messages per group.
		if ( is_array( $req_data['_REG_ID'] ) ) {
			foreach ( $req_data['_REG_ID'] as $reg_id ) {
				$reg = EE_Registry::instance()->load_model( 'Registration' )->get_one_by_ID( $reg_id );
				if ( ! $reg instanceof EE_Registration ) {
					EE_Error::add_error( sprintf( __('Unable to retrieve a registration object for the given reg id (%s)', 'event_espresso'), $req_data['_REG_ID'] ) );
					return false;
				}
				$regs_to_send[$reg->transaction_ID()][$reg->status_ID()][] = $reg;
			}
		} else {
			//we have a single registration id, so let's see if we can get a EE_Registration from it, and if so set it up for sending.
			//get reg object from reg_id
			$reg = EE_Registry::instance()->load_model('Registration')->get_one_by_ID( $req_data['_REG_ID'] );

			//if no reg object then send error
			if ( ! $reg instanceof EE_Registration ) {
				EE_Error::add_error( sprintf( __('Unable to retrieve a registration object for the given reg id (%s)', 'event_espresso'), $req_data['_REG_ID'] ) );
				return false;
			}

			$regs_to_send[$reg->transaction_ID()][$reg->status_ID()][] = $reg;
		}

		self::_load_controller();
		$status_match_array = self::_get_reg_status_array();
		$active_mts = self::$_EEMSG->get_active_message_types();
		$success = false;
		//loop through and send!
		foreach( $regs_to_send as $status_group ) {
			foreach ( $status_group as $status_id => $registrations ) {
				if ( ! in_array( $status_match_array[ $status_id ], $active_mts ) ) {
					EE_Error::add_error(
						sprintf(
							__('Cannot resend the message for this registration because the corresponding message type (%1$s) is not active.  If you wish to send messages for this message type then please activate it by visiting the %2$sMessages Admin Page%3$s.', 'event_espresso'),
							$status_match_array[ $reg->status_ID() ],
							'<a href="' . admin_url('admin.php?page=espresso_messages&action=settings') . '">',
							'</a>'
						)
					);
					return false;
				}

				if ( self::$_EEMSG->send_message( $status_match_array[$status_id], array( $registrations, $status_id ) ) ) {
					EE_Error::overwrite_success();
					EE_Error::add_success( __('The message for this registration has been re-sent', 'event_espresso') );
					$success = true;
				} else {
					EE_Error::add_error( __('Something went wrong and the message for this registration was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				}
			}
		}

		/**
		 * Note this returns true if ANY messages were sent successfully. So if client code wants to catch messages
		 * that might not have sent successfully, it needs to check EE_Error for any errors.
		 */
		return $success;
	}





	/**
	 * Message triggers for manual payment applied by admin
	 * @param  bool     $success incoming success value
	 * @param  EE_Payment $payment EE_payment object
	 * @return bool              success/fail
	 */
	public static function process_admin_payment( $success = TRUE, EE_Payment $payment ) {
		//we need to get the transaction object
		$transaction = $payment->transaction();
		if ( $transaction instanceof EE_Transaction ) {
			$data = array( $transaction, $payment );
			$message_type = self::_get_payment_message_type( $payment->STS_ID() );

			//if payment amount is less than 0 then switch to payment_refund message type.
			$message_type = $payment->amount() < 0 ? 'payment_refund' : $message_type;

			//if payment_refund is selected, but the status is NOT accepted.  Then change message type to false so NO message notification goes out.
			$message_type = $message_type == 'payment_refund' && $payment->STS_ID() != EEM_Payment::status_id_approved ? false : $message_type;

			self::_load_controller();
			//verify this message type is present and active.  If it isn't then no message is sent.
			$active_mts = self::$_EEMSG->get_active_message_types();
			$message_type = in_array( $message_type, $active_mts ) ? $message_type : false;


			if ( $message_type ) {

				$success = self::$_EEMSG->send_message( $message_type, $data );
				if ( ! $success ) {
					EE_Error::add_error( __('Something went wrong and the payment confirmation was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				}

			} else {
				EE_Error::add_error( __('The message type for the status of this payment is not active or does not exist, so no notification was sent.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			}

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
		//make sure mtp is id and set it in the EE_Request Handler later messages setup.
		EE_Registry::instance()->REQ->set( 'GRP_ID', (int) $grp_id );

		self::_load_controller();
		self::$_EEMSG->send_message('newsletter', $contacts);
	}


	/**
	 * Callback for AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send trigger
	 *
	 * @since   4.3.0
	 *
	 * @param 	string 	$registration_message_trigger_url
	 * @param 	EE_Registration $registration
	 * @param string 	$messenger
	 * @param string 	$message_type
	 * @return 	string
	 */
	public static function registration_message_trigger_url( $registration_message_trigger_url, EE_Registration $registration, $messenger = 'html', $message_type = 'invoice' ) {
		EE_Registry::instance()->load_helper('MSG_Template');
		// whitelist $messenger
		switch ( $messenger ) {
			case 'pdf' :
				$sending_messenger = 'pdf';
				$generating_messenger = 'html';
				break;
			case 'html' :
			default :
				$sending_messenger = 'html';
				$generating_messenger = 'html';
				break;
		}
		// whitelist $message_type
		switch ( $message_type ) {
			case 'receipt' :
				$message_type = 'receipt';
				break;
			case 'invoice' :
			default :
				$message_type = 'invoice';
				break;
		}
		// verify that both the messenger AND the message type are active
		if ( EEH_MSG_Template::is_messenger_active( $sending_messenger ) && EEH_MSG_Template::is_mt_active( $message_type )) {
			//need to get the correct message template group for this (i.e. is there a custom invoice for the event this registration is registered for?)
			$template_query_params = array(
				'MTP_is_active' => TRUE,
				'MTP_messenger' => $generating_messenger,
				'MTP_message_type' => $message_type,
				'Event.EVT_ID' => $registration->event_ID()
			);
			//get the message template group.
			$msg_template_group = EEM_Message_Template_Group::instance()->get_one( array( $template_query_params ));
			//if we don't have an EE_Message_Template_Group then return
			if ( ! $msg_template_group instanceof EE_Message_Template_Group ) {
				// remove EVT_ID from query params so that global templates get picked up
				unset( $template_query_params[ 'Event.EVT_ID' ] );
				//get global template as the fallback
				$msg_template_group = EEM_Message_Template_Group::instance()->get_one( array( $template_query_params ));
			}
			//if we don't have an EE_Message_Template_Group then return
			if ( ! $msg_template_group instanceof EE_Message_Template_Group ) {
				return '';
			}
			// generate the URL
			$registration_message_trigger_url = EEH_MSG_Template::generate_url_trigger(
				$sending_messenger,
				$generating_messenger,
				'purchaser',
				$message_type,
				$registration,
				$msg_template_group->ID(),
				$registration->transaction_ID()
			);

		}
		return $registration_message_trigger_url;
	}



	/**
	 * debug
	 *
	 * @param string $class
	 * @param string $func
	 * @param string $line
	 * @param \EE_Transaction $transaction
	 * @param array $info
	 * @param bool $display_request
	 */
	protected static function log( $class = '', $func = '', $line = '', EE_Transaction $transaction, $info = array(), $display_request = false ) {
		EE_Registry::instance()->load_helper('Debug_Tools');
		if ( WP_DEBUG && false ) {
			if ( $transaction instanceof EE_Transaction ) {
				// don't serialize objects
				$info = EEH_Debug_Tools::strip_objects( $info );
				$info[ 'TXN_status' ] = $transaction->status_ID();
				$info[ 'TXN_reg_steps' ] = $transaction->reg_steps();
				if ( $transaction->ID() ) {
					$index = 'EE_Transaction: ' . $transaction->ID();
					EEH_Debug_Tools::log( $class, $func, $line, $info, $display_request, $index );
				}
			}
		}

	}

}
// End of file EED_Messages.module.php
// Location: /modules/messages/EED_Messages.module.php
