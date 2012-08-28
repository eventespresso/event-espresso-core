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
 * EE_Admin_Payment_message_type extends EE_message_type
 *
 * Handles Admin Payment message types (triggered when a administrator manually updates a payment)
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Admin_Payment_message_type extends EE_message_type {

	function __construct() {

		//setup type details for reference
		$this->name = 'admin_payment';
		$this->description = 'Handles setting up message objects for when the action is an admin payment';

		//all types should call parent construct and then modify as needed.
		parent::__construct();
		
	}

	/**
	 * The main purpose of this function is to setup the various parameters within the message_type.  $this->addressees, $this->templates, $this->count, and any extra stuff to the data object that can come from the messenger template options.
	 * @return void
	 * @access protected
	 */
	protected function _init_data() {
		//here's an example (modify if needed):
		//assuming the incoming data is the $EE_Session object
		$session_stuff = is_object($this->data) && method_exists($this->data, 'get_session_data') ? $this->data->get_session_data() : null;
		$this->data = $session_stuff;
		
		//don't forget to return an error if there is no data
		if ( empty( $this->data ) ) {
			return new WP_Error( __('no_data_for_payment_type', 'event_espresso'), __('{type} message type expected data and none given', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		//notes to self for assembling the data:
		//1. EE_Payment.class.php gives shows us all the data saved when a payment is applied (and in what format it is in (you can also see /core/admin/transactions/ and /core/admin/registrations/ for other classes pulling in data.))
		//2. basically all the apply payment/refund does is setup pay data.  I will have to pull from the database the other details such as event, attendee etc via joining on pay ID with transaction ID with registration table that contains the attendee ids.
		//3. The registration table also has a is_primary column that will help me identify who the primary_attendee is (in case that context is defined).
		
		//what you need to setup here and return is the following:
		//$this->addressees (an assembled array of addressee objects containing data for attendees (which will be the recipients of the message). 
		//format of $this->addressees must ALWAYS contain what is expected in templates and the EE_Parse_Shortcode object.  You also must include context with each addressee. For example:
		//$this->addressee[0]->context = admin|attendee|primary_attendee 
		

		//heres a filter you should always include after processing the data):
		$this->data = apply_filters('ee_message_type_'.$this->name.'_data', $this->data, $this->name);
	}
}

// end of file:	includes/core/messages/types/EE_Admin_Payment_message.class.php