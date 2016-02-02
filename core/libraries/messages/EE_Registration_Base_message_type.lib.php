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


	/**
	 * @see parent::get_priority() for documentation.
	 * @return int
	 */
	public function get_priority() {
		return EEM_Message::priority_medium;
	}



	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => TRUE
			);
	}


	protected function _get_admin_content_events_edit_for_messenger( EE_messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}




	protected function _set_data_handler() {
		if ( is_array( $this->_data ) ) {
			$data_type = reset( $this->_data );

			if ( is_array( $data_type ) ) {
				//grab the first item and see if its a registration.
				$maybe_reg = isset( $data_type[0] ) && is_array( $data_type[0] ) ? reset( $data_type[0] ) : reset( $data_type );
				if ( $maybe_reg instanceof EE_Registration ) {
					//is $data_type itself just an array of registrations?
					if ( isset( $data_type[1] ) && $data_type[1] instanceof EE_Registration  ) {
						$regs = $data_type;
					} else {
						$regs = is_array( $data_type[0] ) ? $data_type[0] : array( $maybe_reg );
					}

					foreach ( $regs as $reg ) {
						if ( $reg instanceof EE_Registration ) {
							$this->_regs_for_sending[] = $reg->ID();
						}
					}
					$this->_data = isset( $this->_data[1] ) ? array( $maybe_reg->transaction(), null, $this->_data[1] ) : array( $maybe_reg->transaction() );
					$this->_data_handler = 'Gateways';
				} else {
					$this->_data_handler = 'Gateways';
				}
			} else {
				$this->_data_handler = $data_type instanceof EE_Registration ? 'REG' : 'Gateways';
			}
		} else {
			$this->_data_handler = $this->_data instanceof EE_Registration ? 'REG' : 'Gateways';
		}

		$this->_single_message = $this->_data_handler == 'REG' ? true : false;
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
