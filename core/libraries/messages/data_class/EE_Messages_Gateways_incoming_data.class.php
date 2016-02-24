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
 * EE_Messages_Gateways_incoming_data
 *
 * This is the child class for all incoming data to EE_messages objects that originate in a gateway response.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_Gateways_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_Gateways_incoming_data extends EE_Messages_incoming_data {

	/**
	 * This holds the incoming payment object
	 * @var EE_Payment
	 */
	public $payment;



	/**
	 * incoming data is expected to be a EE_Transaction object and (possibly) EE_Payment object in an array.
	 * @param array $data
	 * @throws \EE_Error
	 */
	public function __construct( $data ) {

		//test for valid params
		if ( ! ( $data[0] instanceof EE_Transaction ))
			throw new EE_Error( __('Incoming data for the Gateways data handler must have an EE_Transaction object as the value for the first array index.', 'event_espresso') );

		if ( empty( $data[1] ) || ! $data[1] instanceof  EE_Payment  )
			$pmt_obj = $this->_get_empty_payment_obj( $data[0] );

		if ( ! empty( $data[2] ) ) {
			$filtered_reg_status = $data[2];
		}

		$data = array(
			'txn_obj' => $data[0],
			'pmt_obj' => isset($pmt_obj) ? $pmt_obj : $data[1],
			'filtered_reg_status' => isset( $filtered_reg_status ) ? $filtered_reg_status : null
			);
		parent::__construct( $data );
	}





	/**
	 * Returns database safe representation of the data later used to when instantiating this object.
	 *
	 * @param array $data The incoming data to be prepped.
	 *
	 * @return array   The prepped data for db
	 */
	static public function convert_data_for_persistent_storage( $data ) {
		$prepped_data = array();

		if ( $data[0] instanceof EE_Transaction ) {
			$prepped_data['Transaction'] = $data[0]->ID();
		}

		if ( isset( $data[1] ) && $data[1] instanceof EE_Payment ) {
			$prepped_data['Payment'] = $data[1]->ID();
		}

		if ( ! empty( $data[2] ) ) {
			$prepped_data['filter'] = $data[2];
		}

		return $prepped_data;
	}






	/**
	 * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
	 * can be sent into this method and converted back into the format used for instantiating with this data handler.
	 *
	 * @param array  $data
	 *
	 * @return array
	 */
	static public function convert_data_from_persistent_storage( $data ) {
		$prepped_data = array(
			0 => isset( $data['Transaction'] ) ? EEM_Transaction::instance()->get_one_by_ID( $data['Transaction'] ) : null,
			1 => isset( $data['Payment'] ) ? EEM_Payment::instance()->get_one_by_ID( $data['Payment'] ) : null,
			2 => isset( $data['filter'] ) ? $data['filter'] : null
		);
		return $prepped_data;
	}


	/**
	 * This sets up an empty EE_Payment object for the purpose of shortcode parsing.  Note that this doesn't actually get saved to the db.
	 * @param \EE_Transaction $txn
	 * @return \EE_Payment
	 */
	private function _get_empty_payment_obj( EE_Transaction $txn ) {
		$PMT = EE_Payment::new_instance( array(
			'STS_ID' => EEM_Payment::status_id_pending,
			'PAY_timestamp' => time(),
			'PMD_ID' => $txn->payment_method_ID(),
			'PAY_gateway_response' => $txn->gateway_response_on_transaction(),
			)
		 );
		return $PMT;
	}



	/**
	 * _setup_data
	 */
	protected function _setup_data() {

		$this->reg_info = array();

		$this->txn = $this->_data['txn_obj'];
		$this->payment = $this->_data['pmt_obj'];
		$this->filtered_reg_status = $this->_data['filtered_reg_status'];
		$this->incoming_data = $this->_data;

		$session_data = $this->txn->session_data();


		//other data from the session (if possible)
		$this->user_id = isset( $session_data['user_id'] ) ? $session_data['user_id'] : '';
		$this->ip_address = isset( $session_data['ip_address'] ) ? $session_data['ip_address'] : '';
		$this->user_agent = isset( $session_data['user_agent'] ) ? $session_data['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->reg_objs = $this->txn->get_many_related('Registration');
		$this->_assemble_data();

	}


} //end class EE_Messages_Gateways_incoming_data
