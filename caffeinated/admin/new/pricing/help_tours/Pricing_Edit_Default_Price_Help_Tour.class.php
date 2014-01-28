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
			/*20 => array(
				'id' => 'PRT_ID',
				'content' => $this->_price_type_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),*/
			30 => array(
				'id' => 'PRC_name',
				'content' => $this->_price_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
				'id' => 'PRC_desc',
				'content' => $this->_price_description_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			50 => array(
				'id' => 'PRC_amount',
				'content' => $this->_price_amount_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Edit Default Price', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Edit Default Price page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _price_type_stop() {
		return '<p>' . __('Price Types are a way of categorizing a price, discount, tax, or surcharge and indicating how it gets applied to a running total when a transaction occurs.', 'event_espresso') . '</p>';
	}

	protected function _price_name_stop() {
		return '<p>' . __('The name of the price, discount, tax, or surcharge that will be seen by your customers.', 'event_espresso') . '</p>';
	}

	protected function _price_description_stop() {
		return '<p>' . __('View the price type (price, discount, tax or surcharge) description.', 'event_espresso') . '</p>';
	}

	protected function _price_amount_stop() {
		return '<p>' . __('The ticket amount before any deductions.', 'event_espresso') . '</p>';
	}

}