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

	/**
	 * _init_props
	 *
	 * @access protected
	 * @return void
	 */
	protected function _init_props() {
		$this->label = __('Datetime Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to datetime related data', 'event_espresso');
		$this->_shortcodes = array(
			'[DATETIME_START]' => __('The start date and time.', 'event_espresso'),
			'[DATETIME_END]' => __('The end date and time.', 'event_espresso'),
			'[DATETIME_TIMEZONE]' => __('The timezone for the date and time', 'event_espresso'),
			'[DATE_START]' => __('The datetime start date.', 'event_espresso'),
			'[DATE_END]' => __('The datetime end date.', 'event_espresso'),
			'[TIME_START]' => __('The datetime start time.', 'event_espresso'),
			'[TIME_END]' => __('The datetime end time.', 'event_espresso'),
			'[ICAL_LINK_*]' => __('The datetime iCal link. The optional "link_text" attribute can be used to set custom text within the link (Default is "Add to iCal Calendar").', 'event_espresso')
			);
	}



	/**
	 * _parser
	 *
	 * @access protected
	 * @param string $shortcode
	 * @return string
	 */
	protected function _parser( $shortcode ) {

		if ( ! $this->_data instanceof EE_Datetime ) {
			return ''; //get out cause we can only parse with the datetime object.
		}

		switch ( $shortcode ) {

			case '[DATETIME_START]' :
				return $this->_data->get_i18n_datetime('DTT_EVT_start');
				break;

			case '[DATETIME_END]' :
				return $this->_data->get_i18n_datetime('DTT_EVT_end');
				break;

			case '[DATETIME_TIMEZONE]' :
				return $this->_data->get_timezone();
				break;
			case '[DATE_START]' :
				return $this->_data->get_i18n_datetime( 'DTT_EVT_start', get_option( 'date_format' ) );
				break;
			case '[DATE_END]' :
				return $this->_data->get_i18n_datetime( 'DTT_EVT_end', get_option( 'date_format' ) );
				break;
			case '[TIME_START]' :
				return $this->_data->get_i18n_datetime( 'DTT_EVT_start', get_option( 'time_format' ) );
				break;
			case '[TIME_END]' :
				return $this->_data->get_i18n_datetime( 'DTT_EVT_end', get_option( 'time_format' ) );
				break;
		}

		if ( strpos( $shortcode, '[ICAL_LINK_*') !== FALSE  ) {
			$attrs = $this->_get_shortcode_attrs( $shortcode );
			
			$link_text = empty( $attrs['link_text'] ) ?  __( 'Add to iCal Calendar', 'event_espresso' ) : $attrs['link_text'];
			
			$URL = add_query_arg( array( 'ee' => 'download_ics_file', 'ics_id' => $this->_data->ID() ), site_url() );
		
			return '<a class="ee-ical" href="' . $URL . '">' . $link_text . '</a>';
			
		}

		return '';

	}


} //end EE_Datetime_Shortcodes class
