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
 * Pricing_Edit_Price_Type_Help_Tour
 *
 * This is the help tour object for the Default Prices page
 *
 *
 * @package		Pricing_Edit_Price_Type_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Pricing_Edit_Price_Type_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Pricing_Edit_Price_Type_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Edit Price Type Tour', 'event_espresso');
		$this->_slug = 'edit-price-type-joyride';
	}
    

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'base_type',
				'content' => $this->_basic_type_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'PRT_name',
				'content' => $this->_price_type_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
				'id' => 'PRT_name',
				'content' => $this->_percentage_dollar_amount_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => 45
					)
				),
			50 => array(
				'id' => 'PRT_order',
				'content' => $this->_order_of_application_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Edit Price Type', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Edit Price Type page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _basic_type_stop() {
		return '<p>' . __('Set a price type to be a discount, surcharge, or tax.', 'event_espresso') . '</p>';
	}

	protected function _price_type_name_stop() {
		return '<p>' . __('The name of the price type.', 'event_espresso') . '</p>';
	}

	protected function _percentage_dollar_amount_stop() {
		return '<p>' . __('Set a price type to be percentage-based or a fixed amount.', 'event_espresso') . '</p>';
	}

	protected function _order_of_application_stop() {
		return '<p>' . __('Set the order of application for a price type.', 'event_espresso') . '</p>';
	}

}