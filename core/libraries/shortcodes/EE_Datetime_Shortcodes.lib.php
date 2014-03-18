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
 * EE_Datetime_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Datetime_Shortcodes lists all shortcodes related to ticket specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Datetime_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Datetime_Shortcodes extends EE_Shortcodes {


	protected function _init_props() {
		$this->label = __('Datetime Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to datetime related data', 'event_espresso');
		$this->_shortcodes = array(
			'[DATETIME_START]' => __('The start date and time.', 'event_espresso'),
			'[DATETIME_END]' => __('The end date and time.', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		if ( ! $this->_data instanceof EE_Datetime )
			return ''; //get out cause we can only parse with the datetime object.

		switch ( $shortcode ) {

			case '[DATETIME_START]' :
				return $this->_data->get_datetime('DTT_EVT_start');
				break;

			case '[DATETIME_END]' :
				return $this->_data->get_datetime('DTT_EVT_end');
				break;
		}

	}


} //end EE_Datetime_Shortcodes class
