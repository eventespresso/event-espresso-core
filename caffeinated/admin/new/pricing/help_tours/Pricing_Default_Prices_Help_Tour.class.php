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
				'id' => 'name',
				'content' => $this->_name_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'type',
				'content' => $this->_type_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'description',
				'content' => $this->_description_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'amount',
				'content' => $this->_amount_column_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20,
					)
				),
			60 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulk_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -75,
					)
				),
			70 => array(
				'id' => 'event-espresso_page_pricing-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Default Pricing', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Default Pricing page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _name_column_stop() {
		return '<p>' . __('The name of the price, discount, tax, or surcharge that will be seen by your customers. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _type_column_stop() {
		return '<p>' . __('Price Types are a way of categorizing a price, discount, tax, or surcharge and indicating how it gets applied to a running total when a transaction occurs. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _description_column_stop() {
		return '<p>' . __('View the price type (price, discount, tax or surcharge) description.', 'event_espresso') . '</p>';
	}

	protected function _amount_column_stop() {
		return '<p>' . __('The ticket amount before any deductions. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _bulk_actions_stop() {
		return '<p>' . __('Perform bulk actions to multiple price types.', 'event_espresso') . '</p>';
	}

	protected function _search_stop() {
		return '<p>' . __('Search through default pricing. The following sources will be searched: Price Name, Price Type, Price Description, and Price Amount.', 'event_espresso') . '</p>';
	}

}