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
 * EE_Attendee_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Attendee_Shortcodes lists all shortcodes related to attendee specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Attendee_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Attendee Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to attendee related data', 'event_espresso');
		$this->_shortcodes = array(
			'[FNAME]' => __('First Name of an attendee', 'event_espresso'),
			'[LNAME]' => __('Last Name of an attendee', 'event_espresso'),
			'[EDIT_ATTENDEE_LINK]' => __('Edit Attendee Link (typically you\'d only use this for messages going to event administrators)', 'event_espresso'),
			);
	}


	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			
			case '[FNAME]' :
				$fname = !empty( $this->_data->fname ) ? $this->_data->fname : '';
				return is_object($this->_data) ? $this->_data->fname() : $fname;
				break;

			case '[LNAME]' :
				$lname = !empty( $this->_data->lname ) ? $this->_data->lname : '';
				return is_object($this->_data) ? $this->_data->lname() : $lname;
				break;

			case '[EDIT_ATTENDEE_LINK]' :
				return $this->_get_attendee_edit_link();
		}
	}




	private function _get_attendee_edit_link() {
		//first make sure we have what we need
		$ID = !empty( $this->_data->ID ) ? $this->_data->ID : '';
		$ID = empty( $ID ) && is_object( $this->_data ) ? $this->_data->ID() : $ID;
		if ( !isset( $ID ) ) return '';

		//made it here so we can generate the edit attendee link.
		$query_args = array(
			'page' => 'espresso_registrations',
			'action' => 'edit_attendee',
			'id' => $ID
			);

		//require EE_Admin_Page core
		require_once EVENT_ESPRESSO_INCLUDES_DIR . 'core/admin/EE_Admin_Page.core.php';
		$url = EE_Admin_Page::add_query_args_and_nonce( $query_args, admin_url('admin.php') );

		return $url;
	}


} //end EE_Attendee_Shortcodes class