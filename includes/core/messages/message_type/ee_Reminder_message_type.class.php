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
 * EE_{type}_message_type extends EE_message_type
 *
 * Handles {type} message types
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_{type}_message_type extends EE_message_type {

	function __construct( $data, $active_messenger ) {

		//setup type details for reference
		$this->name = '{type_name}';
		$this->description = '{type_description}';

		//all types should call parent construct and then modify as needed.
		parent::__construct($data, $active_messenger);

		// load gateways BUT only if needed.  This is mostly used for payment message types remove if not needed.
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}

		$this->gateways = $EEM_Gateways;

		//these must always be called.
		$this->_init_data(); //must be declared in each message type
		$this->_assemble_messages();

		//and believe it or not, that's IT!  unless you want to modify the following methods (by declaring/overriding them here!!) that are in the EE_message_type parent class for special cases (see comments for them in parent class)
		// _assemble_messages()
		// _setup_message_object()
		// _get_templates()
		
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
		
		//what you need to setup here and return is the following:
		//$this->addressees (an assembled array of addressee objects containing data for attendees (which will be the recipients of the message). 
		//format of $this->addressees must ALWAYS contain what is expected in templates and the EE_Parse_Shortcode object.  You also must include context with each addressee. For example:
		//$this->addressee[0]->context = admin|attendee|primary_attendee 
		

		//heres a filter you should always include after processing the data):
		$this->data = apply_filters('ee_message_type_'.$this->name.'_data', $this->data, $this->name);
	}
}

// end of file:	includes/core/messages/types/EE_{type}_message.class.php