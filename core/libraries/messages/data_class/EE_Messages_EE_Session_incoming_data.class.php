<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_EE_Session_incoming_data
 *
 * This is the child class for all incoming data to EE_Messages objects that originate as an EE_Session object.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_EE_Session_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_EE_Session_incoming_data extends EE_Messages_incoming_data {


	public function __construct( EE_Session $data ) {
		parent::__construct($data);
	}


	protected function _setup_data() {

		//basically ALL we're going to get from this is the transaction object and use it to build the majority of our info.
		$session = $this->_data->get_session_data();
		$this->txn = $session['transaction'];

		if ( empty( $this->txn ) || ! $this->txn instanceof EE_Transaction ) {
			throw new EE_Error( __('Incoming data for the EE_Session data handler must have a valid EE_Transaction object in order to setup the data') );
		}

		$this->reg_info = array();
		$this->incoming_data = $session;
		$this->taxes = $this->txn->tax_total();

		$this->grand_total_price_object = '';

		//other data from the session (if possible)
		$this->user_id = isset( $session['user_id'] ) ? $session['user_id'] : '';
		$this->ip_address = isset( $session['ip_address'] ) ? $session['ip_address'] : '';
		$this->user_agent = isset( $session['user_agent'] ) ? $session['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->payment = $this->txn->get_first_related('Payment');
		$this->payment = empty( $this->payment ) ? EE_Payment::new_instance( array(
			'STS_ID' => EEM_Payment::status_id_pending,
			'PAY_timestamp' => (int) current_time('timestamp'),
			'PAY_gateway' => $this->txn->selected_gateway(),
			'PAY_gateway_response' => $this->txn->gateway_response_on_transaction(),
			)
		 ) : $this->payment; //if there is no payments associated with the transaction then we just create a default payment object for potential parsing.

		$this->billing = $this->payment->details();

		EE_Registry::instance()->load_helper('Template');
		$this->billing['total_due'] = isset( $this->billing['total'] ) ? EEH_Template::format_currency( $this->billing['total'] ) : '';

		//let's get all the registrations associated with this txn
		$this->reg_objs = $this->txn->registrations();

		$this->_assemble_data();
	}

} //end EE_Messages_EE_Session_incoming_data class