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
 * Event_Default_Settings_Help_Tour
 *
 * This is the help tour object for the decaf Event Categories tab
 *
 *
 * @package		Event_Default_Settings_Help_Tour
 * @subpackage	includes/core/admin/Event_Default_Settings_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Default_Settings_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Default Settings Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'event-default-settings-caf-joyride' : 'event-default-settings-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'default_reg_status',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Event Default Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Default Settings page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

    //Options below are showing in full caps. Manually adding statuses and leaving code as is.
	protected function _stop_two() {
		return '<p>' . sprintf( __('Specify whether the default registration status be set to Approved, Not Approved, or Pending Payment.', 'event_espresso'), EEH_Template::pretty_status( EEM_Registration::status_id_not_approved, 'lowercase' ), EEH_Template::pretty_status( EEM_Registration::status_id_pending_payment, 'lowercase' ), EEH_Template::pretty_status( EEM_Registration::status_id_approved, 'lowercase' ) ) . '</p>';
	}

}