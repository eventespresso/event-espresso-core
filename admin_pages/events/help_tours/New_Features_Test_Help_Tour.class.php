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
 * New_Features_Test_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		New_Features_Test_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/New_Features_Test_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class New_Features_Test_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('New Features Test', 'event_espresso');
		$this->_slug = 'new-features-test';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_end(),
				'button_text' => __('Quit', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
			)
		);
	}


	/**
	 * This is the default last stop for all tours that is displayed at the end of a tour OR when a tour is exited for the first time. 
	 * @return string
	 */
	protected function _end() {
		return '<p>' . 'This is just testing that multiple tours still work' . '</p>';
	}

}