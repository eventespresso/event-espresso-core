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
 * Price_Types_Default_Help_Tour
 *
 * This is the help tour object for the Default Price Types page
 *
 *
 * @package		Price_Types_Default_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Price_Types_Default_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Price_Types_Default_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Price Types Tour', 'event_espresso');
		$this->_slug = 'default-price-types-joyride';
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
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'base_type',
				'content' => $this->_base_type_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 60
					)
				),
			50 => array(
				'id' => 'member',
				'content' => $this->_member_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 60
					)
				),
			60 => array(
				'id' => 'percent',
				'content' => $this->_percent_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 60
					)
				),
			70 => array(
				'id' => 'order',
				'content' => $this->_order_column_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 60,
					)
				),
			
			80 => array(
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
		$content = '<h3>' . __('Welcome to the Price Types Page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction to the Price Type page!', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Price Type name', 'event_espresso') . '</p>';
	}


	protected function _name_column_stop() {
		return '<p>' . __('about the Price Type name column', 'event_espresso') . '</p>';
	}


	protected function _base_type_stop() {
		return '<p>' . __('about the Base Price Types', 'event_espresso') . '</p>';
	}


	protected function _member_column_stop() {
		return '<p>' . __('about the members only column', 'event_espresso') . '</p>';
	}


	protected function _percent_column_stop() {
		return '<p>' . __('about the applied as % or $ column', 'event_espresso') . '</p>';
	}


	protected function _order_column_stop() {
		return '<p>' . __('About the order of application column', 'event_espreso') . '</p>';
	}


	protected function _end() {
		return '<p>' . __('That\'s it for the tour through the Price Type Admin!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Price Types Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}