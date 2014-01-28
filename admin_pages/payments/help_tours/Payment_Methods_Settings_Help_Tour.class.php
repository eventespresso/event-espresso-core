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
 * Payment_Methods_Settings_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Payment_Methods_Settings_Help_Tour
 * @subpackage	includes/core/admin/payments/help_tours/Payment_Methods_Settings_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Payment_Methods_Settings_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Payment Settings Tour', 'event_espresso');
		$this->_slug = 'payment-settings-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'show_pending_payment_options',
				'content' => $this->_show_pending_options_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Payment Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Payment Settings page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _show_pending_options_stop() {
		return '<p>' . __('Specify whether to provide your registrants with the option to retry payments.', 'event_espresso') . '</p>';
	}
}