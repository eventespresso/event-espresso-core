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
		global $wpdb;

		//first we get the venue id from the data.  If that isn't present then we always return empty!
		$venue_id = isset( $this->_data['meta']['venue_id'] ) ? (int) $this->_data['meta']['venue_id'] : NULL;

		if ( empty( $venue_id ) )
			return ''; //get out we need an id!!

		switch ( $db_ref ) {
			case 'title':
				$what = "v.name";
				break;

			case 'url':
				$what = "v.meta";
				break;

			case 'image':
				$what = "v.meta";
				break;

			case 'phone':
				$what = "v.phone";
				break;

			case 'address':
				$what = "v.address";
				break;

			case 'address2':
				$what = "v.address2";
				break;

			case 'city':
				$what = "v.city";
				break;

			case 'country':
				$what = "v.country";
				break;

			case 'zip':
				$what = "v.zip";
				break;

			case 'gmap_link':
			case 'gmap_link_img':
				$what = "v.address AS address, v.city AS city, v.state AS state, v.zip AS zip, v.country AS country";
				break;
		}

		//prepare query
		$select = "SELECT $what FROM " . EVENTS_VENUE_TABLE . " AS v WHERE v.id = %s";

		$results = $db_ref == 'gmap_link' || $db_ref == 'gmap_link_img' ? $wpdb->get_results( $wpdb->prepare( $select, $venue_id ) ) : $wpdb->get_var( $wpdb->prepare( $select, $venue_id ) );

		if ( empty( $results ) ) return '';

		if ( $db_ref == 'gmap_link' || $db_ref == 'gmap_link_img' ) {
			require_once EE_HELPERS . 'EE_Maps.helper.php';
			$atts = array(
				'id' => $venue_id,
				'address' => $results[0]->address,
				'city' => $results[0]->city,
				'state' => $results[0]->state,
				'zip' => $results[0]->zip,
				'country' => $results[0]->country,
				'type' => $what == 'gmap_link' ? 'url' : 'map',
				'map_w' => 200,
				'map_h' => 200
				);

			$results = EE_Maps::google_map_link($atts);
		}

		return $results;

	}


} //end EE_Venue_Shortcodes class