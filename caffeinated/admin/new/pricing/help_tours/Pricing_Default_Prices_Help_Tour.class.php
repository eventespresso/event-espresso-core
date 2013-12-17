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
 * Pricing_Default_Prices_Help_Tour
 *
 * This is the help tour object for the Default Prices page
 *
 *
 * @package		Pricing_Default_Prices_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Pricing_Default_Prices_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Pricing_Default_Prices_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Default Pricing Tour', 'event_espresso');
		$this->_slug = 'default-prices-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'event-espresso_page_pricing-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'name',
				'content' => $this->_name_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
				'id' => 'type',
				'content' => $this->_type_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			50 => array(
				'id' => 'description',
				'content' => $this->_description_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			60 => array(
				'id' => 'amount',
				'content' => $this->_amount_column_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 0,
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Pricing Admin', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('Create and edit new ticket prices you can use for your events.', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Price Name, Price Description, Price Amount, or Price Type name', 'event_espresso') . '</p>';
	}


	protected function _name_column_stop() {
		return '<p>' . __('The name of the price, discount, tax, or surcharge, that will be seen by your customers.', 'event_espresso') . '</p>';
	}


	protected function _type_column_stop() {
		return '<p>' . __('Price Types are a way of categorizing a price and indicating how that price gets applied to a running total when a transaction occurs.', 'event_espresso') . '</p>';
	}


	protected function _description_column_stop() {
		return '<p>' . __('Brief description for this Price option. This is not currently displayed to your customers.', 'event_espresso') . '</p>';
	}


	protected function _amount_column_stop() {
		return '<p>' . __('The ticket amount before any deductions.', 'event_espresso') . '</p>';
	}

}