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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_messages_init class
 *
 * This class is loaded on every page load and its sole purpose is to add the various hooks/filters required for EE_messages system so loading impact is minimal.  Whenever a new message type is added, the corresponding hook/filter that triggers that messenger can be either added in here (ideal method) or the EE_messages controller would have to be called directly wherever a trigger should be.  The ideal method means that if there is ever a place where a message notification needs to be triggered, a do_action() should be added in that location and the corresponding add_action() added in here.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_messages_init extends EE_Base {

	/**
	 * This holds the EE_messages controller object when instantiated
	 * @var object
	 */
	private $_EEMSG = NULL;


	public function __construct() {
		$this->_do_actions();
		$this->_do_filters();
	}


	/**
	 * The purpose of this method is to load the EE_MSG controller and assign it to the $_EEMSG property.  We only need to load it on demand.
	 *
	 * @access private
	 * @return void 
	 */
	private function _load_controller() {
		$this->_EEMSG = new EE_messages();
	}



	/**
	 * This is just for adding all the actions.
	 *
	 * @access private
	 * @return void
	 */
	private function _do_actions() {
		add_action( 'action_hook_espresso__EE_Gateway__update_transaction_with_payment__done', array( $this, 'payment' ), 10, 2 );
		add_action( 'action_hook_espresso__EE_Single_Page_Checkout__process_registration_step_3__before_gateway', array( $this, 'registration' ), 10 );
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
		$this->_EEMSG->send_message( 'payment', $data);
	}



	/**
	 * Message triggers for after successful frontend registration go here
	 * @param  EE_Single_Page_Checkout object  $SPCO 	
	 * @return void
	 */
	public function registration( EE_Single_Page_Checkout $SPCO ) {
		global $EE_Session;
		$this->_load_controller();
		//notice... we don't actually send the SPCO here, might need to change at some point but really everything we need is in the session at this point.
		$this->_EEMSG->send_message( 'registration', $EE_Session );
	}




	/**
	 * This is just for adding all the filters (if any!)
	 *
	 * @access private
	 * @return void
	 */
	private function _do_filters() {}

} //end EE_messages_init
