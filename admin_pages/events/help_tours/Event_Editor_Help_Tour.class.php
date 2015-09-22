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
 * Event_Editor_Help_Tour
 *
 * This is the help tour object for the decaf Event Editor
 *
 *
 * @package		Event_Editor_Help_Tour
 * @subpackage	includes/core/admin/Event_Editor_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Editor_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Event Editor Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'event-editor-caf-joyride' : 'event-editor-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'titlewrap',
				'content' => $this->_event_title_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -40,
					)
				),
			30 => array(
				'id' => 'wp-content-editor-tools',
				'content' => $this->_event_description_stop(),
				'options' => array(
					'tipLocation' => 'right',
					)
				),
			35 => array(
				'id' => 'espresso_event_editor_tickets',
				'content' => $this->_event_pricing_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					)
				),
			40 => array(
				'id' => 'espresso_events_Venues_Hooks_venue_metabox_metabox',
				'content' => $this->_event_venues_caf(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					)
				),
			50 => array(
				'id' => 'espresso_events_Pricing_Hooks_pricing_metabox_metabox',
				'content' => $this->_event_pricing_caf(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					)
				),
			60 => array(
				'id' => 'tagsdiv-post_tag',
				'content' => $this->_event_post_tag_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			70 => array(
				'id' => 'espresso_event_categoriesdiv',
				'content' => $this->_event_categories_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			80 => array(
				'id' => $this->_is_caf ? 'espresso_events_Registration_Form_Hooks_Extend_primary_questions_metabox' : 'espresso_events_Registration_Form_Hooks_primary_questions_metabox',
				'content' => $this->_primary_question_stop_caf(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			90 => array(
				'id' => 'espresso_events_Registration_Form_Hooks_Extend_additional_questions_metabox',
				'content' => $this->_additional_questions_stop_caf(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			100 => array(
				'id' => 'postimagediv',
				'content' => $this->_featured_image_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
            110 => array(
				'id' => 'espresso_event_editor_event_options',
				'content' => $this->_event_registration_options_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
            120 => array(
				'id' => 'submitpost',
				'content' => $this->_publish_event_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Event Editor', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Event Editor will provide an overview of the different areas of the screen to help you understand what they are used for. Let\'s get started on setting up your first event with Event Espresso!', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _event_title_stop() {
		return '<p>Enter the title for your event in this field.</p>';
	}

	protected function _event_description_stop() {
		return '<p>' . __('The rich text editor can be used to add information about your event. Images and links can also be added along with your text.', 'event_espresso') . '</p>';
	}

	protected function _event_venues_caf() {
		return '<p>' . __('In this section, you can select the venue that is hosting your event.', 'event_espresso') . '</p>';
	}

	protected function _event_venues_stop() {
		return '<p>' . __('In this section, you can enter information about the venue that is hosting your event.', 'event_espresso') . '</p>';
	}

	protected function _event_pricing_stop() {
		return '<p>' . __('Use the Event Datetime & Ticket section to enter details about when the event is happening and what tickets you want to offer for access to the event.', 'event_espresso') . '</p>';
	}

	protected function _event_pricing_caf() {
		return '<p>' . __('Use the Event Datetimes & Ticket section to enter details about when the event is happening and what tickets you want to offer for access to the event.', 'event_espresso') . '</p>';
	}
	
	protected function _event_registration_options_stop() {
		return '<p>' . __('Setup custom options for your event registration.', 'event_espresso') . '</p>';
	}
	
	protected function _event_post_tag_stop() {
		return '<p>' . __('Quickly add tags to your event.', 'event_espresso') . '</p>';
	}

	protected function _event_categories_stop() {
		return '<p>' . __('Events can also be categorized if you wish.', 'event_espresso') . '</p>';
	}

	protected function _primary_question_stop_caf() {
		return '<p>' . __('Use the questions group to request information from your primary registrant.', 'event_espresso') . '</p>';
	}

	protected function _additional_questions_stop_caf() {
		return '<p>' . __('Use the questions group to request information from your additional registrant.', 'event_espresso') . '</p>';
	}
	
	protected function _featured_image_stop() {
		return '<p>' . __('Set a feature image for your event here.', 'event_espresso') . '</p>';
	}
    
    protected function _publish_event_stop() {
		return '<p>' . __('Easily control the state of your event. The main states are Published, Pending Review, and Draft. Additional states are Cancelled, Postponed, and Sold Out.', 'event_espresso') . '</p>';
	}
	
}