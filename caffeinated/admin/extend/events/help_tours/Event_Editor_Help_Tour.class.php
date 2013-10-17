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
 * This is the help tour object for the caffeinated Event Editor
 *
 *
 * @package		Event_Editor_Help_Tour
 * @subpackage	caffeinated/admin/extend/events/help_tours/Event_Editor_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Editor_Help_Tour extends EE_Help_Tour {

	public function __construct() {
		$this->_label = __('Event Editor Tour', 'event_espresso');
		$this->_slug = 'event-editor-caf-joyride';
		parent::__construct();
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'titlewrap',
				'content' => $this->_stop_two(),
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
				'content' => $this->_stop_four(),
				'options' => array(
					'tipLocation' => 'top'
					)
				),
			50 => array(
				'id' => 'espresso_events_Pricing_Hooks_pricing_metabox_metabox',
				'content' => $this->_stop_five(),
				'options' => array(
					'tipLocation' => 'top'
					)
				),
			60 => array(
				'id' => 'espresso_event_types',
				'content' => $this->_stop_six(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			70 => array(
				'id' => 'taxonomy-espresso_event_categories',
				'content' => $this->_stop_seven(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			80 => array(
				'id' => 'espresso_events_Registration_Form_Hooks_Extend_primary_questions_metabox',
				'content' => $this->_stop_eight(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			90 => array(
				'id' => 'espresso_events_Registration_Form_Hooks_Extend_additional_questions_metabox',
				'content' => $this->_stop_nine(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			100 => array(
				'id' => 'espresso_event_editor_event_options',
				'content' => $this->_stop_ten(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			110 => array(
				'id' => 'postimagediv',
				'content' => $this->_stop_eleven(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			120 => array(
				'id' => 'submitpost',
				'content' => $this->_stop_twelve(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			130 => array(
				'id' => 'contextual-help-link',
				'content' => $this->_stop_thirteen(),
				'button_text' => __('End Tour', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Welcome to the Event Espresso Event Editor!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('The Event Editor will likely be one of the most visited pages in Event Espresso.  This brief tour will go over all the different areas of this screen to help you understand what they are for.  Let\'s get started on setting up your first event!', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _stop_two() {
		return '<p>This is where you will enter the title for your Event.</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('This is where you can add some information about your event.  This is a rich text editor and you can add images and links along with  your text.', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('In this section, you can enter details about the venue that is hosting your event.', 'event_espresso') . '</p>';
	}

	protected function _stop_five() {
		return '<p>' . __('The Event Datetime & Ticket section is where you enter details about when the event is happening and what tickets you want to offer for access to the event.', 'event_espresso') . '</p>';
	}


	protected function _stop_six() {
		return '<p>' . __('Some info about Event Types blah blah blah', 'event_espresso') . '</p>';
	}


	protected function _stop_seven() {
		return '<p>' . __('Events can be categorized if you wish.', 'event_espresso') . '</p>';
	}


	protected function _stop_eight() {
		return '<p>' . __('All about question groups here.', 'event_espresso') . '</p>';
	}

	protected function _stop_nine() {
		return '<p>' . __('All about question groups for additional attendees here.', 'event_espresso') . '</p>';
	}

	protected function _stop_ten() {
		return '<p>' . __('All about Event Registration Options here.', 'event_espresso') . '</p>';
	}

	protected function _stop_eleven() {
		return '<p>' . __('You can set a feature image for your event here.', 'event_espresso') . '</p>';
	}


	protected function _stop_twelve() {
		return '<p>' . __('Information about the different options in the submit box can go here.', 'event_espresso') . '</p>';
	}

	protected function _stop_thirteen() {
		return '<p>' . __('That\'s it for the tour through the event editor!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Event Editor Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}