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
		$this->label = esc_html__('Email Shortcodes', 'event_espresso');
		$this->description = esc_html__('All shortcodes related to emails', 'event_espresso');
		$this->_shortcodes = array(
			'[SITE_ADMIN_EMAIL]' => esc_html__('Will be replaced with the admin email for the site that Event Espresso is installed on', 'event_espresso'),
			'[EVENT_AUTHOR_FORMATTED_EMAIL]' => sprintf( esc_html__('This will be replaced with a properly formatted list of Event Creator emails for the events in a registration. %1$sNOTE:%2$s If the event author has not filled out their WordPress user profile then the organization name will be used as the "From" name.', 'event_espresso'),'<strong>','</strong>' ),
			'[EVENT_AUTHOR_EMAIL]' => sprintf( esc_html__('This is the same as %1$s shortcode except it is just a list of emails (not fancy headers).', 'event_espresso'), '[EVENT_AUTHOR_FORMATTED_EMAIL]' ),
			'[CO_FORMATTED_EMAIL]' => esc_html__('This parses to the formatted email address of the organization name set in Your Organization Settings. "My Organization &lt;myorg@email.com&gt;"', 'event_espresso' ),
			'[CO_EMAIL]' => esc_html__('This will parse to the email address only for the organization set in Your Organization Settings.', 'event_espresso'),
			'[ESPRESSO_ADMIN_FORMATTED_EMAIL]' => esc_html__('This parses to the formatted email address of the organization name set in Your Organization Settings. "My Organization &lt;myorg@email.com&gt;"', 'event_espresso' ),
			'[ESPRESSO_ADMIN_EMAIL]' => esc_html__('This parses to the email address only for the organization set in Your Organization Settings page.', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {

			case '[SITE_ADMIN_EMAIL]' :
				return $this->_get_site_admin_email();
				break;

			case '[EVENT_AUTHOR_FORMATTED_EMAIL]' :
				return $this->_get_event_admin_emails();
				break;

			case '[EVENT_AUTHOR_EMAIL]' :
				return $this->_get_event_admin_emails( FALSE );
				break;

			case '[CO_FORMATTED_EMAIL]' :
			case '[ESPRESSO_ADMIN_FORMATTED_EMAIL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) . ' <' . EE_Registry::instance()->CFG->organization->get_pretty( 'email' ) . '>';
				break;

			case '[CO_EMAIL]' :
			case '[ESPRESSO_ADMIN_EMAIL]' :
				return EE_Registry::instance()->CFG->organization->get_pretty( 'email' );
				break;

			default :
				return '';
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


	private function _get_event_admin_emails( $fancy_headers = TRUE ) {

		if ( !empty( $this->_data->admin_email ) ) {
			if ( ! $fancy_headers )
				return $this->_data->admin_email;
			return !empty( $this->_data->fname ) ? $this->_data->fname . ' ' . $this->_data->lname . ' <' . $this->_data->admin_email . '>' : EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) . ' <' . $this->_data->admin_email . '>';
		}

		//k this shortcode has been used else where.  Since we don't know what particular event this is for, let's loop through the events and get an array of event admins for the events.  We'll return the formatted list of admin emails and let the messenger make sure we only pick one if this is for a field that can only have ONE!.

		$admin_email = array();

		//loop through events and set the list of event_ids to retrieve so we can do ONE query.
		foreach ( $this->_data->events as $event ) {
			$ids[] = $event['ID'];
		}

		//get all the events
		$events = EE_Registry::instance()->load_model('Event')->get_all( array(array('EVT_ID' => array('IN', $ids ) ) ) );

		//now loop through each event and setup the details
		$admin_details = array();
		$cnt = 0;
		foreach ( $events as $event ) {
			$user = get_userdata($event->get('EVT_wp_user') );
			$admin_details[$cnt] = new stdClass();
			$admin_details[$cnt]->email = $user->user_email;
			$admin_details[$cnt]->first_name = $user->user_firstname;
			$admin_details[$cnt]->last_name = $user->user_lastname;
			$cnt++;
		}

		//results?
		if ( empty($admin_details) || !is_array($admin_details) ) {
			$msg[] = esc_html__('The admin details could not be retrieved from the database.', 'event_espresso');
			$msg[] = sprintf( esc_html__('Query: %s', 'event_espresso'), $sql );
			$msg[] = sprintf( esc_html__('Events Data: %s', 'event_espresso'), var_export($this->_data->events, TRUE) );
			$msg[] = sprintf( esc_html__('Event IDS: %s', 'event_espresso'), var_export($ids, TRUE) );
			$msg[] = sprintf( esc_html__('Query Results: %s', 'event_espresso'), var_export($admin_details) );
			do_action( 'AHEE_log', __FILE__, __FUNCTION__, implode( PHP_EOL, $msg ), 'shortcode_parser' );
		}

		foreach ( $admin_details as $admin ) {
			//only add an admin email if it is present.
			if ( empty( $admin->email ) || $admin->email == '' ) continue;

			if ( ! $fancy_headers ) {
				$admin_email[] = $admin->email;
				continue;
			}

			$admin_email[] = !empty( $admin->first_name ) ? $admin->first_name . ' ' . $admin->last_name . ' <' . $admin->email . '>' : EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) . ' <' . $admin->email . '>';
		}

		$admin_email = implode( ',', $admin_email );
		return $admin_email;
	}


} //end EE_Email_Shortcodes class
