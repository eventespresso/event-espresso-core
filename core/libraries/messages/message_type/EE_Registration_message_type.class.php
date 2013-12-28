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
 * @ version		4.0
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
		$this->description = __('This message type is for registation confirmation messages that include information about the event someone has registered for.  This message type does have one setting that you can use to indicate if registration confirmations are delayed until full payments are made for an event (default setting).', 'event_espresso');
		$this->label = array(
			'singular' => __('registration', 'event_espresso'),
			'plural' => __('registrations', 'event_espresso')
			);

		parent::__construct();
	}


	/**
	 * modifying _data property before parent calls addresse methods.  Need to make sure the data included is only IF registration conditions are met
	 *
	 * @access protected
	 * @return void
	 */
	protected function _process_data() {

		//ignore on preview
		if ( ! $this->_preview ) {

			$txn_completed = $this->_data->txn->is_completed();


			//if email_on_payment is set then we'll trigger an exit when incoming data is an EE_Session object.
			$settings = $this->get_existing_admin_settings($this->_active_messenger->name);
			//default is TRUE (yes we want to delay)! 
			$delay = isset($settings['email_before_payment']) && $settings['email_before_payment'] == 'yes' ? FALSE : TRUE;

			//we also allow for the possibility of a complete transaction
			$delay = $txn_completed ? FALSE : $delay;

			// however we also need to account for pending approval events
			foreach ( $this->_data->events as $line_ref => $event ) {
				//if this is a "pre approval" event remove event details from message setup cause transaction complete does not matter.
				$rmv_event = $event['pre_approval'] ? TRUE : $delay;
				if ( $rmv_event ) {
					unset( $this->_data->events[$line_ref] );
					unset( $this->_data->datetimes['evt_objs'][$line_ref] );
					unset( $this->_data->attendees['evt_objs'][$line_ref] );
				}
			}
			//make sure default_addressee_data property is updated
			$this->_default_addressee_data['datetimes'] = $this->_data->datetimes;
		}

		//now back to regular programming
		return parent::_process_data();
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
		$this->_data_handler = 'Gateways';
	}



	/**
	 * Setup admin settings for this message type.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array(
			'email_before_payment' => array(
				'field_type' => 'select',
				'label' => __('Send registration confirmation emails before payment is received?', 'event_espresso'),
				'default' => 'no',
				'options' => array(
					'yes' => __('Yes', 'event_espresso'),
					'no' => __('No', 'event_espresso')
					),
				'value_type' => 'string',
				'format' => '%s',
				'validation' => FALSE,
				'required' => TRUE
				)
			);
	}





	protected function _set_default_field_content() {

		$this->_default_field_content = array(
			'subject' => $this->_default_template_field_subject(),
			'content' => $this->_default_template_field_content(),
		);
	}






	protected function _default_template_field_subject() {
		foreach ( $this->_contexts as $context => $details ) {
			$content[$context] = 'Event Registration Details';
		};
		return $content;
	}






	protected function _default_template_field_content() {
		$content = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-content.template.php', TRUE );
		
		foreach ( $this->_contexts as $context => $details ) {
			$tcontent[$context]['main'] = $content;
			$tcontent[$context]['attendee_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-attendee-list.template.php', TRUE );
			$tcontent[$context]['event_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-event-list.template.php', TRUE );
			$tcontent[$context]['ticket_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-ticket-list.template.php', TRUE );
			$tcontent[$context]['datetime_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-datetime-list.template.php', TRUE );
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

		$this->_contexts = apply_filters('FHEE_set_contexts_'. $this->name, $this->_contexts);
		$this->_contexts = apply_filters('FHEE_set_contexts_all', $this->_contexts);
	}


	/**
	 * see abstract declaration in parent class for details
	 */
	protected function _set_valid_shortcodes() {
		$this->_valid_shortcodes = array(
			'admin' => array('event','venue','organization', 'attendee', 'registration', 'attendee_list', 'event_list', 'ticket_list', 'datetime_list'),
			'primary_attendee' => array('event','venue','organization', 'attendee', 'registration', 'attendee_list', 'event_list', 'ticket_list','datetime_list'),
			'attendee' => array('event','venue','organization', 'attendee', 'registration', 'attendee_list', 'event_list', 'ticket_list','datetime_list')
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
		$admin_attendees = array();
		$addresees = array();

		//first we need to get the event admin user id for all the events and setup an addressee object for each unique admin user.
		foreach ( $this->_data->events as $line_ref => $event ) {
			$admin_id = $this->_get_event_admin_id($event['ID']);
			//get the user_id for the event
			$admin_ids[] = $admin_id;
			//make sure we are just including the events that belong to this admin!
			$admin_events[$admin_id][$line_ref] = $event;
		}

		//make sure we've got unique event_admins!
		$admin_ids = array_unique($admin_ids);

		//k now we can loop through the event_admins and setup the addressee data.
		foreach ( $admin_ids as $event_admin ) {
			$aee = array(
				'user_id' => $event_admin,
				'events' => $admin_events[$event_admin],
				'attendees' => $this->_data->attendees
				);
			$aee = array_merge( $this->_default_addressee_data, $aee );
			$addressees[] = new EE_Messages_Addressee( $aee );
		}

		return $addressees;
	}


	/**
	 * Takes care of setting up the addressee object(s) for the primary attendee.
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _primary_attendee_addressees() {
		
		$aee = $this->_default_addressee_data;
		$aee['events'] = $this->_data->events;
		$aee['attendees'] = $this->_data->attendees;
		$aee['att_obj'] = $this->_data->primary_attendee_data['att_obj'];

		//great now we can instantiate the $addressee object and return (as an array);
		$add[] = new EE_Messages_Addressee( $aee );
		return $add;
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
		//use to verify unique attendee emails... we don't want to sent multiple copies to the same attendee do we?
		$already_processed = array();
		foreach ( $this->_data->attendees as $att_id => $details ) {
			//set the attendee array to blank on each loop;
			$aee = array();
			
			if ( in_array( $details['attendee_email'], $already_processed ) )
				continue;

			$already_processed[] = $details['attendee_email'];

			foreach ( $details as $item => $value ) {
				$aee[$item] = $value;
				if ( $item == 'line_ref' ) {
					foreach ( $value as $event_id ) {
						$aee['events'][$event_id] = $this->_data->events[$event_id];
					}
				}

				if ( $item == 'attendee_email' ) {
					$aee['attendee_email'] = $value;
				}

				if ( $item == 'registration_id' ) {
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

} //end EE_Registration_message_type class