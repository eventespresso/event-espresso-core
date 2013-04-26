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
			'[SITE_ADMIN_EMAIL]' => __('Will be replaced with the admin email for the site that Event Espresso is installed on', 'event_espresso'),
			'[ATTENDEE_EMAIL]' => __('Will be replaced with a properly formatted list of attendee emails who have been registered for an event', 'event_espresso'),
			'[PRIMARY_ATTENDEE_EMAIL]' => __('This will be replaced with the properly formatted email for the primary registrant of an event', 'event_espresso'),
			'[ADMIN_EMAIL]' => __('This will be replaced with a properly formatted list of Event Creator emails for the events in a registration', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {
		global $org_options;

		switch ( $shortcode ) {
			
			case '[SITE_ADMIN_EMAIL]' :
				return $this->_get_site_admin_email();
				break;

			case '[ATTENDEE_EMAIL]' :
				return $this->_get_event_attendee_email();
				break;

			case '[PRIMARY_ATTENDEE_EMAIL]' :
				return $this->_data->primary_attendee_email;
				break;

			case '[ADMIN_EMAIL]' :
				return $this->_get_event_admin_emails();
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




	/**
	 * Returns the properly formatted attendee emails for a given template request (could be multiple attendees).
	 *
	 * @access private
	 * @return string properly formatted list of email addresses for attendees
	 */
	private function _get_event_attendee_email() {
		//why all the checks?  Because there's possible different sources for the Attendee details depending on 

		$fname = !empty( $this->_data->fname ) ? $this->_data->fname : '';
		$fname = is_object( $this->_data ) && isset( $this->_data->att_obj ) ? $this->_data->att_obj->fname() : $fname;

		$lname = !empty( $this->_data->lname ) ? $this->_data->lname : '';
		$lname = is_object( $this->_data ) && isset( $this->_data->att_obj ) ? $this->_data->att_obj->lname() : $lname;

		$email = !empty( $this->_data->attendee_email ) ? $this->_data->attendee_email : '';
		$email = is_object( $this->_data ) && isset( $this->_data->att_obj ) ? $this->_data->att_obj->email() : $email;

		$attendee_email = $fname . ' ' . $lname . ' <' . $email . '>';
		return $attendee_email;
	}



	/**
	 * Returns the properly formatted admin email of a given event (or multiple events if present)
	 *
	 * If there is more than one event in the incoming data, we will parse the "[ADMIN_EMAIL]" shortcode so it returns the properly formatted list of all event admin emails.
	 *
	 *	@todo: once we have a proper event model in place let's make sure that we use it!
	 * 	@access private
	 * 	@return string properly formatted list of email addresses for an event admin.
	 */
	private function _get_event_admin_emails() {
		global $wpdb;

		if ( !empty( $this->_data->admin_email ) ) {
			return $this->_data->fname . ' ' . $this->_data->lname . ' <' . $this->_data->admin_email . '>';
		}

		//k this shortcode has been used else where.  Since we don't know what particular event this is for, let's loop through the events and get an array of event admins for the events.  We'll return the formatted list of admin emails and let the messenger make sure we only pick one if this is for a field that can only have ONE!.
		
		$admin_email = array();

		//loop through events and set the list of event_ids to retrieve so we can do ONE query.
		foreach ( $this->_data->events as $event ) {
			$ids[] = $event['ID'];
		}

		//k we've got our list of ids now let's do the query.
		$sql = "SELECT e.wp_user, u.user_email as email, uma.meta_value as first_name, umb.meta_value as last_name FROM " . EVENTS_DETAIL_TABLE . " as e LEFT JOIN $wpdb->users as u ON u.ID = e.wp_user LEFT JOIN $wpdb->usermeta as uma ON uma.user_id = u.ID AND uma.meta_key = 'first_name' LEFT JOIN $wpdb->usermeta as umb ON umb.user_id = u.ID AND umb.meta_key = 'last_name' WHERE e.id IN (%s) GROUP BY e.wp_user";
		$admin_details = $wpdb->get_results( $wpdb->prepare( $sql, implode(',', $ids) ) );

		//results?
		if ( empty($admin_details) || !is_array($admin_details) ) {
			$msg[] = __('The admin details could not be retrieved from the database.', 'event_espresso');
			$msg[] = sprintf( __('Query: %s', 'event_espresso'), $sql );
			$msg[] = sprintf( __('Events Data: %s', 'event_espresso'), var_export($this->_data->events, TRUE) );
			$msg[] = sprintf( __('Event IDS: %s', 'event_espresso'), var_export($ids, TRUE) );
			$msg[] = sprintf( __('Query Results: %s', 'event_espresso'), var_export($admin_details) );
			do_action('espresso_log_shortcode_parser', __FILE__, __FUNCTION__, implode("\n", $msg) );
		}

		foreach ( $admin_details as $admin ) {
			//only add an admin email if it is present.
			if ( empty( $admin->email ) || $admin->email == '' ) continue;

			$admin_email[] = $admin->first_name . ' ' . $admin->last_name . ' <' . $admin->email . '>';
		}

		$admin_email = implode( ',', $admin_email );
		return $admin_email;
	}

} //end EE_Email_Shortcodes class