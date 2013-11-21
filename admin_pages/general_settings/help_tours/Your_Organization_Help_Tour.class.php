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
 * Your_Organization_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Your_Organization_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/Your_Organization_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Your_Organization_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Organization Settings Tour', 'event_espresso');
		$this->_slug = 'your-organization-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'site_license_key',
				'content' => $this->_site_license_key_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'organization_city',
				'content' => $this->_contact_information_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'upload_image',
				'content' => $this->_upload_image_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			50 => array(
				'id' => 'ueip_optin',
				'content' => $this->_ueip_option_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Organization Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('The general settings page covers most of the site wide settings that you will need. It is split up into 6 tabbed areas.
', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _site_license_key_stop() {
		return '<p>' . __('about site license keys', 'event_espresso') . '</p>';
	}


	protected function _contact_information_stop() {
		return '<p>' . __('about the setting', 'event_espresso') . '</p>';
	}


	protected function _upload_image_stop() {
		return '<p>' . __('about the setting', 'event_espresso') . '</p>';
	}

	protected function _ueip_option_stop() {
		return '<p>' . __('about the setting', 'event_espresso') . '</p>';
	}
}