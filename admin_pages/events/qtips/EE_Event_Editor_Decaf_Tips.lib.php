<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Event_Editor_Decaf_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_Editor_Decaf_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Editor_Decaf_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'dtt-evt-start-label',
				'target' => '.event-datetime-DTT_EVT_start_label',
				'content' => $this->_get_event_start_label_info()
				)
			);
	}



	private function _get_event_start_label_info() {
		return '<p>' . __('This is for indicating when this Event Datetime starts.', 'event_espresso') . '</p>';
	}
}