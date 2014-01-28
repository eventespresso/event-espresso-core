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
 * Registration_Form_Questions_Overview_Help_Tour
 *
 * This is the help tour object for the Questions Overview page
 *
 *
 * @package		Registration_Form_Questions_Overview_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Form_Questions_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Settings_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Registration Form Settings Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'reg-form-settings-caf-joyride' : 'reg-form-settings-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'use_captcha',
				'content' => $this->_use_recaptcha_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			30 => array(
				/*'id' => 'recaptchapublickey',*/
				'content' => $this->_recaptcha_public_key_stop(),
				/*'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)*/
				),
			40 => array(
				/*'id' => 'recaptchaprivatekey',*/
				'content' => $this->_recaptcha_private_key_stop(),
				/*'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)*/
				),
			50 => array(
				'id' => 'recaptcha_theme',
				'content' => $this->_recaptcha_theme_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -35
					)
				),
			60 => array(
				'id' => 'recaptcha_language',
				'content' => $this->_recaptcha_language_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			70 => array(
				'id' => 'recaptcha_language',
				'content' => $this->_recaptcha_width_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => 25
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Registration Form Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Registration Form Settings page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		
		return $content;
	}

	protected function _use_recaptcha_stop() {
		return '<p>' . __('Specify whether reCAPTCHA should be enabled.', 'event_espresso') . '</p>';
	}

	protected function _recaptcha_public_key_stop() {
		return '<p>' . __('Enter your public key for reCAPTCHA.', 'event_espresso') . '</p>';
	}

	protected function _recaptcha_private_key_stop() {
		return '<p>' . __('Enter your private key for reCAPTCHA.', 'event_espresso') . '</p>';
	}

	protected function _recaptcha_theme_stop() {
		return '<p>' . __('Select a theme (style) for your reCAPTCHA.', 'event_espresso') . '</p>';
	}

	protected function _recaptcha_language_stop() {
		return '<p>' . __('Specify the language that should be used for reCAPTCHA.', 'event_espresso') . '</p>';
	}

	protected function _recaptcha_width_stop() {
		return '<p>' . __('Specify how wide (in pixels) the reCAPTCHA form should be.', 'event_espresso') . '</p>';
	}

}