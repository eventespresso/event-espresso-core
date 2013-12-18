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
		$dir_ref = apply_filters('FHEE__EE_Messages_Init__autoload_messages__dir_ref', $dir_ref );

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
		add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__done', array( $this, 'payment_and_maybe_reg' ), 10, 2 );
		add_action( 'AHEE__EE_Gateway__update_transaction_with_payment__no_payment', array( $this, 'payment_reminder_and_maybe_reg'), 10 );
		add_action( 'AHEE_process_admin_payment_reminder', array( $this, 'payment_reminder'), 10 );/**/
	}



	/**
	 * This is just for adding all the filters (if any!)
	 *
	 * @access private
	 * @return void
	 */
	private function _do_filters() {
		//EE_Admin filters
		add_filter( 'FHEE_process_resend_registration_message', array( $this, 'process_resend' ), 10, 2 );
		add_filter( 'FHEE_process_admin_payment_message', array( $this, 'process_admin_payment'), 10, 2 );/**/
	}





	public function payment_reminder_and_maybe_reg( EE_Transaction $transaction ) {
		$this->_load_controller();
		$data = array( $transaction, null );
		$this->_EEMSG->send_message( 'payment_reminder', $data );

		//maybe registration?
		$this->_EEMSG->send_message( 'registration', $data );
	}



	/**
	 * Any messages triggers for after successful gateway payments should go in here.
	 * @param  EE_Transaction object 
	 * @param  EE_Payment object
	 * @return void
	 */
	public function payment_and_maybe_reg( EE_Transaction $transaction, EE_Payment $payment ) {
		$this->_load_controller();
		$data = array( $transaction, $payment );

		//let's set up the message type depending on the status
		$message_type = 'payment' . '_' . strtolower( $payment->pretty_status() );

		//verify this message type is present and active.  If it isn't then we use the default payment message type.
		$active_mts = $this->_EEMSG->get_active_message_types();

		$message_type = in_array( $message_type, $active_mts ) ? $message_type : 'payment';
		

		$this->_EEMSG->send_message( $message_type, $data);

		//maybe registration?.
		$this->_EEMSG->send_message( 'registration', $data );
	}




	/**
	 * Message triggers for a resend registration confirmation (in admin)
	 *
	 * @access public
	 * @param  bool $success incoming success value (we return true or false on success/fail)
	 * @param arrray $req_data This is the $_POST & $_GET data sent from EE_Admin Pages
	 * @return bool          success/fail
	 */
	public function process_resend( $success, $req_data ) {
		$success = TRUE;
		//first let's make sure we have the reg id (needed for resending!);
		if ( !isset( $req_data['_REG_ID'] ) ) {
			EE_Error::add_error( __('Something went wrong because we\'re missing the registration ID', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		$this->_load_controller();

		if ( $success ) {
			$success = $this->_EEMSG->send_message( 'resend_registration', $req_data );
		}

		if ( $success ) {
			EE_Error::overwrite_success();
			EE_Error::add_success( __('The registration confirmation has been sent', 'event_espresso') );
		} else {
			EE_Error::add_error( __('Something went wrong and the registration confirmation was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
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
		$reg_success = TRUE;

		//we need to get the transaction object
		$transaction = $payment->transaction();

		$data = array( $transaction, $payment );

		$this->_load_controller();
		$success = $this->_EEMSG->send_message( 'payment', $data );
		//let's trigger a registration confirmation (note this will only actually complete if registration confirmations are delayed until complete payment)
		$reg_success = $this->_EEMSG->send_message( 'registration', $data );

		if ( $success ) {
			EE_Error::add_success( __('The payment confirmation has been sent', 'event_espresso') );
		} else {
			EE_Error::add_error( __('Something went wrong and the payment confirmation was NOT resent', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		if ( $reg_success ) {
			EE_Error::add_success( __('Complete payment has been made for the transaction so registration confirmations have been sent', 'event_espresso') );
		} else {
			EE_Error::add_success( __('Registration confirmations are delayed until the amount owing has been completely paid.', 'event_espresso') );
		}
		return $success;
	}



} //end EE_Messages_Init
