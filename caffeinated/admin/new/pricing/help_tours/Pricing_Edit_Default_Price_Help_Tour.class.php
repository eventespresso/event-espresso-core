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
 * Pricing_Edit_Default_Price_Help_Tour
 *
 * This is the help tour object for the Default Prices page
 *
 *
 * @package		Pricing_Edit_Default_Price_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Pricing_Edit_Default_Price_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Pricing_Edit_Default_Price_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Edit Default Price Tour', 'event_espresso');
		$this->_slug = 'edit-default-price-joyride';
	}
    

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'PRT_ID',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'PRC_name',
				'content' => $this->_stop_three(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
				'id' => 'PRC_desc',
				'content' => $this->_stop_four(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			50 => array(
				'id' => 'PRC_amount',
				'content' => $this->_stop_five(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Edit Default Price', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_one() {
		return '<p>' . __('1', 'event_espresso') . '</p>';
	}

	protected function _stop_two() {
		return '<p>' . __('2', 'event_espresso') . '</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('3', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('4', 'event_espresso') . '</p>';
	}

	protected function _stop_five() {
		return '<p>' . __('5', 'event_espresso') . '</p>';
	}

}