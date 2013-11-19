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
				'id' => 'show_reg_footer',
				'content' => $this->_show_reg_footer_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			50 => array(
				'id' => 'affiliate_id',
				'content' => $this->_affiliate_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Admin Options page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _use_full_logging_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}


	protected function _use_remote_logging_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}


	protected function _show_reg_footer_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}


	protected function _affiliate_id_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}
}