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
 * EE_Organization_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Organization_Shortcodes lists all shortcodes related to organization specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Organization_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Organization_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Organization Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to organization related data', 'event_espresso');
		$this->_shortcodes = array(
			'[COMPANY]' => __('Event organization name', 'event_espresso'),
			'[CO_ADD1]' => __('Address 1 value for the organization', 'event_espresso'),
			'[CO_ADD2]' => __('Address 2 value for the organization', 'event_espresso'),
			'[CO_CITY]' => __('City the organization is in', 'event_espresso'),
			'[CO_STATE]' => __('State the organization is located in', 'event_espresso'),
			'[CO_ZIP]' => __('The zip code for the organization', 'event_espresso'),
			'[CO_LOGO]' => __('The logo image for the organization', 'event_espresso'),
			'[CO_EMAIL]' => __('The primary email address for the organization', 'event_espresso'),
			'[CO_PHONE]' => __('The phone number for the organization', 'event_espresso'),
			'[CO_LOGO_URL]' => __('Just the link to the image used as the logo for the organization', 'event_espresso'),
			'[CO_FACEBOOK_URL]' => __('Link to organization Facebook page', 'event_espresso'),
			'[CO_TWITTER_URL]' => __('Link to organization Twitter page', 'event_espresso'),
			'[CO_PINTEREST_URL]' => __('Link to organization Pinterest page', 'event_espresso'),
			'[CO_GOOGLE_URL]' => __('Link to organization Google page', 'event_espresso'),
			'[CO_LINKEDIN_URL]' => __('Link to organization Linkedin page', 'event_espresso'),
			'[CO_INSTAGRAM_URL]' => __('Link to organization Instagram page', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			
			case '[COMPANY]' :
				return EE_Registry::instance()->CFG->organization->name;
				break;

			case '[CO_ADD1]' :
				return EE_Registry::instance()->CFG->organization->address_1;
				break;

			case '[CO_ADD2]' :
				return EE_Registry::instance()->CFG->organization->address_2;
				break;

			case '[CO_CITY]' :
				return EE_Registry::instance()->CFG->organization->city;
				break;

			case '[CO_STATE]' :
				$state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( EE_Registry::instance()->CFG->organization->STA_ID );
				return $state->name();
				break;

			case '[CO_ZIP]' :
				return EE_Registry::instance()->CFG->organization->zip;
				break;

			case '[CO_EMAIL]' :
				return EE_Registry::instance()->CFG->organization->email;
				break;

			case '[CO_PHONE]' :
				return EE_Registry::instance()->CFG->organization->phone;
				break;

			case '[CO_LOGO]' :
				return '<img src="' . EE_Registry::instance()->CFG->organization->logo_url . '" id="headerImage" />';
				break;

			case '[CO_LOGO_URL]' : 
				return EE_Registry::instance()->CFG->organization->logo_url;
				break;

			case '[CO_FACEBOOK_URL]' :
				return EE_Registry::instance()->CFG->organization->facebook;
				break;

			case '[CO_TWITTER_URL]' :
				return EE_Registry::instance()->CFG->organization->twitter;
				break;

			case '[CO_PINTEREST_URL]' :
				return EE_Registry::instance()->CFG->organization->pinterest;
				break;

			case '[CO_LINKEDIN_URL]' :
				return EE_Registry::instance()->CFG->organization->linkedin;
				break;

			case '[CO_GOOGLE_URL]' :
				return EE_Registry::instance()->CFG->organization->google;
				break;

			case '[CO_INSTAGRAM_URL]' :
				return EE_Registry::instance()->CFG->organization->instagram;
				break;

		}

		return '';
	}


} //end EE_Organization_Shortcodes class