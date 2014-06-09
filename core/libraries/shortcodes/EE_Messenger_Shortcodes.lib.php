<?php
/**
 * This file contains the shortcode parser for messenger shortcodes.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage shortcodes library
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EE_Messenger_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Messenger_Shortcodes contains shortcode parsers for shortcodes that are messenger specific.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @since 4.5.0
 *
 * @package		Event Espresso
 * @subpackage	core/libraries/shortcodes/EE_Messenger_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messenger_Shortcodes extends EE_Shortcodes {

	protected function _init_props() {
		$this->label = __('Messenger Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes that are messenger specific.', 'event_espresso');
		$this->_shortcodes = array(
			'[DISPLAY_HTML_URL]' => __('This will return a link to view the template in a browser.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[DISPLAY_HTML_URL]' :
				return $this->_get_display_url();
				break;
		}
		return '';
	}



	/**
	 * This method takes the incoming data and figures out from it what the message type is and
	 * evt_id/grp_id and uses that to generate the url for displaying the template in a browser.
	 *
	 * @since 4.5.0
	 *
	 * @return string The generated url for displaying the link.
	 */
	private function _get_display_url() {
		//@todo need the url generator to be completed
	}


} // end EE_Recipient_List_Shortcodes class
