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
 * EE_Event_Editor_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_Editor_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'registration-trash-lock',
				'target' => '.ee-lock-icon',
				'content' => $this->_registration_trash_message(),
				'options' => array()//defaults
				)
			);
	}



	private function _registration_trash_message() {
		return '<p>' . __('This lock-icon means that this registration cannot be trashed.  Registrations that belong to a transaction that has payments cannot be trashed.  If you wish to trash this registration then you must delete all payments attached to the related transaction first.', 'event_espresso') . '</p>';
	}
}