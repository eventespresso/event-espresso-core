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
 * @subpackage	includes/core/admin/payments/help_tours/Payment_Methods_Selection_Help_Tour.class.php
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
					'tipAdjustmentY' => -25,
					'tipAdjustmentX' => 20
					)
				),
			40 => array(
				'content' => $this->_end_tour_stop(),
				'options' => array(
					'tipLocation' => 'top'
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Payment Methods', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Payment Methods page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _gateway_links_stop() {
		return '<p>' . __('Available payment methods are shown here. Clicking on a payment method will provide you with an option to activate that payment gateway.', 'event_espresso') . '</p>';
	}

	protected function _gateway_settings_metabox_stop() {
		return '<p>' . __('A payment gateway must first be enabled. You will then be able to configure the payment gateway. Be sure to save settings after configuring your payment gateway.', 'event_espresso') . '</p>';
	}

	protected function _end_tour_stop() {
		return '<p>' . __('After configuring your payment gateway, go to the Event Editor to create your first event with Event Espresso.', 'event_espresso') . '</p>';
	}

}