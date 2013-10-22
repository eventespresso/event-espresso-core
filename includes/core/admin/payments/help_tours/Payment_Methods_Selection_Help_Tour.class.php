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
 * Payment_Methods_Selection_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Payment_Methods_Selection_Help_Tour
 * @subpackage	includes/core/admin/transactions/help_tours/Payment_Methods_Selection_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Payment_Methods_Selection_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Payment Methods Tour', 'event_espresso');
		$this->_slug = 'payment-methods-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'class' => 'gateway_links',
				'content' => $this->_gateway_links_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 20
					)
				),
			30 => array(
				'id' => 'postbox-container-2',
				'content' => $this->_gateway_settings_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
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
		$content = '<h3>' . __('Welcome to the Payment Method Gateway activation page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _gateway_links_stop() {
		return '<p>' . __('about the gateway selectors', 'event_espresso') . '</p>';
	}


	protected function _gateway_settings_metabox_stop() {
		return '<p>' . __('about the gateway settings metabox', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}