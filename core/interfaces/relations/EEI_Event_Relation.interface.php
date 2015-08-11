<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Event Relation interface.
 * This is used on EE Base Class children that you can retrieve a related event from.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Event_Relation {


	/**
	 * Used to return the event object that can be derived from the EE_Base_Class object.
	 * @return EE_Event
	 */
	public function get_related_event();


	/**
	 * Used to return the name of the event that can be derived from the EE_Base_Class object.
	 * @return string
	 */
	public function get_event_name();


	/**
	 * Used to return the EVT_ID for the related event.
	 * @return string
	 */
	public function get_event_ID();

} //end EEI_Event_Relation interface
