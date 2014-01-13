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
 * EE_Event_List_Table_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_List_Table_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'attendee-column-tip',
				'target' => '.column-attendees .dashicons-groups',
				'content' => sprintf( __('%s Registrations', 'event_espresso'), EEH_Template::pretty_status(EEM_Registration::status_id_approved, FALSE, 'sentence') ),
				'options' => array( 
					'position' => array(
						'my' => 'bottom left',
						'at' => 'top right',
						'adjust' => array(
							'x' => 0,
							'y' => 0
							)
						)
					)
				)
			);
	}

}