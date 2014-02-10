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
 * EE_Event_Meta_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Event_Meta_Shortcodes handles all shortcodes for Event Meta items. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Event_Meta_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Meta_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Event Meta Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes related to Event Meta data', 'event_espresso');
		$this->_shortcodes = array();
	}


	/**
	 * We have to overload the parent parser method because of the dynamic nature of custom event meta
	 * @param  string $shortcode Incoming shortcode
	 * @param  mixed (array|object) $data      incoming data object/array
	 * @return string            parsed code.
	 */
	public function parser( $shortcode, $data, $extra_data = array() ) {
		
		//all shortcodes will be checked in the post_meta table (assuming the shortcode matches the post_meta key);
		if ( empty( $this->_data['ID'] ) )
			return ''; //need the event id to do anything!

		$meta = get_post_meta($this->_data['ID'], $shortcode, true);

		return !empty( $meta ) ? $meta : '';
	}


	protected function _parser( $shortcode ) {}


} //end EE_Event_Meta_Shortcodes class