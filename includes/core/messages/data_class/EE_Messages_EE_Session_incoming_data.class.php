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
 * @ version		3.2
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

	public $grand_total_price_object;


	public function __construct( EE_Session $data ) {
		parent::__construct($data);
	}


	protected function _setup_data() {
		global $org_options;
		$session_stuff = $this->_data->get_session_data();
		$this->_data = $session_stuff;


		$this->reg_info = isset( $this->_data['cart']['REG']) ? $this->_data['cart']['REG'] : array();
		$this->reg_objs = isset( $this->_data['registration'] ) ? $this->_data['registration'] : array();
		$this->grand_total_price_object = isset( $this->_data['grand_total_price_object'] ) ? $this->_data['grand_total_price_object'] : '';

		//browser id stuff
		$browser_keys = array(
			'user_id',
			'ip_address',
			'user_agent',
			'init_access',
			'last_access'
		);

		//primary attendee data
		$this->_add_primary_attendee_data();


		foreach ( $browser_keys as $index ) {
			$this->$index = isset($this->_data[$index]) ? $this->_data[$index] : '';
		}

		//transaction stuff
		if ( isset( $this->_data['transaction'] ) ) {
			$this->txn = $this->_data['transaction'];
			require_once EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php';
			$status_array = EEM_Transaction::instance()->status_array();
			$this->txn_status = $status_array[$this->txn->status_ID()];
		}

		//billing stuff
		if ( isset( $this->_data['billing_info'] ) ) {
			$this->billing_info = $this->_data['billing_info'];
			// load gateways
			require_once EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php';
			$gateways = EEM_Gateways::instance();

			if ($this->billing_info == 'no payment required') {
			$this->billing = null;
			} else {
				// get billing info fields
				$this->billing = $gateways->set_billing_info_for_confirmation( $this->billing_info );

				$total = $this->_data['_cart_grand_total_amount'];
				// add taxes
				if (isset($this->_data['tax_totals'])) {
					foreach ($this->_data['tax_totals'] as $taxes) {
						$total = $total + $taxes;
					}
				}

				$this->taxes = $this->_data['taxes'];

				$this->billing['total_due'] = $org_options['currency_symbol'] . number_format($total, 2);
			}
		}


		//events and attendees
		//let's loop through the events and setup a referenced event_data array (indexed by event_id?)
		if ( isset( $this->reg_info['items'] ) && is_array($this->reg_info['items'] ) ) {
			foreach ( $this->reg_info['items'] as $line_item_id => $event ) {
				$this->events[$line_item_id]['ID'] = $event['id'];
				$this->events[$line_item_id]['line_ref'] = $line_item_id;
				$this->events[$line_item_id]['name'] = $event['name'];
				$this->events[$line_item_id]['daytime_id'] = $event['options']['dtt_id'];
				$this->events[$line_item_id]['price'] = $event['price'];
				$this->events[$line_item_id]['price_obj'] = unserialize( gzinflate( base64_decode( $event['price_obj'] )));
				$this->events[$line_item_id]['price_desc'] = $event['options']['price_desc'];
				$this->events[$line_item_id]['pre_approval'] = $event['options']['pre_approval'];
				$this->events[$line_item_id]['price_id'] = $event['options']['price_id'];
				$meta = unserialize( base64_decode( $event['options']['event_meta'] ) );
				$this->events[$line_item_id]['meta'] = $meta;
				$this->events[$line_item_id]['line_total'] = $event['line_total'];

				$this->events[$line_item_id]['total_attendees'] = count( $event['attendees'] );

				foreach ($event['attendees'] as $att_nmbr => $attendee) {

					$this->attendees[$att_nmbr]['line_ref'][] = $line_item_id; //so we can retrieve events later this attendee registered for!
					$this->attendees[$att_nmbr]['att_obj'] = unserialize( base64_decode( $attendee['att_obj'] ) );
					$this->attendees[$att_nmbr]['reg_objs'][$event['id']] = $this->reg_objs[$line_item_id];
				}
			}
		}
	}



	/**
	 * This just gets the _primary_attendee_data from the data array. 
	 *
	 * @access protected
	 * @return array array of primary attendee data
	 */
	protected function _add_primary_attendee_data() {

		foreach ( $this->_data['primary_attendee'] as $key => $val ) {
			if ( $key == 'email') {
				$this->primary_attendee_data['primary_attendee_email'] = $val;
				continue;
			}

			if ( $key == 'registration_id' ) {
				$this->primary_attendee_data['primary_registration_id'] = $val;
				continue;
			}

			$this->primary_attendee_data[$key] = $val;
		}
	}

} //end EE_Messages_EE_Session_incoming_data class