<?php
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Recipient_List_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Recipient_List_Shortcodes lists all list type shortcodes related to recipient specific info.  Meaning, that when this is parsed, we're parsing for WHO is receiving the message.  This only parses for Registrants and Primary Registrants as recipients.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Recipient_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Recipient_List_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Recipient Details Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to registrant and primary registrant recipients data', 'event_espresso');
		$this->_shortcodes = array(
			);
	}



	protected function _parser( $shortcode ) {
		return '';
	}

	
} // end EE_Recipient_List_Shortcodes class