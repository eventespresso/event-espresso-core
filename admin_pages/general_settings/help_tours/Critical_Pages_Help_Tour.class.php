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
 * Critical_Pages_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Critical_Pages_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/Critical_Pages_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Critical_Pages_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Critical Pages Tour', 'event_espresso');
		$this->_slug = 'critical-pages-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'reg_page_id',
				'content' => $this->_reg_page_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'txn_page_id',
				'content' => $this->_txn_page_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'thank_you_page_id',
				'content' => $this->_thank_you_page_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			50 => array(
				'id' => 'cancel_page_id',
				'content' => $this->_cancel_page_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Critical Pages', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This section lists the pages that Event Espresso needs in order to function. Should you wish to change a page that is used you will need to move the shortcode to the new page and then allocate it here. Otherwise your registrations will not work correctly.', 'event_espresso') . '</p>';
		$content .= '<p>' . __('This section also provides a status of the page to show you at a glance if something is not right.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _reg_page_id_stop() {
		return '<p>' . __('This page processes the registrations and is required, even if it is not visible in your menus. ', 'event_espresso') . '</p>';
	}

	protected function _txn_page_id_stop() {
		return '<p>' . __('This page processes payments. It should not be visible on your menus, and the page should not contain anything other than the shortcode.', 'event_espresso') . '</p>';
	}

	protected function _thank_you_page_id_stop() {
		return '<p>' . __('This page is displayed after a successful transaction. Feel free to add extra content to this page to personalise it!', 'event_espresso') . '</p>';
	}

	protected function _cancel_page_id_stop() {
		return '<p>' . __('This page is displayed after an unsuccessful transaction. Feel free to add extra content to this page to personalise it!', 'event_espresso') . '</p>';
	}
}