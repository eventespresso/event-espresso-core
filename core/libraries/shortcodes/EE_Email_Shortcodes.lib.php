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
 * EE_Email_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Email_Shortcodes lists all shortcodes for various email addresses. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Email_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Email_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Email Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes related to emails', 'event_espresso');
		$this->_shortcodes = array(
			'[SITE_ADMIN_EMAIL]' => __('Will be replaced with the admin email for the site that Event Espresso is installed on', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			
			case '[SITE_ADMIN_EMAIL]' :
				return $this->_get_site_admin_email();
				break;

		}
	}


	/**
	 * This simply returns the site admin email (result for parsing "[SITE_ADMIN_EMAIL]" shortcode)
	 *
	 * @access private
	 * @return string email address of site admin
	 */
	private function _get_site_admin_email() {
		return get_bloginfo('admin_email');
	}


} //end EE_Email_Shortcodes class