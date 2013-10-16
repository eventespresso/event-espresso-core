<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * This contains the template functions for all the decaf editor help tour steps in one file to make it easier to edit. Wrapped in a class simply for namespace.
 *
 * This file is used in /
 */


class Event_Editor_Help_Tour extends EE_Help_Tour {

	public function __construct() {
		$this->_label = __('Event Editor Tour', 'event_espresso');
		$this->_slug = 'event-editor-joyride';
		parent::__construct();
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			1 => array(
				'content' => $this->_step_one(),
				),
			2 => array(
				'id' => 'title',
				'content' => $this->_step_two(),
				)
			);
	}


	protected function _step_one() {
		$content = '<h3>' . __('Welcome to the Event Espresso Event Editor!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('The Event Editor will likely be one of the most visited pages in Event Espresso.  This brief tour will go over all the different areas of this screen to help you understand what they are for.  Let\'s get started on setting up your first event!', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _step_two() {
		return '<p>This is where you will enter the title for your Event.</p>';
	}
}