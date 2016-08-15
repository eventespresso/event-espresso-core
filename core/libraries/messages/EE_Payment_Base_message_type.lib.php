<?php
/**
 * This file contains the parent payment message type class
 *
 * @package      Event Espresso
 * @subpackage messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This class contains common methods/properties shared among all payment message types.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.5.0
 *
 * @abstract
 * @author          Darren Ethier
 */
abstract class EE_Payment_Base_message_type extends EE_message_type {



	/**
	 * @see parent::get_priority() for documentation.
	 * @return int
	 */
	public function get_priority() {
		return EEM_Message::priority_high;
	}




	/**
	 * see abstract declaration in parent class for details.
	 */
	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => true
			);
	}



	protected function _set_data_handler() {
		$this->_data_handler = 'Gateways';
	}




	protected function _get_data_for_context( $context, EE_Registration $registration, $id ) {

		//use the registration to get the transaction.
		$transaction = $registration->transaction();

		//bail early if no transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			throw new EE_Error( __('The given registration does not have an associated transaction. Something is wrong.', 'event_espresso' ) );
		}

		$payment = ! empty( $id ) ? EEM_Payment::instance()->get_one( array( array( 'PAY_ID' => $id, 'TXN_ID' => $transaction->ID() ) ) ) : 0;

		return array( $transaction, $payment );
	}



	protected function _get_admin_content_events_edit_for_messenger( EE_messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}

	/**
	 * This message type doesn't need any settings so we are just setting to empty array.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}


}
