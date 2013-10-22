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
				),
			60 => array(
				'id' => 'contextual-help-link',
				'content' => $this->_end(),
				'button_text' => __('End Tour', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Transaction overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _reg_page_id_stop() {
		return '<p>' . __('about reg page', 'event_espresso') . '</p>';
	}


	protected function _txn_page_id_stop() {
		return '<p>' . __('about transactions page', 'event_espresso') . '</p>';
	}


	protected function _thank_you_page_id_stop() {
		return '<p>' . __('about the thank you page', 'event_espresso') . '</p>';
	}


	protected function _cancel_page_id_stop() {
		return '<p>' . __('about the about the cancel page', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}