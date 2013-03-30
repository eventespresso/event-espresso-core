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
 * EE_Resend_Registration_message_type
 *
 * Handles resending registration confirmations. 
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/message_type/EE_Resend_Registration_message_type.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Resend_Registration_message_type extends EE_message_type {

	public function __construct() {
		$this->name = 'resend_registration';
		$this->description = __('This message type is for registration confirmations that are resent later OR after a registration has been manually entered by an administrator.', 'event_espresso');
		$this->label = array(
			'singular' => __('resend registration', 'event_espresso'),
			'plural' => __('resend registrations', 'event_espresso')
			);

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




	protected function _set_data_handler() {
		$this->_data_handler = 'Events_Admin';
	}



	/**
	 * Setup admin settings for this message type.
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
			$content[$context] = 'Event Registration Details';
		};
		return $content;
	}






	protected function _default_template_field_content() {
		$content = file_get_contents( EE_CORE . 'messages/message_type/assets/defaults/registration-message-type-content.template.php', TRUE );
		
		foreach ( $this->_contexts as $context => $details ) {
			$tcontent[$context]['main'] = $content;
			$tcontent[$context]['attendee_list'] = file_get_contents( EE_CORE . 'messages/message_type/assets/defaults/registration-message-type-attendee-list.template.php', TRUE );;
			$tcontent[$context]['event_list'] = file_get_contents( EE_CORE . 'messages/message_type/assets/defaults/registration-message-type-event-list.template.php', TRUE );;
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
			'attendee' => array('event','venue','organization', 'attendee', 'registration', 'attendee_list', 'event_list')
			);
	}





	/**
	 * Takes care of setting up the addresee object(s) for the registered attendees
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _attendee_addressees() {
		$add = array();
		//we just have to loop through the attendees.  We'll also set the attached events for each attendee.
		foreach ( $this->_data->attendees as $index => $values ) {
			//set the attendee array to blank on each loop;
			$aee = array();
			foreach ( $values as $field => $value ) {
				$aee[$field] = $value;
				if ( $field == 'line_ref' ) {
					foreach ( $value as $line_ref ) {
						$aee['events'][$line_ref] = $this->_data->events[$line_ref];
					}
				}

				if ( $field == 'email' ) {
					$aee['attendee_email'] = $value;
				}

				if ( $field == 'registration_id' ) {
					$aee['attendee_registration_id'] = $value;
				}
			}

			$aee['attendees'] = $this->_data->attendees;

			//merge in the primary attendee data
			$aee = array_merge( $this->_default_addressee_data, $aee );
			$add[] = new EE_Messages_Addressee( $aee );
		}
	
		return $add;
	}

} //end EE_Resend_Registration_message_type class