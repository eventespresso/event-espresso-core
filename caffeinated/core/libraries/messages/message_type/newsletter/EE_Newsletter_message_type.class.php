<?php
/**
 * This file contains the EE_Newsletter_message_type class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * The message type for newsletter type of messages.
 *
 * Newsletter message types are triggered manually by the admin for sending mass email to select groups of
 * registrants.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.3.0
 * @author          Darren Ethier
 */
class EE_Newsletter_message_type extends EE_message_type {

	public function __construct() {
		$this->name = 'newsletter';
		$this->description = __( 'Batch message type messages are triggered manually by the admin for sending notifications to a selected group of recipients. This should only be used for more general notification type messages that contain information specific for the recipients. For "newsletter" type messages we recommend using an email list service like MailChimp, because sending non-related mail-outs to contacts increases the risk of your site domain getting added to spam lists, which will prevent messages getting to users.', 'event_espresso' );
		$this->label = array(
			'singular' => __( 'batch', 'event_espresso' ),
			'plural' => __( 'batches', 'event_espresso' )
			);
		$this->_master_templates = array(
			'email' => 'registration',
			);

		parent::__construct();
	}



	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(); //no admin pages to register this with.
	}



	protected function _set_data_handler() {
		$this->_data_handler = 'Registrations';
		$this->_single_message = $this->_data instanceof EE_Registration;
	}



	protected function _get_data_for_context( $context, EE_Registration $registration, $id ) {
		//newsletter message type data handler is 'Registrations' and it expects an array of EE_Registration objects.
		return array( $registration );
	}



	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}



	protected function _set_contexts() {
		$this->_context_label = array(
			'label' => __( 'recipient', 'event_espresso' ),
			'plural' => __( 'recipients', 'event_espresso' ),
			'description' => __( 'Recipient\'s are who will receive the message.', 'event_espresso' )
			);

		$this->_contexts = array(
			'attendee' => array(
				'label' => __( 'Registrant', 'event_espresso' ),
				'description' => __( 'This template goes to selected registrants.', 'event_espresso' )
				)
			);
	}




	/**
	 * used to set the valid shortcodes.
	 *
	 * For the newsletter message type we only have two valid shortcode libraries in use, recipient details and organization.  That's it!
	 *
	 * @since   4.3.0
	 *
	 * @return  void
	 */
	protected function _set_valid_shortcodes() {
		parent::_set_valid_shortcodes();

		$included_shortcodes = array(
			'recipient_details',
			'organization',
			'newsletter',
			);

		foreach ( $this->_valid_shortcodes as $context => $shortcodes ) {
			foreach ( $shortcodes as $key => $shortcode ) {
				if ( ! in_array( $shortcode, $included_shortcodes ) ) {
					unset( $this->_valid_shortcodes[ $context ][ $key ] );
				}
			}
			$this->_valid_shortcodes[ $context ][] = 'newsletter';
		}

	}


	/**
	 * Override default _attendee_addressees in EE_message_type because we want to loop through the registrations
	 * for EE_message_type.
	 */
	protected function _attendee_addressees() {
		$addressee = array();

		//looping through registrations
		foreach ( $this->_data->registrations as $reg_id => $details ) {
			//set $attendee array to blank on each loop
			$aee = array();

			//need to get the attendee from this registration.
			$attendee = isset( $details['att_obj'] ) && $details['att_obj'] instanceof EE_Attendee
				? $details['att_obj']
				: null;

			if ( ! $attendee instanceof EE_Attendee ) {
				continue;
			}

			//set $aee from attendee object
			$aee['att_obj'] = $attendee;
			$aee['reg_objs'] = isset( $this->_data->attendees[ $attendee->ID() ]['reg_objs'] )
				? $this->_data->attendees[ $attendee->ID() ]['reg_objs']
				: array();
			$aee['attendee_email'] = $attendee->email();
			$aee['tkt_objs'] = isset( $this->_data->attendees[ $attendee->ID() ]['tkt_objs'] )
				? $this->_data->attendees[ $attendee->ID() ]['tkt_objs']
				: array();

			if ( isset( $this->_data->attendees[ $attendee->ID() ]['evt_objs'] ) ) {
				$aee['evt_objs'] = $this->_data->attendees[ $attendee->ID() ]['evt_objs'];
				$aee['events'] = $this->_data->attendees[ $attendee->ID() ]['evt_objs'];
			} else {
				$aee['evt_objs'] = $aee['events'] = array();
			}

			$aee['reg_obj'] = isset( $details['reg_obj'] )
				? $details['reg_obj']
				: null;
			$aee['attendees'] = $this->_data->attendees;

			//merge in the primary attendee data
			$aee = array_merge( $this->_default_addressee_data, $aee );
			$addressee[] = new EE_Messages_Addressee( $aee );
		}
		return $addressee;
	}


}
