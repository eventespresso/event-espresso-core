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
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Venue_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Venue_Shortcodes lists all shortcodes related to venue specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Venue_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Venue_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Venue Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to venue related data', 'event_espresso');
		$this->_shortcodes = array(
			'[VENUE_TITLE]' => __('The title for the event venue', 'event_espresso'),
			'[VENUE_URL]' => __('A url to a webpage for the venue', 'event_espresso'),
			'[VENUE_IMAGE]' => __('An image representing the event venue', 'event_espresso'),
			'[VENUE_PHONE]' => __('The phone number for the venue', 'event_espresso'),
			'[VENUE_ADDRESS]' => __('The address for the venue', 'event_espresso'),
			'[VENUE_ADDRESS2]' => __('Address 2 for the venue', 'event_espresso'),
			'[VENUE_CITY]' => __('The city the venue is in', 'event_espresso'),
			'[VENUE_STATE]' => __('The state the venue is located in', 'event_espresso'),
			'[VENUE_COUNTRY]' => __('The country the venue is located in', 'event_espresso'),
			'[VENUE_ZIP]' => __('The zip code for the venue address', 'event_espresso'),
			'[GOOGLE_MAP_LINK]' => __('Link to a google map for the event', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			
			case '[VENUE_TITLE]' :
				return isset($this->_data['meta']['venue_title']) ? $this->_data['meta']['venue_title'] : '';
				break;

			case '[VENUE_URL]' :
				return isset($this->_data['meta']['venue_url']) ? $this->_data['meta']['venue_url'] : '';
				break;

			case '[VENUE_IMAGE]' :
				return isset($this->_data['meta']['venue_image']) ? $this->_data['meta']['venue_image'] : '';
				break;

			case '[VENUE_PHONE]' :
				return isset($this->_data['meta']['venue_phone']) ? $this->_data['meta']['venue_phone'] : '';
				break;

			case '[VENUE_ADDRESS]' :
				return isset($this->_data['meta']['venue_address']) ? $this->_data['meta']['venue_address'] : '';
				break;

			case '[VENUE_ADDRESS2]' :
				return isset($this->_data['meta']['venue_address2']) ? $this->_data['meta']['venue_address2'] : '';
				break;

			case '[VENUE_CITY]' :
				return isset($this->_data['meta']['venue_city']) ? $this->_data['meta']['venue_city'] : '';
				break;

			case '[VENUE_COUNTRY]' :
				return isset($this->_data['meta']['venue_country']) ? $this->_data['meta']['venue_country'] : '';
				break;

			case '[VENUE_ZIP]' :
				return isset($this->_data['meta']['venue_zip']) ? $this->_data['meta']['venue_zip'] : '';
				break;

			case '[GOOGLE_MAP_LINK]' :
				return isset($this->_data['meta']['google_map_link']) ? $this->_data['meta']['google_map_link'] : '';
				break;
				
		}
	}


} //end EE_Venue_Shortcodes class