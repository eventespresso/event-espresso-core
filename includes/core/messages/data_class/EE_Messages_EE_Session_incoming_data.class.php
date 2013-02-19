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
 * This is the parent class for all incoming data to EE_Messages objects.  We create different data handlers for different incoming data depending on the message types set requirements.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_EE_Session_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_EE_Session_incoming_data {


	public function __construct( EE_Session $data ) {
		parent::__construct($data);
	}


	protected function _setup_data() {
		$session_stuff = $this->_data->get_session_data();
		$this->_data = $session_stuff;

		$this->_data->billing_info = $this->_data['billing_info'];
		$this->_data->reg_info = $this->_data['cart']['REG'];


		//first let's loop through the events and setup a referenced event_data array (indexed by event_id?)
		if ( isset( $this->_data->reg_info['items'] ) && is_array($this->_data->reg_info['items'] ) ) {
			foreach ( $this->_data->reg_info['items'] as $line_item_id => $event ) {
				$this->_data->events[$line_item_id]['ID'] = $event['id'];
				$this->_data->events[$line_item_id]['line_ref'] = $line_item_id;
				$this->_data->events[$line_item_id]['name'] = $event['name'];
				$this->_data->events[$line_item_id]['date'] = $event['options']['date'];
				$this->_data->events[$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
				$this->_data->events[$line_item_id]['daytime_id'] = $event['options']['dtt_id'];
				$this->_data->events[$line_item_id]['price'] = $event['options']['price'];
				$this->_data->events[$line_item_id]['price_desc'] = $event['options']['price_desc'];
				$this->_data->events[$line_item_id]['pre_approval'] = $event['options']['pre_approval'];
				$this->_data->events[$line_item_id]['price_id'] = $event['options']['price_id'];
				$this->_data->events[$line_item_id]['meta'] = array_combine($event['meta_keys'], $event['meta_values']);
				$this->_data->events[$line_item_id]['line_total'] = $event['line_total'];
				foreach ($event['attendees'] as $att_nmbr => $attendee) {
					$a_index = $attendee['fname'] . '_' . $attendee['lname'];
					//use email to detect if the created index is DIFFERENT from an existing index.  If emails don't match then chances are this is a different person so we'll just create a new index.
					$a_index = ( isset($this->_data->attendees[$a_index] ) && (!empty($this->_data->attendees[$a_index]['email']) || !empty($attendee['email'] ) ) && $this->_data->attendees[$a_index]['email'] != $attendee['email'] ) ? $a_index . '_' . $att_nmbr : $a_index;
					if ( !isset($this->_data->attendees[$a_index] ) ) {
						$this->_data->attendees[$a_index]['line_ref'] = array($line_item_id);
						foreach ( $attendee as $key => $value ) {
							$this->_data->attendees[$a_index][$key] = $value;
						}
						$this->_data->attendee[$a_index]['context'] = 'attendee'; //default attendee context.
					} else {
						array_push($this->_data->attendees[$a_index]['line_ref'], $line_item_id);
					}
				}
			}
		}

		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$gateways = EEM_Gateways::instance();
		}


		if ($this->_data->billing_info == 'no payment required') {
			$this->_data->billing = null;
		} else {
			// get billing info fields
			$this->_data->billing = $gateways->set_billing_info_for_confirmation( $this->_data->billing_info );

			$total = $this->_data['_cart_grand_total_amount'];
			// add taxes
			if (isset($this->_data['tax_totals'])) {
				foreach ($this->_data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}

			$this->_data->taxes = $this->_data['taxes'];
			$this->_data->txn = $this->_data['txn_results'];

			$this->_data->billing['total_due'] = $org_options['currency_symbol'] . number_format($total, 2);
		}
	}

} //end EE_Messages_EE_Session_incoming_data class