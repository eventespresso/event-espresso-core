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
		$content .= '<p>' . __('The Event Editor will likely be one of the most visited pages in Event Espresso.  This brief tour will go over all the different areas of this screen to help you understand what they are for.  Let\'s get started on setting up your first event!', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _stop_two() {
		return '<p>This is where you will enter the title for your Event.</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('This is where you can add some information about your event.  This is a rich text editor and you can add images and links along with  your text.', 'event_espresso') . '</p>';
	}

	protected function _stop_four_caf() {
		return '<p>' . __('In this section, you can enter details about the venue that is hosting your event.', 'event_espresso') . '</p>';
	}

	protected function _stop_five_caf() {
		return '<p>' . __('The Event Ticket & Datetime section is where you enter details about when the event is happening and what tickets you want to offer for access to the event.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_publish_box() {
		return '<p>' . __('Contains buttons that control the state of your event. The main states are Published, Pending Review, and Draft. Additional states are Cancelled, Postponed, and Sold Out.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_registration_options() {
		return '<p>' . __('All about Event Registration Options here.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_post_tag() {
		return '<p>' . __('Events can be tagged if you wish.', 'event_espresso') . '</p>';
	}

	protected function _stop_event_categories() {
		return '<p>' . __('Events can be categorized if you wish.', 'event_espresso') . '</p>';
	}

	protected function _stop_seven() {
		return '<p>' . __('All about question groups here.', 'event_espresso') . '</p>';
	}

	protected function _stop_nine_caf() {
		return '<p>' . __('All about question groups for additional attendees here.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_featured_image() {
		return '<p>' . __('You can set a featured image for your event here.', 'event_espresso') . '</p>';
	}
	
}