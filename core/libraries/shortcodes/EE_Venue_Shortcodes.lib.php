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
 * @ version		 	4.0
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
			'[GOOGLE_MAP_LINK]' => __('Link to a google map for the venue', 'event_espresso'),
			'[GOOGLE_MAP_IMAGE]' => __('Google map for venue wrapped in image tags', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {
		
		switch ( $shortcode ) {
			
			case '[VENUE_TITLE]' :
				return $this->_venue('title');
				break;

			case '[VENUE_URL]' :
				return $this->_venue('url');
				break;

			case '[VENUE_IMAGE]' :
				return $this->_venue('image');
				break;

			case '[VENUE_PHONE]' :
				return $this->_venue('phone');
				break;

			case '[VENUE_ADDRESS]' :
				return $this->_venue('address');
				break;

			case '[VENUE_ADDRESS2]' :
				return $this->_venue('address2');
				break;

			case '[VENUE_CITY]' :
				return $this->_venue('city');
				break;

			case '[VENUE_COUNTRY]' :
				return $this->_venue('country');
				break;

			case '[VENUE_STATE]' :
				return $this->_venue('state');
				break;

			case '[VENUE_ZIP]' :
				return $this->_venue('zip');
				break;

			case '[GOOGLE_MAP_LINK]' :
				return $this->_venue('gmap_link');
				break;

			case '[GOOGLE_MAP_IMAGE]' : 
				return $this->_venue('gmap_link_img');
				break;
				
		}
	}



	/**
	 * This retrieves the specified venue information
	 * @param  string $what What to retrieve from database
	 * @return string       What was retrieved!
	 */
	private function _venue( $db_ref ) {

		if ( ! $this->_data instanceof EE_Event )
			return ''; //we need the event in order to get a venue!

		$venue = $this->_data->get_first_related('Venue');

		if ( empty( $venue ) )
			return ''; //no venue so get out.

		switch ( $db_ref ) {
			case 'title':
				return $venue->get('VNU_name');
				break;

			case 'url':
				return $venue->get('VNU_url');
				break;

			case 'image':
				return '<img src="' . $venue->feature_image_url(array(200,200) ) . '" alt="' . $venue->get('VNU_name') . ' Feature Image" />';
				break;

			case 'phone':
				return $venue->get('VNU_phone');
				break;

			case 'address':
				return $venue->get('VNU_address');
				break;

			case 'address2':
				return $venue->get('VNU_address2');
				break;

			case 'city':
				return $venue->get('VNU_city');
				break;

			case 'state':
				$state = $venue->state_obj();
				return is_object($state) ? $state->get('STA_name') : '';
				break;

			case 'country':
				$country = $venue->country_obj();
				return is_object($country) ? $country->get('CNT_name') : '';
				break;

			case 'zip':
				return $venue->get('VNU_zip');
				break;

			case 'gmap_link':
			case 'gmap_link_img':
				EE_Registry::instance()->load_helper( 'Maps' );
				$state = $venue->state_obj();
				$country = $venue->country_obj();
				$atts = array(
					'id' => $venue->ID(),
					'address' => $venue->get('VNU_address'),
					'city' => $venue->get('VNU_city'),
					'state' => is_object( $state ) ? $state->get('STA_name') : '',
					'zip' => $venue->get('VNU_zip'),
					'country' => is_object( $country ) ? $country->get('CNT_name'): '',
					'type' => $db_ref == 'gmap_link' ? 'url' : 'map',
					'map_w' => 200,
					'map_h' => 200
					);

				return EEH_Maps::google_map_link($atts);
				break;
		}

	}


} //end EE_Venue_Shortcodes class