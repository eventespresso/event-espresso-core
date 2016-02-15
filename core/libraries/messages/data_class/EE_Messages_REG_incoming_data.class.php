<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * EE_Messages_REG_incoming_data
 *
 * This prepares dummy data for all messages previews run in the back end.  The Preview Data is going to use a given event id for the data.  If that event is NOT provided then we'll retrieve the first three published events from the users database as a sample (or whatever is available if there aren't three).
 *
 * To assemble the preview data, I basically used the EE_Single_Page_Checkout class to server as a guide for what data objects are setup etc.  Any place there is input expected from registrants we just setup some dummy inputs.  Remember none of this is actually saved to the database.  It is all one time use for any generated previews.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_REG_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_REG_incoming_data extends EE_Messages_incoming_data {



	/**
	 * For the constructor of this special preview class.
	 *
	 * The data is expected to be an array that came from the $_POST and $_GET and should have at least one property from the list looked for.
	 *
	 * @param EE_Registration|array $data
	 * @throws \EE_Error
	 */
	public function __construct( $data ) {
		$filtered_reg_status = null;

		if ( ! is_array( $data ) && $data instanceof EE_Registration ) {
			$this->reg_obj = $data;
		} else {
			$this->reg_obj = is_array( $data ) && isset( $data[0] ) && $data[0] instanceof EE_Registration ? $data[0] : null;
			$filtered_reg_status = is_array( $data ) && ! empty( $data[1] ) ? $data[1] : null;
		}

		if ( ! $this->reg_obj instanceof EE_Registration ) {
			throw new EE_Error(
				sprintf(
					__( '%1$s requires the incoming data argument to be an instance of %2$s or an array where the first value is an instance of %2$s', 'event_espresso'),
					'EE_Messages_REG_incoming_data',
					'EE_Registration'
				)
			);
		}

		$data = array(
			'reg_obj' => $this->reg_obj,
			'filtered_reg_status' => $filtered_reg_status
			);

		parent::__construct($data);
	}

	/**
	 * Returns database safe representation of the data later used to when instantiating this object.
	 *
	 * @param mixed $data The incoming data to be prepped.
	 *
	 * @return array   The prepped data for db
	 */
	static public function convert_data_for_persistent_storage( $data ) {
		$prepped_data = array();
		if ( ! is_array( $data ) && $data instanceof EE_Registration ) {
			$prepped_data['Registration'] = $data->ID();
			return $prepped_data;
		} elseif ( ! is_array( $data ) ) {
			return array();
		} else {
			if ( $data[0] instanceof EE_Registration ) {
				$prepped_data['Registration'] = $data[0];
			}
			if ( ! empty( $data[1] ) ) {
				$prepped_data['filter'] = $data[1];
			}
		}

		return $prepped_data;
	}

	/**
	 * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
	 * can be sent into this method and converted back into the format used for instantiating with this data handler.
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	static public function convert_data_from_persistent_storage( $data ) {
		$registration = null;
		//$data['Registration'] could be either an ID (back compat) or a registration object (prepped using old system).
		if ( isset( $data[ 'Registration' ] ) ) {
			$registration = $data[ 'Registration' ] instanceof EE_Registration
				? $data[ 'Registration' ]
				: EEM_Registration::instance()->get_one_by_ID( $data[ 'Registration' ] );
		}
		$prepped_data = array(
			0 => $registration,
			1 => isset( $data['filter'] ) ? $data['filter'] : null
		);
		return $prepped_data;
	}


	/**
	 * This will just setup the _events property in the expected format.
	 * @return void
	 */
	protected function _setup_data() {

		//now let's loop and set up the _events property.  At the same time we'll set up attendee properties.
		$this->filtered_reg_status = $this->_data['filtered_reg_status'];
		//get txn
		$this->txn = $this->reg_obj->transaction();
		//possible session stuff?
		$session = $this->txn->session_data();
		$session_data =  $session instanceof EE_Session ? $session->get_session_data() : array();

		//other data from the session (if possible)
		$this->user_id = isset( $session_data['user_id'] ) ? $session_data['user_id'] : '';
		$this->ip_address = isset( $session_data['ip_address'] ) ? $session_data['ip_address'] : '';
		$this->user_agent = isset( $session_data['user_agent'] ) ? $session_data['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->payment = $this->txn->get_first_related('Payment');
		// if there is no payments associated with the transaction
		// then we just create a default payment object for potential parsing.
		$this->payment = empty( $this->payment )
			? EE_Payment::new_instance(
				array(
					'STS_ID'               => EEM_Payment::status_id_pending,
					'PAY_timestamp'        => time(),
					'PMD_ID'               => $this->txn->payment_method_ID(),
					'PAY_gateway_response' => $this->txn->gateway_response_on_transaction(),
				)
			)
			: $this->payment;


		//get reg_objs for txn
		$this->reg_objs = $this->txn->registrations();

		//now we can set things up like we do for other handlers

		$this->_assemble_data();

	}

} //end EE_Messages_REG_incoming_data class
