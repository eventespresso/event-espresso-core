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
		$this->label = esc_html__('Organization Shortcodes', 'event_espresso');
		$this->description = esc_html__('All shortcodes specific to organization related data', 'event_espresso');
		$this->_shortcodes = array(
			'[COMPANY]' => esc_html__('Event organization name', 'event_espresso'),
			'[CO_ADD1]' => esc_html__('Address 1 value for the organization', 'event_espresso'),
			'[CO_ADD2]' => esc_html__('Address 2 value for the organization', 'event_espresso'),
			'[CO_CITY]' => esc_html__('City the organization is in', 'event_espresso'),
			'[CO_STATE]' => esc_html__('State the organization is located in', 'event_espresso'),
			'[CO_ZIP]' => esc_html__('The zip code for the organization', 'event_espresso'),
			'[CO_LOGO]' => esc_html__('The logo image for the organization', 'event_espresso'),
			'[CO_EMAIL]' => esc_html__('The primary email address for the organization', 'event_espresso'),
			'[CO_PHONE]' => esc_html__('The phone number for the organization', 'event_espresso'),
			'[CO_LOGO_URL]' => esc_html__('Just the link to the image used as the logo for the organization', 'event_espresso'),
			'[CO_FACEBOOK_URL]' => esc_html__('Link to organization Facebook page', 'event_espresso'),
			'[CO_TWITTER_URL]' => esc_html__('Link to organization Twitter page', 'event_espresso'),
			'[CO_PINTEREST_URL]' => esc_html__('Link to organization Pinterest page', 'event_espresso'),
			'[CO_GOOGLE_URL]' => esc_html__('Link to organization Google page', 'event_espresso'),
			'[CO_LINKEDIN_URL]' => esc_html__('Link to organization LinkedIn page', 'event_espresso'),
			'[CO_INSTAGRAM_URL]' => esc_html__('Link to organization Instagram page', 'event_espresso'),
			'[CO_TAX_NUMBER_*]' => sprintf( esc_html__('This is the shortcode used for displaying any tax number for the company.  %1$sNote: This is a special dynamic shortcode.%2$s You can use the "prefix" parameter to indicate what the prefix for this tax number is.  It defaults to "VAT/Tax Number:".  To change this prefix you do the following format for this shortcode:  [CO_TAX_NUMBER_* prefix="GST: "] and that will output: GST: 12345t56.  Also take note that if you have NO number in your settings, the prefix is not output either.', 'event_espresso' ),'<strong>','</strong>')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {

			case '[COMPANY]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'name' );
				break;

			case '[CO_ADD1]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'address_1' );
				break;

			case '[CO_ADD2]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'address_2' );
				break;

			case '[CO_CITY]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'city' );
				break;

			case '[CO_STATE]' :
				$state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( EE_Registry::instance()->CFG->organization->STA_ID );
				return $state->name();
				break;

			case '[CO_ZIP]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'zip' );
				break;

			case '[CO_EMAIL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'email' );
				break;

			case '[CO_PHONE]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'phone' );
				break;

			case '[CO_LOGO]' :
				return '<img src="' . EE_Registry::instance()->CFG->organization->get_pretty( 'logo_url' ) . '" id="headerImage" />';
				break;

			case '[CO_LOGO_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'logo_url' );
				break;

			case '[CO_FACEBOOK_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'facebook' );
				break;

			case '[CO_TWITTER_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'twitter' );
				break;

			case '[CO_PINTEREST_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'pinterest' );
				break;

			case '[CO_LINKEDIN_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'linkedin' );
				break;

			case '[CO_GOOGLE_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'google' );
				break;

			case '[CO_INSTAGRAM_URL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'instagram' );
				break;

		}

		//also allow for parameter shortcode
		if ( strpos( $shortcode, '[CO_TAX_NUMBER_*' ) !== FALSE ) {
			//first see if there is any company tax number set and bail early if not
			$tax_number = EE_Registry::instance()->CFG->organization->vat;
			if ( empty( $tax_number ) ) {
				return '';
			}

			//see if there are any attributes.
			$attrs = $this->_get_shortcode_attrs( $shortcode );

			//set custom attrs if present (or default)
			$prefix = isset( $attrs['prefix'] ) ? $attrs['prefix'] : esc_html__('VAT/Tax Number: ', 'event_espresso');
			return $prefix . $tax_number;
		}

		return '';
	}


} //end EE_Organization_Shortcodes class
