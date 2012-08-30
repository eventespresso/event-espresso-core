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
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Payment_message_type extends EE_message_type
 *
 * Handles Onsite Payment message types
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Payment_message_type extends EE_message_type {

	function __construct() {

		//setup type details for reference
		$this->name = 'payment';
		$this->description = 'Sets up payment messages when triggered by a payment'; //is it possible that these coudld be triggered by ipn or by manual payment? 

		parent::__construct();

		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}

		$this->gateways = $EEM_Gateways;	
	}

	protected function _set_default_field_content() {
		$this->_default_field_content = array(
			'subject' => sprintf(__('Payment processed for %s', 'event_espresso'), '[EVENT_NAME]'),
			'content' => $this->_default_template_field_content(),
		);
		$this->default_field_content = apply_filters('filter_hook_espresso_default_field_content_'.$this->name, $this->default_field_content);
	}

	protected function _default_template_field_content() {
		$content = array();
		$content['main'] = "<h3>Payment Details:</h3>\n";
		$content['main'] .= "<p>For Event: [EVENT_NAME]</p>\n";
		$content['main'] .= "<p>Payment status: [PAYMENT_STATUS]</p>\n";
		$content['main'] .= "<p>Payment gateway: [PAYMENT_GATEWAY]</p>\n";
		$content['main'] .= "<p>Total Cost: [TOTAL_COST]</p>\n";
		$content['main'] .= "<p>Event Price: [EVENT_PRICE]</p>\n";
		$content['main'] .= "<p>[ATTENDEE_LIST_UNORDERED]</p>\n";
		$content['main'] .= "\n<br /><p>Thanks for your purchase,</p>\n";
		$content['main'] .= "<p>[COMPANY]</p>\n";
		$content['main'] .= "<p>[CO_ADD1]</p>\n";
		$content['main'] .= "<p>[CO_ADD2]</p>\n";
		$content['main'] .= "<p>[CO_STATE], [CO_ZIP]\n";
		
		//ATTENDEE_LIST field
		$content['attendee_list'] = "[FIRST_NAME] [LAST_NAME]";

		return $content;
	}

	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 * 
	 * @access  protected
	 * @return  void
	 */
	protected function _set_contexts() {
		$this->_contexts = array(
			'admin',
			'primary_attendee',
			'attendee'
		);

		$this->_contexts = apply_filters('filter_hook_espresso_set_contexts_'. $this->name, $this->_contexts);
		$this->_contexts = apply_filters('filter_hook_espresso_set_contexts_all', $this->_contexts);
	}

	/**
	 * The main purpose of this function is to setup the various parameters within the message_type.  $this->addressees, $this->templates, $this->count, and any extra stuff to the data object that can come from the messenger template options.
	 * @return void
	 * @access protected
	 */
	protected function _init_data() {
		//assuming the incoming data is the $EE_Session object
		if ( is_a($this->data, 'EE_Session') ) {
			return new WP_Error( __('wrong data type', 'event_espresso'), __('Payment message type expects data from the EE_Session object. This ain\'t it!', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		$session_stuff = $this->data->get_session_data();
		$this->data = $session_stuff;
		
		if ( is_array($this->data) && empty($this->data) ) {
			return new WP_Error( __('no_data_for_payment_type', 'event_espresso'), __('Payment message type expected data and none given', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		$this->_process_data(); //process the data sent


		//todo: data will come from the gateways.
		//... do stuff
		//you need to at least set the following properties:
		//$this->addressees (who ever is going to receive the message)
		//$this->count (which can just be a simple count of the $this->addressees)
	}

	/**
	 * processes the data object so we get 
	 * @return void
	 */
	protected function _process_data() {
		global $org_options, $espresso_wp_user;

		$this->data->billing_info = $this->data['billing_info'];
		$this->data->reg_info = $this->data['cart']['REG']; 
		//todo we need to assemble an array of attendee data objects to prepare for message template shortcode processing.
		//
		//first let's loop through the events and setup a referenced event_data array (indexed by event_id?)
		
		if ( isset( $this->data->reg_info['items'] ) && is_array($this->data->reg_info['items'] ) ) {
			foreach ( $this->data->reg_info['items'] as $line_item_id => $event ) {
				$this->data->events[$line_item_id]['ID'] = $event['id'];
				$this->data->events[$line_item_id]['line_ref'] = $line_item_id;
				$this->data->events[$line_item_id]['name'] = $event['name'];
				$this->data->events[$line_item_id]['date'] = $event['options']['date'];
				$this->data->events[$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
				$this->data->events[$line_item_id]['daytime_id'] = $event['options']['dtt_id'];
				$this->data->events[$line_item_id]['price'] = $event['options']['price'];
				$this->data->events[$line_item_id]['price_desc'] = $event['options']['price_desc'];
				$this->data->events[$line_item_id]['pre_approval'] = $event['options']['pre_approval'];
				$this->data->events[$line_item_id]['price_id'] = $event['options']['price_id'];
				$this->data->events[$line_item_id]['meta'] = array_combine($event['meta_keys'], $event['meta_values']);
				$this->data->events[$line_item_id]['line_total'] = $event['line_total'];
				foreach ($event['attendees'] as $att_nmbr => $attendee) {
					$a_index = $attendee['fname'] . '_' . $attendee['lname'];
					//use email to detect if the created index is DIFFERENT from an existing index.  If emails don't match then chances are this is a different person so we'll just create a new index.
					$a_index = ( isset($this->data->attendees[$a_index] ) && (!empty($this->data->attendees[$a_index]['email']) || !empty($attendee['email'] ) ) && $this->data->attendees[$a_index]['email'] != $attendee['email'] ) ? $a_index . '_' . $att_nmbr : $a_index;
					if ( !isset($this->data->attendees[$a_index] ) ) {
						$this->data->attendees[$a_index]['line_ref'] = array($line_item_id);
						foreach ( $attendee as $key => $value ) {
							$this->data->attendees[$a_index][$key] = $value;
						}
						$this->data->attendee[$a_index]['context'] = 'attendee'; //default attendee context.
					} else {
						array_push($this->data->attendees[$a_index]['line_ref'], $line_item_id);
					}
				}
			}
		}

		if ($this->data->billing_info == 'no payment required') {
			$this->data->billing = null;
		} else {
			// get billing info fields
			$this->data->billing = $this->gateways->set_billing_info_for_confirmation( $this->data->billing_info );

			$total = $this->data['_cart_grand_total_amount'];
			// add taxes
			if (isset($this->data['tax_totals'])) {
				foreach ($this->data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}

			$this->data->taxes = $this->data['taxes'];
			$this->data->txn = $this->data['txn_results'];

			$this->data->billing['total_due'] = $org_options['currency_symbol'] . number_format($total, 2);
		}

		foreach ( $this->_contexts as $context ) {
			switch ( $context ) {
				case 'admin' :
				$user_info = get_userdata($espresso_wp_user);
				$this->data->attendees['admin']['fname'] = $user_info->first_name;
				$this->data->attendees['admin']['lname'] = $user_info->last_name;
				$this->data->attendees['admin']['email'] = $user_info->user_email;
				$this->data->attendees['admin']['context'] = 'admin';
				break;

				case 'primary_attendee' :
				case 'attendee' :
				if ( isset($this->data['primary_attendee']) && !empty($this->data['primary_attendee']['line_item_id'] ) ) {
					foreach ( $this->data->attendees as $a_index => $a_data ) {
						//todo: this won't work because 'line_item_id' will be found within the line_ref array for $a_data.  So we have to modify.
						if ( in_array($this->data['primary_attendee']['line_item_id'], $a_data['line_ref'] ) ) {
							foreach ( $this->data->attendees[$a_index] as $key => $value ) {
								$this->data->attendees['primary_attendee'][$key] = $value;
							}
							$this->data->attendees['primary_attendee']['context'] = 'primary_attendee';
							unset($this->data->attendees[$a_index]);
						}
					}
				}

				break;
			}
		}

		$this->data = apply_filters('filter_hook_espresso_message_type_'.$this->name.'_data', $this->data, $this->name);

		foreach ( $this->data->attendees as $attendee ) {
			$this->addressees[] = $this->_set_addressees($attendee);
		}
	}

	/**
	 * sets up the addressee object that gets used for template setups via shortcode processing. 
	 * @return void
	 */
	protected function _set_addressees($attendee) {
	
		$this->addressee = new stdClass();
		$this->addressee->events = array();
		
		foreach ( $this->data->attendees as $key => $value ) {
			$this->addressee->$key = $value;
			if ( $key == 'line_ref' ) {
				foreach ( $value as $line_ref )
					$this->addressee->events[] = $this->data->events[$line_ref];
			}
			$this->addressee->billing = $this->data->billing;
			$this->addressee->taxes = $this->data->taxes;
			$this->addressee->txn = $this->data->txn;
		}
	}
}

// end of file:	includes/core/messages/types/EE_Onsite Payment_message.class.php