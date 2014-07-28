<?php
/**
 * This file contains the parent registration message type class
 *
 * @package      Event Espresso
 * @subpackage messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This class contains common methods/properties shared among all registration message types.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.5.0
 *
 * @abstract
 * @author          Darren Ethier
 */
abstract class EE_Registration_Base_message_type extends EE_message_type {



	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => TRUE
			);
	}


	protected function _get_admin_content_events_edit_for_messenger( EE_Messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}




	protected function _set_data_handler() {
		$this->_data_handler = $this->_data instanceof EE_Registration ? 'REG' : 'Gateways';
		$this->_single_message = $this->_data instanceof EE_Registration ? TRUE : FALSE;
	}



	protected function _get_data_for_context( $context, EE_Registration $registration, $id ) {
		if ( $context  == 'admin' ) {
			//use the registration to get the transaction.
			$transaction = $registration->transaction();

			//bail early if no transaction
			if ( ! $transaction instanceof EE_Transaction ) {
				throw new EE_Error( __('The given registration does not have an associated transaction. Something is wrong.', 'event_espresso' ) );
			}

			$payment = !empty( $id ) ? EEM_Payment::instance()->get_one( array( array( 'PAY_ID' => $id, 'TXN_ID' => $transaction->ID() ) ) ) : 0;
			return array( $transaction, $payment );
		} else {
			return $registration;
		}
	}



	protected function _get_id_for_msg_url( $context, EE_Registration $registration ) {
		if ( $context == 'admin' ) {
			//there should be a transaction and payment object in the incoming data.
			if ( $this->_data instanceof EE_Messages_incoming_data && ! $this->_data instanceof EE_Messages_Preview_incoming_data ) {
				$payment = $this->_data->payment;

				if ( $payment instanceof EE_Payment ) {
					return $payment->ID();
				}
			}
		}
		return 0;
	}



	/**
	 * Setup admin settings for this message type.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}





	/**
	 * returns an array of addressee objects for event_admins
	 *
	 * @access protected
	 * @return array array of EE_Messages_Addressee objects
	 */
	protected function _admin_addressees() {
		if ( $this->_single_message )
			return array();
		return parent::_admin_addressees();
	}



	protected function _primary_attendee_addressees() {
		if ( $this->_single_message )
			return array();

		return parent::_primary_attendee_addressees();
	}


}
