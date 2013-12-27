<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event_Edit_Help_Tour
 *
 * This is the help tour object for the decaf Event Editor
 *
 *
 * @package		Event_Edit_Help_Tour
 * @subpackage	includes/core/admin/Event_Edit_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Edit_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Event Edit Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'event-edit-caf-joyride' : 'event-edit-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'titlewrap',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -40,
					)
				),
			30 => array(
				'id' => 'wp-content-editor-tools',
				'content' => $this->_stop_three(),
				'options' => array(
					'tipLocation' => 'right',
					)
				),
			40 => array(
				'id' => 'espresso_events_Venues_Hooks_venue_metabox_metabox',
				'content' => $this->_stop_four_caf(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					)
				),
			50 => array(
				'id' => 'espresso_events_Pricing_Hooks_pricing_metabox_metabox',
				'content' => $this->_stop_five_caf(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					)
				),
			60 => array(
				'id' => 'submitpost',
				'content' => $this->_stop_publish_box(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			65 => array(
				'id' => 'espresso_event_editor_event_options',
				'content' => $this->_stop_registration_options(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			70 => array(
				'id' => 'tagsdiv-post_tag',
				'content' => $this->_stop_post_tag(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			75 => array(
				'id' => 'espresso_event_categoriesdiv',
				'content' => $this->_stop_event_categories(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			80 => array(
				'id' => $this->_is_caf ? 'espresso_events_Registration_Form_Hooks_Extend_primary_questions_metabox' : 'espresso_events_Registration_Form_Hooks_primary_questions_metabox',
				'content' => $this->_stop_seven(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			85 => array(
				'id' => 'espresso_events_Registration_Form_Hooks_Extend_additional_questions_metabox',
				'content' => $this->_stop_nine_caf(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			100 => array(
				'id' => 'postimagediv',
				'content' => $this->_stop_featured_image(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Event Editor', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This brief tour of the Event Editor will provide an overview of the different areas of the screen to help you understand what they are used for. Let\'s get started on editing your event with Event Espresso!', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _stop_two() {
		return '<p>Change the title for your event in this field.</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('The rich text editor can be used to change information about your event. Images and links can also be added along with your text.', 'event_espresso') . '</p>';
	}

	protected function _stop_four_caf() {
		return '<p>' . __('In this section, you can select the venue that is hosting your event.', 'event_espresso') . '</p>';
	}

	protected function _stop_five_caf() {
		return '<p>' . __('Use the Event Datetimes & Ticket section to enter details about when the event is happening and what tickets you want to offer for access to the event.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_publish_box() {
		return '<p>' . __('Easily control the state of your event. The main states are Published, Pending Review, and Draft. Additional states are Cancelled, Postponed, and Sold Out.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_registration_options() {
		return '<p>' . __('Setup custom options for your event registration.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_post_tag() {
		return '<p>' . __('Quickly edit tags for your event.', 'event_espresso') . '</p>';
	}

	protected function _stop_event_categories() {
		return '<p>' . __('Events can also be categorized if you wish.', 'event_espresso') . '</p>';
	}

	protected function _stop_seven() {
		return '<p>' . __('Use the questions group to request information from your primary attendee.', 'event_espresso') . '</p>';
	}

	protected function _stop_nine_caf() {
		return '<p>' . __('Use the questions group to request information from your additional attendees.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_featured_image() {
		return '<p>' . __('Set a feature image for your event here.', 'event_espresso') . '</p>';
	}
	
}