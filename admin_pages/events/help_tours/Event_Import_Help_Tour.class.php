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
 * Event_Import_Help_Tour
 *
 * This is the help tour object for the decaf Event Categories tab
 *
 *
 * @package		Event_Import_Help_Tour
 * @subpackage	includes/core/admin/Event_Import_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Import_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Import Tour', 'event_espresso');
		$this->_slug = 'event-import-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'content' => $this->_stop_two(),
				),
			30 => array(
				'content' => $this->_stop_three(),
				),
			40 => array(
				'content' => $this->_stop_four(),

				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Import', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('Learn how to import information into Event Espresso.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _stop_two() {
		return '<p>' . __('A sample CSV file can be downloaded by creating an event through the Event Editor and then saving that event. Then return to the Event Overview screen and hover of the name of the event and click on Export.', 'event_espresso') . '</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('Click on Choose File and browse to the location of your CSV file on your computer.', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('Click on Upload File.', 'event_espresso') . '</p>';
	}

}