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

	/**
	 * hold all extra data.
	 * @var array
	 */
	protected $_xtra;

	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Attendee Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to attendee related data', 'event_espresso');
		$this->_shortcodes = array(
			'[FNAME]' => __('First Name of an attendee', 'event_espresso'),
			'[LNAME]' => __('Last Name of an attendee', 'event_espresso'),
			'[EDIT_ATTENDEE_LINK]' => __('Edit Attendee Link (typically you\'d only use this for messages going to event administrators)', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		$this->_xtra = !empty($this->_extra_data ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : NULL;

		//setup _data appropriately
		if ( !empty( $this->_data->fname ) ) {
			//we're parsing admin details... let's setup a pseudo attendee object
			$this->_data = EE_Attendee::new_instance( array(
				'ATT_fname' => $this->_data->fname,
				'ATT_lname' => $this->_data->lname,
				'ATT_email' => $this->_data->admin_email
				));
		} else if ( empty( $this->_data->fname ) && $this->_data instanceof EE_Messages_Addressee && !empty( $this->_data->att_obj ) ) {
			$this->_data = $this->_data->att_obj;
		}

		if ( ! $this->_data instanceof EE_Attendee )
			return '';

		switch ( $shortcode ) {
			
			case '[FNAME]' :
				return $this->_data->fname();
				break;

			case '[LNAME]' :
				return $this->_data->lname();
				break;

			case '[ATTENDEE_EMAIL]' :
				return $this->_data->email();
				break;

			case '[EDIT_ATTENDEE_LINK]' :
				return $this->_get_attendee_edit_link();
				break;
		}

		return '';
	}




	private function _get_attendee_edit_link() {
		//first make sure we have what we need
		$ID = !empty( $this->_data->ID ) ? $this->_data->ID : '';
		$ID = empty( $ID ) && is_object( $this->_data ) ? $this->_data->ID() : $ID;
		if ( !isset( $ID ) ) return '';

		//ID will be attendee ID so let's get the reg ID instead!
		$REG_ID = !empty( $this->_xtra ) ? $this->_xtra->attendees[$ID]['registration_id'] : $this->_data->get_most_recent_registration();

		$REG_ID = $REG_ID instanceof EE_Registration ? $REG_ID->ID() : $REG_ID;

		//made it here so we can generate the edit attendee link.
		$query_args = array(
			'page' => 'espresso_registrations',
			'action' => 'view_registration',
			'_REG_ID' => $REG_ID
			);

		//require EE_Admin_Page core
		require_once EE_ADMIN . 'EE_Admin_Page.core.php';
		$url = EE_Admin_Page::add_query_args_and_nonce( $query_args, admin_url('admin.php') );

		return $url;
	}

} //end EE_Attendee_Shortcodes class