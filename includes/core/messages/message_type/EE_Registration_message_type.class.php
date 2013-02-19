<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Registration_message_type
 *
 * Handles frontend registration message types. 
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/message_type/EE_Registration_message_type.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Registration_message_type extends EE_message_type {

	public function __construct() {
		$this->name = 'registration';
		$this->description = __('Sets up registration messages when a successful registration has been completed through frontend checkout', 'event_espresso');
		$this->label = array(
			'singular' => __('registration', 'event_espresso'),
			'plural' => __('regisgrations', 'event_espresso')
			);
		$this->_data_handler = 'EE_Session';

		parent::__construct();
	}


	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => TRUE
			);
	}


	protected function _get_admin_content_events_edit_for_messenger( EE_Messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}



	/**
	 * This message type doesn't need any settings so we are just setting to empty array.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}





	protected function _set_default_field_content() {

		$this->_default_field_content = array(
			'subject' => $this->_default_template_field_subject(),
			'content' => $this->_default_template_field_content(),
		);
		$this->_default_field_content = apply_filters('filter_hook_espresso_default_field_content_'.$this->name, $this->_default_field_content);
	}






	protected function _default_template_field_subject() {
		foreach ( $this->_contexts as $context => $details ) {
			$content[$context] = 'You have been registered for [EVENT_NAME]';
		};
		return $content;
	}






	protected function _default_template_field_content() {
		$content = "<h3>Registration Details:</h3>\n";
		$content .= "<p>For Event: [EVENT_NAME]</p>\n";
		$content .= "<p>Total Cost: [TOTAL_COST]</p>\n";
		$content .= "<p>Event Price: [EVENT_PRICE]</p>\n";
		$content .= "<p><ul>[ATTENDEE_LIST]</ul></p>";
		$content .= "\n<br /><p>Thanks for your purchase,</p>\n";
		$content .= "<p>[COMPANY]</p>\n";
		$content .= "<p>[CO_ADD1]</p>\n";
		$content .= "<p>[CO_ADD2]</p>\n";
		$content .= "<p>[CO_STATE], [CO_ZIP]</p>\n";

		
		foreach ( $this->_contexts as $context => $details ) {
			$tcontent[$context]['main'] = $content;
			$tcontent[$context]['attendee_list'] = '<li>[FNAME] [LNAME]</li>';
		}


		return $tcontent;
	}



	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 * 
	 * @access  protected
	 * @return  void
	 */
	protected function _set_contexts() {
		$this->_context_label = array(
			'label' => __('recipient', 'event_espresso'),
			'plural' => __('recipients', 'event_espresso'),
			'description' => __('Recipient\'s are who will recieve the template.  You may want different registration details sent out depending on who the recipient is', 'event_espresso')
			);

		$this->_contexts = array(
			'admin' => array(
				'label' => __('Event Admin', 'event_espresso'),
				'description' => __('This template is what event administrators will receive on a successful registration', 'event_espresso')
				),
			'primary_attendee' => array(
				'label' => __('Primary Attendee', 'event_espresso'),
				'description' => __('This template is what the primary attendee (the person who made the main registration) will receive on successful registration', 'event_espresso')
				),
			'attendee' => array(
				'label' => __('Attendee', 'event_espresso'),
				'description' => __('This template is what each attendee for the event will receive when a successful registration is processed.', 'event_espresso')
				)
			);

		$this->_contexts = apply_filters('filter_hook_espresso_set_contexts_'. $this->name, $this->_contexts);
		$this->_contexts = apply_filters('filter_hook_espresso_set_contexts_all', $this->_contexts);
	}


	/**
	 * see abstract declaration in parent class for details
	 */
	protected function _set_valid_shortcodes() {
		$this->_valid_shortcodes = array(
			'admin' => array('event','organization', 'attendee', 'registration'),
			'primary_attendee' => array('event', 'organization', 'attendee', 'registration'),
			'attendee' => array('event', 'organization', 'attendee', 'registration')
			);
	}







	/**
	 * returns an array of addressee objects for event_admins
	 *
	 * @access protected
	 * @return array array of EE_Messages_Addressee objects
	 */
	protected function _admin_addressees() {
		$admin_ids = array();
		$admin_events = array();
		$addresees = array();

		//first we need to get the event admin user id for all the events and setup an addressee object for each unique admin user.
		foreach ( $this->data->events as $event ) {
			//get the user_id for the event
			$admin_ids[] = $this->_get_event_admin_id($event['ID']);
			//make sure we are just including the events that belong to this admin!
			$admin_events[$admin_id] = $event;
		}

		//make sure we've got unique event_admins!
		$admin_ids = array_unique($admin_ids);

		//k now we can loop through the event_admins and setup the addressee data.
		foreach ( $admin_ids as $event_admin ) {
			$aee = array(
				'user_id' => $event_admin,
				'events' => $admin_events[$event_admin],
				'primary_attendee_email' => $this->data['primary_attendee']['email']
				);
			$addressees[] = new EE_Messages_Addressee( $aee );
		}

		return $addressees;
	}



	private function _get_event_admin_id($event_id) {
		global $wpdb;
		$event_id = (int) $event_id;
		$sql = "SELECT e.wp_user as event_admin_id FROM " . EVENTS_DETAIL_TABLE . " AS e WHERE e.wp_user = %d";
		$result = $wpdb->get_var( $wpdb->prepare( $sql, $event_id ) );
		return $result;
	}



	/**
	 * Takes care of setting up the addressee object(s) for the primary attendee.
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _primary_attendee_addressees() {
		//we get the primary attendee information from the primary_attendee data
		$primary_attendee = $this->_get_primary_attendee_data();


		$aee = array_merge( $aee, $primary_attendee );

		//great now we can instantiate the $addressee object and return (as an array);
		$add[] = new EE_Messages_Addressee( $aee );
		return $add;
	}




	/**
	 * This just gets the _primary_attendee_data from the data array formatted for setting the EE_Messages_Addresee object
	 *
	 * @access protected
	 * @return array array of primary attendee data
	 */
	protected function _get_primary_attendee_data() {
		$padata = array();

		foreach ( $this->data['primary_attendee'] as $key => $val ) {
			if ( $key == 'email') {
				$padata['primary_attendee_email'] = $val;
				continue;
			}

			if ( $key == 'registration_id' ) {
				$padata['primary_registration_id'] = $val;
				continue;
			}

			$padata[$key] = $value;
		}

		return $padata;
	}





	/**
	 * Takes care of setting up the addresee object(s) for the registered attendees
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _attendee_addressees() {
		$add = array();

		//let's get the primary attendee info that we'll merge into each attendee
		$padata = $this->_get_primary_attendee_data();

		//we just have to loop through the attendees.  We'll also set the attached events for each attendee.
		foreach ( $this->data->attendees as $index => $values ) {
			//set the attendee array to blank on each loop;
			$aee = array();
			foreach ( $values as $field => $value ) {
				$aee[$field] = $aee[$value];
				if ( $field == 'line_ref' ) {
					foreach ( $value as $line_ref ) {
						$aee['events'][] = $this->data->events[$line_ref];
					}
				}

				if ( $field == 'email' ) {
					$aee['attendee_email'] = $value;
				}

				if ( $field == 'registration_id' ) {
					$aee['attendee_registration_id'] = $value;
				}
			}

			//merge in the primary attendee data
			$aee = array_merge( $aee, $padata );
			$add[] = new EE_Messages_Addressee( $aee );
		}
		return $add;
	}

} //end EE_Registration_message_type class