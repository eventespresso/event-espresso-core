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
 * Admin_Options_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Admin_Options_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/Admin_Options_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Admin_Options_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Admin Options Tour', 'event_espresso');
		$this->_slug = 'admin-options-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'use_full_logging',
				'content' => $this->_use_full_logging_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'use_remote_logging',
				'content' => $this->_use_remote_logging_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'affiliate_info',
				'content' => $this->_show_reg_footer_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			
			60 => array(
				'id' => 'help_tour_activation',
				'content' => $this->_help_tour_activation_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Admin Options', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Admin Options page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _use_full_logging_stop() {
		return '<p>' . __('When enabled, a log file is created which can be useful for debugging. Please disable this option when you are finished debugging.', 'event_espresso') . '</p>';
	}

	protected function _use_remote_logging_stop() {
		return '<p>' . __(' This option sends all Event Espresso debugging data and get / post variables to the specified URL below.', 'event_espresso') . '</p>';
	}

	protected function _show_reg_footer_stop() {
		return '<p>' . __('Support us by adding a small link to Event Espresso in your event pages. You can even earn money for yourself by adding your affiliate link there!', 'event_espresso') . '</p>';
	}
	
	protected function _help_tour_activation_stop() {
		return '<p>' . __('Turn these help tours on / off for Event Espresso pages.', 'event_espresso') . '</p>';
	}
}